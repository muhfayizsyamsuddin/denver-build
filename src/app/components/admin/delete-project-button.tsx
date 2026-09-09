"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { ConfirmDialog } from "@/app/components/admin/confirm-dialog";

type Props = {
  id: string;
  name: string;
};

export function DeleteProjectButton({ id, name }: Props) {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    setLoading(true);

    try {
      const response = await fetch(`/api/admin/projects/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.message ?? "Failed to delete project.");
        return;
      }

      toast.success("Project deleted successfully.");

      setOpen(false);
      router.refresh();
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-red-400 transition hover:text-red-300"
      >
        Delete
      </button>

      <ConfirmDialog
        open={open}
        title="Delete project?"
        description={`Are you sure you want to delete "${name}"? This action cannot be undone.`}
        confirmLabel="Delete Project"
        loading={loading}
        onConfirm={handleDelete}
        onCancel={() => {
          if (!loading) {
            setOpen(false);
          }
        }}
      />
    </>
  );
}