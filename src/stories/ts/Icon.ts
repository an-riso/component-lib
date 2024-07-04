import React from 'react';

type _IconProps = {
  children: React.ReactNode;
  className?: string | undefined;
  style?: React.CSSProperties;
  size?: number | string;
} & React.SVGProps<SVGSVGElement>;

export type IconProps = Omit<_IconProps, 'children'>;

const Icon = ({ children, size = '1.6em', ...props }: _IconProps) => {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" {...props}>
      {children}
    </svg>
  );
};

export default Icon;
