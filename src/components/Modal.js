import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addNewspaper, addNewspapers, updateNewspaper } from "../Redux/slices/NewspaperSlice";

const Modal = ({ isOpen, onClose, type, newspaper }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    if(newspaper){
      setName(newspaper.name);
      setPrice(newspaper.price);
    }
  }, [newspaper]);


  const handleSubmit = async () => {
    if (type === "Customer") {
      const response = await axios.post("https://newspaper-backend-1.onrender.com/customers", {
        name,
      });
    } else if (type === "Newspaper") {

      if(newspaper){
        dispatch(updateNewspaper({id : newspaper._id,name,price}));
      }
      else{
        dispatch(addNewspaper({name,price}));
      }
    }
    onClose();
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
            type="number"
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
