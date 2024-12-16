"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { addOrUpdateSampleFormSchema } from "../validationSchema";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/form";
import { useState } from "react";
import { addSample } from "@/app/api";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import { FormLayout } from "@/components/form";
import Spinner from "@/components/core/Spinner";
import { handleRequestError } from "@/lib/api";

export default function AddSample() {
  const router = useRouter();
  const params = useParams<{ collectionId: string }>();
  const { collectionId } = params;
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof addOrUpdateSampleFormSchema>>({
    resolver: zodResolver(addOrUpdateSampleFormSchema),
    defaultValues: {
      donorCount: "",
      materialType: ""
    }
  });

  async function onSubmit(values: z.infer<typeof addOrUpdateSampleFormSchema>) {
    setIsLoading(true);
    try {
      await addSample({
        ...values,
        donorCount: Number(values.donorCount),
        collectionId: Number(collectionId)
      });
      router.push(`${ROUTES.collections.index}/${collectionId}`);
      toast.success("Sample added successfully");
    } catch (error) {
      const { message } = handleRequestError(error);
      console.error(message);
      toast.error("Failed to add sample");
    }
    setIsLoading(false);
  }

  return (
    <FormLayout title={"Add a sample"}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormInput form={form} name="donorCount" label="Donor count" />
          <FormInput form={form} name="materialType" label="Material type" />
          <Button
            type="submit"
            disabled={isLoading}
            className="btn-custom w-[100px]"
          >
            {isLoading ? <Spinner /> : "Submit"}
          </Button>
        </form>
      </Form>
    </FormLayout>
  );
}
