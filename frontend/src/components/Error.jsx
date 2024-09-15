import React from "react";
import error from '../assets/error.png'
import { useNavigate } from "react-router-dom";
function Error() {
  const navigate = useNavigate();
  return (
    <div className=" w-screen h-screen flex items-center justify-center">
      <div class="rounded p-10">
        <div className=" flex justify-center">
          <img src={error} className=" w-[200px] md:w-[400px]" alt="" />
        </div>
        <div class="text-center">
          <p class="text-base font-semibold text-black">404</p>
          <h1 class="mt-2 text-3xl font-bold tracking-tight text-black sm:text-5xl">
            Page not found
          </h1>
          <p class="mt-4 text-base leading-7 text-gray-600">
            Sorry couldn't find this page
          </p>
          <div class="mt-4 flex items-center justify-center gap-x-3">
            <button
              type="button"
              class="inline-flex items-center rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              onClick={()=>navigate("/")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="mr-2"
              >
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
              Go back
            </button>
           
          </div>
        </div>
      </div>
    </div>
  );
}

export default Error;
