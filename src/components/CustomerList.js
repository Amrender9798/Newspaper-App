import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomers, selectCustomers, setCustomers } from "../Redux/slices/CustomerSlice";
import Error from "./Error";
import CustomerModal from "../modals/CustomerModal";


const CustomerList = () => { 
  const dispatch = useDispatch();
  const {customers,balance,isLoading,error} = useSelector(selectCustomers);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  

  useEffect(() => {
    const storedCustomers = localStorage.getItem("customers");
    if (storedCustomers) {
      dispatch(setCustomers(JSON.parse(storedCustomers)));
    } else {
      console.log('customers from API');
      dispatch(fetchCustomers());
    }
  }, []);
  
  

 

  if(isLoading){
    return <Spinner/>;
  }
  if(error){
    return <Error/>;

  }
  

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);


  };

  const addCustomer = () => {
    setShowDropdown(true);
  };

  const handleDropdownOptionClick = (option) => {
    if (option === "Customer") {
      setIsModalOpen(true); 
      
    } else if (option === "Newspaper") {
      navigate("/newspapers");
    } else if (option === "Summary") {
      navigate(`/summary/${balance}`);
    }
    setShowDropdown(false);
  };

  





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
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => handleDropdownOptionClick("Summary")}
              >
                Summary
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
        {customers.map((customer) => (
          <li key={customer._id} className="py-2 px-4 border-b border-gray-300">
            <Link
              to={`/customer/${customer._id}/${customer.name}/${customer.balance}`}
              className="text-blue-500 hover:underline"
            >
              {customer.name}
            </Link>
          </li>
        ))}
      </ul>
      <CustomerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default CustomerList;
