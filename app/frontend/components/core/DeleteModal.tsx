import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "../ui/alert-dialog";

interface DeleteModalProps {
  text: string;
  children: React.ReactNode | React.ReactNode[];
  handleDelete: React.MouseEventHandler<HTMLButtonElement>;
  refProp: React.RefObject<HTMLButtonElement>;
}

export const DeleteModal = ({
  text,
  handleDelete,
  refProp
}: DeleteModalProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger ref={refProp}></AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="dark:text-white">
            {`Are you sure you want to delete this ${text}`}
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action is permanent and cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="dark:border dark:border-white dark:text-white">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-400 dark:bg-red-600 dark:bg-red-500 dark:text-white"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
