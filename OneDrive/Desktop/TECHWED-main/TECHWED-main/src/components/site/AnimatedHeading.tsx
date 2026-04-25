import { ReactNode } from "react";

interface Props {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3";
}

export const AnimatedHeading = ({ children, className = "", as: Tag = "h2" }: Props) => {
  const words = children.split(" ");
  return (
    <Tag className={`word-reveal reveal ${className}`}>
      {words.map((w, i) => (
        <span key={i} style={{ transitionDelay: `${i * 80}ms` }}>
          {w}
          {i < words.length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
    </Tag>
  );
};
