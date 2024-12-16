"use client";
import Link from "next/link";
import Brand from "./Brand";
import { Button } from "../ui/button";
import { NAVBAR_LINKS } from "@/constants/Menu.constants";
import { useTheme } from "next-themes";
import { FaRegMoon } from "react-icons/fa";
import { LuSun } from "react-icons/lu";
import { MdMenu } from "react-icons/md";
import MobileNavMenu from "./MobileNavMenu";

export const Navbar = () => {
  const { setTheme } = useTheme();

  return (
    <div className="h-16 fixed top-0 left-0 right-0 bg-white dark:bg-black px-6 lg:px-14 flex items-center justify-between shadow-md dark:border-b z-10">
      <Brand />
      <div className="h-full flex items-center justify-between space-x-4">
        <div className="h-full hidden lg:flex justify-between">
          {NAVBAR_LINKS.map((item, index) => (
            <NavLink
              key={index}
              name={item.name}
              link={item.link}
              icon={item.icon}
              external={item.external}
            />
          ))}
        </div>
        <Button
          size={"icon"}
          variant={"outline"}
          className="hidden dark:flex dark:items-center"
          onClick={() => setTheme("light")}
        >
          <FaRegMoon />
        </Button>
        <Button
          size={"icon"}
          variant={"outline"}
          className="dark:hidden"
          onClick={() => setTheme("dark")}
        >
          <LuSun />
        </Button>
        <MobileNavMenu>
          <Button
            size={"icon"}
            variant={"outline"}
            className="inline-block lg:hidden"
          >
            <MdMenu className="mx-auto" />
          </Button>
        </MobileNavMenu>
      </div>
    </div>
  );
};

interface NavLinkProps {
  name: string;
  link: string;
  icon?: React.ReactNode;
  external: boolean;
}

const NavLink = ({ name, icon, link, external }: NavLinkProps) => {
  return (
    <Link href={link} target={external ? "_blank" : "_self"}>
      <Button
        variant={"ghost"}
        className="h-full rounded-none text-sm font-semibold hover:bg-gray-300 dark:hover:bg-gray-600"
      >
        {icon}
        {name}
      </Button>
    </Link>
  );
};

export default Navbar;
