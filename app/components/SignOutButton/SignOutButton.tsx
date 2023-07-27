"use client";
import React from "react";
import { signOut, useSession } from "next-auth/react";

export const SignOutButton = () => {
  const { status } = useSession();

  return (
    <button
      onClick={() => signOut()}
      className={`${
        status === "authenticated" ? "block" : "hidden"
      } bg-transparent hover:bg-black font-semibold hover:text-white py-2 px-4 border border-black hover:border-transparent rounded`}
    >
      Sign Out
    </button>
  );
};
