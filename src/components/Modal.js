import React, { useState } from "react";
import axios from "axios";

const Modal = ({ isOpen, onClose, onSubmit, type }) => {
  const [name, setName] = useState("");
  const [price,setPrice] = useState("");

  const handleSubmit = async () => {
    if (type === "Customer") {
      const response = await axios.post("https://newspaper-backend-1.onrender.com/customers", {
        name,
      });
      console.log(response.status);
      if (response.status === 200) {
        onClose();

      }
    } else if (type === "Newspaper") {
      const response = await axios.post("https://newspaper-backend-1.onrender.com/newspapers", {
        name,
        price
      });
      if (response.status === 201) {
        onSubmit();
      }
    }
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="bg-white p-4 rounded-md shadow-md">
        <h2 className="text-lg font-bold mb-4">Add {type}</h2>
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 mb-4 w-full"
        />
        {type === "Newspaper" && (
          <input
            type="text"
            placeholder="Enter price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 mb-4 w-full"
          />
        )}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 mr-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
