"use client";

import LoginCard from "../components/Auth/LoginCard"
export default function Home() {
  return (
    <>
      <div className="grid min-h-screen place-items-center">
        <LoginCard />
      </div>
    </>
  );
}
