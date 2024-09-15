import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useGetCart from "../hooks/useGetCart";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, setTotal } from "../Slices/cartSlice";
import totalAmount from "../utils/cartTotalAmount";
import {motion} from "framer-motion"

function Cartpage() {
  const navigate = useNavigate()
 const{cart} = useSelector((state)=> state.cart)
 const [flag, setFlag] = useState(false)
 const total = totalAmount(cart)
  useGetCart(flag)
  return (
    <div className=" w-full min-h-[90vh] p-[50px]" 
    
    >
      <div className=" w-full">
       <div className=" overflow-x-scroll">
       <table className="table border-b">
          {/* head */}
          <thead>
            <tr>
              <th>Item</th>
              <th>Title</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
          {
           cart && cart.map((food, i)=>(
          <Row key={food._id} food = {food} setFlag={setFlag} index={i}/>
           ))
          }
           
          </tbody>
        </table>
       </div>

        <div className=" w-full h-fit mt-7 flex gap-10 flex-col-reverse md:flex-row">
          <div className=" flex-1 p-4">
            <h1 className=" text-2xl font-semibold">Cart Totals</h1>
           <div className=" py-3 px-2 flex justify-between gap-3 border-b-2 text-slate-400">
            <p>Sub total</p>
            <p>{total}$</p>
           </div>

           <div className=" py-3 px-2 flex justify-between gap-3 border-b-2 text-slate-400">
            <p>Delivery Fees</p>
            <p>3$</p>
           </div>

           <div className=" py-3 px-2 flex justify-between gap-3 ">
            <p className=" font-semibold">Total</p>
            <p>{total+3}$</p>
           </div>

           <button className={`btn btn-error uppercase text-white rounded-sm `} disabled={cart.length === 0 ? true: false } onClick={()=> navigate('/placeOrder')}> proceed to checkout</button>

          </div>
          <div className=" p-3 flex-1 flex flex-col justify-start my-auto">
            <p className=" p-2">If you have a promo code, Enter it here</p>
            <div className="flex p-2 items-center space-x-2 md:w-3/4">
              <input
                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="text" 
                placeholder="Promo Code"
              />
              <button
                type="button"
                className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              
              >
               Apply
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cartpage;

const Row = ({food, setFlag, index}) => {

  const url = 'https://food-delivery-mern-kl64.onrender.com/'
  const{token} = useSelector((state)=> state.user)
  const{cart} = useSelector((state)=> state.cart)

  const dispatch = useDispatch()
  const [quantity, setQuantity] = React.useState(food.quantity);

  useEffect(()=>{
    const sr = ScrollReveal({
      reset: true,
      distance: '40px',
      duration: 1000,
      delay: 400,
    });
  
    sr.reveal('.cart', { delay: 500, origin: 'left', interval:200});
    return () => {
      sr.destroy();
    };
  },[]);
  

  const handleQuantity = async(e) => {
    console.log(e.target.value);
    setQuantity(e.target.value);
    try {
      const response = await fetch(`${url}/api/food/addToCart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "authorization": token
        },
        body: JSON.stringify({
          productId: food.food._id,
          quantity: e.target.value,
        }),
      });
      const data = await response.json();
      console.log(data);
    
     setFlag(prev=> !prev)
      
    } catch (error) {
      console.log(error.message);
    }

  }

  const handleDeleteCart = async(id)=>{
    try {
      const response = await fetch(`${url}/api/food/removeCartItem/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "authorization": token
        },
      });
      const data = await response.json();
    
     dispatch(removeFromCart(id))
     setTotal(cart.length - 1);
     setFlag(prev=>!prev)
      
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <tr  className=" cart"
    >
      <td>
        <div className="avatar">
          <div className="mask mask-squircle w-14 h-14">
            <img
              src={`${url}/images/${food.food.image}`}
              alt="Avatar Tailwind CSS Component"
            />
          </div>
        </div>
      </td>
      <td>{food.food.name}</td>
      <td>${food.food.price}</td>
      <td>
        <select
          name="quantity"
          className=" select select-bordered select-sm"
          onChange={handleQuantity}
          value={quantity}
        >
          <option value={1}>
            1
          </option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </td>
      <td>${quantity * food.food.price}</td>
      <td>
        <button className="btn btn-ghost text-error bx bxs-trash-alt text-xl rounded-full" onClick={()=>handleDeleteCart(food.food._id)}></button>
      </td>
    </tr>
  );
};
