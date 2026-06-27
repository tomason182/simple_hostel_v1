import { Address } from "../value-objects/Address";

export interface IAddressRepository {
  save(propertyd: number, address: Address): Promise<void>;
}
