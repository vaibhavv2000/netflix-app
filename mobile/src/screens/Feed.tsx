import {StatusBar} from "expo-status-bar";
import {View,ScrollView} from "react-native";
import Featured from "../components/Feed/Featured";
import {API} from "../utils/API";
import {useEffect} from "react";
import Lists from "../components/Feed/Lists";
import {AppDispatch,RootState} from "../redux/store";
import {useDispatch,useSelector} from "react-redux";
import {addMovies,addToMyList} from "../redux/slices/movieSlice";

const Feed = (): JSX.Element => {
  const dispatch: AppDispatch = useDispatch();
  const {email} = useSelector((state: RootState) => state.user.user);

  const movies = useSelector((state: RootState) => state.movie.moviesList);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get(`/movie/movies`);
        const movies = await res.data;

        const res1 = await API.get(`/movie/getlist?email=${email}`);
        const wishlist = await res1.data;

        dispatch(addMovies(movies));
        dispatch(addToMyList(wishlist));
      } catch(error: any) {
        console.log(error.response.data);
      };
    };

    fetchData();
  },[]);


  if(!movies.length) return <View className="flex-1 bg-black"></View>

  return (
    <View className="flex-1 bg-[#151515]">
      <StatusBar backgroundColor="transparent" style="light" />
      <ScrollView>
        <Featured />
        {lists.map((l: string,i: number) => <Lists title={l} key={String(`r${i}`)} />)}
      </ScrollView>
    </View>
  );
};

export default Feed;

let lists = [
  "Featured Movies","New Releases","Popular Movies","Horror Thriller","Comedy Movies"
];
