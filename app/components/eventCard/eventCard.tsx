"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

interface EventProps {
  eventId: string;
  eventName: string;
  eventDescription: string;
  date: Date;
  image: string;
  ownerId: string;
  size: "lg" | "sm";
}

export const EventCard = ({
  eventId,
  eventName,
  eventDescription,
  date,
  image,
  ownerId,
  size,
}: EventProps) => {
  const [owner, setOwner] = useState<any>(undefined);
  const [userData, setuserData] = useState<undefined | any>(undefined);

  const { data: session } = useSession();
  useEffect(() => {
    axios
      .get(`${process.env.BE_API}/users?user_id=${ownerId}`)
      .then((response) => {
        console.log(response);
        setOwner(response.data);
      });
  }, []);

  useEffect(() => {
    setuserData(session?.user);
  }, [session]);

  const handleAddEvent = async (userId: string, eventId: string) => {
    console.log(userId, eventId);
    await axios
      .post(`${process.env.BE_API}/events/add-attendance`, {
        userId,
        eventId,
      })
      .then((res) => console.log(res));
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };
  const isUserAttending = () => {
    if (userData) {
      return userData.eventsAttending.some((event: any) => {
        return event._id === eventId;
      });
    }
  };

  return (
    <div
      className={`bg-white shadow-lg my-5 rounded-md flex flex-col w-[400px] ${
        size === "lg" ? "md:w-[700px]" : " "
      }`}
    >
      <div>
        <img
          src={image}
          className="w-full h-56 rounded-t-md object-cover"
          alt="event-image"
        />
      </div>
      <div
        className={`p-3 flex flex-col  items-center [&>*]:p-4 ${
          size === "lg" ? "md:flex-row" : " "
        }`}
      >
        <div className="px-10 w-[150px]">
          {owner && (
            <>
              <h2 className="text-3xl font-extrabold	">{owner.display_name}</h2>
              <img
                src={owner.profilePicture}
                className="w-20 rounded-full object-cover"
                alt="event-image"
              />
            </>
          )}
        </div>
        <div className="px-10 flex flex-col items-center  w-[400px]">
          <div>
            <h1 className="text-3xl font-extrabold">{eventName}</h1>
          </div>
          <div>
            <p className="font-medium pt-2">{eventDescription}</p>
          </div>
        </div>
        <div className="flex flex-col align-middle items-center justify-center w-[150px]">
          <div>
            <h1 className="text-2xl font-extrabold">{formatDate(date)}</h1>
          </div>
          {isUserAttending() ? (
            <button
              onClick={() => handleAddEvent(userData._id, eventId)}
              className=" mt-4 bg-green-700 font-semibold text-white py-2 px-4 border border-green-600 rounded"
              disabled
            >
              Event Added ✓
            </button>
          ) : (
            <button
              onClick={() => handleAddEvent(userData._id, eventId)}
              className=" mt-4 bg-transparent hover:bg-green-700 text-green-600 font-semibold hover:text-white py-2 px-4 border border-green-600 hover:border-transparent rounded"
            >
              Add event +
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
