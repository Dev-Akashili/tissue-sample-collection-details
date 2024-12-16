import { DeleteModal } from "@/components/core/DeleteModal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { ROUTES } from "@/constants/routes";
import { Edit, Ellipsis, Eye, Trash } from "lucide-react";
import Link from "next/link";
import { deleteCollection } from "../api";
import { toast } from "sonner";
import { useRef } from "react";
import { handleRequestError } from "@/lib/api";

export default function Action({ id }: { id: number }) {
  const deleteButtonRef = useRef<HTMLButtonElement | null>(null);

  async function handleDelete() {
    try {
      await deleteCollection(id);
      toast.success("Successfully deleted collection");
    } catch (error) {
      const { message } = handleRequestError(error);
      console.error(message);
      toast.error("Failed to delete collection!");
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
          href={`${ROUTES.collections.index}/${id}`}
          className="inline-flex items-center h-full w-full"
        >
          <DropdownMenuItem className="cursor-pointer w-full">
            <Eye /> View samples
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <Link
          href={`${ROUTES.collections.edit}/${id}`}
          className="inline-flex items-center h-full w-full"
        >
          <DropdownMenuItem className="cursor-pointer w-full">
            <Edit className="mr-2" /> Edit
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
            text={"collection"}
            handleDelete={handleDelete}
            refProp={deleteButtonRef as React.RefObject<HTMLButtonElement>}
          />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
