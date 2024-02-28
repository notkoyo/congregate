"use client";

import React, { useState, useEffect } from "react";
import HostedVenue from "../../../components/Venue/HostedVenue";
import ListVenue from "../../../components/Venue/ListVenue";
import { supabaseAuth } from "../../../utils/supabaseClient";
import "./listVenue.css";
import Link from "next/link";
import { Button } from "@nextui-org/react";
import Heading from "@/components/Header";

function page() {
  const [venuesData, setVenuesData] = useState([]);
  const [userId, setUserId] = useState();
  const [venueHasBeenUpdate, setVenueHasBeenUpdate] = useState(false);
  const [noVenues, setNoVenues] = useState(false);

  useEffect(() => {
    const fetchVenuesData = async () => {
      try {
        const res = await supabaseAuth.auth.getSession();
        let userId = res.data?.session?.user.id;
        setUserId(userId);
        const { data, error } = await supabaseAuth
          .from("venues")
          .select()
          .match({ founder_id: userId });

        if (error) {
          console.error("Error fetching venues data:", error);
        } else {
          setVenuesData(data);
          setVenueHasBeenUpdate(false);
        }

        if (data.length === 0) {
          setNoVenues(true);
        }
      } catch (error) {
        console.error("Error fetching venues data:", error);
      }
    };

    fetchVenuesData();
  }, [venueHasBeenUpdate]);
  const readyVenues = [];

  const filterUserVenue = () => {
    if (venuesData.length !== 0) {
      for (let i = 0; i < venuesData.length; i++) {
        const venue = venuesData[i];
        // Check if the venue's founder_id is equal to userId
        if (venue.founder_id === userId) {
          // Add a new key-value pair isUserVenue: true
          readyVenues.push({ ...venue, isUserVenue: true });
        } else {
          // Push the venue without modifying it
          readyVenues.push(venue);
        }
      }
    }
  };
  filterUserVenue();

  return (
    <div>
      <Heading heading="Welcome to your venues 🏠" />
      <div className="venue_grid">
        {noVenues ? (
          <>
            {" "}
            <div className=" text-center">
              <p className="mb-4 text-2xl">You dont have your hosted venues</p>
              <Link href="/host/venue">
                <Button color="default">Host Venue</Button>
              </Link>
            </div>
          </>
        ) : (
          <div className="venue_inside">
            {readyVenues?.map((venue, index) => (
              <div className="venue_item" key={index}>
                <ListVenue
                  venue={venue}
                  setVenueHasBeenUpdate={setVenueHasBeenUpdate}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default page;
