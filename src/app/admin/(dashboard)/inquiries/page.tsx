import Link from "next/link";

import { prisma } from "@/lib/prisma";

type Props = {
  searchParams: Promise<{
    status?: string;
  }>;
};

export default async function InquiriesPage({ searchParams }: Props) {
  const { status } = await searchParams;

  const validStatuses = ["NEW", "CONTACTED", "CLOSED"];

  const inquiries = await prisma.inquiry.findMany({
    where:
      status && validStatuses.includes(status)
        ? {
            status: status as "NEW" | "CONTACTED" | "CLOSED",
          }
        : undefined,
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">
          Inquiries
        </h1>

        <p className="mt-2 text-sm text-neutral-400">
          Manage customer inquiries submitted through the public website.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {[
          { label: "All", value: "" },
          { label: "New", value: "NEW" },
          { label: "Contacted", value: "CONTACTED" },
          { label: "Closed", value: "CLOSED" },
        ].map((item) => {
          const active =
            (!status && item.value === "") || status === item.value;

          const href = item.value
            ? `/admin/inquiries?status=${item.value}`
            : "/admin/inquiries";

          return (
            <Link
              key={item.label}
              href={href}
              className={`rounded-lg px-4 py-2 text-sm transition ${
                active
                  ? "bg-amber-500 font-medium text-neutral-950"
                  : "border border-white/10 text-neutral-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>

      <div className="overflow-hidden rounded-xl border border-white/10 bg-neutral-900">
        {inquiries.length === 0 ? (
          <div className="px-6 py-12 text-center text-sm text-neutral-500">
            No inquiries found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-white/10 text-neutral-500">
                <tr>
                  <th className="px-5 py-3 font-medium">Name</th>
                  <th className="px-5 py-3 font-medium">Subject</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium">Date</th>
                  <th className="px-5 py-3 font-medium">Action</th>
                </tr>
              </thead>

              <tbody>
                {inquiries.map((inquiry) => (
                  <tr
                    key={inquiry.id}
                    className="border-b border-white/5 last:border-0"
                  >
                    <td className="px-5 py-4">
                      <p className="font-medium text-neutral-200">
                        {inquiry.name}
                      </p>

                      <p className="mt-1 text-xs text-neutral-500">
                        {inquiry.email}
                      </p>
                    </td>

                    <td className="px-5 py-4 text-neutral-400">
                      {inquiry.subject}
                    </td>

                    <td className="px-5 py-4">
                      <span className="rounded-full bg-white/5 px-2.5 py-1 text-xs text-neutral-300">
                        {inquiry.status}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-neutral-500">
                      {inquiry.createdAt.toLocaleDateString("en-GB")}
                    </td>

                    <td className="px-5 py-4">
                      <Link
                        href={`/admin/inquiries/${inquiry.id}`}
                        className="text-amber-400 hover:text-amber-300"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}