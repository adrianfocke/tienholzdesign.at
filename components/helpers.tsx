import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export function LinkWrapper(props: { link: string; content: React.ReactNode, underlined?: boolean }) {
  const normalizedLink = props.link.replace(/^https?:\/(?!\/)/, (match) => `${match}/`);
  const isExternalLink = /^https?:\/\//.test(normalizedLink);

  if (!normalizedLink) {
    return props.content;
  }

  return (
    <Link
      className="no-line-height"
      href={normalizedLink}
      target={isExternalLink ? "_blank" : undefined}
      rel={isExternalLink ? "noopener noreferrer" : undefined}
      itemProp="name"
      title={
        isExternalLink
          ? `External link to ${normalizedLink}`
          : `Link to ${normalizedLink}`
      }
    >
      {props.content}
      {props.underlined && isExternalLink /* && <ArrowTopRightIcon /> */}
    </Link>
  );
}
