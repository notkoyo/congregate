"use client";
import React, { useEffect, useState } from "react";
import { supabaseAuth } from "../../../utils/supabaseClient";
function Page({ params }) {
  const venue_id = params.venue_id;
  const [venuesData, setVenuesData] = useState(null);
  useEffect(() => {
    const fetchVenuesData = async () => {
      try {
        const { data, error } = await supabaseAuth
          .from("venues")
          .select()
          .match({ venue_id });
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
    <div className="mx-auto mt-10 grid w-1600 grid-cols-3 gap-6">
      <p>Nice</p>
    </div>
  );
}

export default Page;
