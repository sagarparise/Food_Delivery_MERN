import React, { useEffect } from 'react'
import Banner from './Banner'
import FooterBanner from './FooterBanner'
import MoreInfo from './MoreInfo';
import ReceipyCt from './ReceipyCt';
import HeroPage from './HeroPage';
import ReviewPage from './ReviewPage';
import useGetFood from '../hooks/useGetFood';
import { useDispatch } from 'react-redux';
import { getAllFoods } from '../Slices/foodSlice';
import useGetReviews from '../hooks/useGetReviews';
import {motion} from 'framer-motion'
import ImageContainer from './ImageContainer';
function HeroSection({setFlag}) {
  const url = 'https://food-delivery-mern-kl64.onrender.com/';
  const dispatch = useDispatch()

    const { foodData} = useGetFood(`${url}/api/food/getAllFood`);
    dispatch(getAllFoods(foodData)) 
    useGetReviews()
 
  return (
    <div     
    >
      <Banner/>
      <MoreInfo/>
      <ImageContainer/>
      <ReceipyCt />
      <ReviewPage />
    <FooterBanner/>  
    </div>
  )
}

export default HeroSection