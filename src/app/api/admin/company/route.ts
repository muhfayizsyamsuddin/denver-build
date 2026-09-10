import { requireAdmin } from "@/lib/require-admin";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const companySchema = z.object({
  companyName: z.string().min(1),
  description: z.string().min(1),
  history: z.string().optional(),
  vision: z.string().optional(),
  mission: z.string().optional(),
  address: z.string().min(1),
  phone: z.string().min(1),
  whatsapp: z.string().min(1),
  email: z.string().email(),
  googleMapsUrl: z.string().optional(),
  instagramUrl: z.string().optional(),
  facebookUrl: z.string().optional(),
  linkedinUrl: z.string().optional(),
});

export async function PUT(request: Request) {
  const session = await requireAdmin();

  if (!session) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 },
    );
  }

  const body = await request.json();

  const parsed = companySchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        message: "Invalid input",
        errors: parsed.error.flatten(),
      },
      { status: 400 },
    );
  }

  const data = parsed.data;

  const existing = await prisma.companyProfile.findFirst();

  const company = existing
    ? await prisma.companyProfile.update({
        where: {
          id: existing.id,
        },
        data,
      })
    : await prisma.companyProfile.create({
        data,
      });

  // Refresh public pages that use company profile data
  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/contact");

  return NextResponse.json({
    message: "Company profile saved successfully.",
    data: company,
  });
}