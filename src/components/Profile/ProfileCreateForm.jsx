import {
  fetchCurrentUserData,
  postUserData,
  postUserInterests,
} from "@/utils/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SubmitButton from "../SubmitButton";
import Interests from "./Interests";
import { Input } from "@nextui-org/react";
import SignOutButton from "../SignOutButton";

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
  // valid states
  const [isGivenNamesValid, setIsGivenNamesValid] = useState(true);
  const [isSurnameValid, setIsSurnameValid] = useState(true);
  const [isDobValid, setIsDobValid] = useState(true);

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "dob") {
      setIsDobValid(validateDOB(value));
    }
    if (name === "given_names") {
      value === "" ? setIsGivenNamesValid(false) : setIsGivenNamesValid(true);
    }
    if (name === "surname") {
      value === "" ? setIsSurnameValid(false) : setIsSurnameValid(true);
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateDOB = (dobString) => {
    const dob = new Date(dobString);
    const hundredYearsAgo = new Date();
    hundredYearsAgo.setFullYear(hundredYearsAgo.getFullYear() - 100);

    if (dob > new Date() || dob < hundredYearsAgo) {
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isDobValid) {
      setIsDobValid(false);
    } else {
      setErrorPosting(false);
      postUserData(formData)
        .then((res) => {
          if (!res) {
            throw Error;
          }
          setErrorPosting(false);

          postUserInterests(userInterestsArray)
            .then(() => {
              setErrorPosting(false);
              router.push("/profile");
            })
            .catch((err) => {
              console.error(err);
              setErrorPosting(true);
            });
        })
        .catch((err) => {
          console.error(err);
          setErrorPosting(true);
        });
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div></div>
      <div className="flex flex-col justify-center gap-10 md:flex-row">
        <div className="flex w-80 flex-col gap-6">
          <Input
            name="given_names"
            isRequired
            value={formData.given_names}
            type="text"
            label="First name(s)"
            variant="faded"
            isInvalid={!isGivenNamesValid}
            color={
              formData.given_names !== ""
                ? isGivenNamesValid
                  ? "success"
                  : "danger"
                : "default"
            }
            errorMessage={
              !isGivenNamesValid && "Please enter your first name(s)"
            }
            onChange={handleChange}
            className="max-w-xs font-medium"
          />
          <Input
            name="surname"
            isRequired
            value={formData.surname}
            type="text"
            label="Surname"
            variant="faded"
            isInvalid={!isSurnameValid}
            color={
              formData.surname !== ""
                ? isSurnameValid
                  ? "success"
                  : "danger"
                : "default"
            }
            errorMessage={!isSurnameValid && "Please enter your surname"}
            onChange={handleChange}
            className="max-w-xs font-medium"
          />
          <Input
            name="dob"
            placeholder="Enter your date of birth"
            isRequired
            value={formData.dob}
            type="date"
            label="Date of Birth"
            variant="faded"
            isInvalid={!isDobValid}
            color={
              formData.dob !== ""
                ? isDobValid
                  ? "success"
                  : "danger"
                : "default"
            }
            errorMessage={!isDobValid && "Please enter a valid date of birth"}
            onChange={handleChange}
            className="max-w-xs font-medium"
          />
          <Input
            name="avatar_url"
            value={formData.avatar_url}
            type="text"
            label="Avatar URL"
            variant="faded"
            onChange={handleChange}
            className="max-w-xs font-medium"
          />
        </div>
        <div className="w-80">
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
