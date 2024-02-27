"use client";
import React, { useEffect, useState } from "react";
import { supabaseAuth } from "../../utils/supabaseClient";
import ListVenue from "../../components/Venue/ListVenue";
import "./listVenue.css";
function Page() {
  const [venuesData, setVenuesData] = useState([]);
  const [venueHasBeenUpdate, setVenueHasBeenUpdate] = useState(false);
  useEffect(() => {
    const fetchVenuesData = async () => {
      try {
        const { data, error } = await supabaseAuth.from("venues").select();
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

  return (
    <div className="venue_grid">
      <div className="venue_inside">
        {venuesData?.map((venue) => (
          <div key={venue.venue_id}>
            <ListVenue
              venue={venue}
              setVenueHasBeenUpdate={setVenueHasBeenUpdate}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Page;
