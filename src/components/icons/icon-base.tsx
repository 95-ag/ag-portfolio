export interface IconProps {
  size?: number;
  className?: string;
}

interface IconBaseProps extends IconProps {
  path: string;
  viewBox?: string;
}

export function IconBase({
  path,
  size = 18,
  className,
  viewBox = "0 -960 960 960",
}: IconBaseProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={viewBox}
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d={path} />
    </svg>
  );
}
