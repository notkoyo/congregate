"use client";

import LoginCard from "../components/Auth/LoginCard";
import { Events } from "../components/Events";
export default function Home() {
  return (
    <>
      <div className="grid min-h-screen place-items-center">
        <LoginCard />
      </div>
      <Events />
    </>
  );
}
