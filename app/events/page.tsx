"use client";
import React, { useEffect, useState } from "react";
import { EventCard } from "../components/eventCard/eventCard";
import axios from "axios";

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
      {events.map((event, index) => {
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
  );
};

export default Events;
