import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { RiTestTubeFill } from "react-icons/ri";

const Brand = () => {
  return (
    <Link
      href={ROUTES.home}
      className="inline-flex justify-between items-center space-x-2 hover:text-blue-500"
    >
      <RiTestTubeFill className="h-6 w-6" />
      <h1 className="font-bold text-md md:text-lg">
        Tissue Sample Collection Details
      </h1>
    </Link>
  );
};

export default Brand;
