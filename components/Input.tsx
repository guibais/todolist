
import React from 'react';
import { TextInput, TextInputProps } from 'react-native';

interface InputProps extends TextInputProps {
  // Adicione quaisquer props personalizadas se necessário
}

export function Input({ ...props }: InputProps) {
  return (
    <TextInput
      className="bg-gray-800 text-white rounded-lg p-4 mb-5"
      placeholderTextColor="#999"
      {...props}
    />
  );
}
