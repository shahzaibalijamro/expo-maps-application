import { Stack } from "expo-router";
import "../global.css";
import { enableScreens } from 'react-native-screens';
enableScreens();
export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen options={{headerShown : false}} name="index" />
      <Stack.Screen options={{headerShown : false}} name="login" />
      <Stack.Screen options={{headerShown : false}} name="register" />
      {/* <Stack.Screen options={{headerShown : false}} name="login" /> */}
    </Stack>
  );
}
