"use client"

import React from "react";
import { usePathname } from "next/navigation"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

function titleCase(s?: string | null) {
  if (!s) return "";
  return s
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export function BreadcrumbFromParams() {
  const path = usePathname();
  const segments = React.useMemo(() => path.split("/").filter(Boolean), [path]);
  const last = segments[segments.length - 1] ?? "";
  const sectionLabel = last.toLowerCase() === "ai" ? "AI" : titleCase(last);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {segments.slice(0, -1).map((segment, index) => {
          const key = segments.slice(0, index + 1).join("/");
          return (
            <React.Fragment key={key}>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink>{titleCase(segment)}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
            </React.Fragment>
          )
        })}
        <BreadcrumbItem>
          <BreadcrumbPage>{sectionLabel}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
