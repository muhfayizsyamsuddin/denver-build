import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";

import { authOptions } from "@/auth";
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
  const session = await getServerSession(authOptions);

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

  return NextResponse.json({
    message: "Website settings saved successfully.",
    data: settings,
  });
}