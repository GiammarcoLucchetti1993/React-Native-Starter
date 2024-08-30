import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import CustomButton from "@/components/custom-button";
import { Link } from "expo-router";
import useSecureStore from "@/hook/useSecureStore";
import { useForm, Controller } from "react-hook-form";
import { icons } from "@/constants";

interface FormData {
  email: string;
  password: string;
}

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { save } = useSecureStore();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    console.log(data);
    // try {
    //   const newUser = await register({
    //     email: data.email,
    //     password: data.password,
    //     options: {
    //       first_name: "FirstName",
    //       last_name: "LastName",
    //       verification_url: process.env.EXPO_USER_REGISTER_URL_ALLOW_LIST,
    //     },
    //   });
    //   setIsLoading(false);
    // } catch (e) {
    //   console.log("Error", e);
    //   setIsLoading(false);
    // }
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-4 my-6">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[35px]"
          />
          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">
            Sign up to Aora
          </Text>

          <Text className="text-base text-gray-100 font-pmedium mt-7">
            Email
          </Text>

          <View className="w-full h-16 px-4 bg-black-100 border-2 border-black-200 rounded-2xl focus:border-secondary items-center flex-row mt-2">
            <Controller
              name="email"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <TextInput
                    placeholder="Enter Your Email"
                    className="flex-1 text-white font-psemibold text-base"
                    placeholderTextColor="#7b7b8b"
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                  />
                </>
              )}
              rules={{ required: true, pattern: /^\S+@\S+$/i }}
            />
          </View>

          {errors.email && (
            <Text className="text-red-400 font-pmedium">
              Enter a valid Email
            </Text>
          )}

          <Text className="text-base text-gray-100 font-pmedium mt-7">
            Password
          </Text>
          <View className="w-full h-16 px-4 bg-black-100 border-2 border-black-200 rounded-2xl focus:border-secondary items-center flex-row mt-2">
            <Controller
              name="password"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <TextInput
                    placeholder="Enter Your Password"
                    className="flex-1 text-white font-psemibold text-base"
                    placeholderTextColor="#7b7b8b"
                    value={value}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    secureTextEntry={!showPassword}
                  />
                  <Pressable onPress={() => setShowPassword(!showPassword)}>
                    <Image
                      source={!showPassword ? icons.eye : icons.eyeHide}
                      className="w-6 h-6"
                      resizeMode="contain"
                    />
                  </Pressable>
                </>
              )}
              rules={{ required: true }}
            />
          </View>
          {errors.password && (
            <Text className="text-red-400 font-pmedium">
              Password is required
            </Text>
          )}

          <CustomButton
            title={"Sign Up"}
            handlePress={handleSubmit(onSubmit)}
            containerStyles="mt-7"
            isLoading={isLoading}
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Have an account already?
            </Text>
            <Link
              href="/sign-in"
              className="text-lg font-psemibold text-secondary"
            >
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
