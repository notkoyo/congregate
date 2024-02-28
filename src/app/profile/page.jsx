"use client";

import { useEffect, useState } from "react";
import SignOutButton from "@/components/SignOutButton";
import { supabaseAuth } from "@/utils/supabaseClient";
import Link from "next/link";
import ProfileCard from "@/components/Profile/ProfileCard";

export default function Profile() {
  return (
    <div className="flex max-h-screen flex-col items-center justify-center space-y-4 overscroll-none pb-4 pt-4">
      <div>
        <p className="mb-6 p-8 font-satoshi text-3xl font-bold">
          Welcome to Your Profile Page 👋
        </p>
      </div>
      <ProfileCard />
    </div>
  );
}
