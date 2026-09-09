import { ProjectForm } from "@/app/components/admin/project-form";

export default function NewProjectPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Add Project</h1>

        <p className="mt-2 text-sm text-neutral-400">
          Add a new project to the company portfolio.
        </p>
      </div>

      <ProjectForm />
    </div>
  );
}