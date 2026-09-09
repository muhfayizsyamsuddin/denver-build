import { prisma } from "@/lib/prisma";
import { SiteSettingsForm } from "@/app/components/admin/site-settings-form";

export default async function SettingsPage() {
  const settings = await prisma.siteSettings.findFirst();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">
          Settings
        </h1>

        <p className="mt-2 text-sm text-neutral-400">
          Manage global website and SEO configuration.
        </p>
      </div>

      <SiteSettingsForm settings={settings} />
    </div>
  );
}