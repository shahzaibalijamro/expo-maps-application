import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { DrawerToggleButton } from '@react-navigation/drawer';

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Drawer>
          <Drawer.Screen
            name="index"
            options={{
              drawerLabel: 'Home',
              title: 'Overview',
              headerShown: true,
              // Display the drawer toggle button in the header
              headerLeft: () => <DrawerToggleButton />,
            }}
          />
          <Drawer.Screen
            name="logout"
            options={{
              drawerLabel: 'User',
              title: 'User',
              headerShown: true,
              headerLeft: () => <DrawerToggleButton />,
            }}
          />
        </Drawer>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}