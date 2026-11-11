import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "gold" | "dark" | "outline" | "light";
export type ButtonSize = "sm" | "md" | "lg";

const base =
  "group/btn relative inline-flex shrink-0 items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap " +
  "transition-[background-color,color,border-color,box-shadow] duration-300 ease-premium " +
  "focus-visible:outline-offset-4 disabled:pointer-events-none disabled:opacity-60";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-600 text-white shadow-[0_12px_30px_-12px] shadow-brand-600/70 hover:bg-brand-700",
  gold: "bg-gold-400 text-ink-950 shadow-[0_12px_30px_-12px] shadow-gold-500/70 hover:bg-gold-300",
  dark: "bg-ink-900 text-white hover:bg-ink-800",
  outline:
    "border border-ink-200 bg-transparent text-ink-900 hover:border-ink-900 hover:bg-ink-900 hover:text-white",
  light:
    "border border-white/30 bg-white/10 text-white backdrop-blur-md hover:border-white hover:bg-white hover:text-ink-900",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-6 text-sm",
  lg: "h-14 px-8 text-base",
};

export function buttonClasses({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} = {}) {
  return cn(base, variants[variant], sizes[size], className);
}

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
};

type ButtonAsLink = CommonProps &
  Omit<ComponentProps<typeof Link>, "className" | "children" | "href"> & {
    href: string;
  };

type ButtonAsButton = CommonProps &
  Omit<ComponentProps<"button">, "className" | "children"> & {
    href?: undefined;
  };

export type ButtonProps = ButtonAsLink | ButtonAsButton;

/**
 * Pill-shaped call-to-action. Renders a Next.js <Link> when `href` is given,
 * otherwise a native <button> (defaulting to type="button").
 */
export function Button(props: ButtonProps) {
  if (props.href !== undefined) {
    const { variant, size, className, children, ...linkProps } = props;
    return (
      <Link
        data-button
        className={buttonClasses({ variant, size, className })}
        {...linkProps}
      >
        {children}
      </Link>
    );
  }

  const {
    variant,
    size,
    className,
    children,
    type = "button",
    ...buttonProps
  } = props;
  return (
    <button
      data-button
      type={type}
      className={buttonClasses({ variant, size, className })}
      {...buttonProps}
    >
      {children}
    </button>
  );
}
