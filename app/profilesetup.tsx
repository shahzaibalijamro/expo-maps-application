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
import { collection, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from '@/config/firebase/config';
SplashScreen.preventAutoHideAsync();
interface User {
  email: string,
  docId : string,
  uid: string
}
export default function ConfirmInfoScreen() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userName, setUserName] = useState('');
  const [userData,setUserData] = useState<User | null>(null)
  const [image, setImage] = useState<string | null>(null);
  const [fontsLoaded] = useFonts({
    OpenSans_400Regular,
    OpenSans_600SemiBold,
    OpenSans_700Bold,
  });
  useEffect(() => {
    const getUser = async () => {
      const q = query(collection(db, "users"), where("uid", "==", auth.currentUser?.uid));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUserData({...(doc.data() as User), docId : doc.id})
      });
    };
    getUser();
  }, []);
  console.log(userData);
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
  const registerUser = () => {
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
          source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2TgOv9CMmsUzYKCcLGWPvqcpUk6HXp2mnww&s' }}
          style={styles.profileImage}
        />}
        <TouchableOpacity style={styles.addIcon} onPress={pickImage}>
          <FontAwesome name="plus" size={16} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput style={styles.input} placeholder="Enter your name"
          placeholderTextColor="#888" value={userName}
          onChangeText={setUserName} />
      </View>

      <View style={{ ...styles.disabledInputContainer, borderRadius: 10 }}>
        <Text style={{ ...styles.label, color: '#8e8e93' }}>Email</Text>
        <TextInput
          style={{ ...styles.input, color: '#8e8e93' }}
          value={userData ? userData.email : ''}
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
    color: '#bbbbbe',
    fontSize: 15,
    fontFamily: 'OpenSans_600SemiBold'
  },
  input: {
    color: '#fff',
    fontSize: 14,
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