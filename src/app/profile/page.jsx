import SignOutButton from "../../components/SignOutButton";
import { getCurrentUserID } from "../../utils/api";
import { supabaseAuth } from "../../utils/supabaseClient";
import { ProfileDisplay } from "../../components/Profile/ProfileDisplay";

export default async function Profile() {
  const fetchUsersData = async () => {
    try {
      const { data, error } = await supabaseAuth.from("users").select();
      if (error) {
        console.error("Error fetching users data:", error);
      } else {
        setCurrentUserID(data);
      }
    } catch (error) {
      console.error("Error fetching users data:", error);
    }
  };

  fetchUsersData();

  console.log(users);

  return (
    <div>
      <div>Profile</div>
      <SignOutButton />
      <ProfileDisplay></ProfileDisplay>
    </div>
  );
}
