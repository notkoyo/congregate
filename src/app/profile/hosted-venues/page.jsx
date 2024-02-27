"use client";

import React, { useState, useEffect } from "react";
import HostedVenue from "../../../components/Venue/HostedVenue";
import ListVenue from "../../../components/Venue/ListVenue";
import { supabaseAuth } from "../../../utils/supabaseClient";
import "./listVenue.css";

function page() {
  const [venuesData, setVenuesData] = useState([]);
  const [userId, setUserId] = useState();
  const [venueHasBeenUpdate, setVenueHasBeenUpdate] = useState(false);

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
        console.log(data);

        if (error) {
          console.error("Error fetching venues data:", error);
        } else {
          setVenuesData(data);
          setVenueHasBeenUpdate(false);
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
    <div className="venue_grid">
      <div className="venue_inside">
        {readyVenues?.map((venue) => (
          <div key={venue.id}>
            <ListVenue
              key={venue.id} // Add a key prop here
              venue={venue}
              setVenueHasBeenUpdate={setVenueHasBeenUpdate}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default page;
