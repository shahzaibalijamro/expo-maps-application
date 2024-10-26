import { useEffect, useState } from "react";
import { FlatList, Platform, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from 'expo-location';

export default function Index() {
  const [location, setLocation] = useState<null | any>(null);
  const [errorMsg, setErrorMsg] = useState<null | string>(null);
  const [search, setSearch] = useState<string>('')
  const [searchedPlaceRes, setSearchedPlaceRes] = useState<object[]>([])
  const relatedSearches = ['1','2','3','4','5','6']
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);
  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }
  const getPlaces = () => {
    console.log(search);
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'fsq3LoSdxiQR8tPtqqziL6Ki/xmy3h57IHjyUtrMs0xrVdc='
      }
    };
    fetch(`https://api.foursquare.com/v3/places/search?query=${search}&ll=${location.coords.latitude}%2C${location.coords.longitude}&radius=100000`, options)
      .then(res => res.json())
      .then(res => {
        setSearchedPlaceRes(res.results)
      })
      .catch(err => console.error(err));
  }
  console.log(searchedPlaceRes);
  return (
    <SafeAreaView style={styles.container}>
      {location && (
        <SafeAreaView style={styles.mapContainer}>
          <TextInput
            style={[styles.input, Platform.OS === 'android' && { top: StatusBar.currentHeight ?? 20 }]}
            placeholder="Seach location"
            value={search}
            onSubmitEditing={getPlaces}
            returnKeyType="done"
            onChangeText={setSearch}
            keyboardType="default"
          />
          {searchedPlaceRes.length > 0 && searchedPlaceRes.map((item,index) =>{
            return <FlatList
            data={relatedSearches}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity>
                <Text style={styles.itemText}>{item}</Text>
              </TouchableOpacity>
            )}
            style={styles.list}
          />
          })}
          <MapView
            style={styles.map}
            mapType="hybrid"
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            }}
          >
            <Marker
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
            />
          </MapView>
        </SafeAreaView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
  },
  map: {
    width: '100%',
    height: '100%',
  },
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
  },list: {
    maxHeight: 150, // Limits the height of the list
    backgroundColor: '#fff',
    borderRadius: 5,
    borderColor: '#ddd',
    borderWidth: 1,
    position: 'absolute',
    top: 110,  // Adjust position below TextInput
    left: 15,
    right: 15,
    zIndex: 2
  },
  itemText: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});