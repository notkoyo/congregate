"use client";

import { fetchCurrentUserData, fetchCurrentUserID } from "@/utils/api";
import { supabaseAuth } from "@/utils/supabaseClient";
import { Button, Switch, Textarea } from "@nextui-org/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function EventForm() {
  const [formData, setFormData] = useState({
    name: "",
    venue_id: "",
    start_date: "",
    event_price: "",
    pay_on_booking: true,
    description: "",
    founder_id: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [isSelected, setIsSelected] = useState(true);

  useEffect(() => {
    const storedForm = localStorage.getItem("eventFormDetails");
    if (!formData.founder_id && !storedForm) {
      fetchCurrentUserID()
        .then((id) => {
          return supabaseAuth.from("users").select("id").eq("auth_id", id);
        })
        .then(({ data }) => {
          console.log(data[0].id);
          setFormData({ ...formData, founder_id: data[0].id });
        });
    }
    if (storedForm) {setFormData(JSON.parse(storedForm)), setIsSelected(JSON.parse(storedForm).pay_on_booking)};
  }, []);

  const handleVenueRedirect = () => {
    localStorage.setItem("eventFormDetails", JSON.stringify(formData));
  };

  const handleFormSubmit = () => {
    supabaseAuth
      .from("events")
      .insert(formData)
      .then((response) => {
        response.status !== 400 ? setFormSubmitted(true) : setError(true);
      })
      .catch((err) => console.log(err));

    localStorage.clear();
  };

  return !formSubmitted ? (
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
      <br />
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
          className="remove-arrow flex flex-col border-1 border-solid border-black"
          type="number"
          value={formData.event_price}
          onChange={(e) => {
            if (e.target.value >= 0)
              setFormData({ ...formData, event_price: e.target.value });
          }}
        ></input>
      </label>
      <Switch
        // value={formData.pay_on_booking}
        color="success"
        onValueChange={setIsSelected}
        isSelected={isSelected}
        onChange={() => setFormData({...formData, pay_on_booking: !formData.pay_on_booking})}

      >
        Pay on booking
      </Switch>

      <label>
        Details
        <Textarea
          className="flex flex-col border-1 border-solid border-black"
          type="text"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          placeholder="describe your event"
        ></Textarea>
      </label>
      <Button onPress={handleFormSubmit}>Submit</Button>
    </form>
  ) : (
    <>
      <h2>event successfully created!</h2>
      <Link href={"/"}>Return to home page</Link>
    </>
  );
}
