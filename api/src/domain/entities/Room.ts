import { Bed } from "./Bed";

export class Room {
  constructor(
    private id: number | null,
    private name: string,
    private beds: Array<Bed>,
  ) {
    this.id = id;
    this.name = name;
    this.beds = beds;
  };


  static make(name: string, maxOccupancy: number) {
    const beds: Array<Bed> = [];
    for (let i = 0; i < maxOccupancy; i++) {
      beds.push(Bed.make(i + 1))
    };

    return new Room(
      null,
      name,
      beds
    )

  }
}
