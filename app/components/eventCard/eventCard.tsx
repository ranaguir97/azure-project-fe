"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface EventProps {
  eventName: string;
  eventDescription: string;
  date: Date;
  image: string;
  ownerId: string;
}

export const EventCard = ({
  eventName,
  eventDescription,
  date,
  image,
  ownerId,
}: EventProps) => {
  const [user, setUser] = useState<any>(undefined);

  useEffect(() => {
    axios
      .get(`${process.env.BE_API}/users?user_id=${ownerId}`)
      .then((response) => {
        console.log(response);
        setUser(response.data);
      });
  }, []);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="bg-white shadow-lg my-5 rounded-md flex flex-col w-[60vw]">
      <div>
        <img
          src={image}
          className="w-full h-56 rounded-t-md object-cover	 "
          alt="event-image"
        />
      </div>
      <div className="p-3 flex flex-row">
        <div className="px-10">
          {user && (
            <>
              <h2 className="text-3xl font-extrabold	">{user.display_name}</h2>
              <img
                src={user.profilePicture}
                className="w-20 rounded-full object-cover	 "
                alt="event-image"
              />
            </>
          )}
        </div>
        <div className="px-10">
          <div>
            <h1 className="text-3xl font-extrabold	 ">{eventName}</h1>
          </div>
          <div>
            <p className="font-medium">{eventDescription}</p>
          </div>
        </div>
        <div className="flex flex-col align-middle items-center justify-center">
          <div>
            <h1 className="text-2xl font-extrabold">{formatDate(date)}</h1>
          </div>
          <button className="  mt-4 bg-transparent hover:bg-green-700 text-green-600 font-semibold hover:text-white py-2 px-4 border border-green-600 hover:border-transparent rounded">
            Add event
          </button>
        </div>
      </div>
    </div>
  );
};
