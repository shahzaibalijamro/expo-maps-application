import { useEffect, useState } from "react";
import { FlatList, Platform, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from 'expo-location';

export default function Index() {
  const [location, setLocation] = useState<null | any>(null);
  const [errorMsg, setErrorMsg] = useState<null | string>(null);
  const [search, setSearch] = useState<string>('')
  const [searchedPlaceRes, setSearchedPlaceRes] = useState<any>([])
  const [selectedLocation, setSelectedLocation] = useState<any>(null)
  const [visibleRegion, setVisibleRegion] = useState<any>(null)
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setVisibleRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.007,
        longitudeDelta: 0.007,
      })
    })();
  }, []);
  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }
  const goToSelectedLocation = (item: any) => {
    console.log(item.distance);
    setSearchedPlaceRes([])
    setSelectedLocation({
      latitude: item.geocodes.main.latitude,
      longitude: item.geocodes.main.longitude
    })
    setVisibleRegion({
      latitude: item.geocodes.main.latitude,
      longitude: item.geocodes.main.longitude,
      latitudeDelta: 0.007,
      longitudeDelta: 0.007,
    })
  }
  console.log(selectedLocation)
  const getPlaces = () => {
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
          {searchedPlaceRes.length > 0 && <FlatList
            data={search.length > 0 ? searchedPlaceRes : setSearchedPlaceRes([])}
            keyExtractor={(item) => item.fsq_id}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => { goToSelectedLocation(item) }}>
                <View style={styles.itemView}>
                  <Text style={styles.itemText1}>{item.name}</Text>
                  <Text style={styles.itemText2}>{item.location.cross_street && item.location.cross_street !== ""
                    ? item.location.cross_street
                    : item.location.formatted_address && item.location.formatted_address !== "" ? item.location.formatted_address : item.location.country}</Text>
                </View>
              </TouchableOpacity>
            )}
            style={styles.list}
          />
          }
          <MapView
            style={styles.map}
            mapType="hybrid"
            region={visibleRegion}
          >
            {selectedLocation && <Marker
              coordinate={selectedLocation}
            />}
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
  flexRow: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
  },
  map: {
    width: '100%',
    height: '110%',
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
  }, list: {
    maxHeight: 150,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderColor: '#ddd',
    borderWidth: 1,
    position: 'absolute',
    top: 110,
    left: 15,
    right: 15,
    zIndex: 2
  },
  itemView: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemText1: {
    paddingBottom: 5,
    fontWeight: "600",
    fontSize: 15
  },
  itemText2: {
    fontWeight: "400",
    fontSize: 12
  },
});