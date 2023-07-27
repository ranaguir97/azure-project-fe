"use client";
import React from "react";
import { signOut } from "next-auth/react";

export const SignOutButton = () => {
  return (
    <button
      onClick={() => signOut()}
      className="mx-2 bg-transparent hover:bg-black font-semibold hover:text-white py-2 px-4 border border-black hover:border-transparent rounded"
    >
      Sign Out
    </button>
  );
};
