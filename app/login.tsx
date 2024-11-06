import React, { useEffect, useState } from 'react';
import {
  View,
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView, 
  Image } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import {
  OpenSans_400Regular,
  OpenSans_600SemiBold,
  OpenSans_700Bold,
} from '@expo-google-fonts/open-sans';
import { useFonts } from 'expo-font';
import { router } from 'expo-router';
SplashScreen.preventAutoHideAsync();
export default function JoinScreen() {
  const [phoneNumber, setPhoneNumber] = useState('');
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
  const continuewithGoogle = () =>{
    router.navigate("/register")
  }
  const continuewithPhone = () =>{
    router.push("/register")
  }
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Join us via email address</Text>
      <Text style={styles.subtitle}>We’ll mail a code to verify your phone</Text>

      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.countryPicker}>
          <Text style={styles.flag}>✉️</Text>
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor="#888"
          keyboardType="email-address"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
      </View>

      <TouchableOpacity style={styles.nextButton} onPress={continuewithPhone}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>Or login with</Text>

      <TouchableOpacity style={styles.googleButton} onPress={continuewithGoogle}>
        <Image
          source={{ uri: 'https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA' }}
          style={{ width: 20, height: 20, marginRight: 8 }}
        />
        <Text style={styles.googleButtonText}>Continue with Google</Text>
      </TouchableOpacity>


      <Text style={styles.footerText}>
        Joining our app means you agree with our <Text style={styles.linkText}>Terms of Use</Text> and <Text style={styles.linkText}>Privacy Policy</Text>
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1f24',
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 23,
    // fontWeight: 'bold',
    fontFamily: 'OpenSans_700Bold',
    color: '#ffffff',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#70737c',
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'OpenSans_400Regular'
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a2d33',
    borderRadius: 8,
    marginBottom: 20,
    width: '100%',
    paddingHorizontal: 10,
  },
  countryPicker: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10,
    paddingLeft: 5,
  },
  flag: {
    fontSize: 20,
    marginRight: 5,
  },
  input: {
    flex: 1,
    color: '#ffffff',
    paddingVertical: 10,
    fontSize: 16,
    fontFamily: 'OpenSans_400Regular'
  },
  nextButton: {
    backgroundColor: '#9ed90d',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    width: '100%',
    marginBottom: 5,
  },
  nextButtonText: {
    color: '#1c1f24',
    fontSize: 16,
    fontWeight: '600',
  },
  orText: {
    color: '#70737c',
    fontSize: 14,
    marginVertical: 15,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a2d33',
    borderRadius: 8,
    paddingVertical: 12,
    width: '100%',
    justifyContent: 'center',
    marginBottom: 20,
  },
  googleButtonText: {
    color: '#ffffff',
    fontSize: 16,
  },
  footerText: {
    fontSize: 14,
    color: '#70737c',
    textAlign: 'center',
  },
  linkText: {
    color: '#77dd76',
    textDecorationLine: 'underline',
  },
});