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

  const [ogImageUrl, setOgImageUrl] = useState(
    settings?.defaultOgImageUrl ?? "",
  );

  const [faviconUrl, setFaviconUrl] = useState(
    settings?.faviconUrl ?? "",
  );

  const [uploadingOgImage, setUploadingOgImage] = useState(false);
  const [uploadingFavicon, setUploadingFavicon] = useState(false);

  async function uploadImage(
    file: File,
    type: "og" | "favicon",
  ) {
    const maxSize = 5 * 1024 * 1024;

    if (!file.type.startsWith("image/")) {
      toast.error("Only image files are allowed.");
      return;
    }

    if (file.size > maxSize) {
      toast.error("Image must be smaller than 5 MB.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    if (type === "og") {
      setUploadingOgImage(true);
    } else {
      setUploadingFavicon(true);
    }

    try {
      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.message ?? "Failed to upload image.");
        return;
      }

      if (type === "og") {
        setOgImageUrl(result.data.url);
        toast.success("Open Graph image uploaded successfully.");
      } else {
        setFaviconUrl(result.data.url);
        toast.success("Favicon uploaded successfully.");
      }
    } catch {
      toast.error("Failed to upload image.");
    } finally {
      if (type === "og") {
        setUploadingOgImage(false);
      } else {
        setUploadingFavicon(false);
      }
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (uploadingOgImage || uploadingFavicon) {
      toast.error("Please wait until all uploads are complete.");
      return;
    }

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
          defaultOgImageUrl: ogImageUrl || null,
          faviconUrl: faviconUrl || null,
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
    "mt-2 w-full rounded-lg border border-white/10 bg-neutral-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-neutral-600 focus:border-amber-500";

  const isUploading = uploadingOgImage || uploadingFavicon;

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 rounded-xl border border-white/10 bg-neutral-900 p-6"
    >
      {/* General */}
      <section>
        <div>
          <h2 className="text-base font-semibold text-white">
            General
          </h2>

          <p className="mt-1 text-sm text-neutral-500">
            Basic website configuration.
          </p>
        </div>

        <div className="mt-6 space-y-6">
          <div>
            <label className="text-sm text-neutral-300">
              Site Title
            </label>

            <input
              name="siteTitle"
              required
              defaultValue={
                settings?.siteTitle ?? "Denver Build"
              }
              placeholder="Denver Build"
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
              defaultValue={
                settings?.siteDescription ?? ""
              }
              placeholder="Describe the website and company briefly."
              className={inputClass}
            />
          </div>
        </div>
      </section>

      {/* SEO */}
      <section className="border-t border-white/10 pt-8">
        <div>
          <h2 className="text-base font-semibold text-white">
            SEO
          </h2>

          <p className="mt-1 text-sm text-neutral-500">
            Default metadata used across public pages.
          </p>
        </div>

        <div className="mt-6 space-y-6">
          <div>
            <label className="text-sm text-neutral-300">
              Default Meta Title
            </label>

            <input
              name="defaultMetaTitle"
              required
              defaultValue={
                settings?.defaultMetaTitle ?? ""
              }
              placeholder="Denver Build | Construction & Renovation"
              className={inputClass}
            />

            <p className="mt-2 text-xs text-neutral-500">
              Used as the default browser title and search result title.
            </p>
          </div>

          <div>
            <label className="text-sm text-neutral-300">
              Default Meta Description
            </label>

            <textarea
              name="defaultMetaDescription"
              required
              rows={4}
              defaultValue={
                settings?.defaultMetaDescription ?? ""
              }
              placeholder="Describe Denver Build for search engines."
              className={inputClass}
            />

            <p className="mt-2 text-xs text-neutral-500">
              Keep this concise and descriptive for search results.
            </p>
          </div>

          {/* Open Graph Image */}
          <div>
            <label className="text-sm text-neutral-300">
              Default Open Graph Image
            </label>

            <input
              type="file"
              accept="image/*"
              disabled={uploadingOgImage || loading}
              onChange={(event) => {
                const file = event.target.files?.[0];

                if (file) {
                  uploadImage(file, "og");
                }

                event.target.value = "";
              }}
              className="mt-2 block w-full text-sm text-neutral-400 file:mr-4 file:rounded-lg file:border-0 file:bg-white/5 file:px-4 file:py-2 file:text-sm file:font-medium file:text-neutral-300 hover:file:bg-white/10"
            />

            <p className="mt-2 text-xs text-neutral-500">
              Image shown when the website is shared on social media.
              JPG, PNG, or WebP, maximum 5 MB.
            </p>

            {uploadingOgImage && (
              <p className="mt-2 text-xs text-amber-400">
                Uploading Open Graph image...
              </p>
            )}

            {ogImageUrl && (
              <div className="mt-4 max-w-lg">
                <img
                  src={ogImageUrl}
                  alt="Open Graph preview"
                  className="aspect-[1.91/1] w-full rounded-lg object-cover"
                />

                <button
                  type="button"
                  onClick={() => setOgImageUrl("")}
                  className="mt-2 text-xs text-red-400 transition hover:text-red-300"
                >
                  Remove
                </button>
              </div>
            )}
          </div>

          {/* Favicon */}
          <div>
            <label className="text-sm text-neutral-300">
              Favicon
            </label>

            <input
              type="file"
              accept="image/*"
              disabled={uploadingFavicon || loading}
              onChange={(event) => {
                const file = event.target.files?.[0];

                if (file) {
                  uploadImage(file, "favicon");
                }

                event.target.value = "";
              }}
              className="mt-2 block w-full text-sm text-neutral-400 file:mr-4 file:rounded-lg file:border-0 file:bg-white/5 file:px-4 file:py-2 file:text-sm file:font-medium file:text-neutral-300 hover:file:bg-white/10"
            />

            <p className="mt-2 text-xs text-neutral-500">
              Small icon displayed in the browser tab.
            </p>

            {uploadingFavicon && (
              <p className="mt-2 text-xs text-amber-400">
                Uploading favicon...
              </p>
            )}

            {faviconUrl && (
              <div className="mt-4">
                <img
                  src={faviconUrl}
                  alt="Favicon preview"
                  className="h-16 w-16 rounded-lg border border-white/10 object-cover"
                />

                <button
                  type="button"
                  onClick={() => setFaviconUrl("")}
                  className="mt-2 block text-xs text-red-400 transition hover:text-red-300"
                >
                  Remove
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* WhatsApp */}
      <section className="border-t border-white/10 pt-8">
        <div>
          <h2 className="text-base font-semibold text-white">
            WhatsApp
          </h2>

          <p className="mt-1 text-sm text-neutral-500">
            Configure the default message used by WhatsApp CTA buttons.
          </p>
        </div>

        <div className="mt-6">
          <label className="text-sm text-neutral-300">
            Default WhatsApp Message
          </label>

          <textarea
            name="whatsappMessage"
            rows={4}
            defaultValue={
              settings?.whatsappMessage ?? ""
            }
            placeholder="Hello Denver Build, I would like to discuss a project."
            className={inputClass}
          />

          <p className="mt-2 text-xs text-neutral-500">
            This message can be pre-filled when visitors contact the company
            through WhatsApp.
          </p>
        </div>
      </section>

      {/* Actions */}
      <div className="flex justify-end border-t border-white/10 pt-6">
        <button
          type="submit"
          disabled={loading || isUploading}
          className="rounded-lg bg-amber-500 px-5 py-2.5 text-sm font-semibold text-neutral-950 transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isUploading
            ? "Uploading..."
            : loading
              ? "Saving..."
              : "Save Settings"}
        </button>
      </div>
    </form>
  );
}