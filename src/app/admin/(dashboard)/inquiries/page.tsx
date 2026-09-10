import Link from "next/link";
import { Eye, Inbox } from "lucide-react";

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

  function getStatusClass(status: "NEW" | "CONTACTED" | "CLOSED") {
    switch (status) {
      case "NEW":
        return "bg-amber-500/10 text-amber-400";

      case "CONTACTED":
        return "bg-blue-500/10 text-blue-400";

      case "CLOSED":
        return "bg-emerald-500/10 text-emerald-400";
    }
  }

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

      {/* Filters */}
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
              className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                active
                  ? "bg-amber-500 text-neutral-950"
                  : "border border-white/10 bg-neutral-900 text-neutral-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-white/10 bg-neutral-900">
        {inquiries.length === 0 ? (
          <div className="px-6 py-14 text-center">
            <Inbox className="mx-auto h-8 w-8 text-neutral-700" />

            <p className="mt-4 text-sm font-medium text-neutral-300">
              No inquiries found
            </p>

            <p className="mt-1 text-sm text-neutral-500">
              Customer inquiries submitted through the website will appear
              here.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-white/10 bg-white/2 text-neutral-500">
                <tr>
                  <th className="px-5 py-3 font-medium">
                    Customer
                  </th>

                  <th className="px-5 py-3 font-medium">
                    Subject
                  </th>

                  <th className="px-5 py-3 font-medium">
                    Status
                  </th>

                  <th className="px-5 py-3 font-medium">
                    Date
                  </th>

                  <th className="px-5 py-3 font-medium">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {inquiries.map((inquiry) => (
                  <tr
                    key={inquiry.id}
                    className="border-b border-white/5 transition hover:bg-white/2 last:border-0"
                  >
                    <td className="px-5 py-4">
                      <Link
                        href={`/admin/inquiries/${inquiry.id}`}
                        className="font-medium text-neutral-200 transition hover:text-amber-400"
                      >
                        {inquiry.name}
                      </Link>

                      <p className="mt-1 text-xs text-neutral-500">
                        {inquiry.email}
                      </p>
                    </td>

                    <td className="px-5 py-4 text-neutral-400">
                      {inquiry.subject}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-medium ${getStatusClass(
                          inquiry.status,
                        )}`}
                      >
                        {inquiry.status}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-neutral-500">
                      {inquiry.createdAt.toLocaleDateString("en-GB")}
                    </td>

                    <td className="px-5 py-4">
                      <Link
                        href={`/admin/inquiries/${inquiry.id}`}
                        className="inline-flex items-center gap-1.5 text-sm text-amber-400 transition hover:text-amber-300"
                      >
                        <Eye className="h-3.5 w-3.5" />
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