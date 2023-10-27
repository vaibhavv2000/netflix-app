import {useState,useEffect} from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  Pressable,
  ScrollView,
} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {Feather} from "@expo/vector-icons";
import {useSelector} from "react-redux";
import {RootState} from "../redux/store";
import {movie} from "../components/Feed/Featured";
import {useNavigation} from "@react-navigation/native";
import {Recommended} from "./Movie";
import {StatusBar} from "expo-status-bar";

const Search = (): JSX.Element => {
  const [query,setQuery] = useState<string>("");
  const [movies,setMovies] = useState<movie[]>([]);
  const [randomMovies,setRandomMovies] = useState<movie[]>();

  const movie_list = useSelector((state: RootState) => state.movie.moviesList);

  const navigation = useNavigation();

  useEffect(() => {
    if(query) {
      const filter = movie_list.filter((m) =>
        m.movie_name.toLowerCase().includes(query.toLowerCase())
      );
      setMovies(filter);
    } else {
      setMovies([]);
    }
  },[query]);

  useEffect(() => {
    let m = [...movie_list];

    setRandomMovies(m.sort((a,b) => Math.random() - 0.5).slice(0,8));
  },[]);

  return (
    <ScrollView 
     className="flex-1 bg-[#151515] py-10" 
     contentContainerStyle={{paddingBottom: 30}}
    >
      <StatusBar style="light" />
      <View className="bg-black w-[95%] flex-row items-center mx-auto p-1 px-3 rounded-sm">
        <Ionicons name="search" size={24} color={"#fff"} />
        <TextInput
          className="text-white font-inter_500 p-2.5 flex-1"
          cursorColor={"#999"}
          value={query}
          placeholderTextColor={"#999"}
          placeholder="Search Movies..."
          onChangeText={(text: string) => setQuery(text)}
        />
        <Feather name="x" size={24} color={"#fff"} onPress={() => setQuery('')} />
      </View>
      <View className="pt-3">
        <Text className="text-xl font-inter_600 mb-1 text-white/90 pl-3">Recommended Movies</Text>
        {
          randomMovies?.map((item) => <Recommended item={item} key={String(item.id)} />)
        }
      </View>
      <View className={`bg-black w-[95%] mx-auto mt-0 ${movies.length && 'border-t-0.5 border-t-gray-500'} absolute top-14 left-2.5`}>
        <ScrollView>
          {movies.map((m) => (
            <Pressable
              key={String(m.id)}
              android_ripple={{color: "rgba(255,255,255,0.15555)"}}
              className="space-x-2 flex-row items-center py-3 px-2 overflow-hidden"
              onPress={() => {
                // @ts-ignore
                navigation.navigate("Movie",{id: m.id})
              }}
            >
              <Image
                source={{uri: m.thumbnail}}
                className="h-10 w-10 rounded-md"
              />
              <View className="space-y-0">
                <Text className="text-white font-inter_700">
                  {m.movie_name}
                </Text>
                <Text className="text-white/80">
                  {m.description.slice(0,35)}...
                </Text>
              </View>
            </Pressable>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

export default Search;
