import React from 'react';
import { View, ViewProps } from 'react-native';

interface CardProps extends ViewProps {
  className?: string;
  children: React.ReactNode;
}

// example usage: <Card className="my-custom-class">Content</Card>
// Card is the base component
// classname is used to add custom styles
// children is the content inside the card, which can be any valid React node for eg: text, images, etc.
// The component is styled with Tailwind CSS classes for background color, border radius, padding, and shadow

export const Card: React.FC<CardProps> = ({ className = '', children, ...props }) => (
  <View {...props} className={`bg-white rounded-2xl p-5 shadow-sm ${className}`}>{children}</View>
);

export default Card;
