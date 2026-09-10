import { requireAdmin } from "@/lib/require-admin";
import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const statusSchema = z.object({
  status: z.enum(["NEW", "CONTACTED", "CLOSED"]),
});

type Context = {
  params: Promise<{
    id: string;
  }>;
};

export async function PATCH(request: Request, context: Context) {
  const session = await requireAdmin();

  if (!session) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 },
    );
  }

  const { id } = await context.params;

  const body = await request.json();
  const parsed = statusSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { message: "Invalid status." },
      { status: 400 },
    );
  }

  const existing = await prisma.inquiry.findUnique({
    where: {
      id,
    },
  });

  if (!existing) {
    return NextResponse.json(
      { message: "Inquiry not found." },
      { status: 404 },
    );
  }

  const inquiry = await prisma.inquiry.update({
    where: {
      id,
    },
    data: {
      status: parsed.data.status,
    },
  });

  return NextResponse.json({
    message: "Inquiry status updated successfully.",
    data: inquiry,
  });
}