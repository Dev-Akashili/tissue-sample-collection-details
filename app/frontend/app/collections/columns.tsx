"use client";
import { DataTableColumnHeader } from "@/components/data-table/DataTableColumnHeader";
import { Collection } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import Action from "./actions";

export const columns: ColumnDef<Collection>[] = [
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
    id: "diseaseTerm",
    accessorKey: "diseaseTerm",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Disease term" />
    ),
    enableHiding: false,
    enableSorting: true
  },
  {
    id: "title",
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    enableHiding: false,
    enableSorting: true
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
      const { id } = row.original;

      return <Action id={id} />;
    }
  }
];
