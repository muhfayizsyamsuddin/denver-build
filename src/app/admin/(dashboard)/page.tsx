import {
  FolderKanban,
  Wrench,
  MessageSquareQuote,
  Mail,
} from "lucide-react";

import { prisma } from "@/lib/prisma";

export default async function AdminDashboardPage() {
  const [
    totalProjects,
    totalServices,
    totalTestimonials,
    totalInquiries,
    newInquiries,
    recentInquiries,
  ] = await Promise.all([
    prisma.project.count(),
    prisma.service.count(),
    prisma.testimonial.count(),
    prisma.inquiry.count(),
    prisma.inquiry.count({
      where: {
        status: "NEW",
      },
    }),
    prisma.inquiry.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
    }),
  ]);

  const stats = [
    {
      label: "Projects",
      value: totalProjects,
      icon: FolderKanban,
    },
    {
      label: "Services",
      value: totalServices,
      icon: Wrench,
    },
    {
      label: "Testimonials",
      value: totalTestimonials,
      icon: MessageSquareQuote,
    },
    {
      label: "Inquiries",
      value: totalInquiries,
      icon: Mail,
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">
          Dashboard
        </h1>

        <p className="mt-2 text-sm text-neutral-400">
          Overview of your website content and customer inquiries.
        </p>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="rounded-xl border border-white/10 bg-neutral-900 p-5"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-neutral-400">
                  Total {stat.label}
                </p>

                <div className="rounded-lg bg-white/5 p-2 text-neutral-400">
                  <Icon className="h-5 w-5" />
                </div>
              </div>

              <p className="mt-4 text-3xl font-semibold">
                {stat.value}
              </p>
            </div>
          );
        })}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_280px]">
        <div className="overflow-hidden rounded-xl border border-white/10 bg-neutral-900">
          <div className="border-b border-white/10 px-5 py-4">
            <h2 className="font-semibold">Recent Inquiries</h2>
            <p className="mt-1 text-sm text-neutral-500">
              Latest messages submitted through the contact form.
            </p>
          </div>

          {recentInquiries.length === 0 ? (
            <div className="px-5 py-10 text-center text-sm text-neutral-500">
              No inquiries yet.
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
                  </tr>
                </thead>

                <tbody>
                  {recentInquiries.map((inquiry) => (
                    <tr
                      key={inquiry.id}
                      className="border-b border-white/5 last:border-0"
                    >
                      <td className="px-5 py-4 text-neutral-200">
                        {inquiry.name}
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
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="rounded-xl border border-white/10 bg-neutral-900 p-5">
          <p className="text-sm text-neutral-400">
            New Inquiries
          </p>

          <p className="mt-4 text-4xl font-semibold text-amber-500">
            {newInquiries}
          </p>

          <p className="mt-3 text-sm leading-6 text-neutral-500">
            Customer inquiries that have not been contacted yet.
          </p>
        </div>
      </section>
    </div>
  );
}