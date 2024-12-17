import { toast } from "sonner";
import { deleteSample } from "../api";
import { handleRequestError } from "@/lib/api";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Edit, Ellipsis, Trash } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import DeleteModal from "@/components/core/DeleteModal";

interface ActionsProps {
  id: number;
  collectionId: number;
}

export default function Actions({ id, collectionId }: ActionsProps) {
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
          href={ROUTES.samples.edit(id, collectionId)}
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
            text={"collection"}
            handleDelete={handleDelete}
            refProp={deleteButtonRef as React.RefObject<HTMLButtonElement>}
          />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
