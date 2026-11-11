import { Clock, Mail, MapPin, MessageCircle, Phone, type LucideIcon } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

type Detail = {
  icon: LucideIcon;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
};

const { phone, phoneHref, email, emailHref, whatsappHref, hours, address } = siteConfig.contact;

const details: Detail[] = [
  { icon: Phone, label: "Call us", value: phone, href: phoneHref },
  { icon: MessageCircle, label: "WhatsApp", value: phone, href: whatsappHref, external: true },
  { icon: Mail, label: "Email", value: email, href: emailHref },
  { icon: Clock, label: "Office hours", value: hours },
  { icon: MapPin, label: "Where we are", value: address },
];

type ContactDetailsProps = { className?: string };

/** Contact channels list, shared by the home contact section and /contact. */
export function ContactDetails({ className }: ContactDetailsProps) {
  return (
    <ul className={cn("grid grid-cols-1 gap-3", className)}>
      {details.map(({ icon: Icon, label, value, href, external }) => {
        const content = (
          <>
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600 transition-colors duration-300 group-hover:bg-brand-600 group-hover:text-white">
              <Icon className="size-5" aria-hidden="true" />
            </span>
            <span className="min-w-0">
              <span className="block text-xs font-semibold tracking-wide text-ink-400 uppercase">
                {label}
              </span>
              <span className="block font-semibold break-words text-ink-900">{value}</span>
            </span>
          </>
        );
        const base =
          "group flex items-center gap-4 rounded-2xl bg-white p-3 pr-5 shadow-soft ring-1 ring-ink-100";
        return (
          <li key={label}>
            {href ? (
              <a
                href={href}
                {...(external && { target: "_blank", rel: "noopener noreferrer" })}
                className={cn(base, "transition-shadow duration-300 hover:shadow-lift")}
              >
                {content}
                {external && <span className="sr-only">(opens in a new tab)</span>}
              </a>
            ) : (
              <div className={base}>{content}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
