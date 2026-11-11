import Link from "next/link";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { FooterYear } from "@/components/layout/FooterYear";
import { Logo } from "@/components/ui/Logo";
import { services } from "@/data/services";
import { siteConfig } from "@/lib/site";

const explore = [
  { label: "Home", href: "/" },
  { label: "Popular destinations", href: "/#destinations" },
  { label: "Traveler stories", href: "/#testimonials" },
  { label: "Contact us", href: "/contact" },
];

const { phone, phoneHref, email, emailHref, whatsappHref, hours, address } = siteConfig.contact;

const socials = [
  { label: "Chat on WhatsApp", href: whatsappHref, icon: MessageCircle, external: true },
  { label: "Email us", href: emailHref, icon: Mail },
  { label: "Call us", href: phoneHref, icon: Phone },
];

const linkClass = "text-sm text-ink-300 transition-colors duration-300 hover:text-gold-300";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink-950 text-ink-200">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 size-[40rem] -translate-x-1/2 rounded-full bg-brand-500/10 blur-3xl"
      />

      <div className="container-page relative grid grid-cols-1 gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12 lg:py-20">
        <div className="sm:col-span-2 lg:col-span-4">
          <Logo tone="light" idSuffix="footer" />
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-ink-300">
            {siteConfig.description}
          </p>
          <ul className="mt-6 flex gap-3">
            {socials.map(({ label, href, icon: Icon, external }) => (
              <li key={label}>
                <a
                  href={href}
                  aria-label={external ? `${label} (opens in a new tab)` : label}
                  {...(external && { target: "_blank", rel: "noopener noreferrer" })}
                  className="grid size-11 place-items-center rounded-full border border-white/15 text-ink-100 transition-colors duration-300 hover:border-gold-300 hover:bg-gold-300 hover:text-ink-950"
                >
                  <Icon className="size-4" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-labelledby="footer-services" className="lg:col-span-2">
          <h2 id="footer-services" className="text-sm font-semibold tracking-wide text-white">
            Services
          </h2>
          <ul className="mt-5 space-y-3">
            {services.map((service) => (
              <li key={service.id}>
                <Link href={service.href} className={linkClass}>
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-labelledby="footer-explore" className="lg:col-span-2">
          <h2 id="footer-explore" className="text-sm font-semibold tracking-wide text-white">
            Explore
          </h2>
          <ul className="mt-5 space-y-3">
            {explore.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="sm:col-span-2 lg:col-span-4">
          <h2 className="text-sm font-semibold tracking-wide text-white">Contact</h2>
          <address className="mt-5 space-y-3 text-sm not-italic">
            <p>
              <a href={phoneHref} className={linkClass}>
                {phone}
              </a>
            </p>
            <p>
              <a href={emailHref} className={`${linkClass} break-all`}>
                {email}
              </a>
            </p>
            <p className="text-ink-300">{hours}</p>
            <p className="text-ink-300">{address}</p>
          </address>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-6 text-xs text-ink-300 sm:flex-row">
          <p>
            © <FooterYear /> {siteConfig.name}. All rights reserved.
          </p>
          <p>Crafted with Next.js, Tailwind CSS &amp; GSAP.</p>
        </div>
      </div>
    </footer>
  );
}
