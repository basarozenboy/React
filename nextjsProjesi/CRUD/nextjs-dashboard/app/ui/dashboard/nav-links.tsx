import { fetcher } from "@/app/hooks/useFetch";
import {
  UserGroupIcon,
  HomeIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import useSWR from "swr";

export default function NavLinks() {
  const { data: user, error } = useSWR("http://localhost:9080/api/me", fetcher);

  // 🔹 Define navigation links dynamically
  const links = [{ name: "Home", href: "/dashboard", icon: HomeIcon }];

  // 🔹 If user is NOT logged in, show the "Log In" button
  if (user) {
    links.push({
      name: "Customers",
      href: "/dashboard/customers",
      icon: UserGroupIcon,
    });
  } else {
    links.push({ name: "Log In", href: "/login", icon: UsersIcon });
  }

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
