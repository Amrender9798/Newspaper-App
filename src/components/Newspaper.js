import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteNewspaper, fetchNewspapers, setNewspapers } from "../Redux/slices/NewspaperSlice";
import Spinner from "./Spinner";
import Error from "./Error";
import { RiDeleteBinLine, RiPencilLine } from "react-icons/ri";
import NewspaperModal from "../modals/NewspaperModal";


const Newspaper = () => {
  const dispatch = useDispatch();
  const { newspapers, isLoading, error } = useSelector((state) => state.newspaper);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [action,setAction] = useState("");
  const [newspaper, setNewspaper] = useState(null);

  useEffect(() => {
    const storedNewspapers = JSON.parse(localStorage.getItem("newspapers"));
    if (storedNewspapers) {
      console.log('cached');  
      dispatch(setNewspapers(storedNewspapers));
    } else {
      console.log('api');
      dispatch(fetchNewspapers());
    }
  }, []);

  const handleUpdate = (newspaper) => {
    setAction('Update');
    setNewspaper(newspaper);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setAction('Add');
    setIsModalOpen(true);
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <div className="container mx-auto px-4">
      <nav className="flex justify-between items-center py-4">
        <h1 className="text-xl font-semibold">Newspapers</h1>
        <button onClick={handleAdd} className="bg-blue-500 text-white py-2 px-4 rounded">
          Add
        </button>
      </nav>
      {newspapers.map((newspaper) => (
        <div key={newspaper._id} className="bg-white rounded-lg shadow-lg p-4 mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">{newspaper.name}</h2>
            <p className="text-gray-600">Price: {newspaper.price}</p>
          </div>
          <div>
            <button className="text-gray-500 mr-4" onClick={() => handleUpdate(newspaper)}>
              <RiPencilLine size={30} />
            </button>
          
          </div>
        </div>
      ))}

      <NewspaperModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        action = {action}
        newspaper = {newspaper}
        />
      
    </div>
  );
};

export default Newspaper;
