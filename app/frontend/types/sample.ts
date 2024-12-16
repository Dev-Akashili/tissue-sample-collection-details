export interface Sample {
  id: number;
  collectionId: number;
  donorCount: number;
  materialType: string;
  lastUpdated: Date;
}

export interface CreateOrEditSample {
  collectionId: number;
  donorCount: number;
  materialType: string;
}
