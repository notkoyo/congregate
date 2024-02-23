"use client";

import { fetchCurrentUserData, fetchCurrentUserID } from "@/utils/api";
import { supabaseAuth } from "@/utils/supabaseClient";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function CreateEvent() {
  const [formData, setFormData] = useState({
    name: null,
    venue_id: null,
    start_date: null,
    event_price: null,
    pay_on_booking: null,
    description: null,
    founder_id: fetchCurrentUserID()
  });
  fetchCurrentUserData().then((data) => console.log(data)) 

  useEffect(() => {
    const storedForm = localStorage.getItem("eventFormDetails");
    if (storedForm) setFormData(JSON.parse(storedForm));
  }, []);

  const handleVenueRedirect = () => {
    localStorage.setItem("eventFormDetails", JSON.stringify(formData));
  };

  const handleFormSubmit = () => {
    supabaseAuth
      .from("events")
      .insert(formData)
      .then()
      .catch((err) => console.log(err));
  };

  return (
    <form>
      <label>
        Event name
        <input
          className="flex flex-col border-1 border-solid border-black"
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        ></input>
      </label>
      {!formData.venue_id ? (
        <label>
          Venues
          <Link href="/list-venue" prefetch={true}>
            <Button onPress={handleVenueRedirect}>Choose Venue</Button>
          </Link>
        </label>
      ) : (
        <>
          <p>{formData.venue_id}</p>
          <Link href="/list-venue" prefetch={true}>
            <Button onPress={handleVenueRedirect}>Change Venue</Button>
          </Link>
        </>
      )}

      <label>
        Date and time
        <input
          className="flex flex-col border-1 border-solid border-black"
          type="datetime-local"
          value={formData.start_date}
          onChange={(e) =>
            setFormData({ ...formData, start_date: e.target.value })
          }
        ></input>
      </label>
      <label>
        Cost per person
        <input
          className="flex flex-col border-1 border-solid border-black"
          type="text"
          value={formData.event_price}
          onChange={(e) =>
            setFormData({ ...formData, event_price: e.target.value })
          }
        ></input>
      </label>
      <label>
        Details
        <input
          className="flex flex-col border-1 border-solid border-black"
          type="text"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        ></input>
      </label>
      <Button onPress={() => localStorage.clear()}>press</Button>
      <Button onPress={handleFormSubmit}>Submit</Button>
    </form>
  );
}
