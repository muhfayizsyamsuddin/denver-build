import { requireAdmin } from "@/lib/require-admin";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
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

export async function POST(request: Request) {
  const session = await requireAdmin();

  if (!session) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 },
    );
  }

  const body = await request.json();

  const parsed = serviceSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { message: "Invalid input" },
      { status: 400 },
    );
  }

  const existing = await prisma.service.findUnique({
    where: {
      slug: parsed.data.slug,
    },
  });

  if (existing) {
    return NextResponse.json(
      { message: "Service slug already exists." },
      { status: 409 },
    );
  }

  const service = await prisma.service.create({
    data: parsed.data,
  });

  revalidatePath("/");
  revalidatePath("/services");

  return NextResponse.json(
    {
      message: "Service created successfully.",
      data: service,
    },
    { status: 201 },
  );
}