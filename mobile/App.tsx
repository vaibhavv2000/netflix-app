import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import FontWrapper from "./src/HOC/FontWrapper";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "react-native-gesture-handler";
import Navigator from "./src/navigation/Navigator";

const client = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={client}>
      <Provider store={store}>
        <FontWrapper>
          <StatusBar style="light" backgroundColor="#111" />
          <Navigator />
        </FontWrapper>
      </Provider>
    </QueryClientProvider>
  );
};