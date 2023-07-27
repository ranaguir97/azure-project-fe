"use client";
import { Disclosure } from "@headlessui/react";
import DisclosureButtom from "./Disclosure/DisclosureButton";
import NavigationLinks from "./NavigationLinks";
import DisclosurePanel from "./Disclosure/DisclosurePanel";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Logo from "../Logo/Logo";
import { SignOutButton } from "../SignOutButton/SignOutButton";
import { useSession } from "next-auth/react";

export function classNames(...classes: Array<String>) {
  return classes.filter(Boolean).join(" ");
}
export interface Navigation {
  name: string;
  href: string;
  current: boolean;
  auth: boolean;
}
export default function Navbar() {
  const pathname = usePathname();
  const { status } = useSession();

  const [navigation, setNavigation] = useState<Navigation[]>([
    { name: "Events", href: "/events", current: false, auth: true },
    { name: "My Profile", href: "/profile", current: false, auth: true },
    { name: "Login", href: "/login", current: false, auth: false },
    { name: "Sign Up", href: "/signup", current: false, auth: false },
  ]);

  useEffect(() => {
    updateCurrentLink();
  }, [pathname]);

  const updateCurrentLink = () => {
    const updatedNavigtaion = navigation.map((navigationLink) => {
      if (navigationLink.href === pathname || navigationLink.current)
        return { ...navigationLink, current: !navigationLink.current };
      else return navigationLink;
    });
    setNavigation(updatedNavigtaion);
  };

  return (
    <Disclosure as="nav" className="bg-white">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 md:px-6 lg:px-8 py-5">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center lg:hidden">
                {/* Mobile menu button*/}
                <DisclosureButtom open={open} />
              </div>
              <div className="flex flex-1 items-center justify-center lg:items-stretch lg:justify-start">
                <Logo></Logo>
                <div className="hidden lg:ml-6 lg:flex">
                  <NavigationLinks
                    navigation={navigation}
                    classNameFn={classNames}
                  />
                </div>
              </div>
              <img
                className="h-8 w-8 rounded-full"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEylgd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
              <div className={status === "authenticated" ? "block" : "hidden"}>
                <div className="lg:block hidden">
                  <SignOutButton></SignOutButton>
                </div>
              </div>
            </div>
          </div>
          <DisclosurePanel navigation={navigation} classNameFn={classNames} />
        </>
      )}
    </Disclosure>
  );
}
