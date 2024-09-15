import React, { useEffect, useState } from "react";
import upload from "../../assets/upload.png";
import { toast } from "react-toastify";
function AddItem() {
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    price: null,
    description: "",
    category: "Salad",
    type: "Veg",
    rating: 4,
  });
  const url = "http://localhost:5000";

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleForm = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    console.log(data);
  //  return 

    formData.append("name", data.name);
    formData.append("price", Number(data.price));
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("type", data.type);
    formData.append("rating", Number(data.rating));
    formData.append("image", image);

    console.log(formData);

    try {
      const res = await fetch(`${url}/api/food/add`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      console.log(data);
      if (data.status === 201) {
        toast.success(`${data.message}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setData({
          name: "",
          price: null,
          description: "",
          category: "Salad",
          type: "Veg",
          rating: 4,
        });
        setImage(false);
      
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  return (
    <div className=" w-full flex justify-center">
      <form
        action=""
        className=" w-full sm:w-3/4 lg:w-1/2 flex flex-col gap-3 border p-[30px] shadow-sm "
        onSubmit={handleForm}
      >
        <h1 className=" text-lg font-semibold">Add Food</h1>
        <div className=" w-fit">
          <p>Upload Image</p>
          <label htmlFor="file">
            <img
              src={image ? URL.createObjectURL(image) : upload}
              alt=""
              className=" w-[100px] h-[80px] rounded-lg mt-2"
            />
          </label>
          <input
            type="file"
            name="file"
            id="file"
            required
            hidden
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <div className=" flex flex-col">
          <label htmlFor="Foodname">Food Name</label>
          <input
            type="text"
            name="name"
            placeholder="Type here"
            value={data.name}
            className="input input-bordered input-sm rounded-none mt-1 w-full"
            onChange={handleChange}
          />{" "}
        </div>
        <div className=" flex flex-col">
          <label htmlFor="Foodname">Food Description</label>
          <textarea
            className="textarea textarea-bordered rounded-none mt-1"
            placeholder="Description"
            name="description"
            required
            value={data.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className=" flex justify-start items-center gap-4 flex-wrap">
          <div className=" flex flex-col">
            <label htmlFor="Foodname">Price</label>
            <input
              type="number"
              placeholder="price"
              required
              name="price"
              className="input input-bordered input-sm rounded-none mt-1 w-[150px]"
              value={data.price}
              onChange={handleChange}
            />{" "}
          </div>
          <div className=" flex flex-col">
            <label htmlFor="Foodname">Type</label>
            <select
              className="select select-bordered rounded-none select-sm w-[150px] mt-1 "
              name="type"
              required
              value={data.type}
              onChange={handleChange}
            >          
              <option selected value="Veg">Veg</option>
              <option value="Non Veg">Non Veg</option>
            </select>
          </div>
        </div>
        <div className=" flex justify-start items-center gap-4 flex-wrap">
          <div className=" flex flex-col">
            <label htmlFor="Foodname">Rating</label>
            <select
              className="select select-bordered rounded-none select-sm mt-1 w-[150px]"
              name="rating"
              required
              value={data.rating}
              onChange={handleChange}
            >
             
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option selected value={4}>4</option>
              <option value={5}>5</option>
            </select>
          </div>
          <div className=" flex flex-col">
            <label htmlFor="Foodname">Category</label>
            <select
              className="select select-bordered rounded-none select-sm mt-1 w-[150px]"
              name="category"
              required
              value={data.category}
              onChange={handleChange}
            >
             
              <option selected value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Hamburgers">Hamburgers</option>
              <option value="Fried chiken">Fried chiken</option>
              <option value="Pizza">Pizza</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
              <option value="Biryani">Biryani</option>
              <option value="Rice Dishes">Rice Dishes</option>
              <option value="Paneer Dishes">Paneer Dishes</option>
            </select>
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-error text-white rounded-none mt-2"
        >
          ADD
        </button>
      </form>
    </div>
  );
}

export default AddItem;
