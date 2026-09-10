import type { Metadata } from "next";
import {
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import {
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
  FaWhatsapp
} from "react-icons/fa";
import { prisma } from "@/lib/prisma";
import { ContactForm } from "@/app/components/public/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Denver Build to discuss your construction, renovation, or interior project.",
};

export default async function ContactPage() {
  const company = await prisma.companyProfile.findFirst();

  const whatsappNumber = company?.whatsapp?.replace(/\D/g, "");

  const whatsappUrl = whatsappNumber
    ? `https://wa.me/${whatsappNumber}`
    : null;

  return (
    <main className="bg-neutral-950 text-white">
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-amber-500">
            Contact
          </p>

          <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
            Let&apos;s discuss your next project.
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-neutral-400">
            Tell us about your construction, renovation, interior, or building
            project. We&apos;ll review your inquiry and get back to you as soon
            as possible.
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[0.8fr_1.2fr]">
          {/* Contact Information */}
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-amber-500">
              Get in Touch
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight">
              Start with a conversation.
            </h2>

            <p className="mt-4 max-w-lg text-sm leading-7 text-neutral-400">
              Contact {company?.companyName ?? "Denver Build"} directly or send
              your project details through the inquiry form.
            </p>

            <div className="mt-10 space-y-4">
              {company?.email && (
                <a
                  href={`mailto:${company.email}`}
                  className="flex items-start gap-4 rounded-xl border border-white/10 bg-neutral-900 p-5 transition hover:border-amber-500/30"
                >
                  <Mail className="mt-0.5 h-5 w-5 text-amber-500" />

                  <div>
                    <p className="text-xs uppercase tracking-wide text-neutral-500">
                      Email
                    </p>
                    <p className="mt-1 text-sm text-neutral-200">
                      {company.email}
                    </p>
                  </div>
                </a>
              )}

              {company?.phone && (
                <a
                  href={`tel:${company.phone}`}
                  className="flex items-start gap-4 rounded-xl border border-white/10 bg-neutral-900 p-5 transition hover:border-amber-500/30"
                >
                  <Phone className="mt-0.5 h-5 w-5 text-amber-500" />

                  <div>
                    <p className="text-xs uppercase tracking-wide text-neutral-500">
                      Phone
                    </p>
                    <p className="mt-1 text-sm text-neutral-200">
                      {company.phone}
                    </p>
                  </div>
                </a>
              )}

              {company?.address && (
                <div className="flex items-start gap-4 rounded-xl border border-white/10 bg-neutral-900 p-5 transition hover:border-amber-500/30">
                  <MapPin className="mt-0.5 h-5 w-5 text-amber-500" />

                  <div>
                    <p className="text-xs uppercase tracking-wide text-neutral-500">
                      Address
                    </p>
                    <p className="mt-1 text-sm leading-6 text-neutral-200">
                      {company.address}
                    </p>
                  </div>
                </div>
              )}

              {whatsappUrl && (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-start gap-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-5 transition hover:border-emerald-500/40"
                >
                  <FaWhatsapp className="mt-0.5 h-5 w-5 text-emerald-400" />

                  <div>
                    <p className="text-xs uppercase tracking-wide text-neutral-500">
                      WhatsApp
                    </p>
                    <p className="mt-1 text-sm text-neutral-200">
                      Chat with Denver Build
                    </p>
                  </div>
                </a>
              )}
            </div>

            {(company?.instagramUrl ||
              company?.facebookUrl ||
              company?.linkedinUrl) && (
              <div className="mt-10">
                <p className="text-sm font-medium text-white">
                  Follow Denver Build
                </p>

                <div className="mt-4 flex gap-3">
                  {company.instagramUrl && (
                    <a
                      href={company.instagramUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Instagram"
                      className="rounded-lg border border-white/10 p-3 text-neutral-400 transition hover:border-amber-500/30 hover:text-white"
                    >
                      <FaInstagram className="h-4 w-4" />
                    </a>
                  )}

                  {company.facebookUrl && (
                    <a
                      href={company.facebookUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Facebook"
                      className="rounded-lg border border-white/10 p-3 text-neutral-400 transition hover:border-amber-500/30 hover:text-white"
                    >
                      <FaFacebookF className="h-4 w-4" />
                    </a>
                  )}

                  {company.linkedinUrl && (
                    <a
                      href={company.linkedinUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="LinkedIn"
                      className="rounded-lg border border-white/10 p-3 text-neutral-400 transition hover:border-amber-500/30 hover:text-white"
                    >
                      <FaLinkedinIn className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Inquiry Form */}
          <div>
            <div className="mb-6">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-amber-500">
                Project Inquiry
              </p>

              <h2 className="mt-3 text-2xl font-semibold">
                Tell us about your project.
              </h2>

              <p className="mt-2 text-sm leading-6 text-neutral-500">
                Provide a few details and our team will review your inquiry.
              </p>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}