import React from 'react';
import { TouchableOpacity, Text, TouchableOpacityProps } from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary';
}

export function Button({ title, variant = 'primary', ...props }: ButtonProps) {
  const baseClasses = "py-4 rounded-lg mb-3";
  const variantClasses = {
    primary: "bg-purple-600",
    secondary: "bg-red-500",
  };

  return (
    <TouchableOpacity className={`${baseClasses} ${variantClasses[variant]}`} {...props}>
      <Text className="text-white text-center text-lg font-bold">{title}</Text>
    </TouchableOpacity>
  );
}