import React from "react";

const UpdateSuccessMessage = ({ handleHide }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="rounded-md bg-green-500 p-4 text-white shadow-md">
        <p>Your venue has been updated successfully!</p>
        <button
          onClick={handleHide}
          className="mt-2 rounded-md bg-white px-3 py-1 text-green-500 hover:bg-green-100 focus:border-blue-300 focus:outline-none focus:ring"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default UpdateSuccessMessage;
