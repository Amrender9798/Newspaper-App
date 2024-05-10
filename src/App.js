import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CustomerList from './components/CustomerList';
import CustomerDetails from './components/CustomerDetails';
import Home from './components/Home';
import Newspaper from './components/Newspaper';

function App() {
  return (

    <Routes>
          <Route path="/"  element={<CustomerList/>} />
          <Route path="/customer/:id/:name/:balance" element={<CustomerDetails/>} /> 
          <Route path="/summary/:balance" element={<Home/>} /> 
          <Route path = "/newspapers" element = {<Newspaper/>} />
    </Routes>
  );
}

export default App;
