import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSelectReview } from "../Slices/foodSlice";
import {motion} from 'framer-motion';
function ReviewPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
 const{reviews,selectedReview} = useSelector((state)=>state.foods)
 
 useEffect(()=>{
  const sr = ScrollReveal({
    reset: true,
    distance: '40px',
    duration: 1000,
    delay: 400,
  });

  sr.reveal('.review', { delay: 400, origin: 'left', interval:200});
  sr.reveal('.am-4', { delay: 400, origin: 'right', interval:100});
  return () => {
    sr.destroy();
  };
},[]);



 //console.log(reviews);
  return (
    <div className="my-10 w-screen">
      <h1 className=" text-4xl text-center p-4 font-bold border-b">
        Customer's Review
      </h1>
      <div className=" w-full h-[90%] m-2 flex justify-between p-5 flex-wrap ">
        <div className=" flex-1 p-[50px] relative">
         
          <div className=" w-full h-full p-2 overflow-y-scroll">
         
            {
              reviews && reviews.map((review,index)=>(
                <div key={review._id} className={`w-full review md:w-[400px] mx-auto mb-3 flex items-center gap-3 border p-2 shadow-md rounded-lg bg-white transition-all ${selectedReview._id === review._id ? ' scale-105':'scale-100'}`} onClick={()=>dispatch(setSelectReview(review))}
                
                
                >
                <div className="avatar">
                  <div className="w-16 rounded-full">
                    <img src={review.image} />
                  </div>
                </div>
                <div>
                  <h1 className=" text-xl font-semibold">{review.fullname}</h1>
                  <p>customer</p>
                </div>
              </div>
              ))
            }
           

          </div>

          

          <div className="text-center absolute bottom-[0px] left-[50%] translate-x-[-50%]">
            <button className=" btn btn-sm text-white  btn-error" onClick={()=> navigate('/review')}>
              Write Review
            </button>
          </div>

        </div>

        <div className=" flex-1 p-[50px]" 
           
        >
          <h1 className="am-4 text-3xl font-semibold">
            What our Customers <br />{" "}
            <span className=" text-error">are saying</span>
          </h1>
          <div className="am-4 mt-6 border-b p-2 flex justify-between items-center">
            <div className=" flex-1 flex gap-2">

              <div className="avatar">
                <div className="w-14 rounded-full">
                  <img src={selectedReview.image} />
                </div>
              </div>
              <div>
                <h1 className=" text-xl font-semibold">{selectedReview.fullname}</h1>
                <p className=" text-gray-300 italic">Customer</p>
              </div>

            </div>
            <div className="rating rating-md">
              {
                [1,2,3,4,5].map((value)=>(
                  <input
                  key={value}
                  type="radio"
                  name="rating-7"
                  className="mask mask-star-2 bg-orange-400"
                  disabled
                  checked = {Number(value) === Number(selectedReview.rating)? true: false}
                />
                ))
              }
            </div>
          </div>

          <p className="am-4 text-lg text-justify mt-4">
          {
            selectedReview.comment
          }
          </p>
        </div>
      </div>
    </div>
  );
}

export default ReviewPage;

