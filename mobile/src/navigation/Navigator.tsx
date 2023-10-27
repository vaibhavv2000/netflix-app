import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer} from "@react-navigation/native";
import Login from "../screens/Login";
import Register from "../screens/Register";
import Home from "../screens/Home";
import Movie from "../screens/Movie";
import {useSelector} from "react-redux";
import {RootState} from "../redux/store";
import {GestureHandlerRootView} from "react-native-gesture-handler";

const Stack = createNativeStackNavigator();
 
const Navigator = () => {
  const {isAuth} = useSelector((state: RootState) => state.user);

  return (
    <GestureHandlerRootView className="flex-1">
      <NavigationContainer>
        {!isAuth ? (
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </Stack.Navigator>
        ) : (
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Movie" component={Movie} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default Navigator;
