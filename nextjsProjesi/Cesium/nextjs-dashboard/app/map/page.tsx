import CesiumWrapper from "../components/CesiumWrapper";

async function getPosition() {
  //Mimic server-side stuff...
  return {
    position: {
      lat: 39.866667,
      lng: 32.86666,
    },
  };
}

export default async function MainPage() {
  const fetchedPosition = await getPosition();
  return <CesiumWrapper positions={[fetchedPosition.position]} />;
}
