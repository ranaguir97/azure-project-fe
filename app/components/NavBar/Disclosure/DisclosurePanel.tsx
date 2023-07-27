import React from "react";
import { Disclosure } from "@headlessui/react";

const DisclosurePanel = ({
  classNameFn,
  navigation,
}: {
  classNameFn: (...classes: Array<String>) => string;
  navigation: Array<{ name: string; href: string; current: boolean }>;
}) => {
  return (
    <Disclosure.Panel className="lg:hidden">
      <div className="space-y-1 px-2 pb-3 pt-2">
        {navigation.map((item) => (
          <Disclosure.Button
            key={item.name}
            as="a"
            href={item.href}
            className={classNameFn(
              item.current
                ? "bg-gray-900 text-white"
                : "text-gray-300 hover:bg-gray-700 hover:text-white",
              "block rounded-lg px-3 py-2 text-base font-medium"
            )}
            aria-current={item.current ? "page" : undefined}
          >
            {item.name}
          </Disclosure.Button>
        ))}
      </div>
    </Disclosure.Panel>
  );
};

export default DisclosurePanel;
