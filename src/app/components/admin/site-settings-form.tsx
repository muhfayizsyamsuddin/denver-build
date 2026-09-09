"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type SiteSettingsData = {
  id: string;
  siteTitle: string;
  siteDescription: string;
  defaultMetaTitle: string;
  defaultMetaDescription: string;
  defaultOgImageUrl: string | null;
  faviconUrl: string | null;
  whatsappMessage: string | null;
};

type Props = {
  settings: SiteSettingsData | null;
};

export function SiteSettingsForm({ settings }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    setLoading(true);

    try {
      const response = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          siteTitle: formData.get("siteTitle"),
          siteDescription: formData.get("siteDescription"),
          defaultMetaTitle: formData.get("defaultMetaTitle"),
          defaultMetaDescription: formData.get(
            "defaultMetaDescription",
          ),
          defaultOgImageUrl: formData.get("defaultOgImageUrl"),
          faviconUrl: formData.get("faviconUrl"),
          whatsappMessage: formData.get("whatsappMessage"),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(
          result.message ?? "Failed to save website settings.",
        );
        return;
      }

      toast.success("Website settings saved successfully.");
      router.refresh();
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "mt-2 w-full rounded-lg border border-white/10 bg-neutral-900 px-4 py-3 text-sm text-white outline-none transition focus:border-amber-500";

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 rounded-xl border border-white/10 bg-neutral-900 p-6"
    >
      <section className="space-y-6">
        <div>
          <h2 className="font-semibold text-white">
            General
          </h2>

          <p className="mt-1 text-sm text-neutral-500">
            Basic website configuration.
          </p>
        </div>

        <div>
          <label className="text-sm text-neutral-300">
            Site Title
          </label>

          <input
            name="siteTitle"
            required
            defaultValue={settings?.siteTitle ?? "Denver Build"}
            className={inputClass}
          />
        </div>

        <div>
          <label className="text-sm text-neutral-300">
            Site Description
          </label>

          <textarea
            name="siteDescription"
            required
            rows={4}
            defaultValue={settings?.siteDescription ?? ""}
            className={inputClass}
          />
        </div>
      </section>

      <section className="space-y-6 border-t border-white/10 pt-8">
        <div>
          <h2 className="font-semibold text-white">
            SEO
          </h2>

          <p className="mt-1 text-sm text-neutral-500">
            Default metadata used across public pages.
          </p>
        </div>

        <div>
          <label className="text-sm text-neutral-300">
            Default Meta Title
          </label>

          <input
            name="defaultMetaTitle"
            required
            defaultValue={settings?.defaultMetaTitle ?? ""}
            className={inputClass}
          />
        </div>

        <div>
          <label className="text-sm text-neutral-300">
            Default Meta Description
          </label>

          <textarea
            name="defaultMetaDescription"
            required
            rows={4}
            defaultValue={settings?.defaultMetaDescription ?? ""}
            className={inputClass}
          />
        </div>

        <div>
          <label className="text-sm text-neutral-300">
            Default Open Graph Image URL
          </label>

          <input
            name="defaultOgImageUrl"
            defaultValue={settings?.defaultOgImageUrl ?? ""}
            className={inputClass}
          />
        </div>

        <div>
          <label className="text-sm text-neutral-300">
            Favicon URL
          </label>

          <input
            name="faviconUrl"
            defaultValue={settings?.faviconUrl ?? ""}
            className={inputClass}
          />
        </div>
      </section>

      <section className="space-y-6 border-t border-white/10 pt-8">
        <div>
          <h2 className="font-semibold text-white">
            WhatsApp
          </h2>

          <p className="mt-1 text-sm text-neutral-500">
            Default message used by WhatsApp CTA buttons.
          </p>
        </div>

        <div>
          <label className="text-sm text-neutral-300">
            Default WhatsApp Message
          </label>

          <textarea
            name="whatsappMessage"
            rows={4}
            defaultValue={settings?.whatsappMessage ?? ""}
            className={inputClass}
          />
        </div>
      </section>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-amber-500 px-5 py-2.5 text-sm font-semibold text-neutral-950 transition hover:bg-amber-400 disabled:opacity-60"
        >
          {loading ? "Saving..." : "Save Settings"}
        </button>
      </div>
    </form>
  );
}