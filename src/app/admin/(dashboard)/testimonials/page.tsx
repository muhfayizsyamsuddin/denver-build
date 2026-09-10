import Link from "next/link";
import {
  Plus,
  Pencil,
  MessageSquareQuote,
  Star,
} from "lucide-react";

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
          <div className="px-6 py-14 text-center">
            <MessageSquareQuote className="mx-auto h-8 w-8 text-neutral-700" />

            <p className="mt-4 text-sm font-medium text-neutral-300">
              No testimonials yet
            </p>

            <p className="mt-1 text-sm text-neutral-500">
              Add your first client testimonial to display it on the public
              website.
            </p>

            <Link
              href="/admin/testimonials/new"
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-semibold text-neutral-950 transition hover:bg-amber-400"
            >
              <Plus className="h-4 w-4" />
              Add Testimonial
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-white/10 bg-white/2 text-neutral-500">
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
                    className="border-b border-white/5 transition hover:bg-white/2 last:border-0"
                  >
                    <td className="px-5 py-4">
                      <Link
                        href={`/admin/testimonials/${testimonial.id}/edit`}
                        className="font-medium text-neutral-200 transition hover:text-amber-400"
                      >
                        {testimonial.clientName}
                      </Link>

                      {testimonial.clientRole && (
                        <p className="mt-1 text-xs text-neutral-500">
                          {testimonial.clientRole}
                        </p>
                      )}
                    </td>

                    <td className="px-5 py-4 text-neutral-400">
                      {testimonial.clientCompany ?? "—"}
                    </td>

                    <td className="px-5 py-4">
                      {testimonial.rating ? (
                        <div className="flex items-center gap-1">
                          {Array.from({ length: testimonial.rating }).map(
                            (_, index) => (
                              <Star
                                key={index}
                                className="h-3.5 w-3.5 fill-amber-400 text-amber-400"
                              />
                            ),
                          )}

                          <span className="ml-1 text-xs text-neutral-500">
                            {testimonial.rating}/5
                          </span>
                        </div>
                      ) : (
                        <span className="text-neutral-500">—</span>
                      )}
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
                      <div className="flex items-center gap-3">
                        <Link
                          href={`/admin/testimonials/${testimonial.id}/edit`}
                          className="inline-flex items-center gap-1.5 text-sm text-amber-400 transition hover:text-amber-300"
                        >
                          <Pencil className="h-3.5 w-3.5" />
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