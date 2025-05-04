import React from 'react';
import { Text, TextProps } from 'react-native';

interface BodyTextProps extends TextProps {
  className?: string;
  children: React.ReactNode;
}

export const BodyText: React.FC<BodyTextProps> = ({ className = '', children, ...props }) => (
  <Text {...props} className={`text-base text-gray-700 ${className}`}>{children}</Text>
);

export default BodyText;
