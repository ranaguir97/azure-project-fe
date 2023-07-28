"use client";
import axios, { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import React, { FormEvent, useEffect, useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import { useRouter } from "next/navigation";

const newEvent = () => {
  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });
  const [userData, setuserData] = useState<undefined | any>(undefined);
  const [error, setError] = useState();
  const router = useRouter();

  const { data: session } = useSession();

  useEffect(() => {
    setuserData(session?.user);
  }, [session]);

  const handleValueChange = (newValue: any) => {
    console.log("newValue:", newValue);
    setValue(newValue);
  };
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget);
      await axios.post(`${process.env.BE_API}/events/create`, {
        eventName: formData.get("eventName"),
        eventDescription: formData.get("eventDescription"),
        ownerId: userData._id,
        img: "https://picsum.photos/seed/picsum/600/400",
        date: new Date(`${value.startDate}T03:24:00`)
      });
      router.push("/events");
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMessage = error.response?.data.message;
        setError(errorMessage);
      }
    }
  };

  return (
    <div className="flex flex-col pt-20 items-center">
      <form
        onSubmit={handleSubmit}
        className="space-y-6"
        action="#"
        method="POST"
      >
        <div className="sm:col-span-4">
          <label
            htmlFor="username"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Event Title
          </label>
          <div className="mt-2">
            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
              <input
                type="text"
                name="eventName"
                id="eventName"
                className="block flex-1 border-0 bg-transparent py-1.5 w-80 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>

        <div className="col-span-full">
          <label
            htmlFor="about"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Event Description
          </label>
          <div className="mt-2">
            <textarea
              id="eventDescription"
              name="eventDescription"
              rows={8}
              className="block w-80 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              defaultValue={""}
            />
          </div>
        </div>
        <div className="pt-4">
          <Datepicker
            asSingle={true}
            value={value}
            onChange={handleValueChange}
            showShortcuts={false}
          />
        </div>
        <button className=" mt-4 bg-transparent hover:bg-purple-700 text-purple-600 font-semibold hover:text-white py-2 px-4 border border-purple-600 hover:border-transparent rounded">
          Create Event
        </button>
      </form>
    </div>
  );
};

export default newEvent;
