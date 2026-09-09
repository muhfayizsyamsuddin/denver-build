import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { ProjectForm } from "@/app/components/admin/project-form";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditProjectPage({ params }: Props) {
  const { id } = await params;

  const project = await prisma.project.findUnique({
    where: {
      id,
    },
    include: {
      images: {
        orderBy: {
          displayOrder: "asc",
        },
      },
    },
  });

  if (!project) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Edit Project</h1>

        <p className="mt-2 text-sm text-neutral-400">
          Update project information and gallery.
        </p>
      </div>

      <ProjectForm project={project} />
    </div>
  );
}