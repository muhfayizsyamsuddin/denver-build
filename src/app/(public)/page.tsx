import Link from "next/link";
import { BadgeCheck, Building2, Hammer, Paintbrush, ShieldCheck, BriefcaseBusiness, Handshake } from "lucide-react";
import { prisma } from "@/lib/prisma";
import Image from "next/image";

const serviceIcons = {
  building: Building2,
  hammer: Hammer,
  paintbrush: Paintbrush,
};

const values = [
  {
    title: "Reliable",
    description: "Clear communication and dependable project execution.",
    icon: ShieldCheck,
  },
  {
    title: "Quality",
    description: "Focused on durable work and practical construction standards.",
    icon: BadgeCheck,
  },
  {
    title: "Professional",
    description: "Structured project management from planning to completion.",
    icon: BriefcaseBusiness,
  },
  {
    title: "Client Focused",
    description: "Solutions tailored to each project's needs and priorities.",
    icon: Handshake,
  },
];

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
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-28 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-36">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-amber-500">
              {company?.companyName ?? "Denver Build"}
            </p>

            <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
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

          {featuredProjects[0]?.thumbnailUrl && (
            <Link
              href={`/projects/${featuredProjects[0].slug}`}
              className="group block overflow-hidden rounded-2xl border border-white/10 bg-neutral-900"
            >
              <div className="relative">
                <div className="relative aspect-4/3 overflow-hidden">
                  <Image
                    src={featuredProjects[0].thumbnailUrl}
                    alt={featuredProjects[0].title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>

                <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/90 via-black/40 to-transparent p-6 pt-16">
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-amber-400">
                    Featured Project
                  </p>

                  <h2 className="mt-2 text-xl font-semibold text-white">
                    {featuredProjects[0].title}
                  </h2>

                  <p className="mt-2 text-sm text-neutral-300">
                    {featuredProjects[0].location} ·{" "}
                    {featuredProjects[0].completionYear}
                  </p>
                </div>
              </div>
            </Link>
          )}
        </div>
      </section>

      {/* Company Introduction */}
      <section className="border-b border-white/10">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-amber-500">
              About Us
            </p>

            <h2 className="mt-4 max-w-lg text-3xl font-semibold tracking-tight sm:text-4xl">
              Built around quality, reliability, and practical results.
            </h2>
          </div>

          <div className="lg:border-l lg:border-white/10 lg:pl-10">
            <p className="max-w-2xl text-base leading-8 text-neutral-400">
              {company?.history ??
                "Denver Build provides dependable construction and renovation services with a focus on quality workmanship, clear communication, and practical project execution."}
            </p>

            <Link
              href="/about"
              className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-amber-400 transition hover:text-amber-300"
            >
              Discover our company
              <span aria-hidden="true">→</span>
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
              {services.map((service) => {
                const Icon =
                  service.icon &&
                  serviceIcons[service.icon as keyof typeof serviceIcons];

                return (
                  <article
                    key={service.id}
                    className="group overflow-hidden rounded-xl border border-white/10 bg-neutral-900 transition hover:border-amber-500/30"
                  >
                    {service.imageUrl && (
                      <div className="relative aspect-16/10 overflow-hidden">
                        <Image
                          src={service.imageUrl}
                          alt={service.name}
                          fill
                          className="object-cover transition duration-500 group-hover:scale-[1.03]"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>
                    )}

                    <div className="p-6">
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="text-lg font-semibold transition group-hover:text-amber-400">
                          {service.name}
                        </h3>

                        {Icon && (
                          <Icon className="h-5 w-5 shrink-0 text-neutral-500 transition group-hover:text-amber-400" />
                        )}
                      </div>

                      <p className="mt-3 line-clamp-3 text-sm leading-6 text-neutral-400">
                        {service.description}
                      </p>
                    </div>
                  </article>
                );
              })}
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
            {values.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="group rounded-xl border border-white/10 bg-neutral-900 p-6 transition hover:border-amber-500/30"
                >
                  <div className="flex items-center justify-between">
                    <Icon className="h-5 w-5 text-neutral-500 transition group-hover:text-amber-400" />

                    <span className="text-xs font-medium text-neutral-600">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="mt-6 font-semibold transition group-hover:text-amber-400">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-neutral-400">
                    {item.description}
                  </p>
                </div>
              );
            })}
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
                  className="group overflow-hidden rounded-xl border border-white/10 bg-neutral-900 transition hover:border-amber-500/30"
                >
                  {project.thumbnailUrl && (
                    <div className="relative aspect-16/10 overflow-hidden">
                      <Image
                        src={project.thumbnailUrl}
                        alt={project.title}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-[1.03]"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                  )}

                  <div className="p-6">
                    <p className="text-xs font-medium uppercase tracking-wide text-amber-500">
                      {project.category}
                    </p>

                    <h3 className="mt-3 text-xl font-semibold transition group-hover:text-amber-400">
                      {project.title}
                    </h3>

                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-neutral-400">
                      {project.shortDescription}
                    </p>

                    <div className="mt-5 flex items-center justify-between gap-4">
                      <p className="text-xs text-neutral-500">
                        {project.location} · {project.completionYear}
                      </p>

                      <span className="text-sm text-neutral-500 transition group-hover:text-amber-400">
                        View →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-amber-500">
                Testimonials
              </p>

              <h2 className="mt-4 text-3xl font-semibold tracking-tight">
                What our clients say.
              </h2>
            </div>

            <Link
              href="/testimonials"
              className="hidden text-sm text-neutral-400 transition hover:text-white sm:block"
            >
              View all testimonials →
            </Link>
          </div>

          {testimonials.length === 0 ? (
            <p className="mt-10 text-sm text-neutral-500">
              Testimonials will be available soon.
            </p>
          ) : (
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((testimonial) => (
                <article
                  key={testimonial.id}
                  className="group rounded-xl border border-white/10 bg-neutral-900 p-6 transition hover:border-amber-500/30"
                >
                  {testimonial.rating && (
                    <p className="text-sm text-amber-400">
                      {"★".repeat(testimonial.rating)}
                    </p>
                  )}

                  <blockquote className="mt-4 text-sm leading-7 text-neutral-300">
                    “{testimonial.content}”
                  </blockquote>

                  <div className="mt-6 border-t border-white/10 pt-5">
                    <div className="flex items-center gap-4">
                      {testimonial.clientPhotoUrl && (
                        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full">
                          <Image
                            src={testimonial.clientPhotoUrl}
                            alt={testimonial.clientName}
                            fill
                            className="object-cover"
                            sizes="48px"
                          />
                        </div>
                      )}

                      <div>
                        <p className="font-medium transition group-hover:text-amber-400">
                          {testimonial.clientName}
                        </p>

                        {(testimonial.clientRole || testimonial.clientCompany) && (
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

      {/* CTA */}
      <section>
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 px-6 py-14 text-center sm:px-10">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-amber-500">
              Start Your Project
            </p>

            <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
              Ready to discuss your construction project?
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-neutral-400">
              Tell us about your project requirements, location, and expected scope.
              Our team will review your inquiry and help you discuss the next steps.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/contact"
                className="inline-flex rounded-lg bg-amber-500 px-5 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-amber-400"
              >
                Request a Consultation
              </Link>

              <Link
                href="/projects"
                className="inline-flex rounded-lg border border-white/10 px-5 py-3 text-sm font-medium text-neutral-200 transition hover:bg-white/5"
              >
                View Our Projects
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}