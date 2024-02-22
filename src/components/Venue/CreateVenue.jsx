import { useForm } from "react-hook-form";
import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabaseAuth } from "../../utils/supabaseClient";
import UpdateSuccessMessage from "./Succes";
import { useState } from "react";
import { useRouter } from "next/navigation";

const schema = z.object({
  name: z.string().min(6, { message: "At least 6 characters" }),
  price: z.number().refine((data) => !isNaN(data), {
    message: "Price must be a number",
  }),
  photo: z.string().min(6, { message: "At least 6 characters" }),
  description: z.string().min(6, { message: "At least 6 characters" }),
  house: z.number(),
  address: z.string().min(6, { message: "At least 6 characters" }),
  city: z.string().min(6, { message: "At least 6 characters" }),
  county: z.string().min(6, { message: "At least 6 characters" }),
  postcode: z.string().min(6, { message: "At least 6 characters" }),
});

const EditVenue = ({ userId }) => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const text = "Your venue has been created successfully!";
  const router = useRouter();

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
      router.push("/list-venue");
    }, 2000);
  };
  const onSubmit = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const {
        name,
        price,
        photo,
        description,
        house,
        address,
        city,
        county,
        postcode,
      } = data;
      const res = await supabaseAuth.from("venues").insert({
        name,
        price,
        photos: photo,
        description,
        house_number: house,
        address_1: address,
        city,
        county,
        postcode,
        founder_id: userId,
      });
      console.log(res);
      if (res.status === 201) {
        handleVenueUpdateSuccess();
      }
    } catch (err) {
      console.log(err);
      // setError("root", {
      //   message: "This  is already taken",
      // });
    }
  };

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center">
      <div className="w-650 rounded bg-white p-8 shadow-md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-row items-center justify-between ">
            <h2 className="text-xl font-bold">Create Venue</h2>
          </div>
          <div className="flex w-full ">
            <div className="mr-4  flex w-1/2 flex-col">
              <div className="flex h-101 flex-col">
                <label className="mb-1 mt-1">Name</label>
                <input
                  required
                  {...register("name")}
                  placeholder="Name"
                  className="rounded-md border border-gray-300 px-2 py-1 focus:border-blue-500 focus:outline-none"
                />
                {errors.name && (
                  <div className="text-red-500">{errors.name.message}</div>
                )}
              </div>
              <div className="flex h-101 flex-col">
                <label className="mb-1 mt-1">Price</label>
                <input
                  required
                  type="number"
                  {...register("price", { valueAsNumber: true })}
                  placeholder="3423"
                  className="rounded-md border border-gray-300 px-2 py-1 focus:border-blue-500 focus:outline-none"
                />
                {errors.price && (
                  <div className="text-red-500">{errors.price.message}</div>
                )}
              </div>
              <div className="flex h-101 flex-col">
                <label className="mb-1 mt-1">Photo</label>
                <input
                  required
                  {...register("photo")}
                  placeholder="Photo"
                  className="rounded-md border border-gray-300 px-2 py-1 focus:border-blue-500 focus:outline-none"
                />
                {errors.photo && (
                  <div className="text-red-500">{errors.photo.message}</div>
                )}
              </div>
              <label className="mb-1 mt-1">Description</label>
              <textarea
                required
                {...register("description")}
                placeholder="Description"
                className="h-107 resize-none rounded-md border border-gray-300 px-2 py-1 focus:border-blue-500 focus:outline-none"
              ></textarea>
              {errors.description && (
                <div className="text-red-500">{errors.description.message}</div>
              )}
            </div>
            <div className="flex  w-1/2 flex-col">
              <div className="flex h-101 flex-col">
                <label className="mb-1 mt-1">House number</label>
                <input
                  required
                  {...register("house", { valueAsNumber: true })}
                  placeholder="House number"
                  type="number"
                  className="rounded-md border border-gray-300 px-2 py-1 focus:border-blue-500 focus:outline-none"
                />
                {errors.house && (
                  <div className="text-red-500">{errors.house?.message}</div>
                )}
              </div>
              <div className="flex h-101 flex-col">
                <label className="mb-1 mt-1">Address</label>
                <input
                  required
                  {...register("address")}
                  placeholder="Address"
                  className="rounded-md border border-gray-300 px-2 py-1 focus:border-blue-500 focus:outline-none"
                />
                {errors.address && (
                  <div className="text-red-500">{errors.address?.message}</div>
                )}
              </div>
              <div className="flex h-101 flex-col">
                <label className="mb-1 mt-1">City</label>
                <input
                  required
                  {...register("city")}
                  placeholder="City"
                  className="rounded-md border border-gray-300 px-2 py-1 focus:border-blue-500 focus:outline-none"
                />
                {errors.city && (
                  <div className="text-red-500">{errors.city?.message}</div>
                )}
              </div>
              <div className="flex h-101 flex-col">
                <label className="mb-1 mt-1">County</label>
                <input
                  required
                  {...register("county")}
                  placeholder="County"
                  className="rounded-md border border-gray-300 px-2 py-1 focus:border-blue-500 focus:outline-none"
                />
                {errors.county && (
                  <div className="text-red-500">{errors.county?.message}</div>
                )}
              </div>
              <label className="mb-1 mt-1">Post code</label>
              <input
                required
                {...register("postcode")}
                placeholder="Post code"
                className="rounded-md border border-gray-300 px-2 py-1 focus:border-blue-500 focus:outline-none"
              />
              {errors.postcode && (
                <div className="text-red-500">{errors.postcode?.message}</div>
              )}
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

export default EditVenue;
