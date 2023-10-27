import ErrorBoundary from "./ErrorBoundary";
import { FunctionComponent, Fragment } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Platform, SafeAreaView as IOSSafeAreaView } from "react-native";

const Wrapper = (Component: FunctionComponent, full = false) => {
  return () => {
    return (
      <ErrorBoundary>
        {full ? (
          <Component />
        ) : (
          <Fragment>
            {Platform.OS === "android" ? (
              <SafeAreaView className="flex-1">
                <Component />
              </SafeAreaView>
            ) : (
              <IOSSafeAreaView className="flex-1">
                <Component />
              </IOSSafeAreaView>
            )}
          </Fragment>
        )}
      </ErrorBoundary>
    );
  };
};

export default Wrapper;
