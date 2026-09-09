import { prisma } from "@/lib/prisma";
import { PublicNavbar } from "@/app/components/public/public-navbar";
import { PublicFooter } from "@/app/components/public/public-footer";

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