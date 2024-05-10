import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import SalesTable from "./SalesTable";
import PurchaseTable from "./PurchaseTable";
import dayOfYear, { currentIndianDate } from "../helper/Date";
import { useDispatch, useSelector } from "react-redux";
import { fetchNewspapers, setNewspapers } from "../Redux/slices/NewspaperSlice";
import Spinner from "./Spinner";
import Error from "./Error";


const CustomerDetails = () => {
  const { id, name, balance } = useParams();
  const dispatch = useDispatch();
  const {newspapers,isLoading,error} = useSelector((state) => state.newspaper);

 
  useEffect(() => {
    const storedNewspapers = JSON.parse(localStorage.getItem("newspapers"));
    if(storedNewspapers){
      dispatch(setNewspapers(storedNewspapers));
    }
    else{
      dispatch(fetchNewspapers());
    }
  }
  ,[]);

  
  

  
  const [selectedDate, setSelectedDate] = useState("");
  const [purchases, setPurchases] = useState([]);
  const [isToday, setIsToday] = useState(true); 

 

  useEffect(() => {
    setSelectedDate(currentIndianDate());
    setIsToday(true);
  }, []);

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setSelectedDate(selectedDate);

   
  };

  const handleSearch = () => {
    
  }

 

  if (isLoading) {
    return <Spinner/>;
  }

  if (error) {
    return <Error/>;
  }

  return (
    <div className="bg-gray-100 p-4">
      <div className="">
        <h1 className="text-xl font-bold mb-4">{name}</h1>

        <div className="flex">
          <input
            type="date"
            className="px-3 py-1 border border-gray-300 rounded-md mr-2"
            value={selectedDate}
            onChange={handleDateChange}
            min="2024-05-01"
            max={currentIndianDate()}
          />
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>
      {isToday ? (
        <SalesTable
          newspapers={newspapers}
          balance={parseFloat(balance)}
          purchases={purchases}
          customerId={id}
        />
      ) : (
        <PurchaseTable purchases={purchases} />
      )}
    </div>
  );
};

export default CustomerDetails;