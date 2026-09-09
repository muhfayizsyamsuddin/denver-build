import Link from "next/link";

import { prisma } from "@/lib/prisma";

export default async function HomePage() {
  const [
    company,
    services,
    featuredProjects,
    testimonials,
  ] = await Promise.all([
    prisma.companyProfile.findFirst(),

    prisma.service.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        displayOrder: "asc",
      },
      take: 6,
    }),

    prisma.project.findMany({
      where: {
        isPublished: true,
        isFeatured: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 3,
    }),

    prisma.testimonial.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 3,
    }),
  ]);

  return (
    <main className="bg-neutral-950 text-white">
      {/* Hero */}
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:py-32">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-amber-500">
            {company?.companyName ?? "Denver Build"}
          </p>

          <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-tight tracking-tight sm:text-6xl">
            Building better spaces, delivering lasting value.
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-neutral-400">
            {company?.description ??
              "Professional construction, renovation, interior, and building services for residential and commercial projects."}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/projects"
              className="rounded-lg bg-amber-500 px-5 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-amber-400"
            >
              View Projects
            </Link>

            <Link
              href="/contact"
              className="rounded-lg border border-white/10 px-5 py-3 text-sm font-medium text-neutral-200 transition hover:bg-white/5"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Company Introduction */}
      <section className="border-b border-white/10">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-amber-500">
              About Us
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight">
              Built around quality, reliability, and practical results.
            </h2>
          </div>

          <div>
            <p className="leading-7 text-neutral-400">
              {company?.description ??
                "Denver Build provides professional construction and renovation solutions with a focus on quality workmanship and dependable project delivery."}
            </p>

            <Link
              href="/about"
              className="mt-6 inline-block text-sm font-medium text-amber-400 hover:text-amber-300"
            >
              Learn more →
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-amber-500">
                Services
              </p>

              <h2 className="mt-4 text-3xl font-semibold tracking-tight">
                What we can build for you.
              </h2>
            </div>

            <Link
              href="/services"
              className="hidden text-sm text-neutral-400 transition hover:text-white sm:block"
            >
              View all services →
            </Link>
          </div>

          {services.length === 0 ? (
            <p className="mt-10 text-sm text-neutral-500">
              Services will be available soon.
            </p>
          ) : (
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <article
                  key={service.id}
                  className="rounded-xl border border-white/10 bg-neutral-900 p-6"
                >
                  <h3 className="text-lg font-semibold">
                    {service.name}
                  </h3>

                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-neutral-400">
                    {service.description}
                  </p>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-amber-500">
              Why Denver Build
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight">
              A straightforward approach to better construction.
            </h2>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Reliable",
                description:
                  "Clear communication and dependable project execution.",
              },
              {
                title: "Quality",
                description:
                  "Focused on durable work and practical construction standards.",
              },
              {
                title: "Professional",
                description:
                  "Structured project management from planning to completion.",
              },
              {
                title: "Client Focused",
                description:
                  "Solutions tailored to each project's needs and priorities.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-white/10 bg-neutral-900 p-6"
              >
                <h3 className="font-semibold">{item.title}</h3>

                <p className="mt-3 text-sm leading-6 text-neutral-400">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-amber-500">
                Portfolio
              </p>

              <h2 className="mt-4 text-3xl font-semibold tracking-tight">
                Featured Projects
              </h2>
            </div>

            <Link
              href="/projects"
              className="hidden text-sm text-neutral-400 transition hover:text-white sm:block"
            >
              View all projects →
            </Link>
          </div>

          {featuredProjects.length === 0 ? (
            <p className="mt-10 text-sm text-neutral-500">
              Featured projects will be available soon.
            </p>
          ) : (
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {featuredProjects.map((project) => (
                <Link
                  key={project.id}
                  href={`/projects/${project.slug}`}
                  className="group rounded-xl border border-white/10 bg-neutral-900 p-6 transition hover:border-white/20"
                >
                  <p className="text-xs uppercase tracking-wide text-amber-500">
                    {project.category}
                  </p>

                  <h3 className="mt-3 text-xl font-semibold group-hover:text-amber-400">
                    {project.title}
                  </h3>

                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-neutral-400">
                    {project.shortDescription}
                  </p>

                  <p className="mt-5 text-xs text-neutral-500">
                    {project.location} · {project.completionYear}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-amber-500">
            Testimonials
          </p>

          <h2 className="mt-4 text-3xl font-semibold tracking-tight">
            What our clients say.
          </h2>

          {testimonials.length === 0 ? (
            <p className="mt-10 text-sm text-neutral-500">
              Testimonials will be available soon.
            </p>
          ) : (
            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {testimonials.map((testimonial) => (
                <article
                  key={testimonial.id}
                  className="rounded-xl border border-white/10 bg-neutral-900 p-6"
                >
                  {testimonial.rating && (
                    <p className="text-sm text-amber-400">
                      {"★".repeat(testimonial.rating)}
                    </p>
                  )}

                  <blockquote className="mt-4 text-sm leading-7 text-neutral-300">
                    “{testimonial.content}”
                  </blockquote>

                  <div className="mt-6">
                    <p className="font-medium">
                      {testimonial.clientName}
                    </p>

                    <p className="mt-1 text-xs text-neutral-500">
                      {[testimonial.clientRole, testimonial.clientCompany]
                        .filter(Boolean)
                        .join(" · ")}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 px-6 py-12 text-center sm:px-10">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-amber-500">
              Start Your Project
            </p>

            <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-semibold tracking-tight">
              Have a project in mind?
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-neutral-400">
              Tell us what you are planning and we will help you discuss the
              next steps.
            </p>

            <div className="mt-7">
              <Link
                href="/contact"
                className="inline-flex rounded-lg bg-amber-500 px-5 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-amber-400"
              >
                Start a Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}