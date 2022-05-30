import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './Home'
import Panier from './Panier';
import Login from './Login';
import Account from './Account';
import Registration from './Registration';
import Header from './Header';
import Footer from './Footer';
import AddAnnouc from './AddAnnouc';


function App() {
  console.log('slt')
  return (
    <div className="App">
     
      <Router>
      <Header />
        <Routes>
        <Route path="/" index element={< Home />} />
        <Route path="/Panier" index element={< Panier />} />
        <Route path="/Login" index element={< Login />} />
        <Route path="/Register" index element={< Registration />} />
        <Route path="/Account" index element={< Account />} />
        <Route path="/AddAnnouc" index element={< AddAnnouc />} />
       
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
