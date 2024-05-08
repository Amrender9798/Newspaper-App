import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import SalesTable from "./SalesTable";
import PurchaseTable from "./PurchaseTable";
import dayOfYear, { currentIndianDate } from "../helper/Date";

const CustomerDetails = () => {

  

  const { id } = useParams();
  const [customer, setCustomer] = useState({});
  const [newspapers, setNewspapers] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState("");
  const [purchases, setPurchases] = useState([]);
  const [isToday, setIsToday] = useState(true); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const customerResponse = await axios.get(
          `https://newspaper-backend-1.onrender.com/customers/${id}`
        );
        setCustomer(customerResponse.data);

        const newspapersResponse = await axios.get(
          `https://newspaper-backend-1.onrender.com/newspapers`
        );
        setNewspapers(newspapersResponse.data);

        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    setSelectedDate(currentIndianDate());
    setIsToday(true);
  }, []);

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setSelectedDate(selectedDate);

   
  };

  const handleSearch = async () => {
    try { 
      const today = new Date();
      const formattedToday = today.toISOString().split("T")[0];
      setIsToday(selectedDate === formattedToday);
      const [year, month, day] = selectedDate.split('-').map(Number);
      const secretDate =dayOfYear(day, month, year);
      const response = await axios.get(
        `http://localhost:5000/purchases?userId=${id}&date=${secretDate}`
      );
      console.log(response.data);
      setPurchases(response.data);
    } catch (error) {
      setError(error.message);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-gray-100 p-4">
      <div className="">
        <h1 className="text-xl font-bold mb-4">{customer.name}</h1>

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
          balance={customer.balance}
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
