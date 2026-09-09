import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { TestimonialForm } from "@/app/components/admin/testimonial-form";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditTestimonialPage({ params }: Props) {
  const { id } = await params;

  const testimonial = await prisma.testimonial.findUnique({
    where: {
      id,
    },
  });

  if (!testimonial) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">
          Edit Testimonial
        </h1>

        <p className="mt-2 text-sm text-neutral-400">
          Update client testimonial information.
        </p>
      </div>

      <TestimonialForm testimonial={testimonial} />
    </div>
  );
}