import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Mail, Phone } from "lucide-react";

import { prisma } from "@/lib/prisma";
import { InquiryStatusForm } from "@/app/components/admin/inquiry-status-form";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

function getStatusClass(status: string) {
  switch (status) {
    case "NEW":
      return "bg-amber-500/10 text-amber-400";
    case "CONTACTED":
      return "bg-sky-500/10 text-sky-400";
    case "CLOSED":
      return "bg-emerald-500/10 text-emerald-400";
    default:
      return "bg-white/5 text-neutral-300";
  }
}

export default async function InquiryDetailPage({ params }: Props) {
  const { id } = await params;

  const inquiry = await prisma.inquiry.findUnique({
    where: {
      id,
    },
  });

  if (!inquiry) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/admin/inquiries"
          className="inline-flex items-center gap-2 text-sm text-neutral-500 transition hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Inquiries
        </Link>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight">
            Inquiry Detail
          </h1>

          <span
            className={`rounded-full px-2.5 py-1 text-xs font-medium ${getStatusClass(
              inquiry.status,
            )}`}
          >
            {inquiry.status === "NEW"
              ? "New"
              : inquiry.status === "CONTACTED"
                ? "Contacted"
                : "Closed"}
          </span>
        </div>

        <p className="mt-2 text-sm text-neutral-400">
          Review customer inquiry and update its status.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
        <div className="rounded-xl border border-white/10 bg-neutral-900 p-6">
          {/* Customer Information */}
          <section>
            <div>
              <h2 className="text-base font-semibold text-white">
                Customer Information
              </h2>

              <p className="mt-1 text-sm text-neutral-500">
                Contact information submitted with this inquiry.
              </p>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-wide text-neutral-500">
                  Name
                </p>

                <p className="mt-2 text-neutral-200">
                  {inquiry.name}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wide text-neutral-500">
                  Email
                </p>

                <a
                  href={`mailto:${inquiry.email}`}
                  className="mt-2 inline-flex items-center gap-2 text-neutral-200 transition hover:text-amber-400"
                >
                  <Mail className="h-4 w-4" />
                  {inquiry.email}
                </a>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wide text-neutral-500">
                  Phone
                </p>

                {inquiry.phone ? (
                  <a
                    href={`tel:${inquiry.phone}`}
                    className="mt-2 inline-flex items-center gap-2 text-neutral-200 transition hover:text-amber-400"
                  >
                    <Phone className="h-4 w-4" />
                    {inquiry.phone}
                  </a>
                ) : (
                  <p className="mt-2 text-neutral-500">—</p>
                )}
              </div>

              <div>
                <p className="text-xs uppercase tracking-wide text-neutral-500">
                  Submitted
                </p>

                <p className="mt-2 text-neutral-200">
                  {inquiry.createdAt.toLocaleString("en-GB")}
                </p>
              </div>
            </div>
          </section>

          {/* Inquiry Content */}
          <section className="mt-8 border-t border-white/10 pt-8">
            <div>
              <h2 className="text-base font-semibold text-white">
                Inquiry Content
              </h2>

              <p className="mt-1 text-sm text-neutral-500">
                Project information provided by the customer.
              </p>
            </div>

            <div className="mt-6">
              <p className="text-xs uppercase tracking-wide text-neutral-500">
                Subject
              </p>

              <p className="mt-2 font-medium text-neutral-200">
                {inquiry.subject}
              </p>
            </div>

            <div className="mt-6">
              <p className="text-xs uppercase tracking-wide text-neutral-500">
                Message
              </p>

              <div className="mt-3 rounded-lg border border-white/10 bg-neutral-950 p-5">
                <p className="whitespace-pre-wrap leading-7 text-neutral-300">
                  {inquiry.message}
                </p>
              </div>
            </div>
          </section>
        </div>

        <div className="xl:sticky xl:top-20 xl:self-start">
          <InquiryStatusForm
            id={inquiry.id}
            status={inquiry.status}
          />
        </div>
      </div>
    </div>
  );
}