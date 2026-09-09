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
                  <div className="aspect-4/3 bg-neutral-800">
                    {project.thumbnailUrl ? (
                      <img
                        src={project.thumbnailUrl}
                        alt={project.title}
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-sm text-neutral-600">
                        No image
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <p className="text-xs uppercase tracking-wide text-amber-500">
                      {project.category}
                    </p>

                    <h2 className="mt-3 text-xl font-semibold transition group-hover:text-amber-400">
                      {project.title}
                    </h2>

                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-neutral-400">
                      {project.shortDescription}
                    </p>

                    <p className="mt-5 text-xs text-neutral-500">
                      {project.location} · {project.completionYear}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}