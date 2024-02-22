import { fetchInterestsData } from "@/utils/api";
import { useEffect, useState } from "react";

export default function Interests({ interests, setInterests }) {
  const [selectedInterest, setSelectedInterest] = useState("");
  const [allInterests, setAllInterests] = useState([]);

  useEffect(() => {
    fetchInterestsData().then((res) => {
      setAllInterests(res);
    });
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    setSelectedInterest(e.target.value);
    console.log(selectedInterest);
  };

  const handleInterest = (e) => {
    e.preventDefault();
    setInterests((prev) => [...prev, selectedInterest]);
    console.log(interests);
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
          {/* <input
            type="text"
            id="interests"
            name="interests"
            value={interestsText}
            onChange={handleChange}
            className="w-half rounded border px-3 py-2"
            placeholder="Enter your interests"
          /> */}
          <select
            name="interests"
            id="interests"
            onChange={handleChange}
            className=" rounded border"
          >
            {allInterests.map((interest) => (
              <option key={interest.interest} value={interest.interest}>
                {interest.interest}
              </option>
            ))}
          </select>
          <button
            type="button"
            className="rounded bg-slate-200 px-4 py-2 text-black hover:bg-slate-300"
            onClick={handleInterest}
          >
            Add Interest
          </button>
        </div>
      </div>

      <div>
        <h2 className="mb-2 block text-sm font-bold text-gray-700">
          Your Interests
        </h2>
        <ul>
          {interests.map((interest) => (
            <li key={`${interest}_${Math.random()}`}>{interest}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
