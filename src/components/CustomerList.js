import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Modal from "./Modal";



const CustomerList = () => {
  const [customers, setCustomers] = useState([]);  
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [modalType, setModalType] = useState("");

  useEffect(()=>{
    axios.get("https://newspaper-backend-1.onrender.com/customers")
    .then((res) => {
      setCustomers(res.data.customers);
    })
    .catch((err) => {
      console.log(err);
    });
  },[]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const addCustomer = () => {
    setShowDropdown(true);
  };

  const handleDropdownOptionClick = (option) => {
    if (option === "Customer") {
      setModalType("Customer");  
      setIsModalOpen(true);
    } else if (option === "Newspaper") {
      setModalType("Newspaper");
      setIsModalOpen(true);
    }
    setShowDropdown(false);
  };

  const handleSubmitNewCustomer = (newCustomer) => {
    console.log("New customer added:", newCustomer);
  };

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-100 p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Gurujee</h1>
        <div className="relative">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={addCustomer}
          >
            Add
          </button>
          {showDropdown && (
            <div className="absolute top-full right-0  bg-white border border-gray-200 rounded shadow-md">
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => handleDropdownOptionClick("Customer")}
              >
                Customer
              </button>
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => handleDropdownOptionClick("Newspaper")}
              >
                Newspaper
              </button>
            </div>
          )}
        </div>
      </div>
      <input
        type="text"
        placeholder="Search by customer name"
        value={searchTerm}
        onChange={handleSearchChange}
        className="border border-gray-300 rounded-md px-3 py-2 mb-4"
      />
      <ul>
        {filteredCustomers.map((customer) => (
          <li key={customer._id} className="py-2 px-4 border-b border-gray-300">
            <Link
              to={`/customer/${customer._id}`}
              className="text-blue-500 hover:underline"
            >
              {customer.name}
            </Link>
          </li>
        ))}
      </ul>
      <Modal
        type={modalType}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmitNewCustomer}
      />
    </div>
  );
};

export default CustomerList;
