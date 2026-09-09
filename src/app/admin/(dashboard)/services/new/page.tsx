import { ServiceForm } from "@/app/components/admin/service-form";

export default function NewServicePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">
          Add Service
        </h1>

        <p className="mt-2 text-sm text-neutral-400">
          Create a new service for the public website.
        </p>
      </div>

      <ServiceForm />
    </div>
  );
}