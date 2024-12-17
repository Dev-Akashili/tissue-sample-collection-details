import { Button } from "@/components/ui/button";
import { MdScience } from "react-icons/md";
import { FaDatabase } from "react-icons/fa";
import { ROUTES } from "@/constants/routes";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-[80vh] bg-slate-100 dark:bg-black flex flex-col justify-center items-center">
      <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold">
        <span className="text-blue-500">Tissue</span> Sample
      </h1>
      <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold">
        Collection <span className="text-teal-500">Details</span>
      </h1>
      <div className="flex flex-col md:flex-row justify-between space-x-0 md:space-x-8 space-y-6 md:space-y-0 mt-12">
        <Link href={ROUTES.collections.index} className="w-full md:w-[200px]">
          <Button
            size={"lg"}
            className="w-full btn-custom hover:shadow-[6px_6px_0_0_#000]"
          >
            <FaDatabase className="mr-2" />
            View collections
          </Button>
        </Link>
        <Link href={ROUTES.samples.index} className="w-full md:w-[200px]">
          <Button
            size={"lg"}
            className="w-full bg-teal-500 hover:bg-teal-400 hover:shadow-[6px_6px_0_0_#000]"
          >
            <MdScience className="mr-2" />
            View all samples
          </Button>
        </Link>
      </div>
    </div>
  );
}
