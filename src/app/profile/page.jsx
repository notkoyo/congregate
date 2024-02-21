"use client";
import React from "react";
import { useEffect, useState } from "react";
import { supabaseAuth } from "../../utils/supabaseClient";

function page() {
  const [session, setSession] = useState([]);
  useEffect(() => {
    const getSessionFunc = async () => {
      const res = await supabaseAuth.auth.getSession();
      setSession(res);
    };
    getSessionFunc();
  }, []);
  console.log(session);
  return (
    <div>
      <p></p>
      <p></p>
    </div>
  );
}

export default page;
