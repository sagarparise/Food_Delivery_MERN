import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setTotal } from "../Slices/cartSlice";
import { toast } from "react-toastify";
import {motion} from "framer-motion"

function ReceipyCard({ item,index }) {
  const url = "http://localhost:5000";
  const navigate = useNavigate();
  const dispatch = useDispatch();
 const{token,user} = useSelector((state)=>state.user)
  const { cart } = useSelector((state) => state.cart);

  
  useEffect(() => {
    const sr = ScrollReveal({
      reset: true,
      distance: '70px',
      duration: 2000,
      delay: 500,
      viewFactor: 0.5,
      easing: 'cubic-bezier(0.4, 0.5, 0.3)',
      interval:200
    });

    sr.reveal('.food-cd', { origin: 'bottom'});
  }, []);
  const handleAddCart = async () => {
    console.log(item._id);
  
    // Select the notification element
   
  
    try {
      const response = await fetch(`${url}/api/food/addToCart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token,
        },
        body: JSON.stringify({
          productId: item._id,
          quantity: 1,
        }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log(data);
      dispatch(setTotal(cart.length + 1));

      if(window.innerWidth > 600){
        toast.success('Food Added', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      else{
        const notifyElement = document.querySelector(".notify");

        notifyElement.classList.toggle("show");
    
    
        if (notifyElement) {
         setTimeout(()=>{
          // toggle the class
          notifyElement.classList.toggle("show");
       
        },2000)
        }
      }
  
    } catch (error) {
      console.error("Failed to add to cart:", error.message);
    }
  };
  

  return (
    <div className=" w-[300px] h-[310px] food-cd card hover:border hover:scale-105 p-3 hover:shadow-md"  
    >
      <img
        src={`${url}/images/${item.image}`}
        alt=""
        className=" image-full h-1/2 rounded-lg cursor-pointer"
        onClick={() => navigate(`/item/${item._id}`)}
      />
      <h1 className=" card-title p-2 pb-0 text-[15px]">{item.name}</h1>
      <p className=" text-sm text-slate-400 px-2">{item.type}</p>
      <div className=" card-body p-2">
        <div className=" flex justify-between">
          <div>
            <h2 className=" text-md">
              Price{" "}
              <span className=" text-[#f94a3d] font-semibold text-[14px]">
                {" "}
                ${item.price}.00
              </span>
            </h2>
          
          </div>
          <div className="rating rating-sm" id="rating-container">
          {
                [1,2,3,4,5].map((value)=>(
                  <input
                  key={value}
                  type="radio"
                  name="rating-7"
                  className="mask mask-star-2 bg-orange-400"
                  disabled
                  checked = {Number(value) === Number(item.rating)? true: false}
                />
                ))
              }
             
  
          </div>
        </div>
      </div>

     {
      user?.role === "user" &&  <div className=" card-actions mt-1">
      <button className="btn btn-outline btn-error w-full text-md " onClick={()=> handleAddCart()}>
        Add to Cart +
      </button>
    </div>
     }
    </div>
  );
}

export default ReceipyCard;
