import { useEffect, useState } from "react";
import { Alert, FlatList, Image, Platform, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import MapView, { Callout, Marker, Polyline } from "react-native-maps";
import polyline from 'polyline-encoded';
import * as Location from 'expo-location';
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
interface LocationData {
  latitude: number;
  longitude: number;
  latitudeDelta?: number;
  longitudeDelta?: number;
}

interface Place {
  fsq_id: string;
  name: string;
  location: {
    cross_street?: string;
    formatted_address?: string;
    country: string;
  };
  geocodes: {
    main: {
      latitude: number;
      longitude: number;
    };
  };
}

export default function Index() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [search, setSearch] = useState<string>('');
  const [searchedPlaceRes, setSearchedPlaceRes] = useState<Place[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(null);
  const [visibleRegion, setVisibleRegion] = useState<any>(null);
  const [routeCoordinates, setRouteCoordinates] = useState<LocationData[]>([]);
  SplashScreen.preventAutoHideAsync();
  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('465');
        if (value === null) {
          router.replace("/login")
        }else{
          (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
              Alert.alert('Permission to access location was denied');
              return;
            }
            try {
              let location = await Location.getCurrentPositionAsync({});
              setLocation(location);
              setVisibleRegion({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.007,
                longitudeDelta: 0.007,
              });
            } catch (error) {
              Alert.alert('Could not fetch location');
            }finally{
              setAppIsReady(true);
            }
          })();
        }
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  }, []);

  const goToSelectedLocation = (item: Place) => {
    setSearchedPlaceRes([]);
    setSelectedLocation({
      latitude: item.geocodes.main.latitude,
      longitude: item.geocodes.main.longitude,
    });
    setVisibleRegion({
      latitude: item.geocodes.main.latitude,
      longitude: item.geocodes.main.longitude,
      latitudeDelta: 0.007,
      longitudeDelta: 0.007,
    });
    fetch(`https://maps.gomaps.pro/maps/api/directions/json?&origin=${location?.coords.latitude},${location?.coords.longitude}&destination=${item.geocodes.main.latitude},${item.geocodes.main.longitude}&key=AlzaSyqcM2y85JecIqQm1XJgzVmfsmuKPtesB3b`)
      .then(res => res.json())
      .then(res => {
        console.log(res.routes);

        if (res.status === "OK") {
          const points = res.routes[0].overview_polyline.points;
          const decodedPoints = polyline.decode(points).map((point: any) => ({
            latitude: point[0],
            longitude: point[1],
          }));
          setRouteCoordinates(decodedPoints);
        } else {
          console.error("Directions request failed with status:", res.status);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  const getPlaces = () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'fsq3LoSdxiQR8tPtqqziL6Ki/xmy3h57IHjyUtrMs0xrVdc=',
      },
    };
    if (location) {
      fetch(`https://api.foursquare.com/v3/places/search?query=${search}&ll=${location.coords.latitude}%2C${location.coords.longitude}&radius=100000`, options)
        .then(res => res.json())
        .then(res => {
          setSearchedPlaceRes(res.results);
        })
        .catch(err => console.error(err));
    }
  };
  const dragEnd = (e: any) => {
    setSelectedLocation(e.nativeEvent.coordinate);
    fetch(`https://maps.gomaps.pro/maps/api/directions/json?&origin=${location?.coords.latitude},${location?.coords.longitude}&destination=${e.nativeEvent.coordinate.latitude},${e.nativeEvent.coordinate.longitude}&key=AlzaSyqcM2y85JecIqQm1XJgzVmfsmuKPtesB3b`)
      .then(res => res.json())
      .then(res => {
        if (res.status === "OK") {
          const points = res.routes[0].overview_polyline.points;
          const decodedPoints = polyline.decode(points).map((point: any) => ({
            latitude: point[0],
            longitude: point[1],
          }));
          setRouteCoordinates(decodedPoints);
        } else {
          console.error("Directions request failed with status:", res.status);
        }
      })
  }
  return (
    <SafeAreaView style={styles.container}>
      {location && (
        <SafeAreaView style={styles.mapContainer}>
          <TextInput
            style={[styles.input, Platform.OS === 'android' && { top: StatusBar.currentHeight ?? 20 }]}
            placeholder="Search location"
            value={search}
            onSubmitEditing={getPlaces}
            returnKeyType="done"
            onChangeText={setSearch}
            keyboardType="default"
          />
          {searchedPlaceRes.length > 0 && (
            <FlatList
              data={searchedPlaceRes}
              keyExtractor={(item) => item.fsq_id}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => goToSelectedLocation(item)}>
                  <View style={styles.itemView}>
                    <Text style={styles.itemText1}>{item.name}</Text>
                    <Text style={styles.itemText2}>
                      {item.location.cross_street || item.location.formatted_address || item.location.country}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
              style={styles.list}
            />
          )}
          <MapView
            style={styles.map}
            mapType="hybrid"
            region={visibleRegion}
          >
            {selectedLocation && (
              <Marker
                draggable
                coordinate={selectedLocation}
                onDragEnd={(e) => dragEnd(e)}
              />
            )}
            <Marker
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
              pinColor="blue"
              icon={require('../assets/images/location-80.png')}
            >
              <Callout>
                <View style={{width: 100,height:85, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ fontWeight: "500" }}>Your</Text>
                  <Text style={{ fontWeight: "500" }}>Current</Text>
                  <Text style={{ fontWeight: "500" }}>Location</Text>
                </View>
              </Callout>
            </Marker>
            {routeCoordinates.length > 0 && (
              <Polyline
                coordinates={routeCoordinates}
                strokeColor="#0f53ff"
                strokeWidth={5}
              />
            )}
          </MapView>
        </SafeAreaView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  flexRow: { justifyContent: 'flex-start', alignItems: 'flex-start' },
  mapContainer: { flex: 1, position: 'relative' },
  map: { width: '100%', height: '110%' },
  input: {
    position: 'absolute',
    marginTop: 10,
    top: 20,
    left: 15,
    right: 15,
    zIndex: 1,
    fontSize: 16,
    height: 50,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'gray',
  },
  list: {
    maxHeight: 150,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderColor: '#ddd',
    borderWidth: 1,
    position: 'absolute',
    top: 110,
    left: 15,
    right: 15,
    zIndex: 2,
  },
  itemView: { paddingVertical: 10, paddingHorizontal: 10, borderBottomWidth: 1, borderBottomColor: '#eee' },
  itemText1: { paddingBottom: 5, fontWeight: "600", fontSize: 15 },
  itemText2: { fontWeight: "400", fontSize: 12 },
});