import {useState,useEffect} from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  ImageBackground,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import {FontAwesome} from "@expo/vector-icons";
import {LinearGradient} from "expo-linear-gradient";
import {EvilIcons} from "@expo/vector-icons";
import {Ionicons} from "@expo/vector-icons";
import {AntDesign} from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";
import {useNavigation} from "@react-navigation/native";
import {AppDispatch,RootState} from "../../redux/store";
import {useDispatch,useSelector} from "react-redux";
import {logout} from "../../redux/slices/userSlice";

export interface movie {
  description: string;
  genre: string;
  id: number;
  length: number;
  movie_name: string;
  pg: boolean;
  rating: number;
  release_year: number;
  thumbnail: string;
  title_img: string;
  type: string;
}

const Featured = (): JSX.Element => {
  const [movie,setMovie] = useState<movie>();
  const [showLogout,setShowLogout] = useState<boolean>(false);

  const navigation = useNavigation();
  const dispatch: AppDispatch = useDispatch();
  const {width} = useWindowDimensions();

  const movies = useSelector((state: RootState) => state.movie.moviesList);

  useEffect(() => {
    const m = movies[Math.floor(Math.random() * movies.length)];
    setMovie(m);
  },[movies]);

  return (
    <View className="bg-black">
      <ImageBackground
        source={{uri: movie?.thumbnail}}
        resizeMode="cover"
        className={`w-full h-full justify-between pt-10 relative`}
        style={{height: width}}
      >
        <View className="w-full flex-row items-center justify-between z-50">
          <Image
            source={{
              uri: "https://www.edigitalagency.com.au/wp-content/uploads/Netflix-N-Symbol-logo-red-transparent-RGB-png.png",
            }}
            className="h-10 w-12"
          />
          <View className="flex-row items-center gap-5 px-2 relative">
            <EvilIcons name="search" size={36} color={"#fff"} onPress={() => {
              // @ts-ignore
              navigation.navigate("Upload")
            }} />
            <TouchableOpacity onPress={() => setShowLogout(!showLogout)}>
              <Image
                source={{
                  uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQw5VvVLHprgZYPxX0ILhu6DjZynAsT31gfClQyhtO3bQ&usqp=CAU&ec=48665698",
                }}
                className="h-10 w-10"
              />
            </TouchableOpacity>
            {showLogout && (
              <Pressable
                className="bg-black/80 p-2 absolute top-11 right-2 flex-row items-center space-x-2 rounded-sm"
                onPress={async () => {
                  await SecureStore.deleteItemAsync("netflix-user");
                  dispatch(logout());
                }}
              >
                <AntDesign name="logout" size={18} color={"#fff"} />
                <Text className="text-white font-inter_600 text-[12px]">
                  Logout
                </Text>
              </Pressable>
            )}
          </View>
        </View>
        <LinearGradient
          colors={["rgba(0,0,0,0.22222)","rgba(0,0,0,0.888)"]}
          className="absolute top-0 left-0 w-full h-[420px]"
        ></LinearGradient>
        <View className="py-3 items-center">
          <Image source={{uri: movie?.title_img}} className="w-96 h-28" resizeMethod="resize" resizeMode="contain" />
          <View className="flex-row items-center space-x-3 my-6">
           <Text className="text-white font-inter_600 text-lg">{movie?.movie_name}</Text>
           <Text className="text-white font-inter_600 text-lg">|</Text>
           <Text className="text-white font-inter_600 text-lg">{movie?.genre}</Text>
           <Text className="text-white font-inter_600 text-lg">|</Text>
           <Text className="text-white font-inter_600 text-lg">{movie?.length}</Text>
          </View>
          <View className="items-center w-[100%] space-x-5 px-5 flex-row justify-evenly">
            <View className="flex-row items-center space-x-2">
              <FontAwesome name="star" size={20} color="#ffa900" />
              <Text className="font-inter_600 text-white text-[16px]">{movie?.rating}</Text>
            </View>
            <TouchableOpacity
              className="items-center flex-row p-3 px-8 rounded-sm justify-center space-x-4"
              style={{backgroundColor: "#1565C0"}}
              activeOpacity={0.7}
              onPress={() =>
                // @ts-ignore
                navigation.navigate("Movie",{id: movie.id})
              }
            >
              <FontAwesome name="play" size={20} color={"#fff"} />
              <Text className="text-white font-inter_600">Play</Text>
            </TouchableOpacity>
            <View className="flex-row space-x-2 items-center">
              <AntDesign name="calendar" size={24} color={"#fff"} />
              <Text className="font-inter_600 text-[16px] text-white">
                {movie?.release_year}
              </Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Featured;
