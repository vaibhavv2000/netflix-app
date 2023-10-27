import {useEffect,useState} from "react";
import {
  View,
  Text,
  ImageBackground,
  TextInput,
  Pressable,
  TouchableOpacity,
  Platform,
} from "react-native";
import Checkbox from "expo-checkbox";
import {Ionicons} from "@expo/vector-icons";
import {Link,useNavigation} from "@react-navigation/native";
import {useMutation} from "@tanstack/react-query";
import {API} from "../utils/API";
import {AppDispatch} from "../redux/store";
import {useDispatch} from "react-redux";
import {login} from "../redux/slices/userSlice";
import * as SecureStore from "expo-secure-store";
import NotAuthWrapper from "../HOC/Wrapper";

const Login = (): JSX.Element => {
  const [email,setEmail] = useState<string>("");
  const [password,setPassword] = useState<string>("");
  const [checked,setIsChecked] = useState<boolean>(false);
  const [error,setError] = useState<string>("");
  const [pwd,setPwd] = useState<boolean>(false);

  const dispatch: AppDispatch = useDispatch();

  const navigation = useNavigation();

  type user = {email: string; password: string};

  useEffect(() => {
    if(error) setTimeout(() => setError(""),5000);
  },[error]);

  const {mutate} = useMutation({
    mutationFn: async (user: user) => await API.post("/auth/login",user),
    onSuccess: async (user: any) => {
      if(user.data.message === "Logged In") {
        dispatch(login({email,name: user.data.name}));
        await SecureStore.setItemAsync(
          "netflix-user",
          JSON.stringify({email,name: user.data.name})
        );
        navigation.navigate("Home" as never);
      }
    },
    onError: (error: any) => {
      setError(error.response.data.message);
    },
  });

  const handleLogin = async () => {
    if(!password || !email) {
      setError("All fields are required");
      return;
    }

    mutate({email,password});
  };

  return (
    <View className="flex-1 bg-red-600">
      <ImageBackground
        source={{
          uri: "https://ceotudent.com/wp-content/uploads/2020/05/netflix-poster.jpg",
        }}
        className="h-full w-full justify-center items-center"
        resizeMethod="scale"
      >
        <View
          className="w-[90%] py-7 flex-col space-y-3 items-center"
          style={{backgroundColor: "rgba(0,0,0,0.7)"}}
        >
          <Text className="text-5xl text-red-500 text-center font-inter_500 mb-3">
            Login
          </Text>
          <TextInput
            placeholder="Email"
            cursorColor={"#c4c2c2"}
            onChangeText={(text: string) => setEmail(text)}
            autoCapitalize="none"
            className="p-3 my-1 mt-3 bg-white font-inter_400 text-[14px] w-[90%]"
          />
          <View className="w-[90%] relative">
            <TextInput
              placeholder="Password"
              secureTextEntry={pwd ? false : true}
              cursorColor={"#c4c2c2"}
              onChangeText={(text: string) => setPassword(text)}
              className="p-3 pr-11 bg-white font-inter_400 text-[14px] w-full"
            />
            <View className="absolute right-0 top-0 justify-center items-center w-10 h-full">
              <Ionicons
                name={!pwd ? "eye" : "eye-off"}
                size={24}
                color="black"
                onPress={() => setPwd(!pwd)}
              />
            </View>
          </View>
          <View className="w-[90%] flex-row items-center space-x-1.5">
            <Checkbox
              value={checked}
              color={checked ? "red" : "#fff"}
              style={{transform: [{scale:0.85}]}}
              onValueChange={() => setIsChecked(!checked)}
            />
            <Text className="text-white font-inter_400 text-sm">Remember Me</Text>
          </View>
          {error && (
            <Text className="text-red-500 w-[90%] font-inter_500">{error}</Text>
          )}
          {Platform.OS === "android" ? (
            <Pressable
              className="p-3.5 bg-red-500 w-[90%] rounded-sm"
              android_ripple={{color: "#ffffffc5"}}
              onPress={() => handleLogin()}
            >
              <Text className="font-inter_600 text-[14px] text-center text-white">
                Login
              </Text>
            </Pressable>
          ) : (
            <TouchableOpacity
              className="p-4 bg-red-500 w-[90%]"
              activeOpacity={0.8}
              onPress={() => handleLogin()}
            >
              <Text className="font-inter_700 text-[17px] text-center text-white">
                Login
              </Text>
            </TouchableOpacity>
          )}

          <View className="w-[90%] -my-2 text-white justify-center flex-row items-center gap-2">
            <Text className="text-white font-inter_400">
              Don't Have an Account?
            </Text>
            <Text className="underline text-red-500">
              <Link to={"/Register"}>Register</Link>
            </Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default NotAuthWrapper(Login);
