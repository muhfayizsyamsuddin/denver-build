"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type Props = {
  id: string;
  status: "NEW" | "CONTACTED" | "CLOSED";
};

export function InquiryStatusForm({ id, status }: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(status);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);

    try {
      const response = await fetch(`/api/admin/inquiries/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: currentStatus,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.message ?? "Failed to update inquiry.");
        return;
      }

      toast.success("Inquiry status updated successfully.");
      router.refresh();
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-white/10 bg-neutral-900 p-6"
    >
      <h2 className="font-semibold text-white">
        Inquiry Status
      </h2>

      <p className="mt-2 text-sm leading-6 text-neutral-500">
        Update the progress of this customer inquiry.
      </p>

      <div className="mt-6">
        <label className="text-sm text-neutral-300">
          Status
        </label>

        <select
          name="status"
          value={currentStatus}
          onChange={(event) =>
            setCurrentStatus(
              event.target.value as "NEW" | "CONTACTED" | "CLOSED",
            )
          }
          className="mt-2 w-full rounded-lg border border-white/10 bg-neutral-950 px-4 py-3 text-sm text-white outline-none transition focus:border-amber-500"
        >
          <option value="NEW">New</option>
          <option value="CONTACTED">Contacted</option>
          <option value="CLOSED">Closed</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={loading || currentStatus === status}
        className="mt-5 w-full rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-semibold text-neutral-950 transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Updating..." : "Update Status"}
      </button>

      {currentStatus === status && (
        <p className="mt-3 text-center text-xs text-neutral-600">
          No status changes.
        </p>
      )}
    </form>
  );
}