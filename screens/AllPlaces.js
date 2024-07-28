import { useIsFocused } from "@react-navigation/native";
import PlaceList from "../components/Places/PlaceList";
import { useEffect } from "react";
import { fetchPlaces } from "../Util/database";

const AllPlaces = ({ route }) => {
  const isFocused = useIsFocused();
  const [loadedPlaces, setLoadedPlaces] = useState([]);

  useEffect(() => {
    async function LoadPlaces() {
      // await fetchPlaces()
      //   .then((result) => {
      //     setLoadedPlaces(result);
      //   })
      //   .catch((err) => {});
      const places = await fetchPlaces();
      setLoadedPlaces(places);
    }
    if (isFocused) {
      // setLoadedPlaces((initialPlaces) => [
      //   ...initialPlaces,
      //   route.params.place,
      // ]);
      LoadPlaces();
    }
  }, [isFocused]);

  return <PlaceList places={loadedPlaces} />;
};

export default AllPlaces;
