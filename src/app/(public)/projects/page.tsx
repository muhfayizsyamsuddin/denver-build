import Link from "next/link";
import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore selected residential, commercial, renovation, and interior projects by Denver Build.",
};

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    where: {
      isPublished: true,
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
            Projects
          </p>

          <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
            Selected work from Denver Build.
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-neutral-400">
            Explore residential, commercial, renovation, and interior projects
            completed by our team.
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-7xl px-6 py-20">
          {projects.length === 0 ? (
            <div className="rounded-xl border border-white/10 bg-neutral-900 px-6 py-16 text-center">
              <p className="text-neutral-400">
                Projects will be available soon.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <Link
                  key={project.id}
                  href={`/projects/${project.slug}`}
                  className="group overflow-hidden rounded-xl border border-white/10 bg-neutral-900 transition hover:border-amber-500/30"
                >
                  {project.thumbnailUrl && (
                    <div className="relative aspect-16/10 overflow-hidden">
                      <img
                        src={project.thumbnailUrl}
                        alt={project.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                      />
                    </div>
                  )}

                  <div className="p-6">
                    <p className="text-xs font-medium uppercase tracking-wide text-amber-500">
                      {project.category}
                    </p>

                    <h2 className="mt-3 text-xl font-semibold transition group-hover:text-amber-400">
                      {project.title}
                    </h2>

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
      <div className="mt-16 rounded-2xl border border-amber-500/20 bg-amber-500/5 px-6 py-12 text-center sm:px-10">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-amber-500">
          Planning a Project?
        </p>

        <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-semibold tracking-tight">
          Let&apos;s discuss what you want to build.
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-neutral-400">
          Tell us about your project requirements and we&apos;ll help you discuss
          the next steps.
        </p>

        <Link
          href="/contact"
          className="mt-7 inline-flex rounded-lg bg-amber-500 px-5 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-amber-400"
        >
          Request a Consultation
        </Link>
      </div>
    </main>
  );
}