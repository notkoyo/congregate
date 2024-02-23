import {
  fetchCurrentUserID,
  fetchInterestsData,
  fetchUserData,
} from "@/utils/api";
import { useEffect, useState } from "react";
import { Tooltip, Button, button } from "@nextui-org/react";
import React from "react";

export default function Interests({
  userInterestsArray,
  setUserInterestsArray,
}) {
  const [selectedInterest, setSelectedInterest] = useState("");
  const [allInterests, setAllInterests] = useState([]);
  const [addButtonDisabled, setAddButtonDisabled] = useState(true);

  useEffect(() => {
    fetchInterestsData().then((res) => {
      setAllInterests(res);
    });
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    setSelectedInterest(e.target.value);
    setAddButtonDisabled(false);
  };

  const handleInterest = (e) => {
    e.preventDefault();
    if (userInterestsArray.includes(selectedInterest)) {
      setAddButtonDisabled(true);
    } else {
      setUserInterestsArray((prev) => [...prev, selectedInterest]);
      setAddButtonDisabled(true);
    }
  };

  const handleDeleteInterest = (interest) => {
    setUserInterestsArray((prev) => {
      const newArr = prev.filter((item) => item !== interest);
      return newArr;
    });

    setAddButtonDisabled(false);
  };

  return (
    <div className="mb-4 flex flex-col gap-10">
      <div className="flex flex-col">
        <label
          htmlFor="interests"
          className="mb-2 block text-sm font-bold text-gray-700"
        >
          Interests
        </label>

        <div className="flex gap-2">
          <select
            name="interests"
            id="interests"
            onChange={handleChange}
            className=" rounded border py-2"
            defaultValue="placeholder"
          >
            <option value="placeholder" disabled hidden></option>
            {allInterests.map((interest) => (
              <option key={interest.interest_id} value={interest.interest}>
                {interest.interest}
              </option>
            ))}
          </select>

          {!addButtonDisabled ? (
            <Button
              className="rounded bg-slate-200 px-4 py-2 text-black hover:bg-slate-300"
              onClick={handleInterest}
            >
              Add Interest
            </Button>
          ) : (
            <Button
              className="rounded bg-gray-300 px-4 py-2 text-gray-600 opacity-50"
              type="button"
              isDisabled
            >
              Select an interest
            </Button>
          )}
        </div>
      </div>

      <div>
        <ul className="flex flex-wrap gap-2">
          {userInterestsArray.map((interestName) => (
            <div className="flex gap-4" key={interestName}>
              <Button
                onClick={() => handleDeleteInterest(interestName)}
                className="hover:bg-red-600 hover:text-white"
              >
                <li>{interestName}</li>
              </Button>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}
