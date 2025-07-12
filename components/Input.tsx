import React from 'react';
import { TextInput, TextInputProps } from 'react-native';
import { cn } from '../utils/utilities';

interface InputProps extends TextInputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  className?: string;
}

export function Input({ placeholder, value, onChangeText, className, ...props }: InputProps) {
  return (
    <TextInput
      className={cn('mb-5 rounded-lg bg-gray-800 p-4 text-white', className)}
      placeholderTextColor="#999"
      {...props}
    />
  );
}
