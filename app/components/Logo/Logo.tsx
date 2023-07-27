import Link from "next/link";
import React from "react";

 const Logo = () => {
  return (
    <div className="flex items-center">
        <Link href="/">
            <h1 className="text-2xl font-extrabold">EVNT TRCKR</h1>
        </Link>
    </div>
  );
};

export default Logo
