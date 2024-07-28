import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import OutlineButton from "../components/Places/UI/OutlineButton";
import { Colors } from "../constants/color";
import { useEffect, useState } from "react";
import { fetchPlaceDetails } from "../Util/database";

const PlaceDetails = ({ route, navigation }) => {
  const [fetchedPlace, setFetchPlace] = useState();

  function showOnMapHandler() {
    navigation.navigate("Map", {
      initialLat: fetchedPlace.location.lat,
      initialLng: fetchedPlace.location.lng,
    });
  }

  const selectedPlaceId = route.params.placeId;

  useEffect(() => {
    async function loadPlaceDetails() {
      const place = await fetchPlaceDetails(selectedPlaceId);
      setFetchPlace(place);
      navigation.setOptions({
        title: place.title,
      });
    }
    loadPlaceDetails();
  }, [selectedPlaceId]);

  if (!fetchedPlace)
    return (
      <View style={styles.fallback}>
        <Text>Fetching Data...</Text>
      </View>
    );

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: fetchedPlace.uri }} />
      <View style={styles.locationConatainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{fetchedPlace.address}</Text>
        </View>
        <OutlineButton icon={map} onPress={showOnMapHandler}>
          View on Map
        </OutlineButton>
      </View>
    </ScrollView>
  );
};

export default PlaceDetails;
const styles = StyleSheet.create({
  fallback: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
  },
  locationConatainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary500,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});
