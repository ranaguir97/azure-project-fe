"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { EventCard } from "../components/eventCard/eventCard";

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
        <div className="flex w-full pt-20 items-center flex-col">
          <div className="text-5xl font-bold">
            Welcome,{userData.display_name}
          </div>
          <img
            className="rounded-full"
            src={userData.profilePicture}
            alt="profile picture"
            width={250}
            height={250}
          />
          <div className="flex flex-row pt-10 justify-between">
            <div className="pr-10">
              <h2 className="text-2xl font-bold">Owned Events</h2>
              {userData.eventsOwned.map((event: any, index: any) => {
                return (
                  <EventCard
                    key={index}
                    eventName={event.eventName}
                    eventDescription={event.eventDescription}
                    date={event.date}
                    image={event.img}
                    ownerId={event.ownerId}
                  />
                );
              })}
            </div>
            <div className="pl-10">
              <h2 className="text-2xl font-bold">Attending Events</h2>
              {userData.eventsAttending.map((event: any, index: any) => {
                return (
                  <EventCard
                    key={index}
                    eventName={event.eventName}
                    eventDescription={event.eventDescription}
                    date={event.date}
                    image={event.img}
                    ownerId={event.ownerId}
                  />
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
