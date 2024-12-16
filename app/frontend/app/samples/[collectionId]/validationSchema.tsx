import { z } from "zod";

export const addOrUpdateSampleFormSchema = z.object({
  donorCount: z.coerce
    .number({
      invalid_type_error: "Please enter a valid number",
      required_error: "Donor count is required"
    })
    .min(0, "Donor count cannot be negative"),
  materialType: z.string().min(1, "Material type is required")
});
