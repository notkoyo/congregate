import { Button } from "@nextui-org/react";
import React from "react";

export default function BookedOnMessage({
  handleHide,
  text,
  text2,
  isLoggedIn,
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className=" flex flex-col gap-2 rounded-md bg-sky-500 p-4 text-black shadow-md">
        {text && <p>{text}</p>}
        {text2 && <p>{text2}</p>}
        <Button onClick={handleHide}>Close</Button>
      </div>
    </div>
  );
}
