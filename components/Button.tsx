import React from 'react';
import { TouchableOpacity, Text, TouchableOpacityProps } from 'react-native';
import { cn } from '../utils/utilities';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary';
  className?: string;
}

export function Button({ title, variant = 'primary', className, ...props }: ButtonProps) {
  const baseClasses = 'py-4 rounded-lg mb-3';
  const variantClasses = {
    primary: 'bg-purple-600',
    secondary: 'bg-red-500',
  };

  return (
    <TouchableOpacity className={cn(baseClasses, variantClasses[variant], className)} {...props}>
      <Text className="text-center text-lg font-bold text-white">{title}</Text>
    </TouchableOpacity>
  );
}
