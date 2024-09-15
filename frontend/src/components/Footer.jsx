import React from 'react'
import deliveryBoy from '../assets/delivery-boy.png'

function Footer() {
  return (
   <>
   <footer className="footer p-10  text-base-content flex flex-col sm:flex-row font-semibold" style={{background: 'linear-gradient(285deg, #FDF0F3 4%, rgba(255, 253, 242, 0.50) 45%, #FDEEF3 86%)'}}>
  <div className=' flex-[0.3]'>
  <div className="flex-1 flex gap-2 items-center">
    <img src={deliveryBoy} alt="logo" className='w-11'/>
    <h1 className=" font-bold text-2xl text-[#f94a3d]">F-Delivery</h1>
  </div>
    <p className=' text-[16px] font-semibold p-2'>Retail food delivery is a courier service in which a restaurant, store, or independent food-delivery</p>
      <div className='flex items-center gap-2 '>
      <i className='bx bxl-instagram-alt text-2xl cursor-pointer'></i>
      <i className='bx bxl-facebook-square text-2xl cursor-pointer' ></i>
      <i className='bx bxl-twitter text-2xl cursor-pointer'></i>
      </div>
  </div>

  <div className='flex-[0.7] flex justify-around gap-4'>
  <nav className=' flex flex-col'>
    <h6 className="footer-title">Services</h6> 
    <a className="link link-hover">Branding</a>
    <a className="link link-hover">Design</a>
    <a className="link link-hover">Marketing</a>
    <a className="link link-hover">Advertisement</a>
  </nav> 
  <nav className='flex flex-col'>
    <h6 className="footer-title ">Company</h6> 
    <a className="link link-hover">About us</a>
    <a className="link link-hover">Contact</a>
    <a className="link link-hover">Jobs</a>
    <a className="link link-hover">Press kit</a>
  </nav> 
  <nav className='flex flex-col'>
    <h6 className="footer-title">Legal</h6> 
    <a className="link link-hover">Terms of use</a>
    <a className="link link-hover">Privacy policy</a>
    <a className="link link-hover">Cookie policy</a>
  </nav>
  </div>

</footer>
   </>
  )
}

export default Footer