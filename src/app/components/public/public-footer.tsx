import Link from "next/link";

type Props = {
  companyName?: string;
  email?: string;
  phone?: string;
};

export function PublicFooter({
  companyName = "Denver Build",
  email,
  phone,
}: Props) {
  return (
    <footer className="border-t border-white/10 bg-neutral-950">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-3">
        <div>
          <p className="font-semibold text-white">{companyName}</p>

          <p className="mt-3 max-w-sm text-sm leading-6 text-neutral-500">
            Professional construction, renovation, interior, and building
            services for residential and commercial projects.
          </p>
        </div>

        <div>
          <p className="text-sm font-medium text-white">Navigation</p>

          <div className="mt-4 flex flex-col gap-3 text-sm text-neutral-500">
            <Link href="/about">About</Link>
            <Link href="/services">Services</Link>
            <Link href="/projects">Projects</Link>
            <Link href="/testimonials">Testimonials</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>

        <div>
          <p className="text-sm font-medium text-white">Contact</p>

          <div className="mt-4 space-y-3 text-sm text-neutral-500">
            <p>{email ?? "hello@denverbuild.com"}</p>
            <p>{phone ?? "+62 812-3456-7890"}</p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 px-6 py-5 text-center text-xs text-neutral-600">
        © {new Date().getFullYear()} {companyName}. All rights reserved.
      </div>
    </footer>
  );
}