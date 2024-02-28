import { fetchInterestsData } from "@/utils/api";
import { useEffect, useState } from "react";
import { Button, Select, SelectItem } from "@nextui-org/react";

export default function Interests({
  userInterestsArray,
  setUserInterestsArray,
}) {
  const [allInterests, setAllInterests] = useState([]);

  useEffect(() => {
    fetchInterestsData().then((res) => {
      setAllInterests(res);
    });
  }, []);

  const handleChange = (e) => {
    if (!userInterestsArray.includes(e.target.value) && e.target.value !== "") {
      setUserInterestsArray((prev) => [...prev, e.target.value]);
    }
  };

  const handleDeleteInterest = (interest) => {
    setUserInterestsArray((prev) => {
      const newArr = prev.filter((item) => item !== interest);
      return newArr;
    });
  };

  return (
    <div className="mb-4 flex max-w-80 flex-col gap-10">
      <div className="flex max-w-80 flex-col">
        <div className="flex max-w-80 flex-col gap-2">
          <Select
            label="Interests"
            placeholder="Select an interest"
            className="max-w-xs"
            onChange={handleChange}
          >
            {allInterests.map((interest) => (
              <SelectItem key={interest.interest} value={interest.interest}>
                {interest.interest}
              </SelectItem>
            ))}
          </Select>
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
