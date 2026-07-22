import type { RoomTypeInputDTO } from "../dto/RoomTypeDTO";

interface Props {
  roomTypes: Array<RoomTypeInputDTO>
}
export default function RoomTypeTable({ roomTypes }: Props) {
  return (
    <table>
      <thead>
        <tr>
          <th>Description</th>
          <th>Type</th>
          <th>Gender</th>
          <th>Max. Occupancy</th>
          <th>Inventory</th>
        </tr>
      </thead>
      <tbody>
        {roomTypes.map((roomType) => (
          <tr key={roomType.id}>
            <td>{roomType.description}</td>
            <td>{roomType.type}</td>
            <td>{roomType.gender}</td>
            <td>{roomType.maxOccupancy}</td>
            <td>{roomType.inventory}</td>
            <td>
              <button>Edit</button>
              <button>Delete</button>
            </td>


          </tr>
        ))

        }
      </tbody>
    </table>
  )
}
