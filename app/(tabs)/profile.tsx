import { SafeAreaView } from "react-native-safe-area-context";
import { View, Image, Pressable } from "react-native";

import { icons } from "../../constants";
import LanguageModal from "@/components/language-modal";
import { useState } from "react";
import CustomButton from "@/components/custom-button";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/providers/auth-providers";

const Profile = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const { logout } = useAuth();
  const handlePress = async () => {
    await logout();
  };
  const { t } = useTranslation("home");

  return (
    <SafeAreaView className="bg-primary h-full">
      <View className="w-full flex justify-center items-center mt-6 mb-12 px-4">
        <Pressable
          onPress={handlePress}
          className="flex w-full items-end mb-10"
        >
          <Image
            source={icons.logout}
            resizeMode="contain"
            className="w-6 h-6"
          />
        </Pressable>
      </View>
      <View>
        <CustomButton
          title={t("buttonLabelTranslation")}
          handlePress={() => {
            setModalVisible(!modalVisible);
          }}
          containerStyles={"w-full mt-7"}
        />
        <LanguageModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      </View>
    </SafeAreaView>
  );
};

export default Profile;
