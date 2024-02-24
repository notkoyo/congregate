"use client";
// import { createClient } from "@supabase/supabase-js";
import { supabaseAuth } from "@/utils/supabaseClient";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Interests from "./Interests";
// import React from "react";

export default function ProfileDisplay() {
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [userInterests, setUserInterests] = useState(null);
  const [editableUser, setEditableUser] = useState(null);
  const [isProfileUpdated, setIsProfileUpdated] = useState(false);
  const [userInterestsArray, setUserInterestsArray] = useState([]);
  // const [showInterests, setShowInterests] = useState(false);

  const handleInterestsChange = (newInterests) => {
    setUserInterestsArray(newInterests);
    console.log(newInterests, "<<< newInterests");
  };

  const fetchUserInterests = async (userId) => {
    console.log("Inside fetchUserInterests, userId:", userId);
    try {
      const { data: interestIds, error: userError } = await supabaseAuth
        .from("user_interests")
        .select("interest_id")
        .eq("user_id", userId);

      if (userError) {
        console.error("Error fetching user interests:", userError);
        return null;
      }

      const validInterestIds = interestIds.map(
        (interest) => interest.interest_id,
      );

      const interestsData = await fetchInterestsData(validInterestIds);
      setUserInterests(
        interestsData.map((interest) => interest.interest).join(", "),
      );
    } catch (error) {
      console.error("Error fetching user interests:", error);
    }
  };

  useEffect(() => {
    // console.log("Initial authId:", authId);
    const fetchCurrentUser = async () => {
      const { data, error } = await supabaseAuth.auth.getUser();
      console.log(data, "<<< UserData");
      console.log(data.user.id, "<<< authId");
      if (error) {
        console.error("Error fetching user:", error);
      } else if (data && data.user) {
        const authUser = data.user;
        fetchUserData(authUser.id); // returning authId as a result (see log above)
        console.log(authUser.id, "<<< authUser.id");
      }
    };

    const fetchUserData = async (authId) => {
      console.log("Inside fetchUserData, authId:", authId);
      const { data, error } = await supabaseAuth
        .from("users")
        .select("*")
        .eq("auth_id", authId);
      if (error) {
        console.error("Error fetching user data:", error);
      } else {
        const userId = data[0].id;
        console.log(userId, "userId, data[0].id");
        setCurrentUser(data[0]);
        setEditableUser({ ...data[0] });
        fetchUserInterests(userId);
      }
    };

    const fetchInterestsData = async (interestIds) => {
      console.log("Inside fetchInterestsData, interestIds:", interestIds);
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

    // Initial fetch
    fetchCurrentUser();
  }, []);

  function toggleUpdate() {
    if (!isUpdating) {
      setEditableUser({ ...currentUser });
    }
    setIsUpdating((prevState) => !prevState);
  }

  const clearUserInterests = async (userId) => {
    console.log(userId, "<<< userId");
    await supabaseAuth.from("user_interests").delete().eq("user_id", userId); // removed String(userId)
  };

  const updateUserInterests = async (userId, interestsArray) => {
    await clearUserInterests(userId);

    // Fetch interest IDs first
    const interestIds = await Promise.all(
      interestsArray.map(async (interestDescription) => {
        console.log(interestDescription, "<<< interest description");
        const { data: interest, error } = await supabaseAuth
          .from("interests")
          .select("interest_id")
          .eq("interest", interestDescription);

        if (error) {
          console.error("Error fetching interest ID:", error);
          return null;
        }

        console.log(interest, "<<< interest");
        return interest?.[0]?.interest_id || null; // Return the interest ID directly
      }),
    );

    // Filter out any null values (in case of errors)
    const validInterestIds = interestIds.filter((id) => id !== null);

    // Insert new interests for the user
    for (const interestId of validInterestIds) {
      await supabaseAuth
        .from("user_interests")
        .insert([{ user_id: String(userId), interest_id: interestId }], {
          onConflict: ["interest_id"],
        });
    }
  };

  const handleProfileUpdate = async () => {
    if (!editableUser) return;

    const updatedInterests = await fetchUserInterests(userId);
    if (updatedInterests !== null) {
      setUserInterests(
        updatedInterests.map((interest) => interest.interest).join(", "),
      );
      console.log(updatedInterests);
      console.log("User interests updated successfully");
    } else {
      console.error("Error fetching updated user interests:", error);
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
        setCurrentUser(editableUser);
        setIsUpdating(false);
        setIsProfileUpdated(true);
        setTimeout(() => setIsProfileUpdated(false), 4000);

        await updateUserInterests(currentUser.id, userInterestsArray);

        setUserInterestsArray([]);
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
                    style={{ flex: 0.65 }}
                  />
                </div>
                <div>
                  {isUpdating && (
                    <Interests
                      userInterestsArray={userInterestsArray}
                      setUserInterestsArray={setUserInterestsArray}
                      onInterestsChange={handleInterestsChange}
                    />
                  )}
                </div>

                <div className="flex justify-between">
                  <p>Interests</p>
                </div>
                <div>
                  {userInterestsArray.map((interestDescription, index) => (
                    <div key={index}>{interestDescription}</div>
                  ))}
                </div>

                {isUpdating && (
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      // onClick={handleProfileUpdate}
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

//  <input
//    id="interests"
//    type="text"
//    defaultValue={userInterests}
//    disabled={!isUpdating}
//    className={`${isUpdating ? "rounded border pl-2" : "bg-inherit pl-2"}`}
//  />;

// Update local state with the formatted interests string
// const { data: updatedInterests, error: fetchError } =
//   await fetchUserInterests(userId);
// if (fetchError) {
//   console.error("Error fetching updated user interests:", error);
// } else {
//   setUserInterests(
//     updatedInterests.map((interest) => interest.interest).join(", "),
//   );
// }

// Replace this block in fetchUserInterests
// if (Array.isArray(interestsData) && interestsData.length > 0) {
//   setUserInterestsArray(
//     interestsData.map((interest) => interest.interest).join(", "),
//   );
// } else {
//   setUserInterestsArray([]);
// }

// const clearUserInterests = () => {
//   setUserInterestsArray([]);
// };

// Update local state with the formatted interests string
// const updatedInterests = await fetchUserInterests(userId);
// setUserInterests(
//   updatedInterests.map((interest) => interest.interest).join(", "),
// );
// console.log(updatedInterests);
// console.log("User interests updated successfully");
// if (fetchError) {
//   console.error("Error fetching updated user interests:", error);
// } else {
//   setUserInterests(
//     updatedInterests.map((interest) => interest.interest).join(", "),
//   );
// }

//   fetchCurrentUser().then((id) => {
//     fetchUserData(id).then(() => {
//       fetchUserInterests(id);
//     });
//   });
// }, []);

// const fetchUserInterests = async (authId) => {
//   console.log("Inside fetchUserInterests, authId:", authId);
//   try {
//     const { data: user, error: userError } = await supabaseAuth
//       .from("users")
//       .select("id")
//       .eq("auth_id", authId);

//     if (userError) {
//       console.error("Error fetching user:", userError);
//       return null;
//     }

//     const userId = user[0].id;

//     const { data: interests, error: interestsError } = await supabaseAuth
//       .from("user_interests")
//       .select("interest_id")
//       .eq("user_id", userId);

//     if (interestsError) {
//       console.error("Error fetching user interests:", interestsError);
//       return null;
//     }
//     console.log(userId, "<<< userId", typeof userId);
//     console.log(authId, "<<< authId", typeof authId);
//     // console.log(interests); empty array

//     const interestIds = interests.map((interest) => interest.interest_id);
//     // console.log(interestIds); empty array

//     const { data: interestsData, error: interestsDataError } =
//       await supabaseAuth
//         .from("interests")
//         .select("interest")
//         .eq("interest_id", interestIds);

//     if (Array.isArray(interestsData) && interestsData.length > 0) {
//       return interestsData;
//     } else {
//       return [];
//     }
//   } catch (error) {
//     console.error("Error fetching user interests:", error);
//     return null;
//   }
// };
