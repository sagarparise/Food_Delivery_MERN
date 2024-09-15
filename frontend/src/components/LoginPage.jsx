import React, { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux"
import { setAuthToken, setAuthUser } from "../Slices/userSlice";
function LoginPage() {
  return (
    <>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div role="tablist" className="tabs tabs-boxed bg-white">
            <input
              type="radio"
              name="my_tabs_1"
              role="tab"
              className="tab font-semibold"
              aria-label="Sign Up"
              checked
            />
            <div role="tabpanel" className="tab-content p-10">
              <SignUp />
            </div>

            <input
              type="radio"
              name="my_tabs_1"
              role="tab"
              className="tab font-semibold"
              aria-label="Login"
            />
            <div role="tabpanel" className="tab-content  p-10">
            <Login />
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}

export default LoginPage;

const SignUp = () => {
  const url = 'https://food-delivery-mern-kl64.onrender.com/';
 const dispatch =  useDispatch();

 const[inputVal, setInputVal] = useState({

  fullname: '',
    email:'',
    password:'',
    phoneNumber:'',

  })

  const handleFormData =  async(e)=>{
    e.preventDefault();
    console.log(inputVal)
    try {
      const response = await fetch(`${url}/api/auth/signUp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputVal),
      });
      const data = await response.json();

      console.log(data);
      dispatch(setAuthUser(data.user));
      dispatch(setAuthToken(data.token));

      if(data.status === 201){
        toast.success(data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
        setInputVal({
          fullname: '',
          email:'',
          password:'',
          phoneNumber:'',
        })
      }else{
        throw new Error(data.message)
      }
      
      
    } catch (error) {
      console.log(error.message);
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
    <>
      <form action="" className=" flex flex-col gap-4" onSubmit={handleFormData}>

      <label className="input input-bordered flex items-center gap-2">
      <i class='bx bxs-user'></i>
          <input type="text" name="fullname" className="grow" placeholder="Full Name" value={inputVal.fullname} onChange={(e)=> setInputVal({...inputVal, fullname:e.target.value})} />
        </label>

        <label className="input input-bordered flex items-center gap-2">
        <i class='bx bxs-envelope' ></i>
          <input type="text" name="email" className="grow" value={inputVal.email} placeholder="Email" onChange={(e)=> setInputVal({...inputVal, email:e.target.value})}/>
        </label>

        <label className="input input-bordered flex items-center gap-2">
        <i class='bx bxs-phone'></i>

          <input type="text" className="grow" name="phoneNumber" value={inputVal.phoneNumber} placeholder="Phone Number" onChange={(e)=> setInputVal({...inputVal, phoneNumber:e.target.value})} />
        </label>
       
        <label className="input input-bordered flex items-center gap-2">
        <i class='bx bxs-key' ></i>
          <input type="password" name="password" className="grow" placeholder="Password" value={inputVal.password} onChange={(e)=> setInputVal({...inputVal, password:e.target.value})} />
        </label>

        <button type="submit" className=" btn btn-error text-white text-lg">SignUp</button>
      </form>
    </>
  );
};

const Login = ()=>{
  const url = 'https://food-delivery-mern-kl64.onrender.com/';
  const dispatch =  useDispatch();


  const[inputVal, setInputVal] = useState({
      email:'',
      password:'',
  
    })
  
    const handleFormData =  async(e)=>{
      e.preventDefault();
      
      try {
       const response = await fetch(`${url}/api/auth/signIn`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputVal)
       })
       const data = await response.json();
       console.log(data);
       dispatch(setAuthUser(data.user));
      dispatch(setAuthToken(data.token));
       if(data.status === 200){
         toast.success(data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
         setInputVal({
          email:'',
          password:'',
         })
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
  return(
    <>
    <form action="" className=" flex flex-col gap-4" onSubmit={handleFormData}>


  <label className="input input-bordered flex items-center gap-2">
  <i class='bx bxs-envelope' ></i>
    <input type="text" name="email" className="grow" value={inputVal.email} placeholder="Email" onChange={(e)=> setInputVal({...inputVal, email:e.target.value})} />
  </label>

  
 
  <label className="input input-bordered flex items-center gap-2">
  <i class='bx bxs-key' ></i>
    <input type="password" name="password" className="grow" placeholder="Password" value={inputVal.password} onChange={(e)=> setInputVal({...inputVal, password:e.target.value})} />
  </label>

  <button type="submit" className=" btn btn-error text-white text-lg">Login</button>

</form>
    </>
  )
}
