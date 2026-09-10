import Link from "next/link";
import {
  Plus,
  Pencil,
  FolderKanban,
  Star,
} from "lucide-react";

import { prisma } from "@/lib/prisma";
import { DeleteProjectButton } from "@/app/components/admin/delete-project-button";

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">
            Projects
          </h1>

          <p className="mt-2 text-sm text-neutral-400">
            Manage construction projects displayed on the public website.
          </p>
        </div>

        <Link
          href="/admin/projects/new"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-semibold text-neutral-950 transition hover:bg-amber-400"
        >
          <Plus className="h-4 w-4" />
          Add Project
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border border-white/10 bg-neutral-900">
        {projects.length === 0 ? (
          <div className="px-6 py-14 text-center">
            <FolderKanban className="mx-auto h-8 w-8 text-neutral-700" />

            <p className="mt-4 text-sm font-medium text-neutral-300">
              No projects yet
            </p>

            <p className="mt-1 text-sm text-neutral-500">
              Add your first construction project to showcase it on the
              website.
            </p>

            <Link
              href="/admin/projects/new"
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-semibold text-neutral-950 transition hover:bg-amber-400"
            >
              <Plus className="h-4 w-4" />
              Add Project
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-white/10 bg-white/2 text-neutral-500">
                <tr>
                  <th className="px-5 py-3 font-medium">Project</th>
                  <th className="px-5 py-3 font-medium">Category</th>
                  <th className="px-5 py-3 font-medium">Location</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium">Featured</th>
                  <th className="px-5 py-3 font-medium">Actions</th>
                </tr>
              </thead>

              <tbody>
                {projects.map((project) => (
                  <tr
                    key={project.id}
                    className="border-b border-white/5 transition hover:bg-white/2 last:border-0"
                  >
                    <td className="px-5 py-4">
                      <Link
                        href={`/admin/projects/${project.id}/edit`}
                        className="font-medium text-neutral-200 transition hover:text-amber-400"
                      >
                        {project.title}
                      </Link>

                      <p className="mt-1 text-xs text-neutral-500">
                        {project.slug}
                      </p>
                    </td>

                    <td className="px-5 py-4 text-neutral-400">
                      {project.category}
                    </td>

                    <td className="px-5 py-4 text-neutral-400">
                      {project.location}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs ${
                          project.isPublished
                            ? "bg-emerald-500/10 text-emerald-400"
                            : "bg-neutral-700 text-neutral-400"
                        }`}
                      >
                        {project.isPublished ? "Published" : "Draft"}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      {project.isFeatured ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-2.5 py-1 text-xs text-amber-400">
                          <Star className="h-3 w-3" />
                          Featured
                        </span>
                      ) : (
                        <span className="text-neutral-500">—</span>
                      )}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <Link
                          href={`/admin/projects/${project.id}/edit`}
                          className="inline-flex items-center gap-1.5 text-sm text-amber-400 transition hover:text-amber-300"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                          Edit
                        </Link>

                        <DeleteProjectButton
                          id={project.id}
                          name={project.title}
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