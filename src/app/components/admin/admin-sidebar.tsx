"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  Wrench,
  FolderKanban,
  MessageSquareQuote,
  Mail,
  Settings,
  ExternalLink,
} from "lucide-react";

const menu = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
    separator: false,
  },
  {
    label: "Company Profile",
    href: "/admin/company",
    icon: Building2,
    separator: false,
  },
  {
    label: "Services",
    href: "/admin/services",
    icon: Wrench,
    separator: false,
  },
  {
    label: "Projects",
    href: "/admin/projects",
    icon: FolderKanban,
    separator: false,
  },
  {
    label: "Testimonials",
    href: "/admin/testimonials",
    icon: MessageSquareQuote,
    separator: false,
  },
  {
    label: "Inquiries",
    href: "/admin/inquiries",
    icon: Mail,
    separator: false,
  },
  {
    label: "Settings",
    href: "/admin/settings",
    icon: Settings,
    separator: true,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 hidden h-screen w-64 shrink-0 border-r border-white/10 bg-neutral-900 lg:block">
      <div className="flex h-16 flex-col justify-center border-b border-white/10 px-6">
        <p className="text-base font-semibold tracking-tight text-white">
          Denver Build
        </p>

        <p className="mt-1 text-xs uppercase tracking-[0.16em] text-neutral-600">
          Admin CMS
        </p>
      </div>

      <nav className="space-y-1 p-4">
        {menu.map((item) => {
          const Icon = item.icon;

          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);

          return (
            <div key={item.href}>
              {item.separator && (
                <div className="my-3 border-t border-white/10" />
              )}

              <Link
                href={item.href}
                className={`group flex items-center gap-3 rounded-lg px-4 py-3 text-sm transition ${
                  isActive
                    ? "bg-amber-500 font-medium text-neutral-950"
                    : "text-neutral-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon
                  className={`h-4 w-4 transition ${
                    isActive
                      ? "text-neutral-950"
                      : "text-neutral-500 group-hover:text-amber-400"
                  }`}
                />

                {item.label}
              </Link>
            </div>
          );
        })}

        <div className="my-3 border-t border-white/10" />

        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="group flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-neutral-400 transition hover:bg-white/5 hover:text-white"
        >
          <ExternalLink className="h-4 w-4 text-neutral-500 transition group-hover:text-amber-400" />
          View Website
        </a>
      </nav>
    </aside>
  );
}