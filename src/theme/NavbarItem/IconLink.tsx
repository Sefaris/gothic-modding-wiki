import React from "react";
import Link from "@docusaurus/Link";
import { Icon } from "@iconify/react";

type IconLinkProps = {
  href?: string;
  to?: string;
  label: string;
  icon: string;
  className?: string;
  target?: string;
  rel?: string;
  prependBaseUrlToHref?: boolean;
};

export default function IconLink({
  icon,
  label,
  className,
  ...props
}: IconLinkProps): React.JSX.Element {
  const linkClassName = ["navbar__item", "navbar__link", className].filter(Boolean).join(" ");

  return (
    <Link
      className={linkClassName}
      aria-label={label}
      title={label}
      style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
      {...props}
    >
      <Icon icon={icon} aria-hidden="true" width="24" height="24" />
      <span>{label}</span>
    </Link>
  );
}