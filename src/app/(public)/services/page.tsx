import Link from "next/link";
import { Building2, Hammer, Paintbrush } from "lucide-react";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore Denver Build construction, renovation, interior, and building services.",
};

const serviceIcons = {
  building: Building2,
  hammer: Hammer,
  paintbrush: Paintbrush,
};

export default async function ServicesPage() {
  const services = await prisma.service.findMany({
    where: {
      isActive: true,
    },
    orderBy: {
      displayOrder: "asc",
    },
  });

  return (
    <main className="bg-neutral-950 text-white">
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-amber-500">
            Services
          </p>

          <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
            Construction services designed for real-world needs.
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-neutral-400">
            Explore the services Denver Build provides for residential,
            commercial, renovation, interior, and building projects.
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-7xl px-6 py-20">
          {services.length === 0 ? (
            <div className="rounded-xl border border-white/10 bg-neutral-900 px-6 py-16 text-center">
              <p className="text-neutral-400">
                Services will be available soon.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service, index) => {
                const Icon =
                  service.icon &&
                  serviceIcons[service.icon as keyof typeof serviceIcons];

                return (
                  <article
                    key={service.id}
                    className="group overflow-hidden rounded-xl border border-white/10 bg-neutral-900 transition hover:border-amber-500/30"
                  >
                    {service.imageUrl && (
                      <img
                        src={service.imageUrl}
                        alt={service.name}
                        className="aspect-[16/10] w-full object-cover"
                      />
                    )}

                    <div className="p-6">
                      <div className="flex items-start justify-between">
                        <span className="text-sm font-medium text-amber-500">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        {Icon && (
                          <Icon className="h-5 w-5 text-neutral-500" />
                        )}
                      </div>

                      <h2 className="mt-8 text-xl font-semibold transition group-hover:text-amber-400">
                        {service.name}
                      </h2>

                      <p className="mt-4 text-sm leading-7 text-neutral-400">
                        {service.description}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          <div className="mt-16 rounded-2xl border border-amber-500/20 bg-amber-500/5 px-6 py-12 text-center">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-amber-500">
              Need Something Specific?
            </p>

            <h2 className="mt-4 text-3xl font-semibold">
              Discuss your project with our team.
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-neutral-400">
              Tell us about your project requirements and we can discuss the
              most suitable approach.
            </p>

            <Link
              href="/contact"
              className="mt-7 inline-flex rounded-lg bg-amber-500 px-5 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-amber-400"
            >
              Start a Consultation
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}