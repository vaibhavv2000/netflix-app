import {StatusBar} from "expo-status-bar";
import {useState,useEffect} from "react";
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import {FontAwesome} from "@expo/vector-icons";
import {API} from "../utils/API";

var input = "text-white/90 p-2.5 bg-white/20 rounded-sm font-inter_500 mt-1";

var text = "text-white/90 font-inter_400 text-[12px]";

const Upload = (): JSX.Element => {
  const [movie,setMovie] = useState({
    thumbnail: "",
    rating: 0,
    title_img: "",
    description: "",
    length: 0.0,
    pg: false,
    type: "",
    genre: "",
    release_year: 0,
    movie_name: "",
  });
  const [error,setError] = useState<string>("");
  const [showPg,setShowPg] = useState<boolean>(false);
  const [showType,setShowType] = useState<boolean>(false);

  useEffect(() => {
    if(error) setTimeout(() => setError(""),5000);
  },[error]);

  const handleChange = (text: string | number | boolean,field: string) => {
    setMovie((p) => ({...p,[field]: text}));
  };

  const upload = async () => {
    const {
      description,
      genre,
      length,
      movie_name,
      rating,
      release_year,
      thumbnail,
      title_img,
      type,
    } = movie;

    try {
      await API.post("/movie/addmovie",{movie});
      ToastAndroid.show("Movie upload successfully",ToastAndroid.LONG);
    } catch(error: any) {
      console.log(error.response.data);
      setError(error.response.data.message);
    }
  };

  return (
    <KeyboardAvoidingView behavior="height" className="bg-[#101010] flex-1">
      <ScrollView
        className="text-white mx-auto space-y-3 w-[90%] pt-8 pb-10"
        showsVerticalScrollIndicator={false}
      >
        <StatusBar style="light" backgroundColor="#111" />
        <Text className="text-2xl font-inter_600 text-white/80">Movie upload</Text>
        <View>
          <Text className={text}>Movie Name</Text>
          <TextInput
            cursorColor={"#cdc9c9"}
            className={input}
            onChangeText={(text) => handleChange(text,"movie_name")}
          />
        </View>
        <View>
          <Text className={text}>Thumbnail</Text>
          <TextInput
            cursorColor={"#cdc9c9"}
            className={input}
            onChangeText={(text) => handleChange(text,"title_img")}
          />
        </View>
        <View>
          <Text className={text}>Title Image</Text>
          <TextInput
            cursorColor={"#cdc9c9"}
            className={input}
            onChangeText={(text) => handleChange(text,"title_img")}
          />
        </View>
        <View>
          <Text className={text}>Description</Text>
          <TextInput
            cursorColor={"#cdc9c9"}
            className={`${input}`}
            multiline
            onChangeText={(text) => handleChange(text,"description")}
          />
        </View>
        <View>
          <Text className={text}>Genre</Text>
          <TextInput
            cursorColor={"#cdc9c9"}
            className={input}
            onChangeText={(text) => handleChange(text,"genre")}
          />
        </View>
        <View>
          <Text className={text}>Released</Text>
          <TextInput
            cursorColor={"#cdc9c9"}
            className={input}
            keyboardType="number-pad"
            onChangeText={(text) => handleChange(text,"released_year")}
          />
        </View>
        <View>
          <Text className={text}>Rating</Text>
          <TextInput
            cursorColor={"#cdc9c9"}
            className={input}
            keyboardType="number-pad"
            onChangeText={(text) => handleChange(text,"rating")}
          />
        </View>
        <View>
          <Text className={text}>Length</Text>
          <TextInput
            cursorColor={"#cdc9c9"}
            className={input}
            keyboardType="number-pad"
            onChangeText={(text) => handleChange(text,"length")}
          />
        </View>
        <View className="">
          <Text className={text}>PG</Text>
          <TouchableOpacity
            className="flex-row justify-between items-center my-1 bg-white/10 p-2.5"
            onPress={() => setShowPg(!showPg)}
          >
            <Text className="font-inter_700 text-white text-[13px]">Select</Text>
            <FontAwesome
              name="sort-down"
              size={24}
              color={"#fff"}
              className=""
            />
          </TouchableOpacity>
          {showPg && (
            <View>
              <Text
                className="text-white font-inter_600 p-2 py-3 bg-white/30 border-b border-black"
                onPress={() => {
                  handleChange(true,"pg");
                  setShowPg(false);
                }}
              >
                Yes
              </Text>
              <Text
                className="text-white font-inter_600 p-2 py-3 bg-white/30"
                onPress={() => {
                  handleChange(false,"pg");
                  setShowPg(false);
                }}
              >
                No
              </Text>
            </View>
          )}
        </View>
        <View>
          <Text className={text}>Type</Text>
          <TouchableOpacity
            className="flex-row justify-between items-center my-1 bg-white/10 p-2.5"
            onPress={() => setShowType(!showType)}
          >
            <Text className="font-inter_700 text-white text-[13px]">Select</Text>
            <FontAwesome
              name="sort-down"
              size={24}
              color={"#fff"}
              className="-mt-2"
            />
          </TouchableOpacity>
          {showType && (
            <View>
              {["animation","movie","web-series"].map((t) => (
                <Text
                  className="text-white font-inter_600 p-2 py-3 bg-white/30 border-b border-black capitalize"
                  onPress={() => {
                    handleChange(t,"type");
                    setShowType(false);
                  }}
                  key={String(Math.random())}
                >
                  {t}
                </Text>
              ))}
            </View>
          )}
        </View>
        {error && (
          <View>
            <Text className="font-inter_600 text-red-600">{error}</Text>
          </View>
        )}
        <View className="flex-row justify-end">
          <TouchableOpacity
            className="bg-red-600 py-4 px-16 w-full mb-12 rounded-sm"
            activeOpacity={0.4}
            onPress={upload}
          >
            <Text className="text-white text-center font-inter_600">Upload</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Upload;
