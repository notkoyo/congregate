"use client";

import Link from "next/link";
import SignOutButton from "../../../components/SignOutButton";
import ProfileCreateForm from "@/components/Profile/ProfileCreateForm";

export default function Profile() {
  return (
    <>
      <div className="flex justify-between">
        <Link
          href="/"
          className="inline-block rounded bg-cyan-600 px-5 py-3 font-satoshi text-xl text-white hover:bg-cyan-600"
        >
          Home Page
        </Link>
        <SignOutButton className="inline-block rounded bg-cyan-600 px-5 py-3 font-satoshi text-xl text-white hover:bg-cyan-600" />
      </div>
      <div className="flex h-screen flex-col items-center border border-red-500">
        <h1 className="pb-12 text-xl">Create Profile</h1>
        <div>
          <ProfileCreateForm />
        </div>
      </div>
    </>
  );
}
