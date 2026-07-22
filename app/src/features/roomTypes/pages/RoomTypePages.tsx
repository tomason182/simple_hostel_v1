import { useRoomTypes } from "../hooks/useRoomTypes";
import RoomTypeTable from "../components/RoomTypeTable";

function RoomTypePage() {
  const { data: roomTypes = [], isLoading, error } = useRoomTypes();

  if (isLoading) {
    return <p>Loading room types...</p>;
  }

  if (error) {
    return <p>Unable to load room types.</p>;
  }

  return (
    <>
      <h1>Room Types</h1>
      <RoomTypeTable roomTypes={roomTypes} />
    </>
  );
}

export default RoomTypePage;

