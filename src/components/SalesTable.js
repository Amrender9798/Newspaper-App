import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import dayOfYear, { findDayMonthYear } from "../helper/Date";
const SalesTable = ({ newspapers, balance, customerId }) => {
  const navigate = useNavigate();
  const [quantities, setQuantities] = useState({});
  const [payAmount, setPayAmount] = useState(0);

  const handleQuantityChange = (newspaperId, value) => {
    setQuantities({ ...quantities, [newspaperId]: parseInt(value, 10) || 0 });
  };

  const totalAmount = newspapers.reduce((total, newspaper) => {
    return total + newspaper.price * (quantities[newspaper._id] || 0);
  }, 0);

  const remainingBalance =
    payAmount > 0 ? totalAmount + balance - payAmount : totalAmount + balance;

  const handleSubmit = async () => {
    console.log("Form Submitted");
    await axios.put(`https://newspaper-backend-1.onrender.com/customers/balance/${customerId}`, {
      balance: remainingBalance.toFixed(2),
    });
    const {day,month,year} = findDayMonthYear();
    const date = dayOfYear(day,month,year);
    const salesData = newspapers
      .filter((newspaper) => quantities[newspaper._id] > 0)
      .map((newspaper) => {
        
        return {
          userId: customerId,
          newspaper: newspaper.name,
          price: newspaper.price,
          quantity: quantities[newspaper._id],
          date,
        };
      });
      await axios.post("https://newspaper-backend-1.onrender.com/purchases", salesData);

      await axios.post("https://newspaper-backend-1.onrender.com/sales", {
        userId: customerId,
        sales: totalAmount,
        cash: payAmount,
        date 
      });
      
      
  };
  return (
    <>
      {newspapers.map((newspaper) => (
        <div className="flex items-center justify-center" key={newspaper._id}>
          <div className="container">
            <table className="w-full flex flex-row flex-no-wrap sm:bg-white rounded-lg overflow-hidden sm:shadow-lg my-5">
              <thead className="text-white">
                <tr className="bg-teal-400 flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0">
                  <th className="p-3 text-left">Name</th>
                  <th className="px-3 py-4 text-left">Quantity</th>
                  <th className="px-3 py-4 text-left" width="110px">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody className="flex-1 sm:flex-none">
                <tr className="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0">
                  <td className="border-grey-light border hover:bg-gray-100 p-3">
                    {newspaper.name}
                  </td>
                  <td className="border-grey-light border hover:bg-gray-100 p-3 truncate">
                    <input
                      type="number"
                      className="border border-gray-300 rounded-md px-2 py-1  w-16"
                      value={quantities[newspaper._id] || ""}
                      onChange={(e) =>
                        handleQuantityChange(newspaper._id, e.target.value)
                      }
                    />
                  </td>
                  <td className="border-grey-light border hover:bg-gray-100 p-3 text-red-400 hover:text-red-600 hover:font-medium cursor-pointer">
                    {(
                      newspaper.price * (quantities[newspaper._id] || 0)
                    ).toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ))}

      {/* Total Amount */}
      {totalAmount !== 0 && (
        <div className="flex justify-end text-red-500 mb-2">
          <p className="text-xl font-semibold">
            Sales: {totalAmount.toFixed(2)}
          </p>
        </div>
      )}

      {/* Balance */}
      <div className="flex justify-end text-red-500 mb-2">
        <p className="text-xl font-semibold">
          Previous Balance: {balance.toFixed(2)}
        </p>
      </div>

      {totalAmount > 0 && (
        <div className="flex justify-end text-red-500 mb-2">
          <p className="text-xl font-semibold">
            Total Amount: {(totalAmount + balance).toFixed(2)}
          </p>
        </div>
      )}

      {/* Pay Input Field */}
      {(balance > 0 || totalAmount > 0) && (
        <div className="flex justify-end text-red-500 mb-2">
          <p className="text-xl font-semibold">Cash: </p>
          <input
            type="number"
            placeholder="Enter Pay Amount"
            className="border border-gray-300 rounded-md px-2 py-1  w-16 ml-2"
            value={payAmount}
            onChange={(e) => setPayAmount(e.target.value)}
          />
        </div>
      )}

      {/* Remaining Balance */}
      {payAmount > 0 && (
        <div className="flex justify-end text-red-500 mb-2">
          <p className="text-xl font-semibold">
            Remaining Balance: {remainingBalance.toFixed(2)}
          </p>
        </div>
      )}
      <div className="flex justify-between my-4">
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => navigate("/")}
        >
          Home
        </button>
        {(balance > 0 || totalAmount > 0) && (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleSubmit}
          >
            Submit
          </button>
        )}
      </div>
    </>
  );
};

export default SalesTable;
