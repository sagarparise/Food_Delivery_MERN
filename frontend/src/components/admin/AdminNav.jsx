import React from "react";
import deliveryBoy from "../../assets/delivery-boy.png";
import admin from "../../assets/admin.png";
import { useNavigate } from "react-router-dom";
function AdminNav() {
  const navigate = useNavigate();
  return (
    <div className="w-full flex justify-between items-center px-8 py-3 border-b-2 shadow-md">
      <div className="flex-1 flex gap-3 items-center cursor-pointer" onClick={()=>navigate("/")}>
        <img src={deliveryBoy} alt="logo" className="w-9" />
        <div>
          <h1 className=" font-bold text-xl text-[#f94a3d]">F-Delivery</h1>
          <p className=" text-[13px]">Admin Panel</p>
        </div>
      </div>
      <div className="avatar">
        <div className="w-12 rounded-full border shadow-sm">
          <img
            src={admin}
            alt="Tailwind-CSS-Avatar-component"
          />
        </div>
      </div>
    </div>
  );
}

export default AdminNav;
