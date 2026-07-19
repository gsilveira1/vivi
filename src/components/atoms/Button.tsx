import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  rounded?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  rounded = false,
  className = '',
  children,
  ...props
}) => {
  const base = 'inline-flex items-center justify-center font-semibold transition-all';
  const sizes: Record<string, string> = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };
  const variants: Record<string, string> = {
    primary: 'bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:from-pink-600 hover:to-rose-600 shadow-lg',
    secondary: 'bg-pink-100 text-pink-600 hover:bg-pink-200',
    outline: 'border-2 border-white text-white hover:bg-white hover:text-pink-600',
    ghost: 'text-pink-600 hover:text-pink-700 hover:bg-pink-50',
  };
  const shape = rounded ? 'rounded-full' : 'rounded-lg';

  return (
    <button className={`${base} ${sizes[size]} ${variants[variant]} ${shape} ${className}`} {...props}>
      {children}
    </button>
  );
};
