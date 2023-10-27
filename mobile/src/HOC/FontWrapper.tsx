import { useFonts } from "expo-font";
import {
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
} from "@expo-google-fonts/inter";
import { ActivityIndicator, View } from "react-native";
import { Fragment, ReactNode } from "react";

import { AppDispatch } from "../redux/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import * as SecureStore from "expo-secure-store";
import { login } from "../redux/slices/userSlice";

const FontWrapper = ({ children }: { children: ReactNode }): JSX.Element => {
  const [fontsLoaded] = useFonts({
    Inter_100Thin,
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
  });

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await SecureStore.getItemAsync("netflix-user");
        user && dispatch(login(JSON.parse(user)));
      } catch (error) {
        throw new Error();
      }
    };

    checkAuth();
  }, []);

  if (!fontsLoaded) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size={"large"} color={"red"} />
      </View>
    );
  }

  return <Fragment>{children}</Fragment>;
};

export default FontWrapper;
