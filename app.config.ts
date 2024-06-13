import { ExpoConfig, ConfigContext } from "@expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "my-app",
  slug: "my-app",
  version: "1.0.0",
  orientation: "portrait",
  scheme: "myapp",
  platforms: ["ios", "android", "web"],
  plugins: ["expo-secure-store"],
  // altre configurazioni necessarie
});
