import { MobileSidebar } from "./mobile-sidebar";
import { LogoutButton } from "./logout-button";

type AdminTopbarProps = {
  name?: string | null;
};

export function AdminTopbar({ name }: AdminTopbarProps) {
  return (
    <header className="flex h-16 items-center justify-between border-b border-white/10 bg-neutral-950 px-4 sm:px-6">
      <div className="flex items-center gap-3">
        <MobileSidebar />

        <p className="hidden text-sm text-neutral-400 sm:block">
          Welcome,{" "}
          <span className="font-medium text-white">
            {name ?? "Admin"}
          </span>
        </p>
      </div>

      <LogoutButton />
    </header>
  );
}