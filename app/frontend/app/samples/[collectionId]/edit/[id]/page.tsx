"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/form";
import { useEffect, useState } from "react";
import { getSample, updateSample } from "@/app/api";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import { FormLayout } from "@/components/form";
import { handleRequestError } from "@/lib/api";
import Spinner from "@/components/core/Spinner";
import { addOrUpdateSampleFormSchema } from "../../validationSchema";

export default function UpdateCollection() {
  const params = useParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const id = Number(params.id);
  const collectionId = Number(params.collectionId);

  const form = useForm<z.infer<typeof addOrUpdateSampleFormSchema>>({
    resolver: zodResolver(addOrUpdateSampleFormSchema),
    defaultValues: {
      donorCount: "",
      materialType: ""
    }
  });

  useEffect(() => {
    async function fetchSampleData() {
      const sample = await getSample(id);
      const { donorCount, materialType } = sample;
      if (sample.id) {
        form.reset({
          donorCount: donorCount.toString(),
          materialType: materialType
        });
      } else {
        toast.error("Failed to fetch sample");
        router.push(ROUTES.collections.id(collectionId.toString()));
      }
    }

    if (id && collectionId) {
      fetchSampleData();
    }
  }, [id, collectionId, form, router]);

  async function onSubmit(values: z.infer<typeof addOrUpdateSampleFormSchema>) {
    setIsLoading(true);
    try {
      await updateSample(id, {
        ...values,
        donorCount: Number(values.donorCount),
        collectionId: collectionId
      });
      router.push(ROUTES.collections.id(collectionId.toString()));
      toast.success("Sample updated successfully");
    } catch (error) {
      const { message } = handleRequestError(error);
      console.error(message);
      toast.error("Updating sample failed!");
    }
    setIsLoading(false);
  }

  return (
    <FormLayout title={"Update sample"}>
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
