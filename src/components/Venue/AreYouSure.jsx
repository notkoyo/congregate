import React from "react";

const AreYouSure = ({ handleDeleteClose, handleDeleteVenue }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="rounded-md bg-blue-500 p-4 text-white shadow-md">
        Are you sure you want to delete it?
        <div className="mt-2 flex justify-between">
          <button
            onClick={handleDeleteVenue}
            className="rounded-md bg-red-500 px-3 py-1 text-white hover:bg-red-600 focus:border-red-300 focus:outline-none focus:ring"
          >
            Delete
          </button>
          <button
            onClick={handleDeleteClose}
            className="rounded-md bg-white px-3 py-1 text-green-500 hover:bg-green-100 focus:border-blue-300 focus:outline-none focus:ring"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AreYouSure;
