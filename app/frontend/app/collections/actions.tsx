import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { toast } from "sonner";
import { useRef } from "react";
import { deleteCollection } from "../api";
import { ROUTES } from "@/constants/routes";
import { handleRequestError } from "@/lib/api";
import { Button } from "@/components/ui/button";
import DeleteModal from "@/components/core/DeleteModal";
import { Edit, Ellipsis, Eye, Trash } from "lucide-react";

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
        <Link href={ROUTES.collections.samples(id)}>
          <DropdownMenuItem className="cursor-pointer">
            <Eye /> View samples
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <Link href={ROUTES.collections.edit(id)}>
          <DropdownMenuItem className="cursor-pointer">
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
        <div className="absolute w-1 h-1 p-0 m-1 overflow-hidden whitespace-nowrap border-0">
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
