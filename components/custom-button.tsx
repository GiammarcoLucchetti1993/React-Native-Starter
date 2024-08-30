import { Text, Pressable } from "react-native";
import React from "react";
import { cn } from "@/utils/cn";

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
      className={cn(
        "bg-secondary rounded-xl min-h-[62px] justify-center items-center",
        containerStyles,
        {
          "opacity-50": isLoading,
        }
      )}
    >
      <Text className={cn("text-primary font-psemibold text-lg", textStyle)}>
        {title}
      </Text>
    </Pressable>
  );
};

export default CustomButton;
