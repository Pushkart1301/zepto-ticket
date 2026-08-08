import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'outline' | 'ghost';
  onClick?: () => void;
  className?: string;
}

export default function Button({ 
  children, 
  variant = 'primary', 
  onClick,
  className = '' 
}: ButtonProps) {
  const baseStyles = 'px-4 py-2 text-caption font-medium rounded-button transition-colors duration-150';
  
  const variantStyles = {
    primary: 'bg-accent text-white hover:bg-accent/90',
    outline: 'border border-border text-text-primary hover:bg-surface-hover',
    ghost: 'text-text-secondary hover:text-text-primary hover:bg-surface-hover'
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
