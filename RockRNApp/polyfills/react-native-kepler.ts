import { View } from 'react-native';

export * from 'react-native';

export const useHideSplashScreenCallback = () => {
  const callback = () => {};
  callback.handler = () => {};
  return callback;
};

export const usePreventHideSplashScreen = () => {};

export const useGetCurrentKeplerAppStateCallback = () => {
  return () => {};
};

export const useAddKeplerAppStateListenerCallback = () => {
  return () => ({
    remove: () => {},
  });
};

export const TVFocusGuideView = View;

export const PushNotificationIOS = {}; // iOS-specific module placeholder
