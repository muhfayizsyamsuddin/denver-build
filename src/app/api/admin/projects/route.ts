import { requireAdmin } from "@/lib/require-admin";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
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

export async function POST(request: Request) {
  const session = await requireAdmin();

  if (!session) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 },
    );
  }

  const body = await request.json();
  const parsed = projectSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { message: "Invalid input" },
      { status: 400 },
    );
  }

  const { galleryImages, ...data } = parsed.data;

  const duplicate = await prisma.project.findUnique({
    where: {
      slug: data.slug,
    },
  });

  if (duplicate) {
    return NextResponse.json(
      { message: "Project slug already exists." },
      { status: 409 },
    );
  }

  const project = await prisma.project.create({
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

  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath(`/projects/${project.slug}`);

  return NextResponse.json(
    {
      message: "Project created successfully.",
      data: project,
    },
    { status: 201 },
  );
}