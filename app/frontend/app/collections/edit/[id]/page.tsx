"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/form";
import { useEffect, useState } from "react";
import { getCollection, updateCollection } from "@/app/api";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import { FormLayout } from "@/components/form";
import { handleRequestError } from "@/lib/api";
import Spinner from "@/components/core/Spinner";
import { addOrupdateCollectionFormSchema } from "../../validationSchema";

export default function UpdateCollection() {
  const params = useParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const collectionId = Number(params.id);

  const form = useForm<z.infer<typeof addOrupdateCollectionFormSchema>>({
    resolver: zodResolver(addOrupdateCollectionFormSchema),
    defaultValues: {
      diseaseTerm: "",
      title: ""
    }
  });

  useEffect(() => {
    async function fetchCollectionData() {
      const collection = await getCollection(collectionId);
      if (collection.id) {
        form.reset({
          diseaseTerm: collection.diseaseTerm,
          title: collection.title
        });
      } else {
        toast.error("Failed to fetch collection");
        router.push(ROUTES.collections.index);
      }
    }

    if (collectionId) {
      fetchCollectionData();
    }
  }, [collectionId, form, router]);

  async function onSubmit(
    values: z.infer<typeof addOrupdateCollectionFormSchema>
  ) {
    setIsLoading(true);
    try {
      await updateCollection(values, collectionId);
      router.push(ROUTES.collections.index);
      toast.success("Collection updated successfully");
    } catch (error) {
      const { message } = handleRequestError(error);
      console.error(message);
      toast.error("Updating collection failed!");
    }
    setIsLoading(false);
  }

  return (
    <FormLayout title={"Update collection"}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormInput form={form} name="diseaseTerm" label="Disease term" />
          <FormInput form={form} name="title" label="Title" />
          <Button className="btn-custom" type="submit" disabled={isLoading}>
            {isLoading ? <Spinner /> : "Submit"}
          </Button>
        </form>
      </Form>
    </FormLayout>
  );
}
