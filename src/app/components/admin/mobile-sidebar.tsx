"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  LayoutDashboard,
  Building2,
  Wrench,
  FolderKanban,
  MessageSquareQuote,
  Mail,
  Settings,
} from "lucide-react";

const menu = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Company Profile", href: "/admin/company", icon: Building2 },
  { label: "Services", href: "/admin/services", icon: Wrench },
  { label: "Projects", href: "/admin/projects", icon: FolderKanban },
  {
    label: "Testimonials",
    href: "/admin/testimonials",
    icon: MessageSquareQuote,
  },
  { label: "Inquiries", href: "/admin/inquiries", icon: Mail },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export function MobileSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-lg p-2 text-neutral-400 transition hover:bg-white/5 hover:text-white lg:hidden"
        aria-label="Open navigation"
      >
        <Menu className="h-5 w-5" />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close navigation"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/60"
          />

          <aside className="relative z-10 min-h-screen w-72 border-r border-white/10 bg-neutral-900">
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
              <div>
                <p className="font-semibold text-white">Denver Build</p>
                <p className="mt-1 text-xs text-neutral-500">Admin CMS</p>
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg p-2 text-neutral-400 transition hover:bg-white/5 hover:text-white"
                aria-label="Close navigation"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="space-y-1 p-4">
              {menu.map((item) => {
                const Icon = item.icon;

                const isActive =
                  item.href === "/admin"
                    ? pathname === "/admin"
                    : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm transition ${
                      isActive
                        ? "bg-amber-500 font-medium text-neutral-950"
                        : "text-neutral-400 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </aside>
        </div>
      )}
    </>
  );
}