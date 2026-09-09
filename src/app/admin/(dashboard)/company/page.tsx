import { prisma } from "@/lib/prisma";
import { CompanyProfileForm } from "@/app/components/admin/company-profile-form";

export default async function CompanyProfilePage() {
  const company = await prisma.companyProfile.findFirst();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">
          Company Profile
        </h1>

        <p className="mt-2 text-sm text-neutral-400">
          Manage company information displayed on the public website.
        </p>
      </div>

      <CompanyProfileForm company={company} />
    </div>
  );
}