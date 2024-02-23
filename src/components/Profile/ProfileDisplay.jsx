"use client";

import { supabaseAuth } from "@/utils/supabaseClient";
import { useEffect, useState } from "react";

export default function ProfileDisplay() {
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [userInterests, setUserInterests] = useState(null);
  const [editableUser, setEditableUser] = useState(null);

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
          setEditableUser({ ...data[0] });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const fetchUserInterests = async (id) => {
      try {
        const { data: user, error: userError } = await supabaseAuth
          .from("users")
          .select("id")
          .eq("auth_id", id);

        if (userError) {
          console.error("Error fetching user:", userError);
          return;
        }

        const userId = user[0].id;

        const { data: interests, error: interestsError } = await supabaseAuth
          .from("user_interests")
          .select("*")
          .eq("user_id", String(userId));

        if (interestsError) {
          console.error("Error fetching user interests:", interestsError);
          return;
        }

        const interestIds = interests.map((interest) => interest.interest_id);

        const { data: interestsData, error: interestsDataError } =
          await supabaseAuth
            .from("interests")
            .select("*")
            .in("interest_id", interestIds);

        if (Array.isArray(interestsData) && interestsData.length > 0) {
          setUserInterests(
            interestsData.map((interest) => interest.interest).join(", "),
          );
        } else {
          setUserInterests("");
        }
      } catch (error) {
        console.error("Error fetching user interests:", error);
      }
    };

    fetchCurrentUser().then((id) => {
      fetchUserData(id).then(() => {
        fetchUserInterests(id);
      });
    });
    setEditableUser({ ...currentUser });
  }, [currentUser]);

  function toggleUpdate() {
    if (!isUpdating) {
      setEditableUser({ ...currentUser });
    } else {
      setEditableUser(null);
    }
    setIsUpdating((prevState) => !prevState);
  }

  function handleSubmit() {
    setCurrentUser(editableUser);
    setIsUpdating(false);
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
          {currentUser && <p>{`${currentUser.email}`}</p>}
        </div>

        <div className="w-96 p-6">
          <div className="flex justify-between">
            <h3 className="text-center text-2xl font-bold">Information</h3>
            {isUpdating ? (
              <button
                type="button"
                onClick={() => toggleUpdate()}
                className="inline-block rounded bg-cyan-600 px-5 py-3 font-satoshi text-sm text-white hover:bg-cyan-700"
              >
                Cancel
              </button>
            ) : (
              <button
                type="button"
                onClick={() => toggleUpdate()}
                className="inline-block rounded bg-cyan-600 px-5 py-3 font-satoshi text-sm text-white hover:bg-cyan-700"
              >
                Update
              </button>
            )}
          </div>

          <form action="submit">
            {editableUser && (
              <div className="flex flex-col gap-4 pt-4">
                <div className="flex justify-between">
                  <label htmlFor="email">Given Name</label>
                  <input
                    id="name"
                    type="text"
                    defaultValue={editableUser.given_names}
                    onChange={(e) =>
                      setEditableUser({
                        ...editableUser,
                        given_names: e.target.value,
                      })
                    }
                    disabled={!isUpdating}
                    className={`${isUpdating ? "rounded border pl-2" : "bg-inherit pl-2"}`}
                  />
                </div>
                <div className="flex justify-between">
                  <label htmlFor="email">Surname</label>
                  <input
                    id="name"
                    type="text"
                    defaultValue={editableUser.surname}
                    onChange={(e) =>
                      setEditableUser({
                        ...editableUser,
                        surname: e.target.value,
                      })
                    }
                    disabled={!isUpdating}
                    className={`${isUpdating ? "rounded border pl-2" : "bg-inherit pl-2"}`}
                  />
                </div>

                <div className="flex justify-between">
                  <label htmlFor="dob">Date of Birth</label>
                  <input
                    id="dob"
                    type="date"
                    defaultValue={editableUser.dob}
                    onChange={(e) =>
                      setEditableUser({ ...editableUser, dob: e.target.value })
                    }
                    disabled={!isUpdating}
                    className={`bg-none ${isUpdating ? "rounded border pl-2" : "bg-inherit pl-2"}`}
                  />
                </div>

                <div className="flex justify-between">
                  <label htmlFor="interests">Interests</label>
                  <input
                    id="interests"
                    type="text"
                    defaultValue={userInterests}
                    disabled={!isUpdating}
                    className={`${isUpdating ? "rounded border pl-2" : "bg-inherit pl-2"}`}
                  />
                </div>
                {isUpdating && (
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={handleSubmit}
                      className="inline-block rounded bg-cyan-600 px-5 py-3 font-satoshi text-sm text-white hover:bg-cyan-700"
                    >
                      Confirm
                    </button>
                  </div>
                )}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
