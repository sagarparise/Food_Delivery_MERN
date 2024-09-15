import { useEffect, useState } from "react";

 function useGetFood(url) {
  const[foodData, setFoodData] = useState([]);
  const[loading, setLoading] = useState(false);

  useEffect(()=>{
const fetchFood = async()=>{
  try {
    setLoading(true);
   const response = await fetch(url);
    const data = await response.json();
   
    setFoodData(data.food);
    setLoading(false);
 
  } catch (error) {
    console.log(error.message)
    setLoading(false);
  }
}
fetchFood()
  },[url])


  return {foodData, loading}
}

export default useGetFood