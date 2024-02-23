import {
  fetchCurrentUserData,
  postUserData,
  postUserInterests,
} from "@/utils/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "./Input";
import SubmitButton from "../SubmitButton";
import Interests from "./Interests";

export default function ProfileCreate() {
  const [formData, setFormData] = useState({
    given_names: "",
    surname: "",
    dob: "",
    avatar_url: "",
    email: "",
    auth_id: "",
  });
  const [userInterestsArray, setUserInterestsArray] = useState([]);
  const [errorPosting, setErrorPosting] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postUserData(formData).then((res) => {
      postUserInterests(userInterestsArray).then((res) => {
        if (res) {
          console.log(res);
          router.push("/profile");
        } else {
          setErrorPosting(true);
        }
      });
    });
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className="flex justify-between gap-10">
        <div>
          <Input
            label="Given names"
            id="given_names"
            value={formData.given_names}
            onChange={handleChange}
            type="text"
          />
          <Input
            label="Surname"
            id="surname"
            value={formData.surname}
            onChange={handleChange}
            type="text"
          />
          <Input
            label="Date of Birth"
            id="dob"
            value={formData.dob}
            onChange={handleChange}
            type="date"
          />
          <Input
            label="Avatar URL"
            id="avatar_url"
            value={formData.avatar_url}
            onChange={handleChange}
            type="text"
          />
        </div>
        <div>
          <Interests
            userInterestsArray={userInterestsArray}
            setUserInterestsArray={setUserInterestsArray}
          />
        </div>
      </div>

      <div className="flex justify-end gap-10">
        {errorPosting && (
          <p className="text-red-500">
            Sorry, something went wrong with your request - please try again
            later
          </p>
        )}

        <SubmitButton />
      </div>
    </form>
  );
}
