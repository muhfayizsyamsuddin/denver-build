import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Testimonials",
  description:
    "Read feedback from clients who have worked with Denver Build.",
};

export default async function TestimonialsPage() {
  const testimonials = await prisma.testimonial.findMany({
    where: {
      isActive: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="bg-neutral-950 text-white">
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-amber-500">
            Testimonials
          </p>

          <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
            What our clients say about working with us.
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-neutral-400">
            Feedback from clients who have trusted Denver Build with their
            construction and renovation projects.
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-7xl px-6 py-20">
          {testimonials.length === 0 ? (
            <div className="rounded-xl border border-white/10 bg-neutral-900 px-6 py-16 text-center">
              <p className="text-neutral-400">
                Testimonials will be available soon.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((testimonial) => (
                <article
                  key={testimonial.id}
                  className="flex flex-col rounded-xl border border-white/10 bg-neutral-900 p-6"
                >
                  {testimonial.rating && (
                    <p className="text-sm text-amber-400">
                      {"★".repeat(testimonial.rating)}
                    </p>
                  )}

                  <blockquote className="mt-5 flex-1 text-sm leading-7 text-neutral-300">
                    “{testimonial.content}”
                  </blockquote>

                  <div className="mt-8 border-t border-white/10 pt-5">
                    <div className="flex items-center gap-4">
                      {testimonial.clientPhotoUrl && (
                        <img
                          src={testimonial.clientPhotoUrl}
                          alt={testimonial.clientName}
                          className="h-12 w-12 rounded-full object-cover"
                        />
                      )}

                      <div>
                        <p className="font-medium text-white">
                          {testimonial.clientName}
                        </p>

                        {(testimonial.clientRole ||
                          testimonial.clientCompany) && (
                          <p className="mt-1 text-xs text-neutral-500">
                            {[
                              testimonial.clientRole,
                              testimonial.clientCompany,
                            ]
                              .filter(Boolean)
                              .join(" · ")}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}