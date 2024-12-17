import { ROUTES } from "./routes";
import { MdHome, MdScience } from "react-icons/md";
import { FaDatabase, FaFileAlt, FaGithub } from "react-icons/fa";
import { Braces } from "lucide-react";

interface NavbarLink {
  name: string;
  link: string;
  icon: React.ReactNode;
  external: boolean;
}

export const NAVBAR_LINKS: NavbarLink[] = [
  { name: "Home", link: ROUTES.home, icon: <MdHome />, external: false },
  {
    name: "Collections",
    link: ROUTES.collections.index,
    icon: <FaDatabase />,
    external: false
  },
  {
    name: "Samples",
    link: ROUTES.samples.index,
    icon: <MdScience />,
    external: false
  },
  {
    name: "Documentation",
    link: "https://dev-akashili.github.io/tissue-sample-collection-details/",
    icon: <FaFileAlt />,
    external: true
  },
  {
    name: "API Docs",
    link: "https://tscd-api.azurewebsites.net/docs/",
    icon: <Braces />,
    external: true
  },
  {
    name: "GitHub",
    link: "https://github.com/Dev-Akashili/tissue-sample-collection-details/",
    icon: <FaGithub />,
    external: true
  }
];
