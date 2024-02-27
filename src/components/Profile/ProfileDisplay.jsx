"use client";
import { supabaseAuth } from "@/utils/supabaseClient";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Interests from "./Interests";

export default function ProfileDisplay() {
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [userInterests, setUserInterests] = useState(null);
  const [editableUser, setEditableUser] = useState(null);
  const [isProfileUpdated, setIsProfileUpdated] = useState(false);
  const [userInterestsArray, setUserInterestsArray] = useState([]);

  const handleInterestsChange = (newInterests) => {
    setUserInterestsArray(newInterests);
  };

  useEffect(() => {
    console.log(userInterestsArray, "<<< userInterestsArray");
  }, [userInterestsArray]);

  const fetchInterestsData = async (interestIds) => {
    try {
      const { data, error } = await supabaseAuth
        .from("interests")
        .select("*")
        .in("interest_id", interestIds);

      if (error) {
        console.error("Error fetching interests data:", error);
        return [];
      }
      return data;
    } catch (error) {
      console.error("Error fetching interests data:", error);
      return [];
    }
  };

  const fetchUserInterests = async (userId) => {
    if (userId === undefined || userId === null) {
      console.error("Error: userId is undefined or null");
      return [];
    }

    try {
      const { data: interestIds, error: userError } = await supabaseAuth
        .from("user_interests")
        .select("interest_id")
        .eq("user_id", userId);

      if (userError) {
        console.error("Error fetching user interests:", userError);
        return [];
      }

      const validInterestIds = interestIds.map(
        (interest) => interest.interest_id,
      );

      const interestsData = await fetchInterestsData(validInterestIds);

      const interestsString = interestsData
        .map((interest) => interest.interest)
        .join(", ");

      setUserInterests(interestsString);
      return interestsData;
    } catch (error) {
      console.error("Error fetching user interests:", error);
      return [];
    }
  };

  // Updating Supabase with new interests

  const clearUserInterests = async (userId) => {
    try {
      await supabaseAuth.from("user_interests").delete().eq("user_id", userId);
    } catch (error) {
      console.error("Error clearing user interests:", error);
      throw error;
    }
  };

  const addUserInterests = async (userId, interestsArray) => {
    try {
      const interestIds = await Promise.all(
        interestsArray.map(async (interestDescription) => {
          try {
            const { data: interest, error } = await supabaseAuth
              .from("interests")
              .select("interest_id")
              .eq("interest", interestDescription);

            if (error) {
              console.error("Error fetching interest ID:", error);
              return null;
            }

            return interest?.[0]?.interest_id || null;
          } catch (error) {
            console.error("Error fetching interest ID:", error);
            return null;
          }
        }),
      );

      const validInterestIds = interestIds.filter((id) => id !== null);

      const userInterestObjects = validInterestIds.map((interestId) => {
        return {
          user_id: userId,
          interest_id: interestId,
        };
      });

      await supabaseAuth.from("user_interests").upsert(userInterestObjects, {
        onConflict: "id",
      });
    } catch (error) {
      console.error("Error adding user interests:", error);
      throw error;
    }
  };

  const clearAndAddUserInterests = async (userId, interestsArray) => {
    await clearUserInterests(userId);
    await addUserInterests(userId, interestsArray);
  };

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const { data, error } = await supabaseAuth.auth.getUser();

        if (error) {
          console.error("Error fetching user:", error);
        } else if (data && data.user) {
          const authUser = data.user;
          const userData = await fetchUserData(authUser.id);

          if (userData) {
            const userId = userData.id;
            setCurrentUser(userData);
            setEditableUser(userData);
            const userInterestsArrayOfObjects =
              await fetchUserInterests(userId);
            const userInterestArrayOfInterests =
              userInterestsArrayOfObjects.map((object) => object.interest);

            setUserInterestsArray(userInterestArrayOfInterests);
          }
        }
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    };

    const fetchUserData = async (authId) => {
      try {
        const { data, error } = await supabaseAuth
          .from("users")
          .select("*")
          .eq("auth_id", authId);

        if (error) {
          console.error("Error fetching user data:", error);
          return null;
        }

        const user = data[0];
        return user;
      } catch (error) {
        console.error("Error fetching user data:", error);
        return null;
      }
    };

    fetchCurrentUser();
  }, []);

  const toggleUpdate = () => {
    if (!isUpdating) {
      setEditableUser({ ...currentUser });
    }
    setIsUpdating((prevState) => !prevState);
  };

  const handleProfileUpdate = async () => {
    if (!editableUser) return;

    try {
      const updatedInterests = await fetchUserInterests(currentUser.id);

      if (Array.isArray(updatedInterests)) {
        const interestsArray = updatedInterests.map(
          (interest) => interest.interest,
        );

        setUserInterests(interestsArray.join(", "));

        setUserInterestsArray(interestsArray);
      } else {
        console.error(
          "Error fetching updated user interests. Data format is unexpected:",
          updatedInterests,
        );
      }

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
        setCurrentUser(editableUser);
        setIsUpdating(false);
        setIsProfileUpdated(true);
        setTimeout(() => setIsProfileUpdated(false), 4000);

        await clearAndAddUserInterests(currentUser.id, userInterestsArray);

        setUserInterestsArray(userInterestsArray);
      }
    } catch (error) {
      console.error("Error updating user details:", error);
    }
  };

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
                className="rounded bg-cyan-600 px-4 py-2 text-white hover:bg-blue-600"
              >
                Cancel
              </button>
            ) : (
              <button
                type="button"
                onClick={() => toggleUpdate()}
                className="rounded bg-cyan-600 px-4 py-2 text-white hover:bg-blue-600"
              >
                Update
              </button>
            )}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleProfileUpdate();
            }}
          >
            {editableUser && (
              <div className="flex flex-col gap-4 pt-4">
                <div className="flex justify-between">
                  <label htmlFor="email">Given Name</label>
                  <input
                    id="given_names"
                    type="text"
                    value={editableUser.given_names}
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
                    value={editableUser.surname}
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
                    value={editableUser.dob}
                    onChange={(e) =>
                      setEditableUser({ ...editableUser, dob: e.target.value })
                    }
                    disabled={!isUpdating}
                    className={`bg-none ${isUpdating ? "rounded border pl-2" : "bg-inherit pl-2"}`}
                    style={{ flex: 0.65 }}
                  />
                </div>

                {isUpdating ? (
                  <Interests
                    userInterestsArray={userInterestsArray}
                    setUserInterestsArray={setUserInterestsArray}
                    onInterestsChange={handleInterestsChange}
                  />
                ) : (
                  <div>
                    <div className="flex justify-between text-2xl font-bold">
                      <p>Interests</p>
                    </div>
                    <div>
                      <div className="mt-4">
                        {userInterests &&
                          userInterestsArray.map((interest, index) => (
                            <div key={index}>{interest}</div>
                          ))}
                      </div>
                    </div>
                  </div>
                )}

                {isUpdating && (
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="rounded bg-cyan-600 px-4 py-2 text-white hover:bg-blue-600"
                    >
                      Confirm
                    </button>
                  </div>
                )}
              </div>
            )}
          </form>
          <AnimatePresence>
            {isProfileUpdated && (
              <motion.div
                initial={{ x: 5000, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1.2 }}
                exit={{ x: 1000, transition: { duration: 3 } }}
                layout
                className="fixed bottom-4 right-4 z-50 rounded-lg border border-black bg-white px-4 py-3 font-semibold text-black shadow-xl"
              >
                Your profile has been updated! 🚀
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
