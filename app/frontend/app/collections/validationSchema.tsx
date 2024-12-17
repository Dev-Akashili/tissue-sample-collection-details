import { z } from "zod";

export const addOrUpdateCollectionFormSchema = z.object({
  diseaseTerm: z.string().min(1, "Disease term is required"),
  title: z.string().min(1, "Title is required")
});
