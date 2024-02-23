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
  }, []);

  function toggleUpdate() {
    if (!isUpdating) {
      setEditableUser({ ...currentUser });
    } else {
      setEditableUser({ ...currentUser });
    }
    setIsUpdating((prevState) => !prevState);
  }

  async function handleSubmit() {
    if (!editableUser) return;

    if (!editableUser.email) {
      console.error("Email cannot be null");
      return;
    }

    try {
      const { data, error } = await supabaseAuth.from("users").upsert(
        [
          {
            auth_id: currentUser.auth_id,
            given_names: editableUser.given_names,
            surname: editableUser.surname,
            dob: editableUser.dob,
            email: editableUser.email,
          },
        ],
        { onConflict: ["auth_id"] },
      );

      if (error) {
        console.error("Error updating user details:", error);
      } else {
        console.log("User details updated successfully:", data);
        setCurrentUser(editableUser);
        setIsUpdating(false);
      }
    } catch (error) {
      console.error("Error updating user details:", error);
    }
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
                className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              >
                Cancel
              </button>
            ) : (
              <button
                type="button"
                onClick={() => toggleUpdate()}
                className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              >
                Update
              </button>
            )}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
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
                      className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
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
