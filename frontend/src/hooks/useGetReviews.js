import React, { useEffect } from 'react'
import { useDispatch} from 'react-redux'
import { getFoodReviews } from '../Slices/foodSlice';

function useGetReviews() {
const dispatch =  useDispatch();

const url = "https://food-delivery-mern-kl64.onrender.com/";

useEffect(()=>{

  const fetchReviews = async () => {
    try {
      const response = await fetch(`${url}/api/review/getReview`);
      const data = await response.json();
      dispatch(getFoodReviews(data.reviews));
    } catch (error) {
      console.log(error)
    }
  }

  fetchReviews()
}, [])

}

export default useGetReviews