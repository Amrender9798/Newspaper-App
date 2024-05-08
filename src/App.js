import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CustomerList from './components/CustomerList';
import CustomerDetails from './components/CustomerDetails';
import Home from './components/Home';

function App() {
  return (

    <Routes>
          <Route path="/"  element={<CustomerList/>} />
          <Route path="/customer/:id" element={<CustomerDetails/>} /> 
          <Route path="/home" element={<Home/>} /> 
    </Routes>
  );
}

export default App;
