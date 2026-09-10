import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "@/auth";
import { AdminSidebar } from "@/app/components/admin/admin-sidebar";
import { AdminTopbar } from "@/app/components/admin/admin-topbar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white lg:flex">
      <AdminSidebar />

      <div className="min-w-0 flex-1">
        <AdminTopbar name={session.user?.name} />

        <main className="p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}