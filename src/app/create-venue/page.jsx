"use client";
import React, { useEffect, useState } from "react";
import CreateVenue from "../../components/Venue/CreateVenue";
import { supabaseAuth } from "../../utils/supabaseClient";
function Page() {
  const [userId, setUserId] = useState();
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data, error } = await supabaseAuth.auth.getSession();
        if (error) {
          console.log("Error fetching venues data:", error);
        } else {
          let useId = data?.session?.user.id;
          setUserId(useId);
        }
      } catch (error) {
        console.log("Error fetching venues data:", error);
      }
    };

    fetchUserData();
  }, []);
  return (
    <div>
      <CreateVenue userId={userId} />
    </div>
  );
}

export default Page;
