export class PropertyImage {
  constructor(
    public id: number | null,
    public propertyId: number,
    public filename: string,
    public mimetype: string,
    public altText: string | null,
    public sizeBytes: number,
    public path: string,
    public isPrimay: boolean,
    public createdAt: Date
  ) {
    this.id = id;
    this.propertyId = propertyId;
    this.filename = filename;
    this.mimetype = mimetype;
    this.altText = altText;
    this.sizeBytes = sizeBytes;
    this.path = path;
    this.isPrimay = isPrimay;
    this.createdAt = createdAt
  };
}
