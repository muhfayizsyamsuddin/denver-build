import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";

import { authOptions } from "@/auth";
import { prisma } from "@/lib/prisma";

const projectSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  shortDescription: z.string().min(1),
  description: z.string().min(1),
  category: z.string().min(1),
  location: z.string().min(1),
  completionYear: z.number().int(),
  thumbnailUrl: z.string().optional(),
  isFeatured: z.boolean(),
  isPublished: z.boolean(),
  galleryImages: z.array(z.string()),
});

type Context = {
  params: Promise<{
    id: string;
  }>;
};

export async function PUT(request: Request, context: Context) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 },
    );
  }

  const { id } = await context.params;
  const body = await request.json();

  const parsed = projectSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { message: "Invalid input" },
      { status: 400 },
    );
  }

  const existing = await prisma.project.findUnique({
    where: { id },
  });

  if (!existing) {
    return NextResponse.json(
      { message: "Project not found." },
      { status: 404 },
    );
  }

  const duplicateSlug = await prisma.project.findFirst({
    where: {
      slug: parsed.data.slug,
      NOT: {
        id,
      },
    },
  });

  if (duplicateSlug) {
    return NextResponse.json(
      { message: "Project slug already exists." },
      { status: 409 },
    );
  }

  const { galleryImages, ...data } = parsed.data;

  const project = await prisma.$transaction(async (tx) => {
    await tx.projectImage.deleteMany({
      where: {
        projectId: id,
      },
    });

    return tx.project.update({
      where: {
        id,
      },
      data: {
        ...data,

        images: {
          create: galleryImages.map((imageUrl, index) => ({
            imageUrl,
            displayOrder: index,
          })),
        },
      },
      include: {
        images: true,
      },
    });
  });

  return NextResponse.json({
    message: "Project updated successfully.",
    data: project,
  });
}

export async function DELETE(
  _request: Request,
  context: Context,
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 },
    );
  }

  const { id } = await context.params;

  const existing = await prisma.project.findUnique({
    where: {
      id,
    },
  });

  if (!existing) {
    return NextResponse.json(
      { message: "Project not found." },
      { status: 404 },
    );
  }

  await prisma.project.delete({
    where: {
      id,
    },
  });

  return NextResponse.json({
    message: "Project deleted successfully.",
  });
}