import React from 'react';
import { TouchableOpacity, Text, TouchableOpacityProps } from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'danger' | 'success';
  className?: string;
}

const baseStyles = 'p-4 rounded-lg';
const variants = {
  primary: 'bg-blue-600',
  danger: 'bg-red-600',
  success: 'bg-green-500',
};

export const Button: React.FC<ButtonProps> = ({ title, variant = 'primary', className = '', ...props }) => (
  <TouchableOpacity {...props} className={`${baseStyles} ${variants[variant]} ${className}`}>
    <Text className="text-white text-center font-bold">{title}</Text>
  </TouchableOpacity>
);

export default Button;
