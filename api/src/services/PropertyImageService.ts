import { PropertyImage } from "../domain/entities/PropertyImage";
import sharp from "sharp";
import fs from "node:fs/promises";
import { IPropertyImageRepository } from "../domain/ports/IPropertyImageRepository";
import { IFileStorage } from "../domain/ports/IFileStorage";

export class PropertyImageService {
  private readonly maxImageAllow: number = 10;
  private readonly minImageSize: number = 1000;

  constructor(
    private propertyImageRepository: IPropertyImageRepository,
    private fileStorage: IFileStorage
  ) {
    this.propertyImageRepository = propertyImageRepository;
    this.fileStorage = fileStorage;
  }

  async getImage(propertyId: number): Promise<Array<PropertyImage>> {
    const images = await this.propertyImageRepository.findAllPropertyImages(propertyId);

    return images
  }

  async uploadImages(propertyId: number, files: Array<PropertyImage>): Promise<void> {
    const tempFinalPath = [];

    try {
      // 1. Comprobar que no se exceda el maximo de imagenes permitidas
      const propertyImagesStored = await this.propertyImageRepository.findAllPropertyImages(propertyId);

      if (propertyImagesStored.length + files.length > this.maxImageAllow) {
        throw new Error("LIMIT_IMAGE_REACH");
      }

      const filesRejected = [];
      const imagesToSave = [];

      for (const file of files) {
        // 1. Comprobar tamaño de la imagen
        const metadata = await sharp(file.path).metadata();
        if (metadata.height < this.minImageSize) {
          filesRejected.push(file.filename);
          continue;
        }

        // 2. Procesar la imagen con sharp.
        const processedImageBuffer = await sharp(file.path)
          .resize({ height: 960 })
          .webp({ quality: 80 })
          .toBuffer();

        const filename = file.filename.split(".")[0] + ".webp";
        const destinationFolder = `properties/${propertyId}`;

        // 3. Guardar la imagen procesada.
        const finalPath = await this.fileStorage.save(processedImageBuffer, filename, destinationFolder);

        tempFinalPath.push(finalPath.relativeUrl);

        // 4. Guardar la imagen procesada
        const isPrimary = false;          // Como pasar isPrimary en req.files?
        const image = new PropertyImage(null, propertyId, filename, "image/webp", null, processedImageBuffer.length, finalPath.publicUrl, isPrimary, new Date());
        imagesToSave.push(image);
      }

      // 5. Guardar las urls de las imagenes en la base de datos.
      if (imagesToSave.length > 0) {
        await this.propertyImageRepository.save(imagesToSave);
      }
    } catch (err) {
      // 6. Si occurre un error borrar la imagen guardada.
      console.log("PROCESSING_IMAGE_ERROR", err);
      await Promise.allSettled(
        tempFinalPath.map((path) =>
          fs.unlink(path).catch((e) => {
            console.log(`No se pudo eliminar el archivo ${path}: ${e.message}`);
          })
        )
      );
      throw new Error("ERROR_UPLOADING_IMAGES");
    } finally {
      // 7. Finalmente se eliminan las imagenes de temp_upload.
      await Promise.allSettled(
        files.map((file) =>
          fs.unlink(file.path).catch((e) => {
            console.warn(`No se pudo eliminar el archivo ${file.path}: ${e.message}`);
          })
        )
      )
    }
  }

  async deleteImage(propertyId: number, imageId: number): Promise<{ msg: string }> {
    // 1. Buscar la imagen por Id. Sirve para obtener el path.
    const image = await this.propertyImageRepository.findById(propertyId, imageId);
    if (!image) {
      throw new Error("IMAGE_NOT_FOUND");
    }
    const path = image.path;

    if (!path) {
      throw new Error("PATH_NOT_FOUND");
    }

    // 2. Primero borramos de la bd porque es reversible.
    await this.propertyImageRepository.delete(imageId);
    // 3. Segundo borramos del disco.
    await this.fileStorage.delete(path);

    return {
      msg: "IMAGE_DELETED"
    }
  }
}
