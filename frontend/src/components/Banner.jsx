import React, { useEffect } from "react";
import heroImg from "../assets/banner.svg";
import img2 from "../assets/cringe.png";
import fdLogo from "../assets/frame-XAq.png";
import {motion} from 'framer-motion';

function Banner() {
 
    useEffect(() => {
      const sr = ScrollReveal({
        reset: true,
        distance: '40px',
        duration: 1000,
        delay: 400,
      });
  
      sr.reveal('.an-2', { delay: 400, origin: 'bottom' });
      sr.reveal('.an-1', { delay: 500, origin: 'left' });
    }, []);

  return (
    <div
      className="hero-img min:h-screen h-fit w-full flex flex-col sm:flex-row items-center px-[60px] p-[20px] bg-[#fbeeeebc]"
    >
      <div className=" flex-1 p-4">
        <div className=" h-12 w-fit rounded-full bg-[#f8e0e0] border flex items-center">
          <p className=" font-semibold text-[#f95a46] pr-3 ps-5 py-1">
            More than Faster
          </p>
          <img src={img2} alt="" className=" w-12 h-12" />
        </div>
        <h1 className="an-2 text-2xl sm:text-4xl md:text-5xl mt-4 font-semibold text-justify ">
          Get your cuisine <br/> delivered right to <br/> <span className=" text-[#f95a46]">your door</span>
        </h1>
        <p className="an-1 text-2xl mt-6 font-light text-[#6f6c7d] text-justify">Food that is delivered at the right time. The trendy food delivery partner.Good food is what we deliver.Your hunger companion.</p>
          <button className=" mt-6 btn btn-error text-white rounded-xl">Explore Food</button>
      </div>
      <div className=" flex-1">
        <img src={fdLogo} alt="" className="sm:w-full  sm:h-full object-cover" />
      </div>
    </div>
  );
}

export default Banner;
