import { View, Text, SafeAreaView, FlatList, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { INews } from "@/lib/types/news";
import { getNews } from "@/lib/fetchers/news";
import { images } from "../../constants";
import NewsCard from "@/components/news-card";
import { useAuth } from "@/providers/auth-providers";
import { useTranslation } from "react-i18next";
import EmptyState from "@/components/empty-state";
import SearchInput from "@/components/search-input";

const Home = () => {
  const [news, setNews] = useState<INews[]>();
  const { session } = useAuth();

  // useEffect(() => {
  //   const fetchNews = async () => {
  //     const fetchedNews = await getNews({
  //       sort: "date_created",
  //       limit: 6,
  //     });
  //     if (fetchedNews) {
  //       setNews(fetchedNews);
  //     }
  //   };
  //   fetchNews();
  // }, []);

  const { t } = useTranslation("tabhome");

  return (
    <SafeAreaView className="bg-primary">
      {/* <FlatList
        data={news}
        keyExtractor={(item) => item.id}
        renderItem={(item) => <NewsCard news={item.item} />}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  {t("welcome")}
                </Text>
                {session && (
                  <Text className="text-2xl font-psemibold text-white">
                    {session.first_name}
                  </Text>
                )}
              </View>

              <View className="mt-1.5">
                <Image
                  source={images.logoSmall}
                  className="w-9 h-10"
                  resizeMode="contain"
                ></Image>
              </View>
            </View>
            <SearchInput />

            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-lg font-pregular text-gray-100 mb-3">
                Latest News
              </Text>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState title="No News Found" subtitle="No News created yet" />
        )}
      /> */}
    </SafeAreaView>
  );
};

export default Home;
