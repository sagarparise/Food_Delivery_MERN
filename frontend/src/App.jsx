import "./App.css";
import Layout from "./components/Layout";
import LoginPage from "./components/LoginPage";
import ItemDetails from "./components/ItemDetails";
import WriteReview from "./components/WriteReview";
import HeroSection from "./components/HeroSection";
import Cartpage from "./components/Cartpage";
import PlacedOrder from "./components/PlacedOrder";
import AdmLayout from "./components/admin/AdmLayout";
import { BrowserRouter, Routes, Route , useLocation} from "react-router-dom";
import AddItem from "./components/admin/AddItem";
import ListItem from "./components/admin/ListItem";
import Order from "./components/admin/Order";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Verify from "./components/Verify";
import MyOrder from "./components/MyOrder";
import { useState } from "react";
import AnimatedRoute from "./components/AnimatedRoute";
import Notify from "./components/Notify";
function App() {
 
  return (
    <>
<Notify />
       <ToastContainer />
      <LoginPage />
      <BrowserRouter>
        <AnimatedRoute />
      </BrowserRouter>
    </>
  );
}

export default App;
