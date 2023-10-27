import AuthWrapper from "../HOC/Wrapper";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Feed from "./Feed";
import {MaterialIcons} from '@expo/vector-icons';
import Search from "./Search";
import Upload from "./Upload";
import {Foundation} from "@expo/vector-icons";
import MyList from "./MyList";
import {EvilIcons} from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const Home = (): JSX.Element => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "black",
          borderWidth: 0,
          borderColor: "#111",
          shadowColor: "#111",
          borderTopWidth: 0,
          height: 60,
        },
        tabBarLabelStyle: {color: "#fff",fontFamily: "Inter_700Bold",marginTop: -8,marginBottom: 5},
      }}
    >
      <Tab.Screen
        name="Feed"
        component={Feed}
        options={{
          tabBarIcon: ({focused}) =>
            !focused ? (
              <Foundation name="home" size={24} color="#777" />
            ) : (
              <Foundation name="home" size={27} color={"#fff"} />
            ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({focused}) => (
            <EvilIcons name="search" size={focused ? 32 : 28} color={focused ? "#fff" : "#777"} />
          ),
        }}
      />
      <Tab.Screen
        name="Upload"
        component={Upload}
        options={{
          tabBarIcon: ({focused}) => (
            <MaterialIcons name="file-upload" size={focused ? 30 : 26} color={focused ? "#fff" : "#777"} />
          ),
        }}
      />
      <Tab.Screen
        name="MyList"
        component={MyList}
        options={{
          tabBarIcon: ({focused}) => (
            !focused ? <EvilIcons name="heart" size={28} color="#777" /> : <Foundation name="heart" size={22} color="#fff" />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AuthWrapper(Home,true);
