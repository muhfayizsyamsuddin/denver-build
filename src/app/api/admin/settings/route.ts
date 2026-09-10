import { requireAdmin } from "@/lib/require-admin";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const settingsSchema = z.object({
  siteTitle: z.string().min(1),
  siteDescription: z.string().min(1),
  defaultMetaTitle: z.string().min(1),
  defaultMetaDescription: z.string().min(1),
  defaultOgImageUrl: z.string().optional(),
  faviconUrl: z.string().optional(),
  whatsappMessage: z.string().optional(),
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

  const parsed = settingsSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { message: "Invalid input." },
      { status: 400 },
    );
  }

  const existing = await prisma.siteSettings.findFirst();

  const settings = existing
    ? await prisma.siteSettings.update({
        where: {
          id: existing.id,
        },
        data: parsed.data,
      })
    : await prisma.siteSettings.create({
        data: parsed.data,
      });

  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/services");
  revalidatePath("/projects");
  revalidatePath("/testimonials");
  revalidatePath("/contact");

  return NextResponse.json({
    message: "Website settings saved successfully.",
    data: settings,
  });
}