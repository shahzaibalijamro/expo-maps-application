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
      <Stack.Screen options={{headerShown : false,animation:"ios"}} name="city" />
      <Stack.Screen options={{headerShown : false,animation:"ios"}} name="confirmCity" />
      <Stack.Screen options={{headerShown : false,animation:"ios"}} name="final" />
      {/* <Stack.Screen options={{headerShown : false}} name="login" /> */}
    </Stack>
  );
}
