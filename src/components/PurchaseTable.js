import React from "react";
import { useNavigate } from "react-router-dom";

const PurchaseTable = ({ purchases }) => {
  const navigate = useNavigate();

  const totalAmount = purchases.reduce((total, purchase) => {
    return total + purchase.price * purchase.quantity;
  }, 0);

  return (
    <>
      {purchases.length === 0 ? (
        <div className="flex items-center justify-center h-32">
          <p className="text-lg text-red-500 font-bold">No sales to display</p>
        </div>
      ) : (
        purchases.map((purchase) => (
          <div className="flex items-center justify-center" key={purchase._id}>
            <div className="container">
              <table className="w-full flex flex-row flex-no-wrap sm:bg-white rounded-lg overflow-hidden sm:shadow-lg my-5">
                <thead className="text-white">
                  <tr className="bg-teal-400 flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0">
                    <th className="p-3 text-left">Name</th>
                    <th className="p-3 text-left">Price</th>
                    <th className="p-3 text-left" width="110px">
                      Quantity
                    </th>
                  </tr>
                </thead>
                <tbody className="flex-1 sm:flex-none">
                  <tr className="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0">
                    <td className="border-grey-light border hover:bg-gray-100 p-3">
                      {purchase.newspaper}
                    </td>
                    <td className="border-grey-light border hover:bg-gray-100 p-3 truncate">
                      {purchase.price}
                    </td>
                    <td className="border-grey-light border hover:bg-gray-100 p-3 text-red-400 hover:text-red-600 hover:font-medium cursor-pointer">
                      {purchase.quantity}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        ))
      )}

      {/* Total Amount */}
      {totalAmount !== 0 && (
        <div className="flex justify-end text-red-500 mb-2">
          <p className="text-xl font-semibold">
            Total Sale: {totalAmount.toFixed(2)}
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
      </div>
    </>
  );
};

export default PurchaseTable;
