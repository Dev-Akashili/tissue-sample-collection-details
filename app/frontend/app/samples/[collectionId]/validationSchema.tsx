import { z } from "zod";

export const addOrUpdateSampleFormSchema = z.object({
  donorCount: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: "Add a valid number"
  }),
  materialType: z.string().min(1, "Material type is required")
});
