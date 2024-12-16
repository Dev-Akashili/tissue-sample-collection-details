import { Sample } from "./sample";

export interface Collection {
  id: number;
  diseaseTerm: string;
  title: string;
  samples: Sample[];
}

export interface CreateOrEditCollection {
  diseaseTerm: string;
  title: string;
}
