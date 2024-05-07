import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CustomerList from './components/CustomerList';
import CustomerDetails from './components/CustomerDetails';

function App() {
  return (

    <Routes>
          <Route path="/"  element={<CustomerList/>} />
          <Route path="/customer/:id" element={<CustomerDetails/>} /> 
    </Routes>
  );
}

export default App;
