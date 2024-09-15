import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getCart } from '../Slices/cartSlice';


function useGetCart(flag) {
  const url = 'https://food-delivery-mern-kl64.onrender.com/';  
  const dispatch = useDispatch()
 const{token} = useSelector((state)=> state.user)

 //console.log(token)


  useEffect(()=>{
      const cartData = async()=>{
        try {
          const response = await fetch(`${url}/api/food/getCart`,{
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'authorization': token,
            }
          });
          const data = await response.json();
          
          dispatch(getCart(data.cart?.items))

        } catch (error) {
          console.log(error)
        }
      }

   cartData()

  },[flag])
  
}

export default useGetCart