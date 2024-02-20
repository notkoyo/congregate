"use client";
import React, { useEffect, useState } from "react";
import { supabaseAuth } from "../../utils/supabaseClient";
import ListVenue from "../../components/ListVenue";

import "./listVenue.css";
function Page() {
  const [venuesData, setVenuesData] = useState(null);

  useEffect(() => {
    const fetchVenuesData = async () => {
      try {
        const { data, error } = await supabaseAuth.from("venues").select();
        if (error) {
          console.error("Error fetching venues data:", error);
        } else {
          setVenuesData(data);
        }
      } catch (error) {
        console.error("Error fetching venues data:", error);
      }
    };

    fetchVenuesData();
  }, []);

  return (
    <div className="venue_grid">
      <div className="venue_inside">
        {venuesData?.map((venue) => (
          <ListVenue key={venue.id} venue={venue} />
        ))}
      </div>
    </div>
  );
}

export default Page;
