"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FormInput, FormLayout } from "@/components/form";
import { useState } from "react";
import { addCollection } from "@/app/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import Spinner from "@/components/core/Spinner";
import { handleRequestError } from "@/lib/api";
import { addOrupdateCollectionFormSchema } from "../validationSchema";

export default function AddCollection() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof addOrupdateCollectionFormSchema>>({
    resolver: zodResolver(addOrupdateCollectionFormSchema),
    defaultValues: {
      diseaseTerm: "",
      title: ""
    }
  });

  async function onSubmit(
    values: z.infer<typeof addOrupdateCollectionFormSchema>
  ) {
    setIsLoading(true);
    try {
      await addCollection(values);
      router.push(ROUTES.collections.index);
      toast.success("Collection added successfully");
    } catch (error) {
      const { message } = handleRequestError(error);
      console.error(message);
      toast.error("Failed to add collection!");
    }
    setIsLoading(false);
  }

  return (
    <FormLayout title={"Add a collection"}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormInput form={form} name="diseaseTerm" label="Disease term" />
          <FormInput form={form} name="title" label="Title" />
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
