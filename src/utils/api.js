import { supabaseAuth } from "./supabaseClient";

export const fetchCurrentUserID = async () => {
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

export const fetchCurrentUserData = async () => {
  try {
    const { data, error } = await supabaseAuth.auth.getUser();
    if (error) {
      console.error("Error fetching user:", error);
    } else if (data && data.user) {
      return data.user;
    }
  } catch (error) {
    console.error("Error fetching user:", error);
  }
};

export const fetchUserData = async (auth_id) => {
  try {
    const { data, error } = await supabaseAuth
      .from("users")
      .select()
      .eq("auth_id", auth_id);
    if (error) {
      console.error("Error fetching user data:", error);
    } else {
      return data[0];
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

export const postUserData = async (userObject) => {
  try {
    const currentUser = await fetchCurrentUserData();

    userObject.email = currentUser.email;
    userObject.auth_id = currentUser.id;

    const { data, error } = await supabaseAuth
      .from("users")
      .insert(userObject)
      .select();
    if (error) {
      console.error("Error posting user data:", error);
    } else {
      return data;
    }
  } catch (error) {
    console.error("Error posting user data:", error);
  }
};

export const fetchInterestsData = async () => {
  try {
    const { data, error } = await supabaseAuth.from("interests").select();
    if (error) {
      console.error("Error fetching interests data:", error);
    } else {
      return data;
    }
  } catch (error) {
    console.error("Error fetching interests data:", error);
  }
};

export const postUserInterests = async (userInterestArray) => {
  try {
    const authID = await fetchCurrentUserID();
    const { id } = await fetchUserData(authID);
    // console.log(userData);
    // const id = userData.id;
    console.log(id);
    const interestsData = await fetchInterestsData();

    const userInterestObjects = [];

    userInterestArray.forEach((interestName) => {
      const { interest_id } = interestsData.find(
        (interestsObject) => interestsObject.interest === interestName,
      );
      const finalObject = {
        user_id: id,
        interest_id: interest_id,
      };
      userInterestObjects.push(finalObject);
    });

    const { data, error } = await supabaseAuth
      .from("user_interests")
      .insert(userInterestObjects)
      .select();
    if (error) {
      console.error("Error posting user_interests data:", error);
    } else {
      return data;
    }
  } catch (error) {
    console.error("Error posting user_interests data:", error);
  }
};

export const fetchVenueDataByID = async (venue_id) => {
  try {
    const { data, error } = await supabaseAuth
      .from("venues")
      .select()
      .eq("venue_id", 1);
    if (error) {
      console.error("Error fetching venue data:", error);
    } else {
      return data[0];
    }
  } catch (error) {
    console.error("Error fetching venue data:", error);
  }
};
