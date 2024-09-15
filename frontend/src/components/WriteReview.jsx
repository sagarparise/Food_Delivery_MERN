import React, { useState } from "react";
import dBoy from "../assets/frame-XAq.png";
import {toast} from 'react-toastify';
import {motion} from 'framer-motion'
function WriteReview() {
  const url = 'https://food-delivery-mern-kl64.onrender.com/';
  const [data, setData] = useState({
    fullname: "",
   email: "",
    comment: "",
   gender: "",
    rating: null,
  })

  const handleForm = async(e) => {
    e.preventDefault();
    console.log(data)
    try {
      const response = await fetch(`${url}/api/review/addReview`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      console.log(result);

        if(result.status === 201){
          toast.success('Review Added', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
          setData({
            fullname: "",
           email: "",
            comment: "",
           gender: "",
            rating: null,
          })
        }
        else{
          throw new Error(result.message)
        }

     
      
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }

    
  }

  return (
    <section>
      <div class="grid grid-cols-1 lg:grid-cols-2">
        <div class="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <div class="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <h2 class="text-3xl font-bold leading-tight text-black sm:text-4xl">
              Write a Review
            </h2>
            <p class="mt-2 text-sm text-gray-600">about F-Delivery Services</p>
            <form action="#" method="POST" class="mt-8" onSubmit={handleForm}>
              <div class="space-y-5">
                <div>
                  <label for="" class="text-base font-medium text-gray-900">
                    {" "}
                    Full Name{" "}
                  </label>
                  <div class="mt-2">
                    <input
                      type="text"
                      placeholder="Full Name"
                      name="fullname"
                      value={data.fullname}
                      className="input input-bordered w-full"
                      onChange={(e) =>
                        setData({...data, fullname: e.target.value })
                      }

                    />
                  </div>
                </div>
                <div>
                  <label for="" class="text-base font-medium text-gray-900">
                    {" "}
                    Email address{" "}
                  </label>
                  <div class="mt-2">
                    <input
                      type="text"
                      placeholder="Email"
                      name="email"
                      value={data.email}
                      className="input input-bordered w-full "
                      onChange={(e) =>
                        setData({...data, email:e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className=" flex gap-4 items-center">
                  <div className=" flex flex-col">
                    <label htmlFor="Foodname">Rating</label>
                    <select
                      className="select select-bordered  select-sm mt-1 w-[150px]"
                      name="rating"                     
                      value={data.rating}
                      required
                      onChange={(e) =>
                        setData({...data, rating: Number(e.target.value) })
                      }
                    >
                      <option disabled>Rating</option>
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                      <option value={4}>4</option>
                      <option value={5}>5</option>
                    </select>
                  </div>

                  <div className=" flex flex-col">
                    <label htmlFor="Foodname">Gender</label>
                    <select
                      className="select select-bordered  select-sm mt-1 w-[150px]"
                      name="gender"
                      value={data.gender}
                      onChange={(e) =>
                        setData({...data, gender: e.target.value })
                      }
                      required
                    >
                      <option disabled>Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label for="" class="text-base font-medium text-gray-900">
                    {" "}
                    Comment{" "}
                  </label>
                  <textarea
                    className="textarea textarea-bordered w-full mt-2"
                    placeholder="Write a review"
                    name="comment"
                    value={data.comment}
                    onChange={(e) =>
                      setData({...data, comment: e.target.value })
                    }
                  ></textarea>
                </div>

                <div>
                  <button
                    type="submit"
                    class=" btn btn-error text-white w-full text-lg"
                  >
                    Submit{" "}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div class="h-full w-full p-[40px]">
          <img
            class="mx-auto h-full w-full rounded-md object-cover"
            src={dBoy}
            alt=""
          />
        </div>
      </div>
    </section>
  );
}

export default WriteReview;
