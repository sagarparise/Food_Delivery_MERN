import React from "react";
import deliveryBoy from "../assets/delivery-boy.png";
import {useNavigate, Link} from 'react-router-dom'
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
function Navbar() {
  const navigate = useNavigate();
   const url = 'http://localhost:5000';
  const {token, user} = useSelector((state)=> state.user)
  const {total} = useSelector((state)=> state.cart)

  console.log(user?.role)

  const handleCart = ()=>{
    if(token){
      navigate('/cart')
    }
    else{
      document.getElementById("my_modal_3").showModal()
    }
   
  }

  const handleLogout = async()=>{
    try {
      const response = await fetch(`${url}/api/auth/signOut`);
      const data = await response.json();
      console.log(data);
      toast.success('Logged out', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      navigate('/')
    } catch (error) {
      console.log(error);
      toast.error(error.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

  }
  return (
    <>
      <div className="navbar bg-base-100 border-b shadow-md px-5 sticky top-0 z-20">
        <div className="flex-1 flex gap-2 items-center cursor-pointer" onClick={()=>navigate('/')}>
          <img src={deliveryBoy} alt="logo" className="w-11" />
          <h1 className="logo font-bold text-xl sm:text-2xl text-[#f94a3d]">F-Delivery</h1>
        </div>
        <div className="flex-none gap-4">
         
          <button className=" btn btn-sm btn-outline btn-error hover:text-white" onClick={() => document.getElementById("my_modal_3").showModal()}>
            Sign In
          </button>

          
           {
            user?.role==="admin" ? 
            <>
            <button className=" btn btn-sm btn-outline btn-error hover:text-white" onClick={()=>navigate("/adminPanel")}>Admin</button>
            </> :
             <>
              <div
              tabIndex={0}
              role="button"
              className=" cart btn btn-ghost btn-circle bg-none"
              onClick={handleCart}
            >
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  color="red"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="badge badge-sm indicator-item text-error">{total}</span>
              </div>
            
            
          </div>
             </>
           }

         

          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <i className="bx bx-user-circle w-full h-full flex justify-center items-center text-4xl"></i>
              </div>
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              
             {
              user?.role==="user" &&  <li className=" flex">
              <Link to='/myOrder' className=" bx bx-store text-[17px] mb-1">Orders</Link>
            </li>
             }
              <li onClick={handleLogout}>
                <a className=" text-[17px] bx bx-log-out">Logout</a>
              </li>
            </ul>
          </div>
        </div>
        <button className=" bx bx-menu  text-2xl px-2 py-1 rounded-md text-error border border-error hover:bg-error hover:text-white hidden"></button>
      </div>
     
    </>
  );
}

export default Navbar;


