import React from 'react'
import Layout from "./Layout";
import ItemDetails from "./ItemDetails";
import WriteReview from "./WriteReview";
import HeroSection from "./HeroSection";
import Cartpage from "./Cartpage";
import PlacedOrder from "./PlacedOrder";
import AdmLayout from "./admin/AdmLayout";
import { BrowserRouter, Routes, Route , useLocation} from "react-router-dom";
import AddItem from "./admin/AddItem";
import ListItem from "./admin/ListItem";
import Order from "./admin/Order";
import 'react-toastify/dist/ReactToastify.css';
import Verify from "./Verify";
import MyOrder from "./MyOrder";
import {AnimatePresence} from "framer-motion";
import OrderTimeline from './TimeLine';
import Error from './Error';
import { useSelector } from 'react-redux';

function AnimatedRoute() {
  const location = useLocation();
const {user} = useSelector(state=> state.user);

  return (
    <AnimatePresence>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="" element={<HeroSection/>} />
            <Route path="/item/:id" element={<ItemDetails/>} />
            <Route path="/review" element={<WriteReview/>} />
            <Route path="/cart" element={<Cartpage/>} />
            <Route path="/placeOrder" element={<PlacedOrder/>} />
            <Route path="/verify" element={<Verify/>} />
            <Route path="/myOrder" element={<MyOrder/>} />
          </Route>
          {
           user?.role==='admin'&& <Route path="/adminPanel" element={<AdmLayout />}>
            <Route index  element={<AddItem />} />
            <Route path="list" element={<ListItem />} />
            <Route path="order" element={<Order />} />
          </Route>
          }
         <Route path="*" element={<Error/>} />

        </Routes>
        </AnimatePresence>

  )
}

export default AnimatedRoute