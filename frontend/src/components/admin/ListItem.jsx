import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function ListItem() {
  const [getFoodData, setGetFoodData] = useState([]);
  const [loading, setLoading] = useState(false);
  const url = 'http://localhost:5000';
  useEffect(() => {
   getFood();
  }, []);

  const getFood = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${url}/api/food/getAllFood`);
      const data = await response.json();
      console.log(data.food);
      setGetFoodData(data.food);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    console.log(id)
    try {
      const response = await fetch(`${url}/api/food/deleteFood/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      console.log(data);

      if (data.status === 200) {
        toast.success(`${data.message}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
        getFood();
      }
      else{
        throw new Error(data.message)

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
    <div className=" w-full min-h-[85vh]">
      <h1 className=" text-xl font-semibold mb-3">List of Food</h1>
      {loading ? (
        <>
          <div className="flex justify-center items-center h-[80vh]">
          <span className="loading loading-spinner text-error w-11"></span>
          </div>
        </>
      ) : (
        <>
          <table className="table border rounded-none">
            {/* head */}
            <thead>
              <tr>
                <th>Item</th>
                <th>Name</th>
                <th>Type</th>
                <th>Category</th>
                <th>Rating</th>
                <th>Price</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              { getFoodData && getFoodData.map((item) => (
                <Row key={item._id} item={item} handleDelete={handleDelete} />
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default ListItem;

const Row = ({item,handleDelete}) => {
  const url = 'http://localhost:5000';

  return (
    <tr>
      <td>
        <div className="avatar">
          <div className="mask mask-squircle w-14 h-14">
            <img
              src={`${url}/images/${item.image}`}
              alt="Avatar Tailwind CSS Component"
            />
          </div>
        </div>
      </td>
      <td>{item.name}</td>
      <td>{item.type}</td>
      <td>{item.category}</td>
      <td>{item.rating}</td>
      <td>${item.price}</td>
      <td>
        <button className="btn btn-ghost text-error bx bxs-trash-alt text-xl rounded-full" onClick={()=> handleDelete(item._id)}></button>
      </td>
    </tr>
  );
};
