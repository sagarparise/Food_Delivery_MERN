import React, { useEffect, useState } from 'react'
import {  useSelector } from "react-redux";
import totalAmount from '../utils/cartTotalAmount';
import { useNavigate } from 'react-router-dom';

function PlacedOrder() {
  const url = 'https://food-delivery-mern-kl64.onrender.com/';
 const navigate = useNavigate()
  const{token, user} = useSelector((state)=> state.user)
  const{cart} = useSelector((state)=> state.cart)

  useEffect(()=>{
    if(user?.role === 'admin'){
      navigate("/adminPanel")
    }
  },[])

  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    pincode: null,
    country: '',
    phone: null,
  })
  console.log(user?.role)

  

  const handleForm = async(e)=>{
    e.preventDefault();
    console.log(data)
   const orderData = {
    items: cart,
    amount: totalAmount(cart)+3,
    address: data,

   }

  try {
    const response = await fetch(`${url}/api/order/placeOrder`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization': token,
      },
      body: JSON.stringify(orderData)
     })
     const result = await response.json()
     console.log(result)
     if(result.success){
      const {session_url} = result;
      window.location.replace(session_url);
     }
     else{
      alert(result.message)
     }
    
  } catch (error) {
    
    console.log(error)

  }




  }
  return (
    <form className=' w-full min-h-[92vh] p-[50px] h-fit flex gap-3 flex-col md:flex-row' onSubmit={handleForm}>
      <div className=' flex-1 p-2'>
        <h1 className=' text-2xl font-semibold'>Delivery Information</h1>
        <div className=' mt-4 flex flex-col w-full gap-3'>
          <div className=' flex justify-between gap-3'>
          <input required type="text" placeholder="First Name" className="input input-bordered w-full  " value={data.firstName} onChange={(e)=>setData({...data, firstName:e.target.value})} />
          <input required type="text" placeholder="Last Name" className="input input-bordered w-full " value={data.lastName} onChange={(e)=>setData({...data, lastName:e.target.value})} />
          </div>

          <input required type="text" placeholder="Email Address" className="input input-bordered w-full " value={data.email} onChange={(e)=>setData({...data, email:e.target.value})} />
          <input required type="text" placeholder="Street" className="input input-bordered w-full " value={data.street} onChange={(e)=>setData({...data, street:e.target.value})} />
          
          <div className=' flex justify-between gap-3'>
          <input required type="text" placeholder="City" className="input input-bordered w-full  " value={data.city} onChange={(e)=>setData({...data, city:e.target.value})} />
          <input required type="text" placeholder="State" className="input input-bordered w-full "  value={data.state} onChange={(e)=>setData({...data, state:e.target.value})} />
          </div>
         
          <div className=' flex justify-between gap-3'>
          <input required type="number" placeholder="Pin Code" className="input input-bordered w-full  " value={data.pincode} onChange={(e)=>setData({...data, pincode:e.target.value})} />
          <input required type="text" placeholder="Country" className="input input-bordered w-full " value={data.country} onChange={(e)=>setData({...data, country:e.target.value})}/>
          </div>

          <input required type="number" placeholder="Phone" className="input input-bordered w-full " value={data.phone} onChange={(e)=>setData({...data, phone:e.target.value})} />

          
        </div>
      </div>
      <div className=' flex-1 p-2'>
      <div className=" flex-1 p-4">
            <h1 className=" text-2xl font-semibold">Cart Totals</h1>
           <div className=" py-3 px-2 flex justify-between gap-3 border-b-2 text-slate-400">
            <p>Sub total</p>
            <p>{totalAmount(cart)}$</p>
           </div>

           <div className=" py-3 px-2 flex justify-between gap-3 border-b-2 text-slate-400">
            <p>Delivery Fees</p>
            <p>3$</p>
           </div>

           <div className=" py-3 px-2 flex justify-between gap-3 ">
            <p className=" font-semibold">Total</p>
            <p>{totalAmount(cart)+3}$</p>
           </div>

           <button type='submit' className=" btn btn-error uppercase text-white rounded-sm" disabled={cart.length === 0 ? true: false } > proceed to checkout</button>

          </div>
      </div>
    </form>
  )
}

export default PlacedOrder