import { discord, telegram, twitterX } from "./public/svg";

export type route = { title: string; href: string };
export const routes: route[] = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Dashboard",
    href: "#",
  },
  {
    title: "Earn",
    href: "/earn",
  },
  {
    title: "Docs",
    href: "#",
  },
];

export type social = { title: string; href: string; icon: any };

export const socials: social[] = [
  {
    title: "Twitter-X",
    href: "#",
    icon: twitterX,
  },
  {
    title: "Telegram",
    href: "#",
    icon: telegram,
  },
  {
    title: "Discord",
    href: "#",
    icon: discord,
  },
];
