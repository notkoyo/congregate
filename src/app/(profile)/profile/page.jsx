"use client";

import ProfileCard from "../../../components/Profile/ProfileCard";
import SignOutButton from "../../../components/SignOutButton";

export default function Profile() {
  return (
    <>
      <div>
        <div className="absolute flex justify-between">
          <h1 className="mb-10 text-center text-2xl font-bold">Profile</h1>
          <SignOutButton />
        </div>
        <div className="grid min-h-screen place-items-center">
          <ProfileCard />
        </div>
      </div>
    </>
  );
}
