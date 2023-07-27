"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const Profile = () => {
  const { data: session, status } = useSession();
  const [userData, setuserData] = useState<undefined | any>(undefined);
  console.log(session, status);
  useEffect(() => {
    setuserData(session?.user);
  }, [session]);

  return (
    <>
      {userData && (
        <>
          <div>Welcome,{userData.display_name}</div>
          <img
            className="rounded-full"
            src={userData.profilePicture}
            alt="profile picture"
            width={100}
            height={100}
          />
          <div className="flex flex-row">
            <div>My events</div>
            <div>Attending events</div>
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
