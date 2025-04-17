import React from "react";
import { House } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

type CustomBreadCrumbProps = {
  model: { label: string | undefined; url: string }[];
};

export default function CustomBreadCrumb({
  model,
}: Readonly<CustomBreadCrumbProps>) {
  const pageTitle =
    import.meta.env.VITE_BRAND +
    ` | ${model
      .map((element) => element.label)
      .filter(Boolean)
      .join(" | ")}`;

  return (
    <>
      <title>{pageTitle}</title>
      <link
        rel="canonical"
        href={
          import.meta.env.VITE_URL +
          `/${model.length > 0 ? model[model.length - 1].url : ""}`
        }
      ></link>
      <meta name="description" content={pageTitle} />
      <Breadcrumb className="mx-2">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/app/dashboard" className="text-xs">
              <House size={18} />
            </BreadcrumbLink>
          </BreadcrumbItem>
          {model.map((element, index) => (
            <React.Fragment key={element.url}>
              <BreadcrumbSeparator className="text-xs mt-1">
                /
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                {index === model.length - 1 ? (
                  <BreadcrumbPage className="text-xs mx-1">
                    {element.label}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink
                    href={element.url}
                    className="text-xs hover:underline mx-1"
                  >
                    {element.label}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </>
  );
}
