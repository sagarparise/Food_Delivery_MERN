import React, { useEffect, useState } from "react";
import box from "../../assets/package.png";
import { toast } from "react-toastify";
function Order() {
  // set all the orders
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/order/getOrder"
        );
        const data = await response.json();
        console.log(data.orders);
        setOrders(data.orders);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllOrders();
  }, []);

  const handleOrderUpdate = async(event, orderId)=>{
    const status = event.target.value;

    // print order
    console.log(`Order ID: ${orderId}, Status: ${status}`);

    try {
      const response = await fetch(
        `http://localhost:5000/api/order/orderUpdate`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            orderId,
            status,
          }),
        }
      );
      const data = await response.json();
      console.log(data);
      toast.success(`Order status updated successfully!`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
      });
      window.location.reload();
   
    } catch (error) {
      console.log(error);
      toast.error(`Error updating order status!`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
      });
    }

  }

  return (
    <div>
      {orders &&
        orders.map((order, index) => (
          <div
            key={order._id}
            className=" border-2 shadow-sm py-2 px-10 mt-2 flex flex-col md:flex-row md:justify-between md:items-center md:gap-2 gap-4  flex-wrap "
          >
            <div className="avatar">
              <div className="w-20">
                <img src={box} className="mask mask-squircle " />
              </div>
            </div>

            <p className=" w-full md:w-[200px] text-[13px] text-slate-500 font-semibold whitespace-normal">
              {order.items.map((item, ind) => {
                if (ind === order.items.length - 1) {
                  return item.food.name + " x " + item.quantity;
                } else {
                  return item.food.name + " x" + item.quantity + " , ";
                }
              })}
            </p>
            <div className=" w-full md:w-[200px]">
              <p className="text-[12px]">
                {`${
                  order.address.firstName + " " + order.address.lastName + ","
                }`}
              </p>
              <p className="text-[12px]">
                {`${
                  order.address.street +
                  " , " +
                  order.address.city +
                  " - " +
                  order.address.pincode
                }`}
              </p>
              <p className="text-[12px]">{`${order.address.state}`}</p>
              <p className="text-[12px]">{`${order.address.phone}`}</p>
            </div>
            <p className=" md:mx-3 text-[14px] font-semibold">
             Price : $ {order.amount}.00
            </p>
            <p className=" md:mx-3 text-[14px] font-semibold">
              Items : {order.items.length}
            </p>

            <select className="select select-bordered select-xs w-fit rounded-none max-w-xs bg-[#fbddde] border-[#f6b4b6]"  onChange={(event)=>handleOrderUpdate(event,order._id)}>
              <option disabled >
                Status
              </option>
      
              <option value="Food Processing" selected={order.status === 'Food Processing'? 'selected' : ''}>Food Processing</option>
              <option value="Pending" selected={order.status === 'Pending'? 'selected' : ''}>
                Pending
              </option>
              <option value="Out of Delivery" selected={order.status === 'Out of Delivery'? 'selected' : ''}>Out of Delivery</option>
              <option value="Delivered" selected={order.status === 'Delivered'? 'selected' : ''}>Delivered</option>
            </select>
          </div>
        ))}
    </div>
  );
}

export default Order;
