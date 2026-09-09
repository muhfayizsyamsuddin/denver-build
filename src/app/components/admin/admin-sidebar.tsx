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
} from "lucide-react";

const menu = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Company Profile",
    href: "/admin/company",
    icon: Building2,
  },
  {
    label: "Services",
    href: "/admin/services",
    icon: Wrench,
  },
  {
    label: "Projects",
    href: "/admin/projects",
    icon: FolderKanban,
  },
  {
    label: "Testimonials",
    href: "/admin/testimonials",
    icon: MessageSquareQuote,
  },
  {
    label: "Inquiries",
    href: "/admin/inquiries",
    icon: Mail,
  },
  {
    label: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden min-h-screen w-64 border-r border-white/10 bg-neutral-900 lg:block">
      <div className="border-b border-white/10 px-6 py-5">
        <p className="font-semibold text-white">Denver Build</p>
        <p className="mt-1 text-xs text-neutral-500">Admin CMS</p>
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
  );
}