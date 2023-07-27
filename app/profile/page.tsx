"use client";
import React from "react";
import { useSession } from "next-auth/react";

const Profile = () => {
  const { data: session, status } = useSession();
  console.log(session, status);
  return <div>profile</div>;
};

export default Profile;
