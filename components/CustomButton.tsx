import { Text, Pressable } from "react-native";
import React from "react";
import { isLoaded } from "expo-font";

interface ButtonProps {
  title: string;
  handlePress: () => void;
  containerStyles?: string;
  textStyle?: boolean;
  isLoading?: boolean;
}

const CustomButton = ({
  title,
  handlePress,
  containerStyles,
  textStyle,
  isLoading,
}: ButtonProps) => {
  return (
    <Pressable
      onPress={handlePress}
      disabled={isLoading}
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.7 : 1,
        },
      ]}
      className={`bg-secondary rounded-xl min-h-[62px] justify-center items-center ${containerStyles} ${
        isLoading ? "opacity-50" : ""
      }`}
    >
      <Text className={`text-primary font-psemibold text-lg ${textStyle}`}>
        {title}
      </Text>
    </Pressable>
  );
};

export default CustomButton;
