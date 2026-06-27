export interface IFacilitiesRepository {
  getFacilitiesIdForProperty(propertyId: number): Promise<Array<number>>;

  doAllExist(facilitiesId: Array<number>): Promise<Array<number>>;

  addFacilitiesToProperty(propertyid: number, idsToAdd: Array<number>): Promise<void>;

  removeFacilitiesFromProperty(propertyId: number, idsToRemove: Array<number>): Promise<void>;
}
