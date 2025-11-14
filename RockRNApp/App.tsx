import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

// vega-sports-app imports
import { TranslationProvider } from '@AppServices/i18n';
import { useAuth } from '@AppServices/auth';

import { ROUTES } from '@AppSrc/navigators/constants';

import { Login } from '@AppScreens/Login';
import { SelectUserProfile } from '@AppScreens/SelectUserProfile';
import { SettingsStack } from '@AppScreens/Settings/SettingsStack';

// Rock app imports
import { HomeScreen } from './HomeScreen';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  const { isSignedIn } = useAuth();

  return (
    <SafeAreaProvider>
      <TranslationProvider>
        <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
          <NavigationContainer>
            {isSignedIn ? (
              <Stack.Navigator
                initialRouteName={ROUTES.SelectUserProfile}
                // below: since we don't mount all original screens, part of the app is missing and the missing navigator is mocked below
                UNSTABLE_router={original => ({
                  getStateForAction(state, action, options) {
                    if (action.type === 'OPEN_DRAWER') {
                      // instead of opening the non-existent sidebar (drawer), just pop the current screen off the stack
                      return {
                        ...state,
                        routes: [...state.routes].slice(0, -1),
                        index: state.index - 1,
                      };
                    }

                    return original.getStateForAction(state, action, options);
                  },
                })}
                screenOptions={{
                  headerShown: false,
                }}
              >
                <Stack.Screen name="Home" component={HomeScreen} />

                <Stack.Screen
                  name={ROUTES.Settings}
                  component={SettingsStack}
                />
                <Stack.Screen name={ROUTES.Drawer} component={HomeScreen} />

                <Stack.Screen
                  name={ROUTES.SelectUserProfile}
                  component={SelectUserProfile}
                />
              </Stack.Navigator>
            ) : (
              <Login />
            )}
          </NavigationContainer>
        </SafeAreaView>
      </TranslationProvider>
    </SafeAreaProvider>
  );
}
