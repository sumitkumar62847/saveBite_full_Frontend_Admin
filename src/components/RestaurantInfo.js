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
    <div className='w-[850px]  bg-white m-4 border'>
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
            <p>Your login email id (or mobile number) changes, likewise. You'll receive all your account related communication on 
                your updated email address (or mobile number).
                When will my account be updated with the new email address (or mobile number)?
                It happens as soon as you confirm the verification code sent to your email (or mobile) and save the changes.
                What happens to my existing account when I update my email address (or mobile number)?
                Updating your email address (or mobile number) doesn't invalidate your account. Your account remains fully functional. 
                You'll continue seeing your Order history, saved information and personal details.</p>
        </div>
    </div>
  )
}

export default RestaurantInfo;