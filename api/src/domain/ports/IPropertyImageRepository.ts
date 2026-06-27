import { PropertyImage } from "../entities/PropertyImage";

export interface IPropertyImageRepository {
  // Buscar todas la imagenes de la propiedad
  findAllPropertyImages(propertyId: number): Promise<Array<PropertyImage>>;

  // Buscar una imagen de la propiedad
  findById(propertyId: number, imageId: number): Promise<PropertyImage>;

  // Guardar imagenes en la base de datos.
  save(images: Array<PropertyImage>): Promise<void>;

  // Eliminar Imagnes.
  delete(imageId: number): Promise<void>;
}
