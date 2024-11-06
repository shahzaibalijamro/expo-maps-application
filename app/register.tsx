import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import * as SplashScreen from 'expo-splash-screen';
import {
  OpenSans_400Regular,
  OpenSans_600SemiBold,
  OpenSans_700Bold,
} from '@expo-google-fonts/open-sans';
import { useFonts } from 'expo-font';
import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
SplashScreen.preventAutoHideAsync();
export default function ConfirmInfoScreen() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [fontsLoaded] = useFonts({
    OpenSans_400Regular,
    OpenSans_600SemiBold,
    OpenSans_700Bold,
  });
  useEffect(() => {
    const prepareApp = async () => {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    };
    prepareApp();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  const registerUser = () =>{
    router.push("/city")
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <FontAwesome name="arrow-left" size={24} color="#fff" />
      </TouchableOpacity>

      <Text style={styles.header}>Confirm your information</Text>

      <View style={styles.profileContainer}>
        {image ? <Image
          source={{ uri: image }}
          style={styles.profileImage}
        /> : <Image
        source={{ uri: 'https://instagram.fkhi22-1.fna.fbcdn.net/v/t51.2885-19/458925334_1022503086235063_7228415357725335161_n.jpg?stp=dst-jpg_s150x150&_nc_ht=instagram.fkhi22-1.fna.fbcdn.net&_nc_cat=107&_nc_ohc=Ps5jUMZ6JS0Q7kNvgEpF_Bg&_nc_gid=ee7004b0d40e4e999bf80cf042311c5c&edm=ALGbJPMBAAAA&ccb=7-5&oh=00_AYDMCkcE2bFA-U7vET_cR-Kb46uQP99zxOgK2_pVv89EAg&oe=672C6994&_nc_sid=7d3ac5' }}
        style={styles.profileImage}
      />}
        <TouchableOpacity style={styles.addIcon} onPress={pickImage}>
          <FontAwesome name="plus" size={16} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput style={styles.input} value="Shahzaib Ali" />
      </View>

      <View style={{ ...styles.disabledInputContainer, borderRadius: 10 }}>
        <Text style={{ ...styles.label, color: '#8e8e93' }}>Email</Text>
        <TextInput
          style={{ ...styles.input, color: '#8e8e93' }}
          value="jamroshahzaibali69@gmail.com"
          editable={false}
        />
      </View>

      <View style={{ ...styles.inputContainer, flexDirection: 'row', alignItems: 'center', }}>
        <TouchableOpacity style={styles.countryPicker}>
          <Text style={styles.flag}>🇵🇰</Text>
          <AntDesign name="caretdown" size={10} color="#fff" />
        </TouchableOpacity>

        <TextInput
          style={{
            ...styles.input,
            flex: 1,
            color: '#ffffff',
            paddingVertical: 5,
          }}
          placeholder="Enter phone number"
          placeholderTextColor="#888"
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
      </View>

      <TouchableOpacity style={styles.nextButton} onPress={registerUser}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1f24',
    padding: 20,
    paddingTop: 80,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 30,
  },
  header: {
    fontSize: 24,
    // fontWeight: 'bold',
    fontFamily: 'OpenSans_700Bold',
    color: '#fff',
    marginBottom: 25,
    textAlign: 'left',
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 35,
    width: 120,
    marginHorizontal: 'auto'
  },
  profileImage: {
    width: 140,
    height: 140,
    borderRadius: 100,
  },
  countryPicker: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10,
    paddingLeft: 5,
  },
  addIcon: {
    position: 'absolute',
    bottom: 5,
    right: 0,
    backgroundColor: '#39d353',
    width: 28,
    height: 28,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
    paddingHorizontal: 12,
    paddingVertical: 7,
    // flexDirection: 'row',
    // alignItems: 'center',
    backgroundColor: '#2a2d33',
    borderRadius: 8,
  },
  label: {
    color: '#8e8e93',
    fontSize: 15,
    fontFamily: 'OpenSans_400Regular'
  },
  input: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'OpenSans_400Regular'
  },
  disabledInputContainer: {
    backgroundColor: '#495563',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 10,
    width: '100%',
    marginBottom: 20,
  },
  countryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2c2c2e',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  flag: {
    fontSize: 20,
    marginRight: 5,
  },
  countryCode: {
    color: '#fff',
    marginLeft: 5,
  },
  nextButton: {
    backgroundColor: '#9ed90d',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
  },
  nextButtonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'semibold',
  },
});