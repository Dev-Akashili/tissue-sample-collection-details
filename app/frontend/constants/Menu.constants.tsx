import { ROUTES } from "./routes";
import { MdHome, MdScience } from "react-icons/md";
import { FaDatabase, FaFileAlt, FaGithub } from "react-icons/fa";

interface NavbarLink {
  name: string;
  link: string;
  icon: React.ReactNode;
}

export const NAVBAR_LINKS: NavbarLink[] = [
  { name: "Home", link: ROUTES.home, icon: <MdHome /> },
  { name: "Collections", link: ROUTES.collections.index, icon: <FaDatabase /> },
  { name: "Samples", link: ROUTES.samples, icon: <MdScience /> },
  {
    name: "Documentation",
    link: "https://dev-akashili.github.io/tissue-sample-collection-details/",
    icon: <FaFileAlt />
  },
  {
    name: "GitHub",
    link: "https://github.com/Dev-Akashili/tissue-sample-collection-details/",
    icon: <FaGithub />
  }
];
