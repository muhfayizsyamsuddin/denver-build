import type { Metadata } from "next";

import { prisma } from "@/lib/prisma";
import { PublicNavbar } from "@/app/components/public/public-navbar";
import { PublicFooter } from "@/app/components/public/public-footer";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await prisma.siteSettings.findFirst();

  return {
    title: {
      default:
        settings?.defaultMetaTitle ??
        "Denver Build | Construction & Renovation",
      template: `%s | ${settings?.siteTitle ?? "Denver Build"}`,
    },

    description:
      settings?.defaultMetaDescription ??
      "Professional construction, renovation, interior, and building services.",

    openGraph: {
      title:
        settings?.defaultMetaTitle ??
        "Denver Build | Construction & Renovation",

      description:
        settings?.defaultMetaDescription ??
        "Professional construction, renovation, interior, and building services.",

      images: settings?.defaultOgImageUrl
        ? [
            {
              url: settings.defaultOgImageUrl,
            },
          ]
        : undefined,

      type: "website",
    },

    icons: settings?.faviconUrl
      ? {
          icon: settings.faviconUrl,
        }
      : undefined,
  };
}

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const company = await prisma.companyProfile.findFirst();

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <PublicNavbar />

      {children}

      <PublicFooter
        companyName={company?.companyName}
        email={company?.email}
        phone={company?.phone}
      />
    </div>
  );
}