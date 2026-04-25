import React from 'react';

interface AnimatedHeadingProps {
  children: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  className?: string;
}

export default function AnimatedHeading({ children, as: Component = 'h2', className = '' }: AnimatedHeadingProps) {
  return (
    <Component className={`font-display font-bold text-primary ${className}`}>
      {children}
    </Component>
  );
}