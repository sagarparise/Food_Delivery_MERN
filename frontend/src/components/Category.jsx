import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { motion } from 'framer-motion';

function Category({ category, handleCategory, index }) {
  const url = "http://localhost:5000";
  const { selectedCategory } = useSelector((state) => state.foods);
 
  useEffect(()=>{
    const sr = ScrollReveal({
      reset: true,
      distance: '40px',
      duration: 1000,
      delay: 400,
    });

    sr.reveal('.carousel-item', { delay: 600, origin: 'bottom', interval:300});
  },[]);

  return (
    <div
      className="w-fit h-fit p-2 carousel-item carousel-vertical cursor-pointer"
      onClick={() => handleCategory(category.name)}
    >
      <div className="w-20 h-20 relative">
        <div className="w-20 h-20 rounded-full bg-black bg-opacity-35 absolute top-0 z-10"></div>
        <div className="avatar">
          <div className={`w-full rounded-full ring ${selectedCategory === category.name ? 'ring-error' : 'ring-inset'} ring-offset-base-100 ring-offset-2`}>
            <img src={`${url}/images/${category.image}`} alt={category.name} />
          </div>
        </div>
      </div>
      <h2 className="text-sm text-center py-2 font-semibold">{category.name}</h2>
    </div>
  );
}

export default Category;
