"use server";

import { revalidatePath } from "next/cache";

import { request } from "@/lib/api";
import { Sample, PaginatedResponse, CreateOrEditSample } from "@/types";
import { ROUTES } from "@/constants/routes";

const fetchKeys = {
  list: (filter?: string) => `samples/?${filter}`,
  listByCollectionId: (collectionId: number, filter?: string) =>
    `samples/collection/${collectionId}?${filter}`,
  get: (id: number) => `samples/${id}`,
  create: "samples",
  update: (id: number) => `samples/${id}`,
  delete: (id: number) => `samples/${id}`
};

/**
 * Get a list of all samples
 * @returns The list of all samples
 */
export async function getSamples(
  filter: string
): Promise<PaginatedResponse<Sample>> {
  try {
    return await request<PaginatedResponse<Sample>>(fetchKeys.list(filter));
  } catch {
    console.warn("Failed to fetch data.");
    return { count: 0, list: [] };
  }
}

/**
 * Get a list of samples by collectionId
 * @returns The list of samples belonging to a collection
 */
export async function getSamplesByCollection(
  collectionId: number,
  filter: string
): Promise<PaginatedResponse<Sample>> {
  try {
    return await request<PaginatedResponse<Sample>>(
      fetchKeys.listByCollectionId(collectionId, filter)
    );
  } catch {
    console.warn("Failed to fetch data.");
    return { count: 0, list: [] };
  }
}

/**
 * Get a sample with a given id.
 * @param id Id of sample to get
 * @returns The sample matching the given id
 */
export async function getSample(id: number): Promise<Sample> {
  try {
    return await request<Sample>(fetchKeys.get(id));
  } catch {
    console.warn("Failed to fetch data.");
    return {
      id: 0,
      collectionId: 0,
      donorCount: 0,
      materialType: "",
      lastUpdated: new Date()
    };
  }
}

/**
 * Form action to add a sample.
 * @param formData form data to add.
 */
export async function addSample(formData: CreateOrEditSample) {
  return await request<CreateOrEditSample>(fetchKeys.create, {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(formData)
  });
}

/**
 * Form action to update a sample.
 * @param id Id of sample to update.
 * @param formData form data to update.
 */
export async function updateSample(id: number, formData: CreateOrEditSample) {
  return await request<CreateOrEditSample>(fetchKeys.update(id), {
    method: "PUT",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(formData)
  });
}

/**
 * Form action to delete a sample.
 * @param id id of sample to DELETE.
 */
export async function deleteSample(id: number) {
  const response = await request(fetchKeys.delete(id), {
    method: "DELETE"
  });

  revalidatePath(ROUTES.samples);
  return response;
}
