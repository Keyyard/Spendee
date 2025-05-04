import React from 'react';
import { View, ViewProps } from 'react-native';

interface SectionProps extends ViewProps {
  className?: string;
  children: React.ReactNode;
}

export const Section: React.FC<SectionProps> = ({ className = '', children, ...props }) => (
  <View {...props} className={`mb-4 ${className}`}>{children}</View>
);

export default Section;
