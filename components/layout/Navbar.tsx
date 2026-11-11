"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Mail, Menu, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { MOTION, gsap, useGSAP } from "@/lib/gsap";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

const SCROLL_THRESHOLD = 24;
const { phone, phoneHref, email, emailHref } = siteConfig.contact;

function subscribeToScroll(callback: () => void) {
  window.addEventListener("scroll", callback, { passive: true });
  return () => window.removeEventListener("scroll", callback);
}

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const scrolled = useSyncExternalStore(
    subscribeToScroll,
    () => window.scrollY > SCROLL_THRESHOLD,
    () => false,
  );

  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const solid = scrolled && !open;
  const close = () => setOpen(false);
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  // Mobile menu: lock scroll, trap focus, close on Escape / desktop resize.
  useEffect(() => {
    if (!open) return;

    const root = rootRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a[href]")?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (event.key !== "Tab" || !root) return;

      const focusables = Array.from(
        root.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"),
      ).filter((el) => el.getClientRects().length > 0);
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const desktop = window.matchMedia("(min-width: 64rem)");
    const onBreakpoint = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onBreakpoint);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onBreakpoint);
    };
  }, [open]);

  // Stagger the mobile menu items in each time it opens.
  useGSAP(
    () => {
      if (!open) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION.ok, () => {
        gsap.from("[data-menu-item]", {
          y: 28,
          autoAlpha: 0,
          duration: 0.6,
          stagger: 0.05,
          ease: "power3.out",
          delay: 0.08,
        });
      });
      return () => mm.revert();
    },
    { dependencies: [open], scope: panelRef, revertOnUpdate: true },
  );

  return (
    <div ref={rootRef}>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,padding] duration-500 ease-premium",
          solid
            ? "bg-white/85 py-3 shadow-[0_8px_30px_-12px_rgb(15_30_47/0.25)] backdrop-blur-xl"
            : "bg-transparent py-5",
        )}
      >
        <nav
          aria-label="Main"
          className="container-page flex items-center justify-between gap-6"
        >
          <Logo tone={solid ? "dark" : "light"} idSuffix="nav" onClick={close} />

          <ul className="hidden items-center gap-1 lg:flex">
            {siteConfig.nav.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "group relative inline-flex rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-300",
                      solid
                        ? active
                          ? "text-brand-700"
                          : "text-ink-600 hover:text-ink-950"
                        : active
                          ? "text-white"
                          : "text-white/75 hover:text-white",
                    )}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute inset-x-4 bottom-0.5 h-0.5 origin-left rounded-full transition-transform duration-500 ease-premium",
                        solid ? "bg-brand-500" : "bg-gold-300",
                        active
                          ? "scale-x-100"
                          : "scale-x-0 group-hover:scale-x-100",
                      )}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-3">
            <a
              href={phoneHref}
              className={cn(
                "hidden items-center gap-2 text-sm font-semibold transition-colors xl:inline-flex",
                solid
                  ? "text-ink-700 hover:text-brand-700"
                  : "text-white/85 hover:text-white",
              )}
            >
              <Phone className="size-4" aria-hidden="true" />
              {phone}
            </a>
            <Button
              href="/contact"
              size="sm"
              variant={solid ? "primary" : "gold"}
              className="hidden sm:inline-flex"
              onClick={close}
            >
              Plan my trip
            </Button>
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className={cn(
                "grid size-11 place-items-center rounded-full border transition-colors duration-300 lg:hidden",
                solid
                  ? "border-ink-200 text-ink-900 hover:bg-ink-50"
                  : "border-white/30 text-white hover:bg-white/10",
              )}
            >
              {open ? (
                <X className="size-5" aria-hidden="true" />
              ) : (
                <Menu className="size-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </nav>
      </header>

      <div
        id="mobile-menu"
        ref={panelRef}
        inert={!open}
        className={cn(
          "fixed inset-0 z-40 flex flex-col overflow-y-auto bg-ink-950 px-6 pt-28 pb-10 transition-[opacity,visibility] duration-300 lg:hidden",
          open ? "visible opacity-100" : "invisible opacity-0",
        )}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_10%,rgb(35_157_158/0.35),transparent_45%),radial-gradient(circle_at_10%_90%,rgb(230_169_48/0.2),transparent_40%)]"
        />
        <nav aria-label="Mobile" className="relative">
          <ul className="flex flex-col gap-1">
            {siteConfig.nav.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.href} data-menu-item>
                  <Link
                    href={item.href}
                    onClick={close}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "group flex items-center justify-between border-b border-white/10 py-4 font-display text-3xl transition-colors sm:text-4xl",
                      active
                        ? "text-gold-300"
                        : "text-white hover:text-gold-200",
                    )}
                  >
                    {item.label}
                    <ArrowRight
                      className="size-6 -translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div
          data-menu-item
          className="relative mt-auto flex flex-col gap-4 pt-10 text-sm text-ink-200"
        >
          <a
            href={phoneHref}
            className="inline-flex items-center gap-3 hover:text-white"
          >
            <Phone className="size-4 text-gold-300" aria-hidden="true" />
            {phone}
          </a>
          <a
            href={emailHref}
            className="inline-flex items-center gap-3 hover:text-white"
          >
            <Mail className="size-4 text-gold-300" aria-hidden="true" />
            {email}
          </a>
          <Button
            href="/contact"
            variant="gold"
            size="lg"
            className="mt-2 w-full"
            onClick={close}
          >
            Plan my trip
            <ArrowRight className="size-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </div>
  );
}
