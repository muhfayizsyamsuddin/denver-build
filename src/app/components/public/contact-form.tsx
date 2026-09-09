"use client";

import { FormEvent, useState } from "react";
import { toast } from "sonner";

export function ContactForm() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    setLoading(true);

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          subject: formData.get("subject"),
          message: formData.get("message"),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.message ?? "Failed to send inquiry.");
        return;
      }

      toast.success("Your inquiry has been sent successfully.");
      form.reset();
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "mt-2 w-full rounded-lg border border-white/10 bg-neutral-900 px-4 py-3 text-sm text-white outline-none transition placeholder:text-neutral-600 focus:border-amber-500";

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-xl border border-white/10 bg-neutral-900 p-6"
    >
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="text-sm text-neutral-300">Name</label>
          <input
            name="name"
            required
            className={inputClass}
            placeholder="Your name"
          />
        </div>

        <div>
          <label className="text-sm text-neutral-300">Email</label>
          <input
            type="email"
            name="email"
            required
            className={inputClass}
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div>
        <label className="text-sm text-neutral-300">Phone</label>
        <input
          name="phone"
          className={inputClass}
          placeholder="Optional"
        />
      </div>

      <div>
        <label className="text-sm text-neutral-300">Subject</label>
        <input
          name="subject"
          required
          className={inputClass}
          placeholder="Project consultation"
        />
      </div>

      <div>
        <label className="text-sm text-neutral-300">Message</label>
        <textarea
          name="message"
          required
          rows={6}
          className={inputClass}
          placeholder="Tell us about your project..."
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-amber-500 px-5 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-amber-400 disabled:opacity-60"
        >
          {loading ? "Sending..." : "Send Inquiry"}
        </button>
      </div>
    </form>
  );
}