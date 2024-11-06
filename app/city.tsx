import React, { useEffect } from 'react';
import { View, Text,Image, StyleSheet, TouchableOpacity } from 'react-native';
import {
  OpenSans_400Regular,
  OpenSans_600SemiBold,
  OpenSans_700Bold,
} from '@expo-google-fonts/open-sans';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
SplashScreen.preventAutoHideAsync();
export default function LocationPermissionScreen() {
  const handleEnableLocation = () => {
    // Add code to request location permissions
    console.log("Location Enabled");
  };

  const handleSkip = () => {
    console.log("Skipped");
    // Navigate to the next screen or close modal
  };
  const [fontsLoaded] = useFonts({
        OpenSans_400Regular,
        OpenSans_600SemiBold,
        OpenSans_700Bold,
      });
      useEffect(() => {
        if (fontsLoaded) {
          SplashScreen.hideAsync();
        }
      }, [fontsLoaded]);

      if (!fontsLoaded) {
        return null;
      }
  return (
    <View style={styles.container}>
      {/* Illustration */}
      <View style={styles.imageContainer}>
        <Image source={require('../assets/images/undraw_Location_tracking_re_n3ok-removebg.png')} style={styles.image} />
      </View>

      {/* Title */}
      <Text style={styles.title}>Turn your location on</Text>

      {/* Description */}
      <Text style={styles.description}>
        You’ll be able to find yourself on the map, and drivers will be able to find you at the pickup point
      </Text>

      {/* Buttons */}
      <TouchableOpacity style={styles.enableButton} onPress={handleEnableLocation}>
        <Text style={styles.enableButtonText}>Enable location services</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
        <Text style={styles.skipButtonText}>Skip</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1f24', // Dark background color
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  imageContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  image: {
    width: 250, // Adjust size according to your image
    height: 250,
    resizeMode: 'contain',
  },
  title: {
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 24,
    fontFamily: 'OpenSans_700Bold',
  },
  description: {
    fontSize: 16,
    color: '#A9A9A9',
    textAlign: 'center',
    marginHorizontal: 20,
    marginBottom: 30,
  },
  enableButton: {
    backgroundColor: '#9ed90d',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  enableButtonText: {
    color: '#1A1A1A',
    fontWeight: 'bold',
    fontSize: 16,
  },
  skipButton: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#333333',
  },
  skipButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});