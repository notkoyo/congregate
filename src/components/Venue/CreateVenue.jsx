import { useForm } from "react-hook-form";
import React, { useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabaseAuth } from "../../utils/supabaseClient";
import UpdateSuccessMessage from "./Succes";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { getGeocode, getLatLng } from "use-places-autocomplete";
import { GoogleMapAutocomplete } from "../Maps/GoogleMapAutocomplete";
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

const CreateVenue = ({ userId }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const text = "Your venue has been created successfully!";
  const [erroInputFile, setErrorInputFile] = useState("");
  const router = useRouter();
  const [locationInfo, setLocationInfo] = useState("");
  const [venueForm, setVenueForm] = useState({
    buildingNumber: undefined,
    address: undefined,
    city: undefined,
    county: undefined,
    postcode: undefined,
  });

  useEffect(() => {
    if (locationInfo) {
      formatAddressForm();
    }
  }, [locationInfo]);

  const formatAddressForm = () => {
    const formattedAddressSplit = locationInfo.formatted_address.split(",");
    let addressStart = formattedAddressSplit[0].split(" ");
    const addressNumber = addressStart[0];
    if (addressNumber.match(/\d/)) {
      addressStart.shift();
      addressStart = [addressStart.join(" ")];
      addressStart.unshift(addressNumber);
      formattedAddressSplit.shift();
      addressStart.reverse().forEach((x) => formattedAddressSplit.unshift(x));
      console.log(formattedAddressSplit);
      setVenueForm({
        buildingNumber: formattedAddressSplit[0],
        address: formattedAddressSplit[1],
        city: formattedAddressSplit[2],
        county: formattedAddressSplit[3],
        postcode: formattedAddressSplit[4],
      });
    } else {
      setVenueForm({
        buildingNumber: null,
        address: formattedAddressSplit[1],
        city: formattedAddressSplit[2],
        county: formattedAddressSplit[3],
        postcode: formattedAddressSplit[4],
      });
    }

    // console.log(formattedAddressSplit, "<<<< 2");
  };

  async function uploadImage() {
    if (!selectedFile) {
      setErrorInputFile("No file selected");
      return;
    }
    if (
      !selectedFile.type?.includes("jpeg") &&
      !selectedFile.type?.includes("jpg") &&
      !selectedFile.type?.includes("png")
    ) {
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
      return photoUrl;
    } else {
      console.log(error);
    }
  }
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
    setTimeout(() => {
      router.push("/profile/hosted-venues");
    }, 2000);
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
      console.log(photoURL);
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
      let latlng;

      if (locationInfo) {
        latlng = getLatLng(locationInfo);
      } else {
        const description = `${house},${address}, ${city}, ${county}, ${postcode}`;
        console.log(1);
        const venueLocation = await getGeocode({ address: description });
        console.log(2);
        latlng = getLatLng(venueLocation[0]);
      }

      const res = await supabaseAuth.from("venues").insert({
        name,
        price,
        photos: photoURL,
        description,
        house_number: house,
        address_1: address,
        city,
        county,
        postcode,
        founder_id: userId,
        lat: latlng.lat,
        lng: latlng.lng,
      });
      console.log(res);
      if (res.status === 201) {
        handleVenueUpdateSuccess();
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleFileChange = (e) => {
    const file = e?.target?.files?.[0];

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
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="w-650 rounded bg-white p-8 shadow-md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-row items-center justify-between ">
            <h2 className="text-xl font-bold">Create Venue</h2>
          </div>
          <div className="flex w-full ">
            <div className="mr-4  mt-4 flex w-1/2 flex-col">
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
                  className={`mt-1 flex h-13  w-full cursor-pointer items-center justify-center rounded-md border bg-white px-3 py-1 hover:bg-blue-100 focus:border-blue-500 focus:outline-none ${
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
                    {selectedFile ? selectedFile.name : "Choose Venue Image"}
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
              <div>
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
                    errors.description && (
                      <div>{errors.description.message}</div>
                    )
                  }
                ></Textarea>
              </div>
            </div>
            <div className="mt-4 flex  w-1/2 flex-col">
              <div className="hidden">
                <GoogleMapAutocomplete
                  setLocationInfo={setLocationInfo}
                  fillerText="Search for location..."
                />
              </div>
              <div className="flex h-101 flex-col">
                <Input
                  label="Number of Building"
                  name="NumberOfBuilding"
                  isRequired
                  value={venueForm.buildingNumber}
                  onChange={(e) => setVenueForm.buildingNumber(e.target.value)}
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
                  value={venueForm.address}
                  onChange={(e) => setVenueForm.address(e.target.value)}
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
                  value={venueForm.city}
                  onChange={(e) => setVenueForm.city(e.target.value)}
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
                  value={venueForm.county}
                  onChange={(e) => setVenueForm.county(e.target.value)}
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
                value={venueForm.postcode}
                onChange={(e) => setVenueForm.postcode(e.target.value)}
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
          text={text}
          handleHide={handleSuccessMessageHide}
        />
      )}
    </div>
  );
};

export default CreateVenue;
