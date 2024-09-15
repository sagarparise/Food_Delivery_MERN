import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setSelectFood } from "../Slices/foodSlice";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { setTotal } from "../Slices/cartSlice";

function ItemDetails() {
  const url = "http://localhost:5000";
  const { id } = useParams();
  const dispatch = useDispatch();

  const { foods, selectedFood } = useSelector((state) => state.foods);
  const { token,user } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);

  useEffect(() => {
    const receipy = foods.find((item) => item._id.toString() === id);
    dispatch(setSelectFood(receipy));
  }, [id]);

 
useEffect(() => {
  const sr = ScrollReveal({
    reset: true,
      distance:'40px',
    duration: 1000,
    delay: 400,
  });

  sr.reveal('.img',{delay:400, origin: 'bottom',interval: 100});
  sr.reveal('.para',{delay:400, origin: 'right'});

  // Clean up ScrollReveal instance on component unmount
  return () => {
    sr.destroy();
  };
}, []);


  const handleAddCart = async () => {
    console.log(id);

    try {
      const response = await fetch(`${url}/api/food/addToCart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
        body: JSON.stringify({
          productId: id,
          quantity: 1,
        }),
      });
      const data = await response.json();
      console.log(data);
      dispatch(setTotal(cart.length + 1));

      toast.success("Food Added", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      // console.log(cart)
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <section
        className="overflow-hidden min-h-[90vh]"
      >
        <div className="mx-auto px-5 py-24">
          <div className="mx-auto flex flex-wrap  lg:w-4/5">
            <div className="img h-fit w-full rounded object-cover lg:h-96 lg:w-1/2">
              <img
                alt="Nike Air Max 21A"
                className="h-full w-full rounded object-cover hover:scale-105 transition-all "
                src={`${url}/images/${selectedFood?.image}`}
              />
            </div>

            <div className="mt-6 w-full lg:mt-0 lg:w-1/2 lg:pl-10">
              <h2 className="text-sm img font-semibold tracking-widest text-gray-500">
                {selectedFood?.type}
              </h2>
              <h1 className="img my-4 img text-3xl font-semibold text-black">
                {selectedFood?.name}
              </h1>
              <div className="my-4 img flex items-center">
                <div className="flex items-center gap-2 space-x-1">
                  <div className="rating rating-sm" id="rating-container">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <input
                        key={value}
                        type="radio"
                        name="rating-7"
                        className="mask mask-star-2 bg-orange-400"
                        disabled
                        checked={
                          Number(value) === Number(selectedFood.rating)
                            ? true
                            : false
                        }
                      />
                    ))}
                  </div>

                  <span className="ml-3 img inline-block text-xs font-semibold">
                    {selectedFood.rating} Reviews
                  </span>
                </div>
              </div>
              <p className="para leading-relaxed">{selectedFood?.description}</p>

              <div className="img mt-6 flex items-center justify-between">
                <span className="title-font text-xl font-bold text-gray-900">
                  $ {selectedFood?.price}.00
                </span>
                {user?.role === 'user' && (
                  <button
                    type="button"
                    className="btn btn-error rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
                    onClick={handleAddCart}
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ItemDetails;
