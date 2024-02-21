import { useForm } from "react-hook-form";
import React from "react";

const Input = ({ label, register, required }) => (
  <div className="mb-4">
    <label className="mb-2 block text-sm font-bold text-gray-700">
      {label}
    </label>
    <input
      className="w-full rounded border px-3 py-2"
      {...register(label, { required })}
    />
  </div>
);

const Select = React.forwardRef(({ onChange, onBlur, name, label }, ref) => (
  <div className="mb-4">
    <label className="mb-2 block text-sm font-bold text-gray-700">
      {label}
    </label>
    <select
      className="w-full rounded border px-3 py-2"
      name={name}
      ref={ref}
      onChange={onChange}
      onBlur={onBlur}
    >
      <option value="20">20</option>
      <option value="30">30</option>
    </select>
  </div>
));

const EditVenue = ({ handleEditClose }) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
  };

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center">
      <div className="w-650 rounded bg-white p-8 shadow-md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-row items-center justify-between ">
            <h2 className=" text-xl font-bold">Edit Venue</h2>
            <button
              onClick={handleEditClose}
              className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
            >
              Close
            </button>
          </div>
          <div className="flex w-full gap-5">
            <div className="flex  w-1/2 flex-col">
              <Input label="Name" register={register} required />
              <Input label="Price" register={register} required />
              <Input label="Photo url test" register={register} required />
              <Input label="Description" register={register} required />
            </div>
            <div className="flex  w-1/2 flex-col">
              <Input label="House Number" register={register} required />
              <Input label="Address" register={register} required />
              <Input label="City" register={register} required />
              <Input label="County" register={register} required />
              <Input label="PostCode" register={register} required />
            </div>
            <div className="flex justify-center"></div>
          </div>
          {/* <Select label="Age" {...register("Age")} /> */}
          <div className="text-center">
            <button
              type="submit"
              className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditVenue;
