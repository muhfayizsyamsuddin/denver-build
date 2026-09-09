import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { InquiryStatusForm } from "@/app/components/admin/inquiry-status-form";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

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
        <h1 className="text-3xl font-semibold tracking-tight">
          Inquiry Detail
        </h1>

        <p className="mt-2 text-sm text-neutral-400">
          Review customer inquiry and update its status.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
        <div className="rounded-xl border border-white/10 bg-neutral-900 p-6">
          <div className="grid gap-6 md:grid-cols-2">
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
              <p className="mt-2 text-neutral-200">
                {inquiry.email}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-neutral-500">
                Phone
              </p>
              <p className="mt-2 text-neutral-200">
                {inquiry.phone ?? "-"}
              </p>
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

          <div className="mt-8 border-t border-white/10 pt-6">
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

            <p className="mt-2 whitespace-pre-wrap leading-7 text-neutral-300">
              {inquiry.message}
            </p>
          </div>
        </div>

        <InquiryStatusForm
          id={inquiry.id}
          status={inquiry.status}
        />
      </div>
    </div>
  );
}