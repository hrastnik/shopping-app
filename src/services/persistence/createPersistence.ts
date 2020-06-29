import { AsyncStorage as RNAsyncStorage } from "react-native";

export function createPersistence(AsyncStorage = RNAsyncStorage) {
  return {
    async get(key) {
      const valueString = await AsyncStorage.getItem(key);
      if (valueString === null) return undefined;
      try {
        const value = JSON.parse(valueString);
        return value;
      } catch (error) {
        console.log(
          "error parsing JSON from persistence for key",
          key,
          " value ",
          valueString
        );
        return undefined;
      }
    },

    async set(key, value) {
      if (value === undefined) return AsyncStorage.removeItem(key);
      const valueString = JSON.stringify(value);
      return AsyncStorage.setItem(key, valueString);
    },

    async clear(key) {
      return AsyncStorage.removeItem(key);
    },
  };
}

export interface PersistenceStatic
  extends ReturnType<typeof createPersistence> {}
