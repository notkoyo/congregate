"use client";
import React, { useEffect, useState } from "react";
import { supabaseAuth } from "../../utils/supabaseClient";
import ListVenue from "../../components/Venue/ListVenue";

import "./listVenue.css";
function Page() {
  const [venuesData, setVenuesData] = useState([]);
  const [session, setSession] = useState({});
  const [userId, setUserId] = useState();
  const [venueHasBeenUpdate, setVenueHasBeenUpdate] = useState(false);
  useEffect(() => {
    const fetchVenuesData = async () => {
      try {
        const { data, error } = await supabaseAuth.from("venues").select();
        const res = await supabaseAuth.auth.getSession();
        setSession(res);
        let userId = res.data?.session?.user.id;
        setUserId(userId);
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
          <ListVenue
            key={venue.id}
            venue={venue}
            setVenueHasBeenUpdate={setVenueHasBeenUpdate}
          />
        ))}
      </div>
    </div>
  );
}

export default Page;
