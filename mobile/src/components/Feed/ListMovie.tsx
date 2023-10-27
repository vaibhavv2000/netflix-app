import {Image,View,Text} from "react-native";
import {TouchableOpacity} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {FontAwesome} from "@expo/vector-icons";
import {Ionicons} from "@expo/vector-icons";

import {AntDesign} from "@expo/vector-icons";
import {movie} from "./Featured";

const ListMovie = ({movie,ml}: {movie: movie; ml?: boolean}) => {
  const navigation = useNavigation();
  const item = movie;

  return (
    <TouchableOpacity
      className="flex-row items-start p-3 space-x-2"
      activeOpacity={0.8}
      // @ts-ignore
      onPress={() => navigation.push("Movie",{id: item.id})}
    >
      <Image
        source={{uri: item.thumbnail}}
        className="h-24 w-24 rounded-sm"
      />
      <View className="flex-1 w-full -mt-1">
        <View className="flex-row items-center space-x-4">
          <Text className="text-white font-inter_600">
            {item.movie_name}
          </Text>
          <View className="flex-row items-center space-x-2">
            <FontAwesome name="star" size={18} color={"gold"} />
            <Text className="text-white font-inter_500 text-[12px]">
              {item.rating}
            </Text>
          </View>
        </View>
        <Text
          className="text-white/80 font-inter_500"
          style={{flexWrap: "wrap",width: "100%"}}
        >
          {item.description.slice(0,100)}...
        </Text>
        <View className="mt-1 flex-row space-x-3">
          <View className="flex-row space-x-2 items-center">
            <AntDesign name="calendar" size={18} color={"#fff"} />
            <Text className="font-inter_400 text-[12px] text-white">
              {movie?.release_year}
            </Text>
          </View>
          <View className="flex-row items-center space-x-1">
            <Ionicons name="ios-time-outline" size={20} color="#fff" />
            <Text className="font-inter_400 text-[12px] text-white">{movie?.length}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ListMovie;
