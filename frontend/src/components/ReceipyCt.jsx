import React, { useEffect, useState } from "react";
import ReceipyCard from "./ReceipyCard";
import Category from "./Category";
import Filter from "./Filter";
import { useDispatch, useSelector } from "react-redux";
import { allCategory } from "../utils/allCategory";
import { setCategory, setSearchQuery } from "../Slices/foodSlice";
function ReceipyCt() {
  const dispatch = useDispatch()
  const { foods, searchQuery } = useSelector((state) => state.foods);
  const [foodCategory, setFoodCategory] = useState([]);
  const [foodData, setFoodData] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const categories = allCategory(foods);
    setFoodCategory(categories);
  }, [foods]);

  useEffect(() => {
    handleSearchQry();
  }, [searchQuery, foods]);

  const handleSearchQry = () => {
    if (searchQuery === "All") {
      setFoodData(foods);

    } else if (searchQuery === "Veg") {
      setFoodData(foods.filter((item) => item.type === "Veg"));

    } else if (searchQuery === "Non Veg") {
      setFoodData(foods.filter((item) => item.type === "Non Veg"));

    } else if (searchQuery === "Rating") {
      setFoodData([...foods].sort((a, b) => b.rating - a.rating));

    } else if (searchQuery === "Price") {
      setFoodData([...foods].sort((a, b) => b.price - a.price));

    } else {
      setFoodData(foods);
      dispatch(setCategory(null))

    }
  };

  const handleCategory = (categoryVal)=>{
    console.log(categoryVal);
    setFoodData(foods.filter((item) => item.category === categoryVal));
    dispatch(setCategory(categoryVal))
   

  }

  const handleSearchInput = (e) => {
    setInputValue(e.target.value);
    dispatch(setCategory(null))
    setFoodData(
      foods.filter((item) =>{
        const typeMatch =
        searchQuery === "All" ||
        (searchQuery === "Veg" && item.type === "Veg") ||
        (searchQuery === "Non Veg" && item.type === "Non Veg") 
        || (searchQuery === "Rating") || (searchQuery === "Price");

       

        const nameMatch = item.name.toLowerCase().includes(e.target.value.toLowerCase());

        return typeMatch && nameMatch  ;
      })
    );
  };

  return (
    <div className=" w-full h-fit mt-10 min-h-screen ">
      <h1 className=" text-4xl font-bold capitalize text-center p-2 pb-5 border-b">
        Try Our Special Recipes
      </h1>

      <div className=" mx-[40px] carousel flex justify-start lg:justify-center items-center gap-6 p-[30px] ">
        {foodCategory &&
          foodCategory.map((category) => (
            <Category key={category.id} category={category} handleCategory={handleCategory} />
          ))}
      </div>

      <div className=" border-t mt-4 flex items-center flex-col lg:flex-row gap-2 md:px-[40px]">
        <Filter />
        <label className="input w-[80%] input-bordered input-md flex items-center gap-2">
          <input type="text" className="grow " placeholder="Search Foods" onChange={(e) => handleSearchInput(e)} />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
       
      </div>

      <div className=" px-[50px] py-7 flex justify-center items-center flex-wrap gap-6">
        {foodData &&
          foodData.map((item,i) => <ReceipyCard key={item.id} index={i} item={item} />)}
      </div>
    </div>
  );
}

export default ReceipyCt;
