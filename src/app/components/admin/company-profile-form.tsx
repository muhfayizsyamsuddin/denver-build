"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type CompanyProfileData = {
  id: string;
  companyName: string;
  description: string;
  history: string | null;
  vision: string | null;
  mission: string | null;
  address: string;
  phone: string;
  whatsapp: string;
  email: string;
  googleMapsUrl: string | null;
  instagramUrl: string | null;
  facebookUrl: string | null;
  linkedinUrl: string | null;
};

type Props = {
  company: CompanyProfileData | null;
};

export function CompanyProfileForm({ company }: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);

    try {
      const formData = new FormData(event.currentTarget);

      const response = await fetch("/api/admin/company", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          companyName: formData.get("companyName"),
          description: formData.get("description"),
          history: formData.get("history"),
          vision: formData.get("vision"),
          mission: formData.get("mission"),
          address: formData.get("address"),
          phone: formData.get("phone"),
          whatsapp: formData.get("whatsapp"),
          email: formData.get("email"),
          googleMapsUrl: formData.get("googleMapsUrl"),
          instagramUrl: formData.get("instagramUrl"),
          facebookUrl: formData.get("facebookUrl"),
          linkedinUrl: formData.get("linkedinUrl"),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.message ?? "Failed to save company profile.");
        return;
      }

      toast.success("Company profile saved successfully.");
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
      {/* Company Information */}
      <section>
        <div>
          <h2 className="text-base font-semibold text-white">
            Company Information
          </h2>

          <p className="mt-1 text-sm text-neutral-500">
            Basic information displayed across the public website.
          </p>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="lg:col-span-2">
            <label className="text-sm text-neutral-300">
              Company Name
            </label>

            <input
              name="companyName"
              defaultValue={company?.companyName ?? ""}
              required
              className={inputClass}
            />
          </div>

          <div className="lg:col-span-2">
            <label className="text-sm text-neutral-300">
              Description
            </label>

            <textarea
              name="description"
              defaultValue={company?.description ?? ""}
              required
              rows={4}
              className={inputClass}
            />
          </div>

          <div className="lg:col-span-2">
            <label className="text-sm text-neutral-300">
              Company History
            </label>

            <textarea
              name="history"
              defaultValue={company?.history ?? ""}
              rows={4}
              className={inputClass}
            />
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="border-t border-white/10 pt-8">
        <div>
          <h2 className="text-base font-semibold text-white">
            Vision & Mission
          </h2>

          <p className="mt-1 text-sm text-neutral-500">
            Define the direction and purpose of the company.
          </p>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div>
            <label className="text-sm text-neutral-300">
              Vision
            </label>

            <textarea
              name="vision"
              defaultValue={company?.vision ?? ""}
              rows={5}
              className={inputClass}
            />
          </div>

          <div>
            <label className="text-sm text-neutral-300">
              Mission
            </label>

            <textarea
              name="mission"
              defaultValue={company?.mission ?? ""}
              rows={5}
              className={inputClass}
            />
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="border-t border-white/10 pt-8">
        <div>
          <h2 className="text-base font-semibold text-white">
            Contact Information
          </h2>

          <p className="mt-1 text-sm text-neutral-500">
            Contact details displayed on the public website.
          </p>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="lg:col-span-2">
            <label className="text-sm text-neutral-300">
              Address
            </label>

            <input
              name="address"
              defaultValue={company?.address ?? ""}
              required
              className={inputClass}
            />
          </div>

          <div>
            <label className="text-sm text-neutral-300">
              Email
            </label>

            <input
              type="email"
              name="email"
              defaultValue={company?.email ?? ""}
              required
              className={inputClass}
            />
          </div>

          <div>
            <label className="text-sm text-neutral-300">
              Phone
            </label>

            <input
              name="phone"
              defaultValue={company?.phone ?? ""}
              required
              className={inputClass}
            />
          </div>

          <div>
            <label className="text-sm text-neutral-300">
              WhatsApp
            </label>

            <input
              name="whatsapp"
              defaultValue={company?.whatsapp ?? ""}
              required
              className={inputClass}
            />
          </div>
        </div>
      </section>

      {/* Links */}
      <section className="border-t border-white/10 pt-8">
        <div>
          <h2 className="text-base font-semibold text-white">
            Social & Location Links
          </h2>

          <p className="mt-1 text-sm text-neutral-500">
            External links used for maps and company social media.
          </p>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="lg:col-span-2">
            <label className="text-sm text-neutral-300">
              Google Maps URL
            </label>

            <input
              type="url"
              name="googleMapsUrl"
              defaultValue={company?.googleMapsUrl ?? ""}
              placeholder="https://maps.google.com/..."
              className={inputClass}
            />
          </div>

          <div>
            <label className="text-sm text-neutral-300">
              Instagram URL
            </label>

            <input
              type="url"
              name="instagramUrl"
              defaultValue={company?.instagramUrl ?? ""}
              placeholder="https://instagram.com/..."
              className={inputClass}
            />
          </div>

          <div>
            <label className="text-sm text-neutral-300">
              Facebook URL
            </label>

            <input
              type="url"
              name="facebookUrl"
              defaultValue={company?.facebookUrl ?? ""}
              placeholder="https://facebook.com/..."
              className={inputClass}
            />
          </div>

          <div className="lg:col-span-2">
            <label className="text-sm text-neutral-300">
              LinkedIn URL
            </label>

            <input
              type="url"
              name="linkedinUrl"
              defaultValue={company?.linkedinUrl ?? ""}
              placeholder="https://linkedin.com/company/..."
              className={inputClass}
            />
          </div>
        </div>
      </section>

      {/* Save */}
      <div className="flex justify-end border-t border-white/10 pt-6">
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-amber-500 px-5 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
}