import React from 'react';
import { TextInput, TextInputProps } from 'react-native';
import { cn } from '../utils/utilities';
import * as Haptics from 'expo-haptics';

interface InputProps extends TextInputProps {
  placeholder: string;
  value: string;
  className?: string;
}

export function Input({ placeholder, value, onChangeText, className, ...props }: InputProps) {
  return (
    <TextInput
      className={cn('mb-5 rounded-lg bg-gray-800 p-4 text-white', className)}
      placeholderTextColor="#999"
      onChangeText={(text) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onChangeText(text);
      }}
      {...props}
    />
  );
}
