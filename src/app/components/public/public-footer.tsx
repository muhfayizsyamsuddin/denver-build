import Link from "next/link";
import {
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa";

type Props = {
  companyName?: string | null;
  email?: string | null;
  phone?: string | null;
  whatsapp?: string | null;
  address?: string | null;
  instagramUrl?: string | null;
  facebookUrl?: string | null;
  linkedinUrl?: string | null;
};

export function PublicFooter({
  companyName = "Denver Build",
  email,
  phone,
  whatsapp,
  address,
  instagramUrl,
  facebookUrl,
  linkedinUrl,
}: Props) {
  const whatsappNumber = whatsapp?.replace(/\D/g, "");

  const socialLinks = [
    {
      label: "Instagram",
      href: instagramUrl,
      icon: FaInstagram,
    },
    {
      label: "Facebook",
      href: facebookUrl,
      icon: FaFacebookF,
    },
    {
      label: "LinkedIn",
      href: linkedinUrl,
      icon: FaLinkedinIn,
    },
  ].filter(
    (
      item,
    ): item is {
      label: string;
      href: string;
      icon: typeof FaInstagram;
    } => Boolean(item.href),
  );

  return (
    <footer className="border-t border-white/10 bg-neutral-950">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4">
        {/* Company */}
        <div>
          <p className="font-semibold text-white">{companyName}</p>

          <p className="mt-3 max-w-sm text-sm leading-6 text-neutral-500">
            Professional construction, renovation, interior, and building
            services for residential and commercial projects.
          </p>

          {socialLinks.length > 0 && (
            <div className="mt-6 flex gap-3">
              {socialLinks.map((item) => {
                const Icon = item.icon;

                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={item.label}
                    title={item.label}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-neutral-500 transition hover:border-amber-500/30 hover:text-amber-400"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          )}
        </div>

        {/* Navigation */}
        <div>
          <p className="text-sm font-medium text-white">Navigation</p>

          <div className="mt-4 flex flex-col gap-3 text-sm">
            {[
              { label: "About", href: "/about" },
              { label: "Services", href: "/services" },
              { label: "Projects", href: "/projects" },
              { label: "Testimonials", href: "/testimonials" },
              { label: "Contact", href: "/contact" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="w-fit text-neutral-500 transition hover:text-amber-400"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <p className="text-sm font-medium text-white">Contact</p>

          <div className="mt-4 flex flex-col gap-3 text-sm">
            <a
              href={`mailto:${email ?? "hello@denverbuild.com"}`}
              className="w-fit text-neutral-500 transition hover:text-amber-400"
            >
              {email ?? "hello@denverbuild.com"}
            </a>

            <a
              href={`tel:${phone ?? "+6281234567890"}`}
              className="w-fit text-neutral-500 transition hover:text-amber-400"
            >
              {phone ?? "+62 812-3456-7890"}
            </a>

            {whatsappNumber && (
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                className="flex w-fit items-center gap-2 text-neutral-500 transition hover:text-emerald-400"
              >
                <FaWhatsapp className="h-4 w-4" />
                WhatsApp
              </a>
            )}
          </div>
        </div>

        {/* Location */}
        <div>
          <p className="text-sm font-medium text-white">Location</p>

          <p className="mt-4 max-w-xs text-sm leading-6 text-neutral-500">
            {address ?? "Makassar, South Sulawesi, Indonesia"}
          </p>

          <Link
            href="/contact"
            className="mt-4 inline-flex text-sm text-amber-400 transition hover:text-amber-300"
          >
            Get in touch →
          </Link>
        </div>
      </div>

      <div className="border-t border-white/10 px-6 py-5 text-center text-xs text-neutral-600">
        © {new Date().getFullYear()} {companyName}. All rights reserved.
      </div>
    </footer>
  );
}