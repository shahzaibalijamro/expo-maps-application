// import { useEffect, useState } from "react";
// import { Alert, FlatList, Image, Platform, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
// import MapView, { Callout, Marker, Polyline } from "react-native-maps";
// import polyline from 'polyline-encoded';
// import * as Location from 'expo-location';
// import * as SplashScreen from 'expo-splash-screen';
// interface LocationData {
//   latitude: number;
//   longitude: number;
//   latitudeDelta?: number;
//   longitudeDelta?: number;
// }

// interface Place {
//   fsq_id: string;
//   name: string;
//   location: {
//     cross_street?: string;
//     formatted_address?: string;
//     country: string;
//   };
//   geocodes: {
//     main: {
//       latitude: number;
//       longitude: number;
//     };
//   };
// }

// export default function Index() {
//   const [appIsReady, setAppIsReady] = useState(false);
//   const [location, setLocation] = useState<Location.LocationObject | null>(null);
//   const [search, setSearch] = useState<string>('');
//   const [searchedPlaceRes, setSearchedPlaceRes] = useState<Place[]>([]);
//   const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(null);
//   const [visibleRegion, setVisibleRegion] = useState<any>(null);
//   const [routeCoordinates, setRouteCoordinates] = useState<LocationData[]>([]);
//   SplashScreen.preventAutoHideAsync();
//   useEffect(() => {
//     (async () => {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== 'granted') {
//         Alert.alert('Permission to access location was denied');
//         return;
//       }
//       try {
//         let location = await Location.getCurrentPositionAsync({});
//         setLocation(location);
//         setVisibleRegion({
//           latitude: location.coords.latitude,
//           longitude: location.coords.longitude,
//           latitudeDelta: 0.007,
//           longitudeDelta: 0.007,
//         });
//       } catch (error) {
//         Alert.alert('Could not fetch location');
//       }finally{
//         setAppIsReady(true);
//       }
//     })();
//   }, []);

//   const goToSelectedLocation = (item: Place) => {
//     setSearchedPlaceRes([]);
//     setSelectedLocation({
//       latitude: item.geocodes.main.latitude,
//       longitude: item.geocodes.main.longitude,
//     });
//     setVisibleRegion({
//       latitude: item.geocodes.main.latitude,
//       longitude: item.geocodes.main.longitude,
//       latitudeDelta: 0.007,
//       longitudeDelta: 0.007,
//     });
//     fetch(`https://maps.gomaps.pro/maps/api/directions/json?&origin=${location?.coords.latitude},${location?.coords.longitude}&destination=${item.geocodes.main.latitude},${item.geocodes.main.longitude}&key=AlzaSyqcM2y85JecIqQm1XJgzVmfsmuKPtesB3b`)
//       .then(res => res.json())
//       .then(res => {
//         console.log(res.routes);

//         if (res.status === "OK") {
//           const points = res.routes[0].overview_polyline.points;
//           const decodedPoints = polyline.decode(points).map((point: any) => ({
//             latitude: point[0],
//             longitude: point[1],
//           }));
//           setRouteCoordinates(decodedPoints);
//         } else {
//           console.error("Directions request failed with status:", res.status);
//         }
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   };
//   const getPlaces = () => {
//     const options = {
//       method: 'GET',
//       headers: {
//         accept: 'application/json',
//         Authorization: 'fsq3LoSdxiQR8tPtqqziL6Ki/xmy3h57IHjyUtrMs0xrVdc=',
//       },
//     };
//     if (location) {
//       fetch(`https://api.foursquare.com/v3/places/search?query=${search}&ll=${location.coords.latitude}%2C${location.coords.longitude}&radius=100000`, options)
//         .then(res => res.json())
//         .then(res => {
//           setSearchedPlaceRes(res.results);
//         })
//         .catch(err => console.error(err));
//     }
//   };
//   const dragEnd = (e: any) => {
//     setSelectedLocation(e.nativeEvent.coordinate);
//     fetch(`https://maps.gomaps.pro/maps/api/directions/json?&origin=${location?.coords.latitude},${location?.coords.longitude}&destination=${e.nativeEvent.coordinate.latitude},${e.nativeEvent.coordinate.longitude}&key=AlzaSyqcM2y85JecIqQm1XJgzVmfsmuKPtesB3b`)
//       .then(res => res.json())
//       .then(res => {
//         if (res.status === "OK") {
//           const points = res.routes[0].overview_polyline.points;
//           const decodedPoints = polyline.decode(points).map((point: any) => ({
//             latitude: point[0],
//             longitude: point[1],
//           }));
//           setRouteCoordinates(decodedPoints);
//         } else {
//           console.error("Directions request failed with status:", res.status);
//         }
//       })
//   }
//   return (
//     <SafeAreaView style={styles.container}>
//       {location && (
//         <SafeAreaView style={styles.mapContainer}>
//           <TextInput
//             style={[styles.input, Platform.OS === 'android' && { top: StatusBar.currentHeight ?? 20 }]}
//             placeholder="Search location"
//             value={search}
//             onSubmitEditing={getPlaces}
//             returnKeyType="done"
//             onChangeText={setSearch}
//             keyboardType="default"
//           />
//           {searchedPlaceRes.length > 0 && (
//             <FlatList
//               data={searchedPlaceRes}
//               keyExtractor={(item) => item.fsq_id}
//               renderItem={({ item }) => (
//                 <TouchableOpacity onPress={() => goToSelectedLocation(item)}>
//                   <View style={styles.itemView}>
//                     <Text style={styles.itemText1}>{item.name}</Text>
//                     <Text style={styles.itemText2}>
//                       {item.location.cross_street || item.location.formatted_address || item.location.country}
//                     </Text>
//                   </View>
//                 </TouchableOpacity>
//               )}
//               style={styles.list}
//             />
//           )}
//           <MapView
//             style={styles.map}
//             mapType="hybrid"
//             region={visibleRegion}
//           >
//             {selectedLocation && (
//               <Marker
//                 draggable
//                 coordinate={selectedLocation}
//                 onDragEnd={(e) => dragEnd(e)}
//               />
//             )}
//             <Marker
//               coordinate={{
//                 latitude: location.coords.latitude,
//                 longitude: location.coords.longitude,
//               }}
//               pinColor="blue"
//               icon={require('../assets/images/location-80.png')}
//             >
//               <Callout>
//                 <View style={{width: 100,height:85, justifyContent: 'center', alignItems: 'center' }}>
//                   <Text style={{ fontWeight: "500" }}>Your</Text>
//                   <Text style={{ fontWeight: "500" }}>Current</Text>
//                   <Text style={{ fontWeight: "500" }}>Location</Text>
//                 </View>
//               </Callout>
//             </Marker>
//             {routeCoordinates.length > 0 && (
//               <Polyline
//                 coordinates={routeCoordinates}
//                 strokeColor="#0f53ff"
//                 strokeWidth={5}
//               />
//             )}
//           </MapView>
//         </SafeAreaView>
//       )}
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1 },
//   flexRow: { justifyContent: 'flex-start', alignItems: 'flex-start' },
//   mapContainer: { flex: 1, position: 'relative' },
//   map: { width: '100%', height: '110%' },
//   input: {
//     position: 'absolute',
//     marginTop: 10,
//     top: 20,
//     left: 15,
//     right: 15,
//     zIndex: 1,
//     fontSize: 16,
//     height: 50,
//     paddingHorizontal: 20,
//     backgroundColor: 'white',
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: 'gray',
//   },
//   list: {
//     maxHeight: 150,
//     backgroundColor: '#fff',
//     borderRadius: 5,
//     borderColor: '#ddd',
//     borderWidth: 1,
//     position: 'absolute',
//     top: 110,
//     left: 15,
//     right: 15,
//     zIndex: 2,
//   },
//   itemView: { paddingVertical: 10, paddingHorizontal: 10, borderBottomWidth: 1, borderBottomColor: '#eee' },
//   itemText1: { paddingBottom: 5, fontWeight: "600", fontSize: 15 },
//   itemText2: { fontWeight: "400", fontSize: 12 },
// });







// import { View, Text, StyleSheet } from 'react-native';
// import React, { useEffect } from 'react';
// import * as SplashScreen from 'expo-splash-screen';
// import {
//   OpenSans_400Regular,
//   OpenSans_600SemiBold,
//   OpenSans_700Bold,
// } from '@expo-google-fonts/open-sans';
// import { useFonts } from 'expo-font';
// SplashScreen.preventAutoHideAsync();

// const Index = () => {
//   const [fontsLoaded] = useFonts({
//     OpenSans_400Regular,
//     OpenSans_600SemiBold,
//     OpenSans_700Bold,
//   });

//   useEffect(() => {
//     if (fontsLoaded) {
//       SplashScreen.hideAsync();
//     }
//   }, [fontsLoaded]);

//   if (!fontsLoaded) {
//     return null;
//   }

//   return (
//     <View style={styles.outerMostView}>
//       <View>
//         <Text style={styles.topMostText}>Join us via phone number</Text>
//         <Text style={styles.regularText}>We'll text a code to verify your phone</Text>
//       </View>
//     </View>
//   );
// };

// export default Index;

// const styles = StyleSheet.create({
//   outerMostView: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#1c1f24',
//   },
//   topMostText: {
//     fontSize: 27,
//     textAlign: 'center',
//     color: '#ffffff',
//     fontFamily: 'OpenSans_700Bold',
//   },
//   regularText: {
//     marginTop: 6,
//     fontSize: 18,
//     color: '#70737c',
//     textAlign: 'center',
//     fontFamily: 'OpenSans_400Regular',
//   },
//   semiBoldText: {
//     fontSize: 20,
//     color: '#ffffff',
//     fontFamily: 'OpenSans_600SemiBold',
//   },
//   boldText: {
//     fontSize: 20,
//     color: '#ffffff',
//     fontFamily: 'OpenSans_700Bold',
//   },
// });















































// import React, { useEffect, useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Image } from 'react-native';
// import * as SplashScreen from 'expo-splash-screen';
// import { FontAwesome } from '@expo/vector-icons';
// import AntDesign from '@expo/vector-icons/AntDesign';
// import {
//   OpenSans_400Regular,
//   OpenSans_600SemiBold,
//   OpenSans_700Bold,
// } from '@expo-google-fonts/open-sans';
// import { useFonts } from 'expo-font';
// SplashScreen.preventAutoHideAsync();
// export default function JoinScreen() {
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [fontsLoaded] = useFonts({
//     OpenSans_400Regular,
//     OpenSans_600SemiBold,
//     OpenSans_700Bold,
//   });

//   useEffect(() => {
//     if (fontsLoaded) {
//       SplashScreen.hideAsync();
//     }
//   }, [fontsLoaded]);

//   if (!fontsLoaded) {
//     return null;
//   }
//   return (
//     <SafeAreaView style={styles.container}>
//       <Text style={styles.title}>Join us via phone number</Text>
//       <Text style={styles.subtitle}>We’ll text a code to verify your phone</Text>

//       <View style={styles.inputContainer}>
//         <TouchableOpacity style={styles.countryPicker}>
//           <Text style={styles.flag}>🇵🇰</Text>
//           {/* <FontAwesome name="chevron-down" size={12} color="#fff" /> */}
//           <AntDesign name="caretdown" size={12} color="#fff" />
//         </TouchableOpacity>

//         <TextInput
//           style={styles.input}
//           placeholder="Enter phone number"
//           placeholderTextColor="#888"
//           keyboardType="phone-pad"
//           value={phoneNumber}
//           onChangeText={setPhoneNumber}
//         />
//       </View>

//       <TouchableOpacity style={styles.nextButton}>
//         <Text style={styles.nextButtonText}>Next</Text>
//       </TouchableOpacity>

//       <Text style={styles.orText}>Or login with</Text>

//       <TouchableOpacity style={styles.googleButton}>
//         <Image
//           source={{ uri: 'https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA' }}
//           style={{ width: 20, height: 20, marginRight: 8 }}
//         />
//         <Text style={styles.googleButtonText}>Continue with Google</Text>
//       </TouchableOpacity>


//       <Text style={styles.footerText}>
//         Joining our app means you agree with our <Text style={styles.linkText}>Terms of Use</Text> and <Text style={styles.linkText}>Privacy Policy</Text>
//       </Text>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#1c1f24',
//     paddingHorizontal: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 23,
//     // fontWeight: 'bold',
//     fontFamily: 'OpenSans_700Bold',
//     color: '#ffffff',
//     marginBottom: 8,
//     textAlign: 'center',
//   },
//   subtitle: {
//     fontSize: 16,
//     color: '#70737c',
//     marginBottom: 20,
//     textAlign: 'center',
//     fontFamily: 'OpenSans_400Regular'
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#2a2d33',
//     borderRadius: 8,
//     marginBottom: 20,
//     width: '100%',
//     paddingHorizontal: 10,
//   },
//   countryPicker: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingRight: 10,
//     paddingLeft: 5,
//   },
//   flag: {
//     fontSize: 20,
//     marginRight: 5,
//   },
//   input: {
//     flex: 1,
//     color: '#ffffff',
//     paddingVertical: 10,
//     fontSize: 16,
//   },
//   nextButton: {
//     backgroundColor: '#77dd76',
//     borderRadius: 8,
//     paddingVertical: 12,
//     alignItems: 'center',
//     width: '100%',
//     marginBottom: 5,
//   },
//   nextButtonText: {
//     color: '#1c1f24',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   orText: {
//     color: '#70737c',
//     fontSize: 14,
//     marginVertical: 15,
//   },
//   googleButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#2a2d33',
//     borderRadius: 8,
//     paddingVertical: 12,
//     width: '100%',
//     justifyContent: 'center',
//     marginBottom: 20,
//   },
//   googleButtonText: {
//     color: '#ffffff',
//     fontSize: 16,
//   },
//   footerText: {
//     fontSize: 14,
//     color: '#70737c',
//     textAlign: 'center',
//   },
//   linkText: {
//     color: '#77dd76',
//     textDecorationLine: 'underline',
//   },
// });




// import React, { useEffect, useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
// import { AntDesign, FontAwesome } from '@expo/vector-icons';
// import * as SplashScreen from 'expo-splash-screen';
// import {
//   OpenSans_400Regular,
//   OpenSans_600SemiBold,
//   OpenSans_700Bold,
// } from '@expo-google-fonts/open-sans';
// import { useFonts } from 'expo-font';
// SplashScreen.preventAutoHideAsync();
// export default function ConfirmInfoScreen() {
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [fontsLoaded] = useFonts({
//     OpenSans_400Regular,
//     OpenSans_600SemiBold,
//     OpenSans_700Bold,
//   });
//   useEffect(() => {
//     if (fontsLoaded) {
//       SplashScreen.hideAsync();
//     }
//   }, [fontsLoaded]);

//   if (!fontsLoaded) {
//     return null;
//   }
//   return (
//     <View style={styles.container}>
//       <TouchableOpacity style={styles.backButton}>
//         <FontAwesome name="arrow-left" size={24} color="#fff" />
//       </TouchableOpacity>

//       <Text style={styles.header}>Confirm your information</Text>

//       <View style={styles.profileContainer}>
//         <Image
//           source={{ uri: 'https://instagram.fkhi22-1.fna.fbcdn.net/v/t51.2885-19/458925334_1022503086235063_7228415357725335161_n.jpg?stp=dst-jpg_s150x150&_nc_ht=instagram.fkhi22-1.fna.fbcdn.net&_nc_cat=107&_nc_ohc=Ps5jUMZ6JS0Q7kNvgEpF_Bg&_nc_gid=ee7004b0d40e4e999bf80cf042311c5c&edm=ALGbJPMBAAAA&ccb=7-5&oh=00_AYDMCkcE2bFA-U7vET_cR-Kb46uQP99zxOgK2_pVv89EAg&oe=672C6994&_nc_sid=7d3ac5' }} // Replace with the user's profile image URL
//           style={styles.profileImage}
//         />
//         <TouchableOpacity style={styles.addIcon}>
//           <FontAwesome name="plus" size={16} color="#fff" />
//         </TouchableOpacity>
//       </View>

//       <View style={styles.inputContainer}>
//         <Text style={styles.label}>Name</Text>
//         <TextInput style={styles.input} value="Shahzaib Ali" editable={false} />
//       </View>

//       <View style={{ ...styles.disabledInputContainer, borderRadius: 10 }}>
//         <Text style={{ color: '#8e8e93' }}>Email</Text>
//         <TextInput
//           style={{ color: '#8e8e93' }}
//           value="jamroshahzaibali69@gmail.com"
//           editable={false}
//         />
//       </View>

//       <View style={{ ...styles.inputContainer, flexDirection: 'row', alignItems: 'center', }}>
//         <TouchableOpacity style={styles.countryPicker}>
//           <Text style={styles.flag}>🇵🇰</Text>
//           <AntDesign name="caretdown" size={10} color="#fff" />
//         </TouchableOpacity>

//         <TextInput
//           style={{
//             ...styles.input,
//             flex: 1,
//             color: '#ffffff',
//             paddingVertical: 5,
//             fontSize: 14,
//           }}
//           placeholder="Enter phone number"
//           placeholderTextColor="#888"
//           keyboardType="phone-pad"
//           value={phoneNumber}
//           onChangeText={setPhoneNumber}
//         />
//       </View>

//       <TouchableOpacity style={styles.nextButton}>
//         <Text style={styles.nextButtonText}>Next</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#1c1f24',
//     padding: 20,
//     paddingTop: 80,
//   },
//   backButton: {
//     alignSelf: 'flex-start',
//     marginBottom: 20,
//   },
//   header: {
//     fontSize: 24,
//     // fontWeight: 'bold',
//     fontFamily: 'OpenSans_700Bold',
//     color: '#fff',
//     marginBottom: 20,
//     textAlign: 'left',
//   },
//   profileContainer: {
//     alignItems: 'center',
//     marginBottom: 30,
//     width: 120,
//     marginHorizontal: 'auto'
//   },
//   profileImage: {
//     width: 140,
//     height: 140,
//     borderRadius: 100,
//   },
//   countryPicker: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingRight: 10,
//     paddingLeft: 5,
//   },
//   addIcon: {
//     position: 'absolute',
//     bottom: 5,
//     right: 0,
//     backgroundColor: '#39d353',
//     width: 28,
//     height: 28,
//     borderRadius: 30,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   inputContainer: {
//     width: '100%',
//     marginBottom: 20,
//     paddingHorizontal: 12,
//     paddingVertical: 7,
//     // flexDirection: 'row',
//     // alignItems: 'center',
//     backgroundColor: '#2a2d33',
//     borderRadius: 8,
//   },
//   label: {
//     color: '#8e8e93',
//   },
//   input: {
//     color: '#fff',
//   },
//   disabledInputContainer: {
//     backgroundColor: '#495563',
//     paddingHorizontal: 12,
//     paddingVertical: 7,
//     borderRadius: 10,
//     width: '100%',
//     marginBottom: 20,
//   },
//   countryContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#2c2c2e',
//     paddingHorizontal: 10,
//     paddingVertical: 10,
//     borderRadius: 5,
//     marginRight: 10,
//   },
//   flag: {
//     fontSize: 20,
//     marginRight: 5,
//   },
//   countryCode: {
//     color: '#fff',
//     marginLeft: 5,
//   },
//   nextButton: {
//     backgroundColor: '#9ed90d',
//     paddingVertical: 15,
//     paddingHorizontal: 30,
//     borderRadius: 5,
//     alignItems: 'center',
//     width: '100%',
//   },
//   nextButtonText: {
//     color: 'black',
//     fontSize: 18,
//     fontWeight: 'semibold',
//   },
// });




// import React, { useEffect } from 'react';
// import { View, Text, Button, Image, StyleSheet, TouchableOpacity } from 'react-native';
// import {
//   OpenSans_400Regular,
//   OpenSans_600SemiBold,
//   OpenSans_700Bold,
// } from '@expo-google-fonts/open-sans';
// import { useFonts } from 'expo-font';
// import * as SplashScreen from 'expo-splash-screen';
// SplashScreen.preventAutoHideAsync();
// export default function LocationPermissionScreen() {
//   const handleEnableLocation = () => {
//     // Add code to request location permissions
//     console.log("Location Enabled");
//   };

//   const handleSkip = () => {
//     console.log("Skipped");
//     // Navigate to the next screen or close modal
//   };
//   const [fontsLoaded] = useFonts({
//         OpenSans_400Regular,
//         OpenSans_600SemiBold,
//         OpenSans_700Bold,
//       });
//       useEffect(() => {
//         if (fontsLoaded) {
//           SplashScreen.hideAsync();
//         }
//       }, [fontsLoaded]);

//       if (!fontsLoaded) {
//         return null;
//       }
//   return (
//     <View style={styles.container}>
//       {/* Illustration */}
//       <View style={styles.imageContainer}>
//         <Image source={require('../assets/images/undraw_Location_tracking_re_n3ok-removebg.png')} style={styles.image} />
//       </View>

//       {/* Title */}
//       <Text style={styles.title}>Turn your location on</Text>

//       {/* Description */}
//       <Text style={styles.description}>
//         You’ll be able to find yourself on the map, and drivers will be able to find you at the pickup point
//       </Text>

//       {/* Buttons */}
//       <TouchableOpacity style={styles.enableButton} onPress={handleEnableLocation}>
//         <Text style={styles.enableButtonText}>Enable location services</Text>
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
//         <Text style={styles.skipButtonText}>Skip</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#1c1f24', // Dark background color
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 20,
//   },
//   imageContainer: {
//     marginBottom: 20,
//     alignItems: 'center',
//   },
//   image: {
//     width: 250, // Adjust size according to your image
//     height: 250,
//     resizeMode: 'contain',
//   },
//   title: {
//     color: '#FFFFFF',
//     textAlign: 'center',
//     marginBottom: 10,
//     fontSize: 24,
//     fontFamily: 'OpenSans_700Bold',
//   },
//   description: {
//     fontSize: 16,
//     color: '#A9A9A9',
//     textAlign: 'center',
//     marginHorizontal: 20,
//     marginBottom: 30,
//   },
//   enableButton: {
//     backgroundColor: '#9ed90d',
//     paddingVertical: 15,
//     paddingHorizontal: 30,
//     borderRadius: 5,
//     width: '100%',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   enableButtonText: {
//     color: '#1A1A1A',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
//   skipButton: {
//     paddingVertical: 15,
//     paddingHorizontal: 30,
//     borderRadius: 5,
//     width: '100%',
//     alignItems: 'center',
//     backgroundColor: '#333333',
//   },
//   skipButtonText: {
//     color: '#FFFFFF',
//     fontSize: 16,
//   },
// });


// import React, { useEffect } from 'react';
// import { View, Text, Button, Image, StyleSheet, TouchableOpacity } from 'react-native';
// import {
//   OpenSans_400Regular,
//   OpenSans_600SemiBold,
//   OpenSans_700Bold,
// } from '@expo-google-fonts/open-sans';
// import { useFonts } from 'expo-font';
// import { NotoSansEthiopic_100Thin,
//   NotoSansEthiopic_200ExtraLight,
//   NotoSansEthiopic_300Light,
//   NotoSansEthiopic_400Regular,
//   NotoSansEthiopic_500Medium,
//   NotoSansEthiopic_600SemiBold,
//   NotoSansEthiopic_700Bold,
//   NotoSansEthiopic_800ExtraBold,
//   NotoSansEthiopic_900Black, } from '@expo-google-fonts/noto-sans-ethiopic';
// import * as SplashScreen from 'expo-splash-screen';
// SplashScreen.preventAutoHideAsync();
// export default function LocationPermissionScreen() {
//   const handleEnableLocation = () => {
//     // Add code to request location permissions
//     console.log("Location Enabled");
//   };

//   const handleSkip = () => {
//     console.log("Skipped");
//     // Navigate to the next screen or close modal
//   };
//   const [fontsLoaded] = useFonts({
//     OpenSans_400Regular,
//     OpenSans_600SemiBold,
//     OpenSans_700Bold,
//     NotoSansEthiopic_400Regular,
//     NotoSansEthiopic_500Medium,
//     NotoSansEthiopic_600SemiBold,
//     NotoSansEthiopic_700Bold,
//   });
//   useEffect(() => {
//     if (fontsLoaded) {
//       SplashScreen.hideAsync();
//     }
//   }, [fontsLoaded]);

//   if (!fontsLoaded) {
//     return null;
//   }
//   return (
//     <View style={styles.container}>
//       {/* Illustration */}
//       <View style={styles.imageContainer}>
//         <Image source={require('../assets/images/undraw_My_current_location_re_whmt (2).png')} style={styles.image} />
//         <Text style={styles.title}>Are you in Karachi?</Text>
//       </View>

//       {/* Buttons */}
//       <View style={{ width: '100%' }}>
//         <TouchableOpacity style={styles.enableButton} onPress={handleEnableLocation}>
//           <Text style={styles.enableButtonText}>Yes, I'm here</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
//           <Text style={styles.skipButtonText}>No</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#1c1f24', // Dark background color
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     padding: 20,
//   },
//   imageContainer: {
//     marginBottom: 180,
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   image: {
//     width: 250, // Adjust size according to your image
//     height: 250,
//     resizeMode: 'contain',
//   },
//   title: {
//     color: '#FFFFFF',
//     textAlign: 'center',
//     marginBottom: 40,
//     fontSize: 24,
//     fontFamily: 'OpenSans_700Bold',
//   },
//   description: {
//     fontSize: 16,
//     color: '#A9A9A9',
//     textAlign: 'center',
//     marginHorizontal: 20,
//     marginBottom: 30,
//   },
//   enableButton: {
//     backgroundColor: '#9ed90d',
//     paddingVertical: 15,
//     paddingHorizontal: 30,
//     borderRadius: 10,
//     width: '100%',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   enableButtonText: {
//     color: '#2d3d2c',
//     // fontFamily: 'OpenSans_600SemiBold',
//     fontFamily: 'NotoSansEthiopic_600SemiBold',
//     fontSize: 16,
//   },
//   skipButton: {
//     paddingVertical: 15,
//     paddingHorizontal: 30,
//     borderRadius: 10,
//     width: '100%',
//     alignItems: 'center',
//     backgroundColor: '#333333',
//   },
//   skipButtonText: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     fontFamily: 'NotoSansEthiopic_600SemiBold',
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//   },
// });


import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import { useFonts } from 'expo-font';
import {
  OpenSans_400Regular,
  OpenSans_600SemiBold,
  OpenSans_700Bold,
} from '@expo-google-fonts/open-sans';
import * as SplashScreen from 'expo-splash-screen';
SplashScreen.preventAutoHideAsync();
const App = () => {
  const [currentPage, setCurrentPage] = useState(1);
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
  const nextPage = () => {
    setCurrentPage(2);
  };

  return (
    <View style={styles.container}>
      <View style={{backgroundColor: '#ffffff',width: 40,height:40,borderRadius: 150,justifyContent:'center',alignItems:'center',marginLeft: 'auto',marginTop:20,marginBottom:10}}>
        <Entypo name="cross" size={28} color="black" />
      </View>
      <View style={styles.header}>
        <View style={{...styles.progressContainer,marginBottom:20}}>
          <View style={[styles.progressBar, currentPage === 2 && styles.fullProgress]} />
        </View>
        <Text style={styles.headerText}>What would you like to do?</Text>
      </View>
      {currentPage === 1 ? (
        <View style={styles.optionsContainer}>
          <TouchableOpacity style={styles.optionButton} onPress={nextPage}>
            <Text style={{fontSize:37,marginTop:-20,marginRight:15}}>🚗</Text>
            <Text style={styles.optionText}>Get ride</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionButton} onPress={nextPage}>
            <Text style={{fontSize:30,marginTop:-5,marginRight:25}}>📦</Text>
            <Text style={styles.optionText}>Order delivery</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>Where would you like the delivery?</Text>
          {/* Additional questions or inputs can go here */}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9ed90d', // Background color matching your design
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    marginBottom: 10,
  },
  headerText: {
    fontSize: 24,
    fontFamily: 'OpenSans_700Bold',
  },
  progressContainer: {
    height: 5,
    backgroundColor: '#3a3a3a',
    marginTop: 10,
    borderRadius: 2,
  },
  progressBar: {
    height: '100%',
    width: '50%', // Half-filled indicator
    backgroundColor: '#ffffff',
    borderRadius: 2,
  },
  fullProgress: {
    width: '100%', // Fully filled when on the 2nd page
  },
  optionsContainer: {
    marginTop: 20,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
  },
  optionText: {
    fontSize: 18,
  },
  questionContainer: {
    marginTop: 20,
  },
  questionText: {
    fontSize: 18,
  },
});

export default App;