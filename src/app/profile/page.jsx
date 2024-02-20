"use client";
import React from "react";
import { supabaseAuth } from "../../utils/supabaseClient";

function page() {
  const test = supabaseAuth.auth.getSession();
  const res = test.then((res) => console.log(res));
  console.log(res);
  return <div>page</div>;
}

export default page;
