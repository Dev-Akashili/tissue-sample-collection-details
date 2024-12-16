import { getCollection, getSamplesByCollection } from "@/app/api";
import { DataTable } from "@/components/data-table";
import { DataTableSearch } from "@/components/data-table/DataTableSearch";
import { Button } from "@/components/ui/button";
import { objToQuery } from "@/lib/client-utils";
import { FilterParameters } from "@/types";
import { columns } from "./columns";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { ChevronLeft } from "lucide-react";

interface CollectionSampleProps {
  params: Promise<{ id: string }>;
  searchParams?: Promise<FilterParameters>;
}

export default async function CollectionSample({
  params,
  searchParams
}: CollectionSampleProps) {
  const paramsData = await params;
  const searchParamsData = await searchParams;

  const collectionId = Number(paramsData.id);

  const pageSize = Number(searchParamsData?.pageSize) || 10;
  const pageNumber = Number(searchParamsData?.pageNumber) || 1;
  const filter = searchParamsData?.filter || "";

  const queryParams = {
    pageSize,
    pageNumber,
    ...(filter ? { filter } : {})
  };

  const query = objToQuery(queryParams);

  const collection = await getCollection(collectionId);
  const samples = await getSamplesByCollection(collectionId, query);
  const { count, list } = samples;
  const { diseaseTerm, title } = collection;
  const search = (
    <DataTableSearch placeholder="Search by donor count or material type" />
  );
  const action = (
    <Link href={`${ROUTES.samples}/${collectionId}/add`}>
      <Button className="btn-custom">Add sample</Button>
    </Link>
  );

  return (
    <div className="min-h-screen">
      <div className="w-full md:w-[90%] lg:w-[80%] mx-auto mb-28 px-2 md:px-0">
        <Link href={ROUTES.collections.index}>
          <Button className="bg-white dark:bg-black text-black dark:text-white border ml-4 mt-10">
            <ChevronLeft /> Back
          </Button>
        </Link>
        <div className="flex flex-col mt-8 mb-6 ml-4 space-y-4 text-xl text-slate-700 dark:text-slate-100 font-medium">
          <div className="flex items-center space-x-2">
            <span className="font-semibold">Disease Term:</span>
            <span>{diseaseTerm}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="font-semibold">Title:</span>
            <span>{title}</span>
          </div>
        </div>
        <DataTable
          columns={columns}
          data={list}
          count={count}
          Search={search}
          action={action}
        />
      </div>
    </div>
  );
}
