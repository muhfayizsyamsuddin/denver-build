import Link from "next/link";
import { Plus } from "lucide-react";

import { prisma } from "@/lib/prisma";
import { DeleteTestimonialButton } from "@/app/components/admin/delete-testimonial-button";

export default async function TestimonialsPage() {
  const testimonials = await prisma.testimonial.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">
            Testimonials
          </h1>

          <p className="mt-2 text-sm text-neutral-400">
            Manage client testimonials displayed on the public website.
          </p>
        </div>

        <Link
          href="/admin/testimonials/new"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-semibold text-neutral-950 transition hover:bg-amber-400"
        >
          <Plus className="h-4 w-4" />
          Add Testimonial
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border border-white/10 bg-neutral-900">
        {testimonials.length === 0 ? (
          <div className="px-6 py-12 text-center text-sm text-neutral-500">
            No testimonials yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-white/10 text-neutral-500">
                <tr>
                  <th className="px-5 py-3 font-medium">Client</th>
                  <th className="px-5 py-3 font-medium">Company</th>
                  <th className="px-5 py-3 font-medium">Rating</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium">Actions</th>
                </tr>
              </thead>

              <tbody>
                {testimonials.map((testimonial) => (
                  <tr
                    key={testimonial.id}
                    className="border-b border-white/5 last:border-0"
                  >
                    <td className="px-5 py-4">
                      <p className="font-medium text-neutral-200">
                        {testimonial.clientName}
                      </p>

                      {testimonial.clientRole && (
                        <p className="mt-1 text-xs text-neutral-500">
                          {testimonial.clientRole}
                        </p>
                      )}
                    </td>

                    <td className="px-5 py-4 text-neutral-400">
                      {testimonial.clientCompany ?? "-"}
                    </td>

                    <td className="px-5 py-4 text-neutral-400">
                      {testimonial.rating ?? "-"}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs ${
                          testimonial.isActive
                            ? "bg-emerald-500/10 text-emerald-400"
                            : "bg-neutral-700 text-neutral-400"
                        }`}
                      >
                        {testimonial.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex gap-3">
                        <Link
                          href={`/admin/testimonials/${testimonial.id}/edit`}
                          className="text-amber-400 hover:text-amber-300"
                        >
                          Edit
                        </Link>

                        <DeleteTestimonialButton
                          id={testimonial.id}
                          name={testimonial.clientName}
                        />
                      </div>
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