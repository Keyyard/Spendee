import React from 'react';
import { Text, TextProps } from 'react-native';

interface HeadingProps extends TextProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
  children: React.ReactNode;
}

const sizes = {
  1: 'text-3xl font-bold',
  2: 'text-2xl font-bold',
  3: 'text-xl font-semibold',
  4: 'text-lg font-semibold',
  5: 'text-base font-semibold',
  6: 'text-sm font-semibold',
};

export const Heading: React.FC<HeadingProps> = ({ level = 2, className = '', children, ...props }) => (
  <Text {...props} className={`${sizes[level]} ${className}`}>{children}</Text>
);

export default Heading;
