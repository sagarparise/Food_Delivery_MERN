import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setMyOrders } from '../Slices/cartSlice';

function useGetMyorder() {
 const {token} = useSelector((state)=>state.user);
 const dispatch = useDispatch()
 const url = 'https://food-delivery-mern-kl64.onrender.com/';

 useEffect(()=>{

  const fetchOrder = async()=>{
    try {
      const response = await fetch(`${url}/api/order/userOrder`,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'authorization': token
        }
      })
      const data = await response.json()
      console.log(data.orders)
      dispatch(setMyOrders(data.orders))
    } catch (error) {
      console.log(error)
    }
  }
  fetchOrder();
 },[])
 
}

export default useGetMyorder