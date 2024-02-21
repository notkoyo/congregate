import { fetchCurrentUserData, postUserData } from "@/utils/api";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProfileCreate() {
  const [formData, setFormData] = useState({
    given_names: "",
    surname: "",
    dob: "",
    avatar_url: "",
    email: "",
    auth_id: "",
  });
  const [interests, setInterests] = useState(["Badminton", "Football"]);
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
      if (res) {
        router.push("/profile");
      } else {
        setErrorPosting(true);
      }
    });
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className="mb-4 flex items-center">
        <label htmlFor="given_names" className="mb-1 block">
          Given Names:
        </label>
        <input
          type="text"
          id="given_names"
          name="given_names"
          value={formData.given_names}
          onChange={handleChange}
          className="w-full rounded border px-3 py-2"
        />
      </div>

      <div className="mb-4 flex items-center">
        <label htmlFor="surname" className="mb-1 block">
          Surname:
        </label>
        <input
          type="text"
          id="surname"
          name="surname"
          value={formData.surname}
          onChange={handleChange}
          className="w-full rounded border px-3 py-2"
        />
      </div>

      <div className="mb-4 flex justify-between">
        <label htmlFor="dob" className="mb-1 block">
          Date of Birth:
        </label>
        <input
          type="date"
          id="dob"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          className="w-full rounded border px-3 py-2"
        />
      </div>

      <div className="mb-4 flex items-center">
        <label htmlFor="avatar_url" className="mb-1 block">
          Avatar URL:
        </label>
        <input
          type="text"
          id="avatar_url"
          name="avatar_url"
          value={formData.avatar_url}
          onChange={handleChange}
          className="w-full rounded border px-3 py-2"
        />
      </div>

      <div className="mb-4 flex flex-col">
        <div className="">
          <label htmlFor="interests" className="mb-1 block"></label>
          <input
            type="text"
            id="interests"
            name="interests"
            value={formData.interests}
            onChange={handleChange}
            className="w-half rounded border px-3 py-2"
            placeholder="provide us with your interests"
          />
          <button
            type="button"
            className="rounded bg-slate-200 px-4 py-2 text-black hover:bg-slate-300"
          >
            Add Interest
          </button>
        </div>
        <div>
          <h2>Interest List</h2>
          <ul>
            {interests.map((interest) => (
              <li key={interest}>{interest}</li>
            ))}
          </ul>
        </div>
      </div>

      {errorPosting && (
        <p className="text-red-500">
          Sorry, something went wrong with your request - please try again later
        </p>
      )}

      <button
        type="submit"
        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
}
