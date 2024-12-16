import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-[90vh] flex items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <h1 className="text-8xl font-bold">404</h1>
        <p className="text-lg font-semibold">Page could not be found</p>
        <Link href={ROUTES.home}>
          <Button variant={"link"} className="underline">
            Go back home
          </Button>
        </Link>
      </div>
    </div>
  );
}
