import { TestimonialForm } from "@/app/components/admin/testimonial-form";

export default function NewTestimonialPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">
          Add Testimonial
        </h1>

        <p className="mt-2 text-sm text-neutral-400">
          Add a client testimonial to the website.
        </p>
      </div>

      <TestimonialForm />
    </div>
  );
}