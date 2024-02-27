import { useForm } from "react-hook-form";
import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabaseAuth } from "../../utils/supabaseClient";
import UpdateSuccessMessage from "./Succes";
import { useState } from "react";
import { Button, Input, Switch, Textarea } from "@nextui-org/react";

const schema = z.object({
  name: z.string().min(6, { message: "At least 6 characters" }),
  price: z.number().refine((data) => !isNaN(data), {
    message: "Price must be a number",
  }),
  description: z.string().min(6, { message: "At least 6 characters" }),
  house: z.number(),
  address: z.string().min(6, { message: "At least 6 characters" }),
  city: z.string().min(6, { message: "At least 6 characters" }),
  county: z.string().min(6, { message: "At least 6 characters" }),
  postcode: z.string().min(6, { message: "At least 6 characters" }),
});

const EditVenue = ({
  handleEditClose,
  userId,
  venue_id,
  setVenueHasBeenUpdate,
}) => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const text2 = "Your venue has been updated successfully!";
  const [selectedFile, setSelectedFile] = useState(null);
  const text = "Your venue has been created successfully!";
  const [erroInputFile, setErrorInputFile] = useState("");
  const [urlPhoto, setUrlPhoto] = useState("");
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "test@email",
    },
    resolver: zodResolver(schema),
  });
  const handleSuccessMessageHide = () => {
    setShowSuccessMessage(false);
  };

  const handleVenueUpdateSuccess = () => {
    setShowSuccessMessage(true);
  };
  const onSubmit = async (data) => {
    try {
      if (!selectedFile) {
        setErrorInputFile("No file selected");
        return;
      }
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const photoURL = await uploadImage().then((res) => {
        return res;
      });
      const {
        name,
        price,
        description,
        house,
        address,
        city,
        county,
        postcode,
      } = data;
      const res = await supabaseAuth
        .from("venues")
        .update({
          name,
          price,
          photos: photoURL,
          description,
          house_number: house,
          address_1: address,
          city,
          county,
          postcode,
        })
        .match({ venue_id: venue_id });
      console.log(res);
      if (res.status === 204) {
        setVenueHasBeenUpdate(true);
        handleVenueUpdateSuccess();
      }
    } catch (err) {
      console.log(err);
      // setError("root", {
      //   message: "This  is already taken",
      // });
    }
  };
  async function uploadImage() {
    // const file = e?.target?.files?.[0];
    // console.log(typeof file);
    if (!selectedFile) {
      setErrorInputFile("No file selected");
      return;
    }
    if (
      !selectedFile.type?.includes("jpeg") &&
      !selectedFile.type?.includes("jpg") &&
      !selectedFile.type?.includes("png")
    ) {
      console.log("Invalid file type");
      return;
    }
    const uniqueName = `venue_${userId}_${Date.now()}_${Math.random().toString(36).substring(2, 8)}.png`;

    const { data, error } = await supabaseAuth.storage
      .from("venues")
      .upload(uniqueName, selectedFile);
    if (data) {
      const baseUrl =
        "https://gaxzmldisxcnswaawnda.supabase.co/storage/v1/object/public/";
      const photoUrl = baseUrl + data.fullPath;
      // return photoUrl;
      await setUrlPhoto(photoUrl);
      return photoUrl;
    } else {
      console.log(error);
    }
  }
  const handleFileChange = (e) => {
    const file = e?.target?.files?.[0];
    console.log(typeof file);

    if (!file) {
      setErrorInputFile("No file selected");
      return;
    }
    if (
      !file.type?.includes("jpeg") &&
      !file.type?.includes("jpg") &&
      !file.type?.includes("png")
    ) {
      setErrorInputFile("Invalid type of data");
      return;
    } else {
      setErrorInputFile("");
      setSelectedFile(file);
    }
  };
  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center">
      <div className="w-650 rounded bg-white p-8 shadow-md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-row items-center justify-between ">
            <h2 className="text-xl font-bold">Edit Venue</h2>
            <button
              onClick={handleEditClose}
              className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
            >
              Close
            </button>
          </div>
          <div className="flex w-full ">
            <div className="mr-4   mt-4  flex w-1/2 flex-col">
              <div className="flex h-101 flex-col">
                <Input
                  name="name"
                  isRequired
                  label="Name"
                  {...register("name")}
                  className="max-w-xs font-medium"
                  errorMessage={errors.name && <div>{errors.name.message}</div>}
                />
              </div>
              <div className="flex h-101 flex-col">
                <Input
                  isRequired
                  type="number"
                  name="price"
                  label="Price"
                  startContent="£"
                  {...register("price", { valueAsNumber: true })}
                  className="max-w-xs font-medium"
                  errorMessage={
                    errors.price && <div>{errors.price.message}</div>
                  }
                />
              </div>
              <div className="flex h-101 flex-col">
                <label
                  className={`h-13 mt-1 flex  w-full cursor-pointer items-center justify-center rounded-md border bg-white px-3 py-1 hover:bg-blue-100 focus:border-blue-500 focus:outline-none ${
                    selectedFile ? "border-green-500" : "border-gray-300"
                  }`}
                >
                  {" "}
                  <svg
                    className={`mr-2 h-6 w-6 ${
                      selectedFile ? "text-green-500" : "text-blue-500"
                    }`}
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                  <span
                    className={`${selectedFile ? "text-green-500" : "text-blue-500"}`}
                  >
                    {selectedFile ? selectedFile.name : "Choose File"}
                  </span>{" "}
                  <input
                    type="file"
                    onChange={(e) => {
                      uploadImage(e);
                      handleFileChange(e);
                    }}
                    className="hidden"
                  />
                </label>
                {erroInputFile && (
                  <div className="text-red-500">{erroInputFile}</div>
                )}
              </div>
              <Textarea
                label="Description"
                isRequired
                style={{ height: "100%", maxRows: "200px" }}
                {...register("description")}
                placeholder="Describe your venue"
                classNames={{
                  input: " min-h-[107px] max-h-[107px]",
                }}
                errorMessage={
                  errors.description && <div>{errors.description.message}</div>
                }
              ></Textarea>
            </div>
            <div className="mt-4  flex   w-1/2 flex-col">
              <div className="flex h-101 flex-col">
                <Input
                  label="Number of Building"
                  name="NumberOfBuilding"
                  isRequired
                  {...register("house", { valueAsNumber: true })}
                  type="number"
                  className="max-w-xs font-medium"
                  errorMessage={
                    errors.house && <div>{errors.house.message}</div>
                  }
                />
              </div>
              <div className="flex h-101 flex-col">
                <Input
                  label="Address"
                  name="Address"
                  isRequired
                  {...register("address")}
                  placeholder="Address"
                  className="max-w-xs font-medium"
                  errorMessage={
                    errors.address && <div>{errors.address.message}</div>
                  }
                />
              </div>
              <div className="flex h-101 flex-col">
                <Input
                  name="City"
                  label="City"
                  isRequired
                  {...register("city")}
                  placeholder="City"
                  className="max-w-xs font-medium"
                  errorMessage={errors.city && <div>{errors.city.message}</div>}
                />
              </div>
              <div className="flex h-101 flex-col">
                <Input
                  name="County"
                  label="County"
                  isRequired
                  {...register("county")}
                  placeholder="County"
                  className="max-w-xs font-medium"
                  errorMessage={
                    errors.county && <div>{errors.county.message}</div>
                  }
                />
              </div>
              <Input
                label="Post Code"
                name="postcode"
                isRequired
                {...register("postcode")}
                placeholder="Post code"
                className="max-w-xs font-medium"
                errorMessage={
                  errors.postcode && <div>{errors.postcode.message}</div>
                }
              />
            </div>
            <div className="flex justify-center"></div>
          </div>
          <div className="mt-5 text-center">
            <button
              disabled={isSubmitting}
              type="submit"
              className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
            >
              {isSubmitting ? "Loading..." : "Submit"}
            </button>
            {errors.root && (
              <div className="text-red-500">{errors.root.message}</div>
            )}
          </div>
        </form>
      </div>
      {showSuccessMessage && (
        <UpdateSuccessMessage
          text2={text2}
          handleHide={handleSuccessMessageHide}
        />
      )}
    </div>
  );
};

export default EditVenue;
