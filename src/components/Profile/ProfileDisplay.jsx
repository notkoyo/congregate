"use client";

import { supabaseAuth } from "@/utils/supabaseClient";
import { useEffect, useState } from "react";

export default function ProfileDisplay() {
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const { data, error } = await supabaseAuth.auth.getUser();
        if (error) {
          console.error("Error fetching user:", error);
        } else if (data && data.user) {
          return data.user.id;
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    const fetchUserData = async (id) => {
      try {
        const { data, error } = await supabaseAuth
          .from("users")
          .select()
          .eq("auth_id", id);
        if (error) {
          console.error("Error fetching user data:", error);
        } else {
          setCurrentUser(data[0]);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchCurrentUser().then((res) => {
      fetchUserData(res);
    });
  }, []);

  console.log(currentUser, "<<< currentUser");

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
          {currentUser && (
            <p>{`${currentUser.given_names} ${currentUser.surname}`}</p>
          )}
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
                  placeholder={currentUser.email}
                  disabled={!isUpdating}
                  className={`${isUpdating ? "rounded border pl-2" : "bg-inherit pl-2"}`}
                />
              </div>

              <div className="flex justify-between">
                <label htmlFor="dob">Date of Birth</label>
                <input
                  id="dob"
                  type="text"
                  placeholder={currentUser.dob}
                  disabled={!isUpdating}
                  className={`bg-none ${isUpdating ? "rounded border pl-2" : "bg-inherit pl-2"}`}
                />
              </div>

              <div className="flex justify-between">
                <label htmlFor="interests">Interests</label>
                <input
                  id="interests"
                  type="text"
                  placeholder="TBD"
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
