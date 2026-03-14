import type { ComponentType, ReactNode, SVGProps } from "react";

export type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

type IconCardProps = {
  icon: IconComponent;
  title: string;
  description?: string;
  tag?: string;
  metaLeft?: string;
  metaRight?: string;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  iconClassName?: string;
  children?: ReactNode;
};

export function IconCard({
  icon: Icon,
  title,
  description,
  tag,
  metaLeft,
  metaRight,
  className = "",
  titleClassName = "text-lg font-semibold text-white",
  descriptionClassName = "mt-3 text-sm leading-relaxed text-slate-200",
  iconClassName = "h-5 w-5 text-sky-300",
  children,
}: IconCardProps) {
  const hasMeta = Boolean(metaLeft || metaRight);
  return (
    <div className={className}>
      {(metaLeft || metaRight) && (
        <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-slate-400">
          {metaLeft && <span>{metaLeft}</span>}
          {metaRight && <span className="text-slate-500">{metaRight}</span>}
        </div>
      )}
      <div
        className={`${hasMeta ? "mt-4" : ""} flex items-center gap-3 text-white`}
      >
        <Icon className={iconClassName} />
        <div>
          {tag && (
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{tag}</p>
          )}
          <h3 className={titleClassName}>{title}</h3>
        </div>
      </div>
      {description && (
        <p className={descriptionClassName}>{description}</p>
      )}
      {children}
    </div>
  );
}

type SectionBlockProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  className?: string;
  eyebrowClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  children?: ReactNode;
};

export function SectionBlock({
  eyebrow,
  title,
  description,
  className = "",
  eyebrowClassName = "text-xs uppercase tracking-[0.4em] text-slate-500",
  titleClassName = "text-3xl font-semibold text-white",
  descriptionClassName = "text-sm text-slate-400",
  children,
}: SectionBlockProps) {
  return (
    <div className={className}>
      {eyebrow && <p className={eyebrowClassName}>{eyebrow}</p>}
      {title && <h2 className={titleClassName}>{title}</h2>}
      {description && <p className={descriptionClassName}>{description}</p>}
      {children}
    </div>
  );
}

type InfoRowProps = {
  label: string;
  value: ReactNode;
  className?: string;
  labelClassName?: string;
  valueClassName?: string;
};

export function InfoRow({
  label,
  value,
  className = "",
  labelClassName = "text-slate-500",
  valueClassName = "text-white",
}: InfoRowProps) {
  return (
    <div className={`flex items-center justify-between ${className}`}>
      <span className={`text-sm ${labelClassName}`}>{label}</span>
      <span className={`text-sm ${valueClassName}`}>{value}</span>
    </div>
  );
}

type StatusChipProps = {
  label: string;
  variant?: "solid" | "outline" | "subtle";
  className?: string;
};

const chipVariants: Record<NonNullable<StatusChipProps["variant"]>, string> = {
  solid: "bg-white text-slate-900 shadow-lg shadow-slate-900/10",
  outline: "border border-white/40 text-white",
  subtle: "text-slate-500",
};

export function StatusChip({
  label,
  variant = "subtle",
  className = "",
}: StatusChipProps) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] ${chipVariants[variant]} ${className}`}
    >
      {label}
    </span>
  );
}
