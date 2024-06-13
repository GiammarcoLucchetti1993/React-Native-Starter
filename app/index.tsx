import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { getUsers } from "@/lib/fetchers/users";
import { IUsers } from "@/lib/types/user";

export default function App() {
  const [users, setUsers] = useState<IUsers[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers();
        console.log(response);
        if (response.length > 0) {
          setUsers([response[0]]);
        } else {
          setUsers([]);
        }
      } catch (error) {
        console.error("Errore nel caricamento degli utenti:", error);
      }
    };

    fetchUsers();
  }, []);
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full justify-center items-center min-h-[85vh] px-4">
          <Image
            source={images.logo}
            className="w-[130px] h-[84px]"
            resizeMode="contain"
          />
          <Image
            source={images.cards}
            className="max-w-[380px] w-full h-[300px]"
            resizeMode="contain"
          />
          <View className="relative mt-5">
            <Text className="text-3xl text-white font-bold text-center">
              Discover Endless Possibilities with{" "}
              <Text className="text-secondary-200">Aora</Text>
            </Text>
            <Image
              source={images.path}
              className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
              resizeMode="contain"
            />
          </View>
          <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
            Where creativity meets innovation: embark on a journey of limitless
            exploration with Aora
          </Text>

          <CustomButton
            title={"Continue with Email"}
            handlePress={() => router.push("/sign-in")}
            containerStyles={"w-full mt-7"}
          />

          <Text>
            {users[0].name} - {users[0].lastname}
          </Text>
        </View>
        <StatusBar backgroundColor="#161622" style="light"></StatusBar>
      </ScrollView>
    </SafeAreaView>
  );
}
