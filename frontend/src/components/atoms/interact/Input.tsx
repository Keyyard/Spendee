import React from 'react';
import { TextInput, TextInputProps } from 'react-native';

interface InputProps extends TextInputProps {
  className?: string;
}

const baseStyles = 'border border-gray-300 p-4 rounded-lg';

export const Input: React.FC<InputProps> = ({ className = '', ...props }) => (
  <TextInput {...props} className={`${baseStyles} ${className}`} />
);

export default Input;
