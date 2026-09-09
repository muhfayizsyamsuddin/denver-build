import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";

import { authOptions } from "@/auth";
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

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 },
    );
  }

  const body = await request.json();
  const parsed = testimonialSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { message: "Invalid input" },
      { status: 400 },
    );
  }

  const testimonial = await prisma.testimonial.create({
    data: parsed.data,
  });

  return NextResponse.json(
    {
      message: "Testimonial created successfully.",
      data: testimonial,
    },
    { status: 201 },
  );
}