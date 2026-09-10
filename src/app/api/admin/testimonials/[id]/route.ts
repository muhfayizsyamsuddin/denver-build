import { requireAdmin } from "@/lib/require-admin";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const testimonialSchema = z.object({
  clientName: z.string().min(1),
  clientRole: z.string().optional(),
  clientCompany: z.string().optional(),
  content: z.string().min(1),
  clientPhotoUrl: z.string().optional(),
  rating: z.number().int().min(1).max(5).nullable(),
  isActive: z.boolean(),
});

type Context = {
  params: Promise<{
    id: string;
  }>;
};

export async function PUT(request: Request, context: Context) {
  const session = await requireAdmin();

  if (!session) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 },
    );
  }

  const { id } = await context.params;

  const body = await request.json();

  const parsed = testimonialSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { message: "Invalid input" },
      { status: 400 },
    );
  }

  const existing = await prisma.testimonial.findUnique({
    where: {
      id,
    },
  });

  if (!existing) {
    return NextResponse.json(
      { message: "Testimonial not found." },
      { status: 404 },
    );
  }

  const testimonial = await prisma.testimonial.update({
    where: {
      id,
    },
    data: parsed.data,
  });

  revalidatePath("/");
  revalidatePath("/testimonials");

  return NextResponse.json({
    message: "Testimonial updated successfully.",
    data: testimonial,
  });
}

export async function DELETE(
  _request: Request,
  context: Context,
) {
  const session = await requireAdmin();

  if (!session) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 },
    );
  }

  const { id } = await context.params;

  const existing = await prisma.testimonial.findUnique({
    where: {
      id,
    },
  });

  if (!existing) {
    return NextResponse.json(
      { message: "Testimonial not found." },
      { status: 404 },
    );
  }

  await prisma.testimonial.delete({
    where: {
      id,
    },
  });

  revalidatePath("/");
  revalidatePath("/testimonials");

  return NextResponse.json({
    message: "Testimonial deleted successfully.",
  });
}