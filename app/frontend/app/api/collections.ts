"use server";

import { request } from "@/lib/api";
import { ROUTES } from "@/constants/routes";
import { revalidatePath } from "next/cache";
import { Collection, CreateOrEditCollection, PaginatedResponse } from "@/types";

const fetchKeys = {
  list: (filter?: string) => `collections/?${filter}`,
  get: (id: number) => `collections/${id}`,
  create: "collections",
  update: (id: number) => `collections/${id}`,
  delete: (id: number) => `collections/${id}`
};

/**
 * Get a list of all collections
 * @returns The list of all collections
 */
export async function getCollections(
  filter: string
): Promise<PaginatedResponse<Collection>> {
  try {
    return await request<PaginatedResponse<Collection>>(fetchKeys.list(filter));
  } catch {
    console.warn("Failed to fetch data.");
    return { count: 0, list: [] };
  }
}

/**
 * Get a collection with a given id.
 * @param id Collection to get
 * @returns The collection matching the given id
 */
export async function getCollection(id: number): Promise<Collection> {
  try {
    return await request<Collection>(fetchKeys.get(id));
  } catch {
    console.warn("Failed to fetch data.");
    return {
      id: 0,
      diseaseTerm: "",
      title: "",
      samples: []
    };
  }
}

/**
 * Form action to add a collection.
 * @param formData form data to add.
 */
export async function addCollection(formData: CreateOrEditCollection) {
  return await request<CreateOrEditCollection>(fetchKeys.create, {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(formData)
  });
}

/**
 * Form action to update a collection.
 * @param formData form data to update.
 */
export async function updateCollection(
  formData: CreateOrEditCollection,
  collectionId: number
) {
  return await request<CreateOrEditCollection>(fetchKeys.update(collectionId), {
    method: "PUT",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(formData)
  });
}

/**
 * Form action to delete a collection.
 * @param id id of collection to DELETE.
 */
export async function deleteCollection(id: number) {
  const response = await request(fetchKeys.delete(id), {
    method: "DELETE"
  });

  revalidatePath(ROUTES.collections.index);
  return response;
}
