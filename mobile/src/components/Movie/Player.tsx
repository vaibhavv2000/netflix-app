import React,{useRef,useState,memo} from "react";
import {View,Text,TouchableOpacity} from "react-native";
import {Video,ResizeMode} from "expo-av";
import Slider from "@react-native-community/slider";
import {SimpleLineIcons} from "@expo/vector-icons";
import {FontAwesome} from "@expo/vector-icons";
import {Ionicons} from "@expo/vector-icons";

const url =
  "https://player.vimeo.com/external/269971860.sd.mp4?s=a3036bd1a9f15c1b31daedad98c06a3b24cdd747&profile_id=164&oauth2_token_id=57447761";

interface props {
  toggleScreen: any;
  isFullScreen: boolean;
};

const Player = ({toggleScreen,isFullScreen}: props) => {
  const [isPlaying,setIsPlaying] = useState<boolean>(false);
  const videoRef = useRef<Video>(null);
  const [duration,setDuration] = useState<string>("00:00");
  const [currentTime,setCurrentTime] = useState<string>("00:00");
  const [progress,setProgress] = useState<number>(0);

  const getCurrentTime = (time: number) => {
    // current time
    let currentMin = Math.floor(time / 60);
    let currentSec: string | number = Math.floor(time % 60);
    if(currentSec < 10) currentSec = `0${currentSec}`;
    setCurrentTime(String(`${currentMin}:${currentSec}`));
  };

  const getDuration = (time: number) => {
    // total time
    let totalMin = Math.floor(time / 60);
    let totalSec: string | number = Math.floor(time % 60);
    if(totalSec < 10) totalSec = `0${totalSec}`;
    setDuration(String(`${totalMin}:${totalSec}`));
  };

  const getProgress = (cT: number,tT: number) => {
    let progress = (cT / tT) * 100;
    setProgress(progress);
  };

  return (
    <View className="relative">
      <Video
        ref={videoRef}
        className={`w-full ${isFullScreen ? "h-full" : "h-60"}`}
        source={{uri: url}}
        useNativeControls
        resizeMode={ResizeMode.COVER}
        isLooping={false}
        onPlaybackStatusUpdate={(status: any) => {
          getCurrentTime(status.positionMillis / 1000);
          getDuration(status.playableDurationMillis / 1000);
          getProgress(
            status.positionMillis / 1000,
            status.playableDurationMillis / 1000
          );
        }}
      />

      <View className="absolute top-0 left-0 h-full w-full">
        {/* play */}

        <View className="flex-1 justify-center items-center z-50">
          <TouchableOpacity
            className="h-8 w-8 justify-center items-center"
            onPress={() => {
              if(isPlaying) {
                setIsPlaying(false);
                videoRef.current && videoRef.current.pauseAsync();
              } else {
                setIsPlaying(true);
                videoRef.current && videoRef.current.playAsync();
              }
            }}
          >
            {!isPlaying ? (
              <FontAwesome name="play" size={24} color={"#fff"} />
            ) : (
              <Ionicons name="md-pause" size={34} color={"#fff"} />
            )}
          </TouchableOpacity>
        </View>

        {/* time */}

        <View className="flex-row items-center px-6 space-x-2 py-4 z-50">
          <Text className="text-white font-inter_400 text-[12px]">
            {currentTime}
          </Text>
          <Slider
            style={{flex: 1}}
            minimumValue={0}
            maximumValue={100}
            value={progress}
            minimumTrackTintColor="red"
            maximumTrackTintColor="#999"
            thumbTintColor="red"
          />
          <Text className="text-white font-inter_400 text-[12px] mr-3">
            {duration}
          </Text>
          <SimpleLineIcons
            name={isFullScreen ? "size-actual" : "size-fullscreen"}
            size={18}
            color="#fff"
            onPress={() => toggleScreen(isFullScreen ? "vert" : "horiz")}
          />
        </View>
      </View>
    </View>
  );
};

export default memo(Player);
