import { Stack } from "expo-router";
import "../global.css";
import { enableScreens } from 'react-native-screens';
export default function RootLayout() {
  enableScreens();
  return (
    <Stack>
      <Stack.Screen options={{headerShown : false,animation:"ios"}} name="index" />
      <Stack.Screen options={{headerShown : false,animation:"ios"}} name="login" />
      <Stack.Screen options={{headerShown : false,animation:"ios"}} name="register" />
      <Stack.Screen options={{headerShown : false,animation:"ios"}} name="image" />
      {/* <Stack.Screen options={{headerShown : false}} name="login" /> */}
    </Stack>
  );
}
