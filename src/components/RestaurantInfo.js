import React, { useEffect, useState } from 'react'
import './AllComponent.css'
import { useSelector } from 'react-redux';

const initialState = {
  restname:'',
  ownername:'',
  mobile_no:'',
  fssai_no:'',
}

function RestaurantInfo() {
  const [address , setAddress] = useState(initialState);
  const restInfo = useSelector(state => state.restaurant.restinfo);
  useEffect(()=>{
    setAddress({
      restname:restInfo.Restaurant_name || '',
      ownername:restInfo.Owner_name || '',
      mobile_no:restInfo.Mobile_no || '',
      fssai_no: restInfo.Fssai_no || '',
    })
  },[restInfo])

  function changeHandler(e){
    e.preventDefault();
    setAddress({...address, [e.target.name]:e.target.value});
  }
  return (
    <div className='w-[850px]  bg-white m-4 border rounded-lg shadow-lg'>
        <div className='lg:w-[75%] md:w-[80%] sm:w-[90%] h-auto mt-10 mx-auto my-4'>
        <form className='w-full h-auto flex flex-col items-center gap-10 '> 
        <label className='text-slate-950 text-2xl'>Restaurant Information</label>
            <input type='text' value={address.restname} disabled={true} placeholder='Restaurant Name' name='restname' onChange={changeHandler}
            className='placeholder:text-lg w-[70%] h-[50px] text-lg bg-slate-100 border-b-2 focus:border-green-500 focus:outline-none  px-4'/>
            <input type='text' value={address.ownername} disabled={true} placeholder='Owner Name' name='ownername' onChange={changeHandler}
            className='placeholder:text-lg w-[70%] h-[50px] text-lg bg-slate-100 border-b-2 focus:border-green-500 focus:outline-none  px-4'/>
            <input type='number' value={address.mobile_no} disabled={true} placeholder='Mobile Number' name='mobile_no' onChange={changeHandler}
            className='placeholder:text-lg w-[70%] h-[50px] text-lg bg-slate-100 border-b-2 focus:border-green-500 focus:outline-none  px-4'/>
            <input type='number' value={address.fssai_no} disabled={true} placeholder='Fssai license No. ' name='fssai_no' onChange={changeHandler}
            className='placeholder:text-lg w-[70%] h-[50px] text-lg bg-slate-100 border-b-2 focus:border-green-500 focus:outline-none  px-4'/>
            <button className='w-[100px] h-[50px] text-blue-500 rounded-xl font-semibold border' >Edit</button>
        </form>
        </div>
        <div className='lg:w-[75%] md:w-[80%] sm:w-[90%] h-auto mx-auto my-5 pb-5 pt-5'>
            <p>
              <h3 className="mb-2 font-semibold text-gray-800">
                About Restaurant Information
              </h3>

              <p>
                Your restaurant details help customers recognize your business and allow
                SaveBite to manage orders and communication smoothly.
              </p>

              <ul className="mt-3 list-disc pl-5 space-y-1">
                <li>Restaurant name and owner details may be shown to customers</li>
                <li>Contact numbers are used for order-related communication</li>
                <li>Updating information does not affect existing orders</li>
              </ul>
            </p>
        </div>
    </div>
  )
}

export default RestaurantInfo;