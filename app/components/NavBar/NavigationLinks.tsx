import React, { useContext } from "react";
import Link from "next/link";
import {Navigation} from "./NavBar"

const NavigationLinks = ({
  classNameFn,
  navigation,
}: {
  classNameFn: (...classes: Array<String>) => string;
  navigation: Array<Navigation>;
}) => {
  return (
    <div className="flex space-x-4 items-center">
      {navigation.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className={classNameFn(
            item.current
              ? "bg-gray-900 text-white"
              : "text-stone-900 hover:bg-gray-700 hover:text-white",
            "rounded-lg px-3 py-2 text-lg font-medium"
          )}
          aria-current={item.current ? "page" : undefined}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
};

export default NavigationLinks;
