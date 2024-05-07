import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import SalesTable from "./SalesTable";

const CustomerDetails = () => {
  const { id } = useParams();
  const [customer, setCustomer] = useState({});
  const [newspapers, setNewspapers] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState("");
  const [purchases, setPurchases] = useState([]);
  const [timerId, setTimerId] = useState(null);
  const [isToday, setIsToday] = useState(false); // Track if selected date is today

  useEffect(() => {
    const fetchData = async () => {
      try {
        const customerResponse = await axios.get(
          `http://localhost:5000/customers/${id}`
        );
        setCustomer(customerResponse.data);

        const newspapersResponse = await axios.get(
          `http://localhost:5000/newspapers`
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
    // Initialize selectedDate with today's date
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];
    setSelectedDate(formattedDate);
    setIsToday(true); // Set isToday to true initially as selected date is today
  }, []);

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setSelectedDate(selectedDate);

    // Determine if selected date is today
    const today = new Date();
    const formattedToday = today.toISOString().split("T")[0];
    setIsToday(selectedDate === formattedToday);

    // Clear the previous timer
    if (timerId) {
      clearTimeout(timerId);
    }

    // Set a new timer to fetch data after a delay
    const newTimerId = setTimeout(async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/purchases?userId=${id}&date=${selectedDate}`
        );
        setPurchases(response.data);
      } catch (error) {
        setError(error.message);
      }
    }, 3000); // Adjust the delay time as needed

    setTimerId(newTimerId);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-gray-100 p-4">
      <div className="flex justify-between">
        <h1 className="text-xl font-bold mb-4">{customer.name}</h1>

        <input
          type="date"
          className="px-3 py-1 border border-gray-300 rounded-md"
          value={selectedDate}
          onChange={handleDateChange}
        />
      </div>
      <SalesTable
        newspapers={newspapers}
        balance={customer.balance}
        purchases={purchases}
        customerId={id}
        isToday={isToday} // Pass isToday to SalesTable component
      />
    </div>
  );
};

export default CustomerDetails;
