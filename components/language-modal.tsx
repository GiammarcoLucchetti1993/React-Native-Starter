import { Text, Modal, View, FlatList } from "react-native";
import React from "react";
import { useTranslation } from "react-i18next";
import CustomButton from "./custom-button";
import { languages } from "@/utils/languages";
import { useLanguage } from "@/providers/language-providers";

interface LanguageModalProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
}

const LanguageModal = ({
  modalVisible,
  setModalVisible,
}: LanguageModalProps) => {
  const { t } = useTranslation("modal");
  const { setLanguage } = useLanguage();

  const handlePress = (lang: string) => {
    setLanguage(lang);
    setModalVisible(!modalVisible);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View className="flex-1 justify-center mt-22 mx-12">
        <View className="rounded-xl items-center w-full h-[300px] bg-primary/90 p-6">
          <Text className="text-white font-psemibold text-lg">
            {t("title")}
          </Text>
          <FlatList
            data={Object.values(languages)}
            keyExtractor={(item) => item.index}
            renderItem={({ item }) => {
              return (
                <CustomButton
                  title={item.name}
                  handlePress={() => handlePress(item.lang)}
                  containerStyles="mt-8 w-[200px]"
                />
              );
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

export default LanguageModal;
