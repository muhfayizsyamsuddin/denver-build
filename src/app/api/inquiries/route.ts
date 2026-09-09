import { NextResponse } from "next/server";
import { z } from "zod";

import { prisma } from "@/lib/prisma";

const inquirySchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  subject: z.string().min(2),
  message: z.string().min(10),
});

export async function POST(request: Request) {
  const body = await request.json();

  const parsed = inquirySchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        message: "Please check your input and try again.",
        errors: parsed.error.flatten(),
      },
      { status: 400 },
    );
  }

  const inquiry = await prisma.inquiry.create({
    data: {
      ...parsed.data,
      status: "NEW",
    },
  });

  return NextResponse.json(
    {
      message: "Inquiry submitted successfully.",
      data: {
        id: inquiry.id,
      },
    },
    { status: 201 },
  );
}