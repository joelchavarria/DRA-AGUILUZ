import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { requestPath, type RequestKind } from "@/config/requests";

export function RequestLink({
  children = "Solicitar atención",
  service,
  kind,
  className = "",
}: {
  children?: ReactNode;
  service?: string;
  kind?: RequestKind;
  className?: string;
}) {
  return (
    <Button asChild className={`primary-button request-link ${className}`}>
      <Link href={requestPath(service, kind)}>
        {children}
        <ArrowUpRight size={17} aria-hidden />
      </Link>
    </Button>
  );
}
