import { ContactForm } from "@/app/components/public/contact-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Denver Build to discuss your construction, renovation, or interior project.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-neutral-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-amber-500">
            Contact
          </p>

          <h1 className="mt-3 text-4xl font-semibold tracking-tight">
            Start a conversation with Denver Build.
          </h1>

          <p className="mt-4 max-w-2xl text-neutral-400">
            Tell us about your construction, renovation, or interior project.
            Our team will get back to you as soon as possible.
          </p>
        </div>

        <ContactForm />
      </div>
    </main>
  );
}