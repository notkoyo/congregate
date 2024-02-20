"use client";

import { useState } from "react";

export default function ProfileDisplay() {
  const [isUpdating, setIsUpdating] = useState(false);

  function toggleUpdate() {
    setIsUpdating((prevState) => !prevState);
  }

  return (
    <div className="flex flex-col gap-4 font-satoshi">
      <div className="flex">
        <div className="flex flex-col items-center gap-10 p-6">
          <img
            width={200}
            src="https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg"
            alt=""
          />
          <h2>Name</h2>
        </div>

        <div className="w-96 p-6">
          <div className="flex justify-between">
            <h3 className="text-center text-2xl font-bold">Information</h3>
            {isUpdating ? (
              <button
                type="button"
                onClick={() => toggleUpdate()}
                className="rounded border px-4 text-small"
              >
                Cancel
              </button>
            ) : (
              <button
                type="button"
                onClick={() => toggleUpdate()}
                className="rounded border px-4 text-small"
              >
                Update
              </button>
            )}
          </div>

          <form action="submit">
            <div className="flex flex-col gap-4  pt-4">
              <div className="flex justify-between ">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="text"
                  placeholder="email"
                  disabled={!isUpdating}
                  className={`${isUpdating ? "rounded border pl-2" : "bg-inherit pl-2"}`}
                />
              </div>

              <div className="flex justify-between">
                <label htmlFor="dob">Date of Birth</label>
                <input
                  id="dob"
                  type="text"
                  placeholder="dob"
                  disabled={!isUpdating}
                  className={`bg-none ${isUpdating ? "rounded border pl-2" : "bg-inherit pl-2"}`}
                />
              </div>

              <div className="flex justify-between">
                <label htmlFor="interests">Interests</label>
                <input
                  id="interests"
                  type="text"
                  placeholder="interests"
                  disabled={!isUpdating}
                  className={`${isUpdating ? "rounded border pl-2" : "bg-inherit pl-2"}`}
                />
              </div>
              {isUpdating && (
                <div className="flex justify-end">
                  <button className="rounded border px-4 text-small">
                    Confirm
                  </button>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
