import PlaceForm from "../components/Places/PlaceForm";
import { insertPlace } from "../Util/database";

const AddPlace = ({ navigation }) => {
  async function createPlaceHandler(place) {
    await insertPlace(place)
      .then((result) => {})
      .catch((err) => {});

    navigation.navigate("AllPlaces");
  }

  return <PlaceForm onCreatePlace={createPlaceHandler} />;
};

export default AddPlace;
