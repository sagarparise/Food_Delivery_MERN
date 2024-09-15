import React, { useEffect } from "react";
import box from "../assets/package.png";
import useGetMyorder from "../hooks/useGetMyorder";
import OrderTimeline from "./TimeLine";
import { useDispatch, useSelector } from "react-redux";

import { motion } from "framer-motion";
import { setCurrentOrderStatus } from "../Slices/cartSlice";

const MyOrder = () => {
 const dispatch = useDispatch();
 const { currentOrderStatus } = useSelector((state) => state.cart);

 
  useEffect(()=>{
    const sr = ScrollReveal({
      reset: true,
      distance: '40px',
      duration: 2000,
      delay: 400,
    });
  
    sr.reveal('.order', { delay: 500, origin: 'left', interval:300});
    
  },[]);

  useGetMyorder();
  const { myOrders } = useSelector((state) => state.cart);
 // console.log(myOrders)
  return (
    <div className=" w-full min-h-[80vh] p-[30px] "  
    >
      <h1 className=" text-2xl font-bold">My Orders</h1>
      <div
        className={` w-full h-full py-[15px] flex flex-col ${
          myOrders?.length === 0 ? "justify-center items-center" : ""
        } gap-2`}
      >
        {myOrders?.length === 0 && (
          <div className=" flex flex-col justify-center items-center border p-3 shadow-md">
            <img src={box} className=" w-20" />
            <h2 className=" text-[16px] italic text-slate-400">
              No Orders as of now
            </h2>
          </div>
        )}
        

        {myOrders &&
          myOrders.map((order, index) => (
            <div key={order._id} className={`order border-2 shadow-sm py-2 px-4 flex md:justify-between items-center md:gap-2 gap-4  flex-wrap ${ order.status === 'Delivered'? "bg-[#d5ffd5d2] border-green-300" : ""}`}
           
            >

              <div className="avatar">
                <div className="w-20">
                  <img src={box} className="mask mask-squircle " />
                </div>
              </div>

              <p className=" w-full md:flex-[0.8] text-[13px] text-slate-500 font-semibold whitespace-normal">
                {
                  order.items.map((item,ind)=>{
                    if(ind === order.items.length-1)
                    {
                      return item.food.name + ' x ' + item.quantity
                    }
                    else{
                      return item.food.name + ' x'+ item.quantity + ' , '
                    }
                  })
                }
              </p>
              <p className=" text-[16px] w-[80px] text-center font-semibold">
                $ {order.amount}.00
              </p>
              <p className="text-[16px] w-[80px] text-center font-semibold">
               Items : {
                  order.items.length
                }
              </p>
              <p className=" w-[150px] text-[16px] font-semibold text-success">
               💠 {
                  order.status
                }
              </p>
              <button className="btn btn-error text-white rounded-none btn-sm md:btn-md " onClick={()=>{
                dispatch(setCurrentOrderStatus(order.status))
                document.getElementById('my_timeline').showModal()
                }}>Track Order</button>

            </div>
          ))}
      </div>
 <dialog id="my_timeline" className="modal">
  <div className="modal-box relative">
  <OrderTimeline />
{
currentOrderStatus==="Delivered" && <h1 className=" font-semibold text-success absolute bottom-7 left-10">Successfully Delivered</h1>
}    
<div className="modal-action">
      <form method="dialog">
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>
    </div>
  );
};

export default MyOrder;
