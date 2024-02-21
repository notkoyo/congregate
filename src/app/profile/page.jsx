"use client";

import { useEffect, useState } from "react";
import SignOutButton from "../../components/SignOutButton";
import { supabaseAuth } from "../../utils/supabaseClient";
import Link from "next/link";

export default function Profile() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const { data, error } = await supabaseAuth.auth.getUser();
        if (error) {
          console.error("Error fetching user:", error);
        } else if (data && data.user) {
          setCurrentUser(data.user);
          console.log(data.user, "<<< userData");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchCurrentUser();
  }, []);
  console.log(currentUser, "<<< currentUser");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center space-y-6">
      <div>
        <p className="mb-6 font-satoshi text-3xl font-bold">
          Success! Welcome to Your Profile Page
        </p>
      </div>
      {currentUser && (
        <div className="space-y-2">
          <h2>User Information</h2>
          <p>User ID: {currentUser.id}</p>
          <p>Email: {currentUser.email}</p>
        </div>
      )}
      <SignOutButton className="inline-block rounded bg-cyan-600 px-5 py-3 font-satoshi text-xl text-white hover:bg-cyan-600" />
      <Link
        href="/"
        className="inline-block rounded bg-cyan-600 px-5 py-3 font-satoshi text-xl text-white hover:bg-cyan-600"
      >
        Home Page
      </Link>
    </div>
  );
}

// "use client";
// import React from "react";
// import { supabaseAuth } from "../../utils/supabaseClient";

// function page() {
//   const test = supabaseAuth.auth.getSession();
//   const res = test.then((res) => console.log(res));
//   console.log(res);
//   return <div>page</div>;
// }

// export default page;
