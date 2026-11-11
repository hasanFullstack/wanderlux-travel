"use client";

import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export type SelectOption = { value: string; label: string };

type SelectMenuProps = {
  id: string;
  /** Id of the visible <label>, announced together with the current value. */
  labelId: string;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  invalid?: boolean;
  describedBy?: string;
  className?: string;
};

/**
 * Accessible custom select (WAI-ARIA "select-only combobox" pattern):
 * a trigger button + a styled listbox popup. Supports arrow keys, Home/End,
 * Enter/Space, Escape and type-ahead. The popup is positioned against the
 * nearest positioned ancestor, so the surrounding field controls its width.
 */
export function SelectMenu({
  id,
  labelId,
  value,
  options,
  onChange,
  invalid,
  describedBy,
  className,
}: SelectMenuProps) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [placeAbove, setPlaceAbove] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const typeahead = useRef({ text: "", timer: 0 });

  const listId = `${id}-listbox`;
  const valueId = `${id}-value`;
  const selectedIndex = Math.max(
    0,
    options.findIndex((o) => o.value === value),
  );
  const selected = options[selectedIndex];

  const openMenu = (index = selectedIndex) => {
    const rect = rootRef.current?.getBoundingClientRect();
    if (rect) {
      const below = window.innerHeight - rect.bottom;
      setPlaceAbove(below < 300 && rect.top > below);
    }
    setActive(index);
    setOpen(true);
  };

  const close = (refocus = true) => {
    setOpen(false);
    if (refocus) triggerRef.current?.focus();
  };

  const choose = (index: number) => {
    const option = options[index];
    if (option) onChange(option.value);
    close();
  };

  // Focus the listbox when it opens; close on outside pointer down.
  useEffect(() => {
    if (!open) return;
    listRef.current?.focus();
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  // Keep the active option scrolled into view.
  useEffect(() => {
    if (!open) return;
    listRef.current
      ?.querySelector<HTMLElement>(`[data-index="${active}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [active, open]);

  const jumpByTypeahead = (key: string) => {
    const state = typeahead.current;
    window.clearTimeout(state.timer);
    state.text += key.toLowerCase();
    state.timer = window.setTimeout(() => (state.text = ""), 500);
    const start = state.text.length === 1 ? active + 1 : active;
    const ordered = [...options.slice(start), ...options.slice(0, start)];
    const match = ordered.find((o) => o.label.toLowerCase().startsWith(state.text));
    if (match) setActive(options.indexOf(match));
  };

  const onTriggerKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (["ArrowDown", "ArrowUp", "Enter", " "].includes(event.key)) {
      event.preventDefault();
      openMenu();
    }
  };

  const onListKeyDown = (event: KeyboardEvent<HTMLUListElement>) => {
    const last = options.length - 1;
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setActive((i) => Math.min(i + 1, last));
        break;
      case "ArrowUp":
        event.preventDefault();
        setActive((i) => Math.max(i - 1, 0));
        break;
      case "Home":
        event.preventDefault();
        setActive(0);
        break;
      case "End":
        event.preventDefault();
        setActive(last);
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        choose(active);
        break;
      case "Escape":
        event.preventDefault();
        close();
        break;
      case "Tab":
        close(false);
        break;
      default:
        if (event.key.length === 1 && /\S/.test(event.key)) jumpByTypeahead(event.key);
    }
  };

  return (
    <div ref={rootRef} className={className}>
      <button
        ref={triggerRef}
        id={id}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-labelledby={`${labelId} ${valueId}`}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        onClick={() => (open ? close() : openMenu())}
        onKeyDown={onTriggerKeyDown}
        className="flex w-full min-w-0 cursor-pointer items-center justify-between gap-2 bg-transparent text-left text-sm font-semibold text-ink-900 outline-none focus-visible:outline-none"
      >
        <span id={valueId} className="truncate">
          {selected?.label}
        </span>
        <ChevronDown
          aria-hidden="true"
          className={cn(
            "size-4 shrink-0 text-ink-400 transition-transform duration-300",
            open && "rotate-180 text-brand-600",
          )}
        />
      </button>

      {open && (
        <ul
          ref={listRef}
          id={listId}
          role="listbox"
          tabIndex={-1}
          aria-labelledby={labelId}
          aria-activedescendant={`${id}-opt-${active}`}
          onKeyDown={onListKeyDown}
          onBlur={(event) => {
            if (!rootRef.current?.contains(event.relatedTarget as Node)) setOpen(false);
          }}
          className={cn(
            "absolute inset-x-0 z-50 max-h-72 overflow-y-auto overscroll-contain rounded-2xl bg-white p-2 shadow-lift ring-1 ring-ink-100 outline-none",
            placeAbove ? "bottom-full mb-2" : "top-full mt-2",
          )}
        >
          {options.map((option, index) => {
            const isSelected = option.value === value;
            const isActive = index === active;
            return (
              <li
                key={option.value}
                id={`${id}-opt-${index}`}
                data-index={index}
                role="option"
                aria-selected={isSelected}
                onPointerMove={() => setActive(index)}
                onClick={() => choose(index)}
                className={cn(
                  "flex cursor-pointer items-center justify-between gap-3 rounded-xl px-3.5 py-2.5 text-sm transition-colors",
                  isActive ? "bg-brand-50 text-ink-900" : "text-ink-600",
                  isSelected && "font-semibold text-brand-700",
                )}
              >
                <span className="truncate">{option.label}</span>
                {isSelected && (
                  <Check className="size-4 shrink-0 text-brand-600" aria-hidden="true" />
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
