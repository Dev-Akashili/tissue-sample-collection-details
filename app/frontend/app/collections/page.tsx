import { DataTable } from "@/components/data-table";
import { getCollections } from "../api";
import { columns } from "./columns";
import { DataTableSearch } from "@/components/data-table/DataTableSearch";
import { Button } from "@/components/ui/button";
import { FilterParameters } from "@/types";
import { objToQuery } from "@/lib/client-utils";
import { ROUTES } from "@/constants/routes";
import Link from "next/link";

export default async function Collections({
  searchParams
}: {
  searchParams: Promise<FilterParameters>;
}) {
  const searchParamsData = await searchParams;

  const pageSize = Number(searchParamsData.pageSize) || 10;
  const pageNumber = Number(searchParamsData.pageNumber) || 1;
  const filter = searchParamsData.filter || "";

  const queryParams = {
    pageSize,
    pageNumber,
    ...(filter ? { filter } : {})
  };

  const query = objToQuery(queryParams);

  const collections = await getCollections(query);
  const { count, list } = collections;
  const search = (
    <DataTableSearch placeholder="Search by title or disease term" />
  );
  const action = (
    <Link href={ROUTES.collections.add}>
      <Button className="btn-custom">Add collection</Button>
    </Link>
  );

  return (
    <div className="min-h-screen">
      <div className="w-full md:w-[90%] lg:w-[80%] mx-auto py-28 px-2 md:px-0">
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
