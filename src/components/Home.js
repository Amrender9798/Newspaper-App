import React, { useEffect, useState } from "react";
import axios from "axios";
import dayOfYear, { findDayMonthYear } from "../helper/Date";
import { useParams } from "react-router-dom";

const Home = () => {

  const {balance} = useParams();
  const [totalSales, setTotalSales] = useState(0);
  const [cashReceived, setCashReceived] = useState(0);

  
  

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const {day,month,year} = findDayMonthYear();
        const date = dayOfYear(day,month,year);
        const salesResponse = await axios.get(`https://newspaper-backend-1.onrender.com/sales/?date=${date}`);

        setTotalSales(salesResponse.data.totalSales);
        setCashReceived(salesResponse.data.totalCash);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchSalesData();
  }, []);

  return (
    <div className="container mx-auto mt-6 px-4">
      <h1 className="text-3xl font-semibold mb-6">Gurujee</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="bg-blue-500 text-white p-6 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Today's Overall Sales</h2>
          <p className="text-2xl">₹{totalSales}</p>
        </div>
        <div className="bg-green-500 text-white p-6 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Today's Overall Cash</h2>
          <p className="text-2xl">₹{cashReceived}</p>
        </div>
        <div className="bg-red-500 text-white p-6 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Total Balance</h2>
          <p className="text-2xl">₹{balance}</p>
        </div>        
      </div>
    </div>
  );
};

export default Home;