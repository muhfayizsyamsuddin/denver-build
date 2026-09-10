import Link from "next/link";
import { Plus, Pencil, Wrench } from "lucide-react";

import { prisma } from "@/lib/prisma";
import { DeleteServiceButton } from "@/app/components/admin/delete-service-button";

export default async function ServicesPage() {
  const services = await prisma.service.findMany({
    orderBy: [
      {
        displayOrder: "asc",
      },
      {
        createdAt: "desc",
      },
    ],
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">
            Services
          </h1>

          <p className="mt-2 text-sm text-neutral-400">
            Manage services displayed on the public website.
          </p>
        </div>

        <Link
          href="/admin/services/new"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-semibold text-neutral-950 transition hover:bg-amber-400"
        >
          <Plus className="h-4 w-4" />
          Add Service
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border border-white/10 bg-neutral-900">
        {services.length === 0 ? (
          <div className="px-6 py-14 text-center">
            <Wrench className="mx-auto h-8 w-8 text-neutral-700" />

            <p className="mt-4 text-sm font-medium text-neutral-300">
              No services yet
            </p>

            <p className="mt-1 text-sm text-neutral-500">
              Add your first service to display it on the public website.
            </p>

            <Link
              href="/admin/services/new"
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-semibold text-neutral-950 transition hover:bg-amber-400"
            >
              <Plus className="h-4 w-4" />
              Add Service
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-white/10 bg-white/2 text-neutral-500">
                <tr>
                  <th className="px-5 py-3 font-medium">Name</th>
                  <th className="px-5 py-3 font-medium">Slug</th>
                  <th className="px-5 py-3 font-medium">Order</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium">Actions</th>
                </tr>
              </thead>

              <tbody>
                {services.map((service) => (
                  <tr
                    key={service.id}
                    className="border-b border-white/5 transition hover:bg-white/2 last:border-0"
                  >
                    <td className="px-5 py-4">
                      <Link
                        href={`/admin/services/${service.id}/edit`}
                        className="font-medium text-neutral-200 transition hover:text-amber-400"
                      >
                        {service.name}
                      </Link>
                    </td>

                    <td className="px-5 py-4 text-neutral-400">
                      {service.slug}
                    </td>

                    <td className="px-5 py-4 text-neutral-400">
                      {service.displayOrder}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs ${
                          service.isActive
                            ? "bg-emerald-500/10 text-emerald-400"
                            : "bg-neutral-700 text-neutral-400"
                        }`}
                      >
                        {service.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <Link
                          href={`/admin/services/${service.id}/edit`}
                          className="inline-flex items-center gap-1.5 text-sm text-amber-400 transition hover:text-amber-300"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                          Edit
                        </Link>

                        <DeleteServiceButton
                          id={service.id}
                          name={service.name}
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