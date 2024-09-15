import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCategory, setSearchQuery } from "../Slices/foodSlice";

function Filter() {
  const dispatch = useDispatch()
  const {searchQuery} = useSelector(state=> state.foods)

  const handleQuery = (e) => {
    let qry = e.target.innerText;
    console.log(qry)
    dispatch(setCategory(null))
    dispatch(setSearchQuery(qry))

  };
  return (
    <div className=" rs-filter w-full pt-3 py-2 flex justify-center  gap-9 px-[25px]">
      <div className=" text-xl h-fit px-3 whitespace-nowrap font-semibold text-error ">Filter <i className='bx bx-filter-alt'></i></div>
      <div className=" flex gap-3 flex-wrap  ">
      <button className={`btn ${searchQuery === 'All' ? 'bg-error text-white' : ' btn-error btn-outline'}`} onClick={(e)=>handleQuery(e)}>All</button>
      <button className={`btn ${searchQuery === 'Non Veg' ? 'bg-error text-white' : ' btn-error btn-outline'}`} onClick={(e)=>handleQuery(e)}>Non Veg</button>
      <button className={`btn ${searchQuery === 'Veg' ? 'bg-error text-white' : ' btn-error btn-outline'}`} onClick={(e)=>handleQuery(e)}>Veg</button>
      <button className={`btn ${searchQuery === 'Rating' ? 'bg-error text-white' : ' btn-error btn-outline'}`} onClick={(e)=>handleQuery(e)}>Rating</button>
      <button className={`btn ${searchQuery === 'Price' ? 'bg-error text-white' : ' btn-error btn-outline'}`} onClick={(e)=>handleQuery(e)}>Price</button>
      </div>
    </div>
  );
}

export default Filter;
