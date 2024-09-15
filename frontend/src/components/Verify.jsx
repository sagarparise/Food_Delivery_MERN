import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify';

function Verify() {
  const[searchParams, setSearchParams] = useSearchParams();
  const{token}=useSelector(state=> state.user)
  const navigate = useNavigate()
  const url = 'http://localhost:5000'
  const success = searchParams.get('success')
  const orderId = searchParams.get('orderId')

  console.log(success, orderId)


  const verifyPayment = async()=>{
    try {
      const res = await fetch(`${url}/api/order/verifyOrder`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "authorization": token
        },
        body: JSON.stringify({
          orderId,
          success
        })
      })
      const result = await res.json();
      console.log(result.success)

      if(result.success){
        navigate('/')
        toast.success(result.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })

      }else{
        navigate('/cart')
        toast.error(result.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })

      }
      
    } catch (error) {
      console.log(error)
    }

  }

  useEffect(() => {
    verifyPayment()
  },[])

  return (
    <div className=' w-full h-[90vh] flex justify-center items-center'>
      {
        true && <span className="loading loading-spinner w-[50px] transition-all text-error"></span>
      }

    </div>
  )
}

export default Verify