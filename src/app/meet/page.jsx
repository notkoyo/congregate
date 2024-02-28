"use client";

import { Events } from "../../components/Events/Events";

export default function Meet() {
  return (
    <>
      <h1 className="m-8 mb-10 text-center font-satoshi text-5xl">
        Local Events
      </h1>
      <Events />
    </>
  );
}
