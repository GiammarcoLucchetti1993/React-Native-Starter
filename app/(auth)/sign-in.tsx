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
import { useTranslation } from "react-i18next";
import { useForm, Controller } from "react-hook-form";
import { icons } from "@/constants";
import { useAuth } from "@/providers/auth-providers";

interface FormData {
  email: string;
  password: string;
}

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    console.log(data);
    await login(data.email, data.password);
    // try {
    //   const result = await loginUser(data.email, data.password);
    //   console.log(result);
    //   if (result && result.access_token) {
    //     await save("accessToken", result.access_token);
    //     // await save("refreshToken", result.refresh_token);
    //     setIsSubmitting(false);
    //     router.replace("/home");
    //   }
    // } catch (e) {
    //   console.log("Error", e);
    //   setIsSubmitting(false);
    // }
  };

  const { t } = useTranslation("signin");
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
            {t("title")}
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
                    placeholder={t("placeholderemail")}
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
                    placeholder={t("placeholderpassword")}
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
            title={t("signin")}
            handlePress={handleSubmit(onSubmit)}
            containerStyles="mt-7"
            isLoading={isLoading}
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              {t("content")}
            </Text>
            <Link
              href="/sign-up"
              className="text-lg font-psemibold text-secondary"
            >
              {t("signup")}
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
