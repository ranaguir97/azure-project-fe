"use client";
import React, { useEffect, useState } from "react";
import { EventCard } from "../components/eventCard/eventCard";
import axios from "axios";
import Link from "next/link";

const Events = () => {
  const [events, setEvents] = useState([] as any[]);

  useEffect(() => {
    axios.get(`${process.env.BE_API}/events`).then((response) => {
      setEvents(response.data);
    });
  }, []);
  console.log(events);
  return (
    <div className=" pt-20 justify-center flex items-center flex-col">
      <Link
        href={"/events/new-event"}
        className=" mt-4 bg-transparent hover:bg-green-700 text-green-600 font-semibold hover:text-white py-2 px-4 border border-green-600 hover:border-transparent rounded"
      >
        Create new event
      </Link>
      {events.map((event, index) => {
        return (
          <EventCard
            key={index}
            eventId={event._id}
            eventName={event.eventName}
            eventDescription={event.eventDescription}
            date={event.date}
            image={event.img}
            ownerId={event.ownerId}
            size={"lg"}
          />
        );
      })}
    </div>
  );
};

export default Events;
