"use client";
import { DataTableColumnHeader } from "@/components/data-table/DataTableColumnHeader";
import { Sample } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import Action from "./actions";
import { format } from "date-fns";

export const columns: ColumnDef<Sample>[] = [
  {
    id: "id",
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Id" />
    ),
    enableHiding: false,
    enableSorting: true
  },
  {
    id: "collectionId",
    accessorKey: "collectionId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Collection Id" />
    ),
    enableHiding: false,
    enableSorting: true
  },
  {
    id: "donorCount",
    accessorKey: "donorCount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Donor count" />
    ),
    enableHiding: false,
    enableSorting: true
  },
  {
    id: "materialType",
    accessorKey: "materialType",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Material type" />
    ),
    enableHiding: false,
    enableSorting: true
  },
  {
    id: "lastUpdated",
    accessorKey: "lastUpdated",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last updated" />
    ),
    enableHiding: false,
    enableSorting: true,
    cell: ({ row }) => {
      const { lastUpdated } = row.original;

      return format(new Date(lastUpdated), "yyyy-MM-dd");
    }
  },
  {
    id: "actions",
    accessorKey: "actions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Actions" />
    ),
    enableHiding: false,
    enableSorting: false,
    cell: ({ row }) => {
      const { id, collectionId } = row.original;
      return <Action id={id} collectionId={collectionId} />;
    }
  }
];
