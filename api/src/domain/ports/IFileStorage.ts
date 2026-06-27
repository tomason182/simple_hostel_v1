export interface IFileStorage {
  // Guardar imagenes en disco.
  save(buffer: Buffer, filename: string, destinationFolder: string): Promise<{ publicUrl: string, relativeUrl: string }>;

  // Eliminar imagen de disco.
  delete(path: string): Promise<void>;
}
