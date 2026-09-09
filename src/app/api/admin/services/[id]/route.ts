import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";

import { authOptions } from "@/auth";
import { prisma } from "@/lib/prisma";

const serviceSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().min(1),
  imageUrl: z.string().optional(),
  icon: z.string().optional(),
  displayOrder: z.number().int().min(0),
  isActive: z.boolean(),
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

  const parsed = serviceSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { message: "Invalid input" },
      { status: 400 },
    );
  }

  const duplicateSlug = await prisma.service.findFirst({
    where: {
      slug: parsed.data.slug,
      NOT: {
        id,
      },
    },
  });

  if (duplicateSlug) {
    return NextResponse.json(
      { message: "Service slug already exists." },
      { status: 409 },
    );
  }

  const existing = await prisma.service.findUnique({
    where: {
      id,
    },
  });

  if (!existing) {
    return NextResponse.json(
      { message: "Service not found." },
      { status: 404 },
    );
  }

  const service = await prisma.service.update({
    where: {
      id,
    },
    data: parsed.data,
  });

  return NextResponse.json({
    message: "Service updated successfully.",
    data: service,
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

  const existing = await prisma.service.findUnique({
    where: {
      id,
    },
  });

  if (!existing) {
    return NextResponse.json(
      { message: "Service not found." },
      { status: 404 },
    );
  }

  await prisma.service.delete({
    where: {
      id,
    },
  });

  return NextResponse.json({
    message: "Service deleted successfully.",
  });
}