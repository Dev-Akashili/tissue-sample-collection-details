"use client";
import { deleteSample } from "@/app/api";
import { DeleteModal } from "@/components/core/DeleteModal";
import { DataTableColumnHeader } from "@/components/data-table/DataTableColumnHeader";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { ROUTES } from "@/constants/routes";
import { handleRequestError } from "@/lib/api";
import { Sample } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Ellipsis, Trash } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { toast } from "sonner";

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
    id: "actions",
    accessorKey: "actions",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Actions" />
    ),
    enableHiding: false,
    enableSorting: false,
    cell: ({ row }) => {
      const { id, collectionId } = row.original;
      const deleteButtonRef = useRef<HTMLButtonElement | null>(null);

      async function handleDelete() {
        try {
          await deleteSample(id);
          toast.success("Successfully deleted sample");
        } catch (error) {
          const { message } = handleRequestError(error);
          console.error(message);
          toast.error("Failed to delete sample!");
        }
      }

      return (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button size={"icon"} variant={"ghost"} className="border">
              <Ellipsis />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <Link
              href={`${ROUTES.samples}/${collectionId}/edit/${id}`}
              className="inline-flex items-center h-full w-full"
            >
              <DropdownMenuItem className="cursor-pointer w-full">
                <Edit /> Edit
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={(e: React.MouseEvent<HTMLElement>) => {
                e.preventDefault();
                deleteButtonRef.current?.click();
              }}
            >
              <Trash /> Delete
            </DropdownMenuItem>
            <div className="absolute w-1 h-1 p-0 m-n1 overflow-hidden whitespace-nowrap border-0">
              <DeleteModal
                text={"sample"}
                handleDelete={handleDelete}
                refProp={deleteButtonRef}
              />
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
  }
];
