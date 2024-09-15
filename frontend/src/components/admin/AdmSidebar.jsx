import React from "react";
import { NavLink} from 'react-router-dom'
function AdmSidebar() {
  return (
    <div className=" w-full">
      <ul className=" p-0 py-[40px] sm:ps-[40px] ps-[15px] bg-inherit flex flex-col gap-3">
        <li className=" border rounded-s-full hover:bg-[#ff5861] transition-all hover:text-white text-center overflow-hidden">
          <NavLink to='/adminPanel' className={`flex gap-3 items-center justify-center sm:justify-start ps-5 py-3 pr-2`}>
          <i className='bx bx-plus-circle text-2xl'></i>
            <span className=" hidden sm:block">Add Food</span>
          </NavLink >
        </li>

        <li className=" border rounded-s-full hover:bg-[#ff5861] transition-all hover:text-white text-center overflow-hidden">
          <NavLink to='list' className={`flex gap-3 items-center justify-center sm:justify-start ps-5 py-3 pr-2`}>
          <i className='bx bx-list-ul text-2xl'></i>
            <span className=" hidden sm:block">List of Food</span>
          </NavLink>
        </li>

        <li className=" border rounded-s-full hover:bg-[#ff5861] transition-all hover:text-white text-center overflow-hidden">
          <NavLink to='order' className={`flex gap-3 items-center justify-center sm:justify-start ps-5 py-3 pr-2`}>
          <i class='bx bx-wallet-alt text-2xl'></i>
            <span className=" hidden sm:block">Orders</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default AdmSidebar;
