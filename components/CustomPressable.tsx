import React from 'react';
import { Pressable, StyleSheet, ViewStyle } from 'react-native';

interface CustomPressableProps {
  onPress: () => void;
  style?: ViewStyle | ViewStyle[];
  children: React.ReactNode;
  disabled?: boolean;
  // android_ripple?: object;
}

export const CustomPressable = ({ onPress, style, children, ...props }: CustomPressableProps) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        pressed ? styles.pressed : null,
        style,
      ]}
      {...props}
    >
      {children}
    </Pressable>
  );
};

// Styles
const styles = StyleSheet.create({
  pressed: {
    opacity: 0.5,
  },
});