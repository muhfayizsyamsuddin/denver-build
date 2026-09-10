import { MobileSidebar } from "./mobile-sidebar";
import { LogoutButton } from "./logout-button";

type AdminTopbarProps = {
  name?: string | null;
};

export function AdminTopbar({ name }: AdminTopbarProps) {
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-white/10 bg-neutral-950/95 px-4 backdrop-blur sm:px-6">
      <div className="flex items-center gap-3">
        <MobileSidebar />

        <div className="hidden sm:block">
          <p className="text-sm text-neutral-400">
            Welcome,{" "}
            <span className="font-medium text-white">
              {name ?? "Admin"}
            </span>
          </p>

          <p className="mt-0.5 text-xs text-neutral-600">
            Manage Denver Build website content
          </p>
        </div>
      </div>

      <LogoutButton />
    </header>
  );
}