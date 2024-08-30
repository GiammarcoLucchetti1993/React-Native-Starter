import * as SecureStore from "expo-secure-store";

const useSecureStore = () => {
  const save = async (key: string, value: string) => {
    try {
      await SecureStore.setItemAsync(key, value);
      console.log(`Value for key "${key}" saved successfully.`);
    } catch (error) {
      console.error(`Failed to save value for key "${key}":`, error);
    }
  };

  const getValueFor = async (key: string) => {
    try {
      const result = await SecureStore.getItemAsync(key);
      if (result) {
        console.log(`Here's your value \n${result}`);
        return result;
      } else {
        console.log("No values stored under that key.");
        return null;
      }
    } catch (error) {
      console.error(`Failed to retrieve value for key "${key}":`, error);
      return null;
    }
  };

  const removeValueFor = async (key: string) => {
    try {
      await SecureStore.deleteItemAsync(key);
      console.log(`Value for key "${key}" removed successfully.`);
    } catch (error) {
      console.error(`Failed to remove value for key "${key}":`, error);
    }
  };

  return { save, getValueFor, removeValueFor };
};

export default useSecureStore;
