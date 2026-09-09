import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { ServiceForm } from "@/app/components/admin/service-form";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditServicePage({ params }: Props) {
  const { id } = await params;

  const service = await prisma.service.findUnique({
    where: {
      id,
    },
  });

  if (!service) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">
          Edit Service
        </h1>

        <p className="mt-2 text-sm text-neutral-400">
          Update service information.
        </p>
      </div>

      <ServiceForm service={service} />
    </div>
  );
}