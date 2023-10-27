import {useState,useEffect} from "react";
import {View,Text,FlatList,Image,Pressable} from "react-native";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import {movie} from "./Featured";
import {Gesture,GestureDetector} from "react-native-gesture-handler";
import Animated,{useAnimatedStyle,useSharedValue} from "react-native-reanimated";
import {useNavigation} from "@react-navigation/native";
import {LinearGradient} from "expo-linear-gradient";

interface props {
  title: string;
};

const Lists = (props: props): JSX.Element => {
  const [randomMovies,setRandomMovies] = useState<movie[]>([]);
  const {title} = props;
  const movies = useSelector((state: RootState) => state.movie.moviesList);

  useEffect(() => {
    const m = [...movies];
    const rm = m.sort((a,b) => Math.random() - 0.5);
    setRandomMovies(rm);
  },[movies]);

  return (
    <View className="bg-black">
      <Text className="text-white text-xl font-inter_600 pl-5 mt-3 mb-6">
        {title}
      </Text>
      <FlatList
        data={randomMovies}
        extraData={randomMovies}
        keyExtractor={(item,index) => String(Math.random())}
        renderItem={({item}) => <Movie movie={item} />}
        horizontal
        scrollEnabled
        className="px-8 pr-5 gap-4"
      />
    </View>
  );
};

export default Lists;

interface prop {
  movie: movie
};

function Movie({movie}: prop) {
  const opacity = useSharedValue(1);
  const position = useSharedValue({x: 0,y: 0});

  const {navigate} = useNavigation();

  const movieStyles = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{translateX: position.value.x},{translateY: position.value.y}],
  }));

  const Drag = Gesture.LongPress()

  return (
    <Pressable onPress={() => {
      // @ts-ignore
      navigate(`Movie`,{id: movie.id})
    }
    }>
      <GestureDetector gesture={Drag}>
        <Animated.Image
          source={{uri: movie.thumbnail}}
          style={[{height: 240,width: 160,margin: 4,borderRadius: 6},movieStyles]}
        />
      </GestureDetector>
      <LinearGradient
        colors={["rgba(0,0,0,0.22222)","rgba(0,0,0,0.222)"]}
        className="absolute top-0 left-0 w-full h-full"
      ></LinearGradient>
    </Pressable>
  );
};