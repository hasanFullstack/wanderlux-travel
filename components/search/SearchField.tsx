import type { ComponentProps, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { SelectMenu, type SelectOption } from "@/components/ui/SelectMenu";
import { cn } from "@/lib/utils";

type SearchFieldProps = {
  id: string;
  label: string;
  icon: LucideIcon;
  error?: string;
  className?: string;
  children: ReactNode;
};

export const labelIdFor = (id: string) => `${id}-label`;

/**
 * Labelled, icon-led field shell shared by every search form. The shell is
 * the positioning context, so dropdown popups match the full field width.
 */
export function SearchField({
  id,
  label,
  icon: Icon,
  error,
  className,
  children,
}: SearchFieldProps) {
  return (
    <div className={cn("min-w-0", className)}>
      <div
        className={cn(
          "relative flex h-16 items-center gap-3 rounded-2xl border bg-sand-50 px-4 transition-[border-color,background-color,box-shadow] duration-300",
          "hover:border-ink-200 focus-within:border-brand-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-brand-500/15",
          error ? "border-red-400 bg-red-50/40" : "border-ink-100",
        )}
      >
        <Icon className="size-5 shrink-0 text-brand-600" aria-hidden="true" />
        <div className="min-w-0 flex-1">
          <label
            id={labelIdFor(id)}
            htmlFor={id}
            className="block text-[0.68rem] font-bold tracking-[0.12em] text-ink-400 uppercase"
          >
            {label}
          </label>
          {children}
        </div>
      </div>
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 pl-1 text-xs font-medium text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

type FieldSelectProps = {
  id: string;
  value: string | number;
  options: SelectOption[];
  onChange: (value: string) => void;
  invalid?: boolean;
  describedBy?: string;
};

/** Custom dropdown wired to the surrounding SearchField's label. */
export function FieldSelect({ id, value, options, onChange, invalid, describedBy }: FieldSelectProps) {
  return (
    <SelectMenu
      id={id}
      labelId={labelIdFor(id)}
      value={String(value)}
      options={options}
      onChange={onChange}
      invalid={invalid}
      describedBy={describedBy}
    />
  );
}

export function FieldInput({ className, ...props }: ComponentProps<"input">) {
  return (
    <input
      className={cn(
        "block w-full min-w-0 bg-transparent text-sm font-semibold text-ink-900 outline-none placeholder:font-medium placeholder:text-ink-300 focus-visible:outline-none",
        "[&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-60",
        className,
      )}
      {...props}
    />
  );
}
