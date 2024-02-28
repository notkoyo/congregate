"use client";

import { useEffect, useState } from "react";
import SignOutButton from "@/components/SignOutButton";
import { supabaseAuth } from "@/utils/supabaseClient";
import Link from "next/link";
import ProfileCard from "@/components/Profile/ProfileCard";

export default function Profile() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center space-y-6 overscroll-none">
      <div>
        <p className="mb-6 p-8 font-satoshi text-3xl font-bold">
          Welcome to Your Profile Page 👋
        </p>
      </div>
      <ProfileCard />
      {/* <SignOutButton className="inline-block rounded bg-cyan-600 px-5 py-3 font-satoshi text-xl text-white hover:bg-cyan-600" /> */}
      {/* <Link
        href="/"
        className="inline-block rounded bg-cyan-600 px-5 py-3 font-satoshi text-xl text-white hover:bg-cyan-700"
      >
        Home Page
      </Link> */}
    </div>
  );
}
