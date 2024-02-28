"use client";

import {
  fetchCurrentUserData,
  fetchCurrentUserID,
  fetchVenueDataByID,
} from "@/utils/api";
import { supabaseAuth } from "@/utils/supabaseClient";
import { Button, Input, Switch, Textarea } from "@nextui-org/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { InputCustom } from "../Input";
import Interests from "../Profile/Interests";
import { useLogin } from "../loginContext";

export default function EventForm() {
  //data states state
  const [formData, setFormData] = useState({
    name: "",
    venue_id: "",
    start_date: "",
    event_price: "",
    pay_on_booking: false,
    description: "",
    founder_id: "",
  });
  const [userInterestsArray, setUserInterestsArray] = useState([]);
  const [venueData, setVenueData] = useState({});

  //validation states
  const [isNameValid, setIsNameValid] = useState(true);
  const [isStartDateValid, setStartDateValid] = useState(true);
  const [isEventPriceValid, setEventPriceValid] = useState(true);

  //misc states
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  const { isLoggedIn } = useLogin();

  useEffect(() => {
    const storedForm = localStorage.getItem("eventFormDetails");
    if (!formData.founder_id && !storedForm) {
      fetchCurrentUserID()
        .then((id) => {
          return supabaseAuth.from("users").select("id").eq("auth_id", id);
        })
        .then(({ data }) => {
          setFormData({ ...formData, founder_id: data[0].id });
        });
    }
    if (storedForm) {
      setIsSelected(JSON.parse(storedForm).pay_on_booking);
      setFormData(JSON.parse(storedForm));

      fetchVenueDataByID(JSON.parse(storedForm).venue_id).then((res) => {
        setVenueData(res);
      });
    }
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

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "name") {
      value === "" ? setIsNameValid(false) : setIsNameValid(true);
    }

    if (name === "event_price") {
      value > 100 || value < 0
        ? setEventPriceValid(false)
        : setEventPriceValid(true);
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return !formSubmitted ? (
    <form>
      <div className="flex flex-col justify-between gap-6 sm:flex-row">
        <div className="flex w-96 flex-col gap-4">
          <Input
            name="name"
            isRequired
            value={formData.name}
            type="text"
            label="Event name"
            variant="faded"
            isInvalid={!isNameValid}
            color={
              formData.name !== ""
                ? isNameValid
                  ? "success"
                  : "danger"
                : "default"
            }
            errorMessage={!isNameValid && "Please enter a name for your event"}
            onChange={handleChange}
            className="max-w-xs font-medium"
          />

          <Input
            name="start_date"
            placeholder="Enter start date"
            isRequired
            value={formData.start_date}
            type="datetime-local"
            label="Date and time"
            variant="faded"
            isInvalid={!isStartDateValid}
            color={
              formData.start_date !== ""
                ? isStartDateValid
                  ? "success"
                  : "danger"
                : "default"
            }
            errorMessage={
              !isStartDateValid && "Please enter a date and time for your event"
            }
            onChange={handleChange}
            className="max-w-xs font-medium"
          />

          <Input
            name="event_price"
            isRequired
            type="number"
            value={formData.event_price}
            label="Cost per person (Max £100)"
            variant="faded"
            isInvalid={!isEventPriceValid}
            startContent="£"
            color={
              formData.event_price !== ""
                ? isEventPriceValid
                  ? "success"
                  : "danger"
                : "default"
            }
            errorMessage={
              !isEventPriceValid &&
              "Please enter a cost for your event, if your event is free please enter 0"
            }
            onChange={handleChange}
            className="max-w-xs font-medium"
          />

          {/* <Switch
            // value={formData.pay_on_booking}
            color="success"
            onValueChange={setIsSelected}
            isSelected={isSelected}
            onChange={() =>
              setFormData({
                ...formData,
                pay_on_booking: !formData.pay_on_booking,
              })
            }
          >
            Pay on booking
          </Switch> */}

          <Interests
            userInterestsArray={userInterestsArray}
            setUserInterestsArray={setUserInterestsArray}
          />
        </div>

        <div>
          {!formData.venue_id ? (
            <div>
              <Link href="/venues" prefetch={true}>
                <Button label="Venues" onPress={handleVenueRedirect}>
                  Choose Venue
                </Button>
              </Link>
            </div>
          ) : (
            <div className="flex max-h-96 max-w-96 flex-col gap-2 overflow-scroll ">
              <div className="flex justify-between ">
                <h1 className="font-bold">Your selected venue</h1>
                <Link href="/venues" prefetch={true}>
                  <Button onPress={handleVenueRedirect}>Change Venue</Button>
                </Link>
              </div>
              <p>{venueData.name}</p>
              <p>Price: {venueData.price}</p>
              <p>{venueData.description}</p>
              <p>{venueData.address}</p>
              <img
                className="w-96 rounded border"
                src={venueData.photos}
                alt="Photo of the venue"
              />
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col items-end justify-between gap-6 pt-6">
        <Textarea
          type="text"
          label="Description"
          placeholder="Describe your event"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="w-full"
        />

        <Button onPress={handleFormSubmit}>Submit</Button>
      </div>
    </form>
  ) : (
    <>
      <h2>Event successfully created!</h2>
      <Link href={"/"} className="w-fit border-b-2 border-black">
        Return to home page
      </Link>
    </>
  );
}
