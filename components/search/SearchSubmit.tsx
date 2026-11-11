import { Search } from "lucide-react";
import { Button } from "@/components/ui/Button";

/** Primary submit button sized to sit alongside the search fields. */
export function SearchSubmit({ label = "Search" }: { label?: string }) {
  return (
    <Button
      type="submit"
      size="lg"
      className="h-16 w-full rounded-2xl px-8 sm:col-span-2 lg:w-auto"
    >
      <Search className="size-5" aria-hidden="true" />
      {label}
    </Button>
  );
}
