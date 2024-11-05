import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import { useFonts } from 'expo-font';
import {
  OpenSans_400Regular,
  OpenSans_600SemiBold,
  OpenSans_700Bold,
} from '@expo-google-fonts/open-sans';
import {
  NotoSansEthiopic_100Thin,
  NotoSansEthiopic_200ExtraLight,
  NotoSansEthiopic_300Light,
  NotoSansEthiopic_400Regular,
  NotoSansEthiopic_500Medium,
  NotoSansEthiopic_600SemiBold,
  NotoSansEthiopic_700Bold,
  NotoSansEthiopic_800ExtraBold,
  NotoSansEthiopic_900Black,
} from '@expo-google-fonts/noto-sans-ethiopic';
import * as SplashScreen from 'expo-splash-screen';
import { router } from 'expo-router';
SplashScreen.preventAutoHideAsync();
const App = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [fontsLoaded] = useFonts({
    OpenSans_400Regular,
    OpenSans_600SemiBold,
    OpenSans_700Bold,
    NotoSansEthiopic_600SemiBold
  });
  useEffect(() => {
    setTimeout(()=>{
      router.push('/login')
    },2000)
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  const nextPage = () => {
    setCurrentPage(2);
  };

  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: '#ffffff', width: 40, height: 40, borderRadius: 150, justifyContent: 'center', alignItems: 'center', marginLeft: 'auto', marginTop: 20, marginBottom: 10 }}>
        <Entypo name="cross" size={28} color="black" />
      </View>
      <View style={styles.header}>
        <View style={{ ...styles.progressContainer, marginBottom: 20 }}>
          <View style={{ ...styles.progressBar, backgroundColor: '#ffffff' }} />
          <View style={[styles.progressBar, currentPage === 2 && { backgroundColor: '#ffffff' }]} />
        </View>
        <Text style={styles.headerText}>{currentPage === 2 ? 'Which ride do you need?' : 'What would you like to do?'}</Text>
      </View>
      {currentPage === 1 ? (
        <View style={styles.optionsContainer}>
          <TouchableOpacity style={styles.optionButton} onPress={nextPage}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image style={styles.iconImg} source={require('../assets/images/car.png')} />
              <Text style={styles.optionText}>Get ride</Text>
            </View>
            <Entypo name="chevron-thin-right" size={20} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionButton} onPress={nextPage}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image style={{ ...styles.iconImg, marginStart: 3, marginEnd: 17 }} source={require('../assets/images/delivery-box.png')} />
              <Text style={styles.optionText}>Order delievery</Text>
            </View>
            <Entypo name="chevron-thin-right" size={20} color="black" />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.optionsContainer}>
          <TouchableOpacity style={styles.optionButton} onPress={nextPage}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image style={styles.iconImg} source={require('../assets/images/car.png')} />
              <Text style={styles.optionText}>In the city</Text>
            </View>
            <Entypo name="chevron-thin-right" size={20} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionButton} onPress={nextPage}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image style={styles.iconImg} source={require('../assets/images/car (1).png')} />
              <Text style={styles.optionText}>To another city</Text>
            </View>
            <Entypo name="chevron-thin-right" size={20} color="black" />
          </TouchableOpacity>
        </View>
      )}
      {currentPage === 2 && <TouchableOpacity onPress={() => setCurrentPage(1)} style={{ backgroundColor: '#ffffff',position: 'absolute',bottom: 20,left:20, width: 50, height: 50, borderRadius: 10, justifyContent: 'center', alignItems: 'center',}}>
        <Entypo name="chevron-thin-left" size={20} color="black" />
      </TouchableOpacity>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9ed90d', // Background color matching your design
    paddingHorizontal: 20,
    paddingTop: 30,
    position: 'relative'
  },
  header: {
    marginBottom: 10,
  },
  iconImg: {
    width: 35,
    height: 35,
    marginEnd: 15,
    marginStart: 5
  },
  headerText: {
    fontSize: 24,
    fontFamily: 'OpenSans_700Bold',
    marginVertical: 15
  },
  progressContainer: {
    height: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
    borderRadius: 2,
  },
  progressBar: {
    height: '100%',
    width: '49.25%', // Half-filled indicator
    backgroundColor: '#3a3a3a',
    borderRadius: 2,
  },
  fullProgress: {
    width: '100%', // Fully filled when on the 2nd page
  },
  optionsContainer: {
    marginTop: 10,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  optionText: {
    fontSize: 17,
    fontFamily: 'NotoSansEthiopic_600SemiBold'
  },
  questionContainer: {
    marginTop: 20,
  },
  questionText: {
    fontSize: 18,
  },
});

export default App;