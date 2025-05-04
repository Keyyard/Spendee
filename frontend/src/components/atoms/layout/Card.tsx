import React from 'react';
import { View, ViewProps } from 'react-native';

interface CardProps extends ViewProps {
  className?: string;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ className = '', children, ...props }) => (
  <View {...props} className={`bg-white rounded-2xl p-5 shadow-sm ${className}`}>{children}</View>
);

export default Card;
