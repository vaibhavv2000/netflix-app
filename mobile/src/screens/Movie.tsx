import {Fragment,memo} from "react";
import {View,Text,Image,TouchableOpacity,ScrollView} from "react-native";
import Player from "../components/Movie/Player";
import {EvilIcons} from '@expo/vector-icons';
import {StatusBar} from "expo-status-bar";
import {useState,useEffect} from "react";
import {useNavigation,useRoute} from "@react-navigation/native";
import {movie} from "../components/Feed/Featured";
import {useDispatch,useSelector} from "react-redux";
import {AppDispatch,RootState} from "../redux/store";
import {AirbnbRating} from "react-native-ratings";
import {FontAwesome} from "@expo/vector-icons";
import {AntDesign} from "@expo/vector-icons";
import {Ionicons} from "@expo/vector-icons";
import {removeMovie} from "../redux/slices/movieSlice";
import {addMovieToMyList} from "../redux/slices/movieSlice";
import {API} from "../utils/API";
import * as ScreenOrientation from 'expo-screen-orientation';
import {BackHandler} from "react-native";

const Movie = (): JSX.Element => {
  const [movie,setMovie] = useState<movie>();
  const [randomMovies,setRandomMovies] = useState<movie[]>();
  const [isAdded,setIsAdded] = useState<boolean>(false);
  const [isFullScreen,setIsFullScreen] = useState<boolean>(false);

  const navigation = useNavigation();

  useEffect(() => {
    const backAction = () => {
      if(!isFullScreen) {
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP)
          .then(() => setIsFullScreen(false))
          .then(() => false);
          return false;
      } else {
        navigation.goBack();
        return true;
      }
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress',backAction);

    return () => backHandler.remove();
  },[]);

  useEffect(() => {
    // navigation.addListener("beforeRemove",(e) => {
    //   if(isFullScreen) return e.preventDefault();
    //   else return true;
    // })
    // console.log({isFullScreen})
  }, [navigation,isFullScreen]);
  
  const {id} = useRoute().params as {id: number};
  const {moviesList,myList} = useSelector((state: RootState) => state.movie);

  const dispatch: AppDispatch = useDispatch();

  const {email} = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    const movie = moviesList.find((m) => m.id === id);

    setMovie(movie);

    const list_movie = myList.find((m) => m.id === id);

    if(list_movie) setIsAdded(true);
    else setIsAdded(false);

    let m = [...moviesList];

    setRandomMovies(m.sort((a,b) => Math.random() - 0.5).slice(0,5));
  },[]);

  const handleMovie = async (like = false,id: number) => {
    const movieId = id;

    if(!like) {
      dispatch(removeMovie(movie?.id));
      setIsAdded(false);
      await API.post("/movie/removefromwishlist",{email,movieId});
    } else {
      movie && dispatch(addMovieToMyList(movie));
      setIsAdded(true);
      await API.post("/movie/addtowishlist",{email,movieId});
    }
  };

  async function changeScreenOrientation(opt: "horiz" | "vert") {
    if(opt === "horiz") {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
      setIsFullScreen(true);
    } else {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
      setIsFullScreen(false);
    };

    console.log({isFullScreen});
  };

  if(isFullScreen) return <Player isFullScreen={isFullScreen} toggleScreen={changeScreenOrientation} />

  return (
    <ScrollView className="flex-1 bg-black pt-7" contentContainerStyle={{paddingBottom: 24}}>
      <StatusBar style="light" hidden={isFullScreen} backgroundColor="#111" />
      <Fragment>
        <Player isFullScreen={isFullScreen} toggleScreen={changeScreenOrientation} />
        <View className="p-2 space-y-1.5">
          <View className="flex-row items-center justify-between">
            <Text className="text-xl font-inter_600 text-white">
              {movie?.movie_name}
            </Text>
            {!isAdded ? (
              <EvilIcons
                name="heart"
                size={28}
                color="#fff"
                onPress={() => movie && handleMovie(true,movie.id)}
              />
            ) : (
              <Ionicons
                name="md-heart-sharp"
                size={28}
                color="#E02802"
                onPress={() => movie && handleMovie(false,movie.id)}
              />
            )}
          </View>
          <View className="flex-row items-center justify-start">
            <View className="">
              <Text className="text-white/60 capitalize font-inter_500 text-[10px] px-2 py-1.5 rounded-full bg-gray-500">
                {movie?.genre}
              </Text>
            </View>
            <View className="flex-row items-center space-x-2 flex-1 justify-center">
              <AntDesign name="calendar" size={18} color={"#fff"} />
              <Text className="text-white font-inter_500 text-[12px]">
                {movie?.release_year}
              </Text>
            </View>
            <View className="flex-row items-center space-x-1 flex-1">
              <Ionicons name="time-outline" size={20} color={"#fff"} />
              <Text className="text-white font-inter_500 text-[12px]">
                {movie?.length}
              </Text>
            </View>
          </View>
          <View className="flex-row items-center space-x-2">
            <AirbnbRating
              count={5}
              defaultRating={movie?.rating}
              size={16}
              isDisabled
              showRating={false}
            />
            <Text className="text-white/90 font-inter_600 text-[14px]">
              {movie?.rating}
            </Text>
          </View>
          <Text className="font-inter_500 text-white/80">
            {movie?.description}
          </Text>
        </View>
      </Fragment>
      <View>
        {randomMovies?.map((item) => <Recommended item={item} key={String(item.id)} />)}
      </View>
    </ScrollView>
  );
};

export default Movie;

export const Recommended = memo(({item}: {item: movie}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      className="flex-row items-start p-3 space-x-2"
      activeOpacity={0.8}
      // @ts-ignore
      onPress={() => navigation.push("Movie",{id: item.id})}
    >
      <Image
        source={{uri: item.thumbnail}}
        className="h-24 w-24 rounded-md"
      />
      <View className="flex-1 w-full">
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
      </View>
    </TouchableOpacity>
  );
})