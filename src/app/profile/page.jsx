"use client";

import { useEffect, useState } from "react";
import SignOutButton from "../../components/SignOutButton";
import { getCurrentUserID } from "../../utils/api";
import { supabaseAuth } from "../../utils/supabaseClient";

export default function Profile() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [currentUserID, setCurrentUserID] = useState("");

  useEffect(() => {
    // getCurrentUserID().then(())
    const fetchUsersData = async () => {
      try {
        const { data, error } = await supabaseAuth.from("users").select();
        if (error) {
          console.error("Error fetching users data:", error);
        } else {
          setCurrentUserID(data);
        }
      } catch (error) {
        console.error("Error fetching users data:", error);
      }
    };

    fetchUsersData();

    console.log(users);
  }, []);

  return (
    <div>
      <div>Profile</div>
      <SignOutButton />
    </div>
  );
}
