"use client";

import Link from "next/link";
import SignOutButton from "../../../components/SignOutButton";

export default function Profile() {
  return (
    <>
      <div>
        <div>Create Profile</div>
        <SignOutButton className="inline-block rounded bg-cyan-600 px-5 py-3 font-satoshi text-xl text-white hover:bg-cyan-600" />
        <Link
          href="/"
          className="inline-block rounded bg-cyan-600 px-5 py-3 font-satoshi text-xl text-white hover:bg-cyan-600"
        >
          Home Page
        </Link>
      </div>
    </>
  );
}
