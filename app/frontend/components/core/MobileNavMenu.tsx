import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "../ui/sheet";
import Link from "next/link";
import Brand from "./Brand";
import { Button } from "../ui/button";
import { NAVBAR_LINKS } from "@/constants/Menu.constants";

const MobileNavMenu = ({ children }: { children: React.ReactNode }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side={"top"} className="100%">
        <SheetHeader>
          <SheetTitle className="text-center">
            <Brand />
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col mt-4">
          {NAVBAR_LINKS.map((item, index) => (
            <MobileNavMenuItem
              key={index}
              name={item.name}
              link={item.link}
              icon={item.icon}
            />
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

interface MobileNavMenuItem {
  name: string;
  link: string;
  icon: React.ReactNode;
}

const MobileNavMenuItem = ({ name, link, icon }: MobileNavMenuItem) => {
  return (
    <Link href={link}>
      <SheetClose className="w-full">
        <Button
          variant={"ghost"}
          className="w-full rounded-none hover:bg-gray-300 dark:hover:bg-gray-600 font-semibold"
        >
          {icon}
          {name}
        </Button>
      </SheetClose>
    </Link>
  );
};

export default MobileNavMenu;