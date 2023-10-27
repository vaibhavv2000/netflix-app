import {View,Text,FlatList} from "react-native";
import {useSelector} from "react-redux";
import {RootState} from "../redux/store";
import ListMovie from "../components/Feed/ListMovie";

const MyList = (): JSX.Element => {
  const {myList} = useSelector((state: RootState) => state.movie);

  return (
    <View className="bg-[#121212] flex-1 pt-8">
      <Text className="text-white/70 font-inter_600 text-xl p-2 pl-4">My List</Text>
      <FlatList
        data={myList}
        numColumns={1}
        className="flex-1"
        renderItem={({item}) => <ListMovie movie={item} ml />}
      />
    </View>
  );
};

export default MyList;
