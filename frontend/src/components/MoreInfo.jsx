import React, { useEffect } from "react";
import logo from '../assets/delivery-boy.png'
import legPeace from '../assets/legs-piece.png'
import mobile from '../assets/mobile.png'
import {motion} from 'framer-motion'
function MoreInfo() {
  useEffect(() => {
    const sr = ScrollReveal({
      reset: true,
      distance: '40px',
      duration: 1000,
      delay: 400,
    });

    sr.reveal('.an-3', { delay: 400, origin: 'bottom' });
    sr.reveal('.card', { delay: 600, origin: 'bottom', interval:300});
  }, []);


  return (
    <div className=" px-[50px] w-full h-fit my-10 flex justify-center gap-7 flex-wrap"
    >
      <div className="an-3 w-[240px] sm:w-[300px] h-fit p-3">
        <h1 className="font-bold text-4xl">Why we are Best in our Town</h1>
        <p className="text-lg mt-3 text-slate-400">
          whole grains and low-fat dairy can help to reduce your your risk of
          heart disease by maintaining blood pressure.
        </p>
      </div>

      <div className="w-[200px] h-[250px] card bg-white border flex justify-center items-center shadow-md flex-wrap">
        <img src={logo} alt="" className=" w-[100px] h-[100px]" />
        <h1 className=" text-2xl font-bold text-center">Get delivery at your door step</h1>
      </div>

      <div className="w-[200px] h-[250px] card border bg-white flex justify-center items-center shadow-md flex-wrap">
        <img src={legPeace} alt="" className=" w-[100px] h-[100px]" />
        <h1 className=" text-2xl font-bold text-center">Choose your favorite food</h1>
      </div>

      <div className="w-[200px] h-[250px] card border bg-white flex justify-center items-center shadow-md flex-wrap">
        <img src={mobile} alt="" className=" w-[100px] h-[100px]" />
        <h1 className=" text-2xl font-bold text-center">We have 400+ Review On our app</h1>
      </div>

    </div>
  );
}

export default MoreInfo;
