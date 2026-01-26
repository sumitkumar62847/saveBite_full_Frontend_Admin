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
   <div className="w-full lg:max-w-[900px] bg-white border rounded-lg shadow-lg px-4 py-6">
  <div className="w-full max-w-3xl mx-auto">
    <form className="flex flex-col gap-6">
      <h2 className="text-xl sm:text-2xl font-semibold text-center text-gray-900">
        Restaurant Information
      </h2>

      <input
        type="text"
        value={address.restname}
        disabled
        placeholder="Restaurant Name"
        name="restname"
        onChange={changeHandler}
        className="w-full h-11 px-3 bg-slate-100 border-b-2 focus:border-green-500 outline-none"
      />

      <input
        type="text"
        value={address.ownername}
        disabled
        placeholder="Owner Name"
        name="ownername"
        onChange={changeHandler}
        className="w-full h-11 px-3 bg-slate-100 border-b-2 focus:border-green-500 outline-none"
      />

      <input
        type="number"
        value={address.mobile_no}
        disabled
        placeholder="Mobile Number"
        name="mobile_no"
        onChange={changeHandler}
        className="w-full h-11 px-3 bg-slate-100 border-b-2 focus:border-green-500 outline-none"
      />

      <input
        type="number"
        value={address.fssai_no}
        disabled
        placeholder="FSSAI License Number"
        name="fssai_no"
        onChange={changeHandler}
        className="w-full h-11 px-3 bg-slate-100 border-b-2 focus:border-green-500 outline-none"
      />

      <button className="self-start px-6 py-2 border rounded-lg text-blue-500 font-semibold">
        Edit
      </button>
    </form>

    <div className="mt-10 text-sm text-gray-600 leading-relaxed">
      <h3 className="mb-2 font-semibold text-gray-800">
        About Restaurant Information
      </h3>

      <p>
        Your restaurant details help customers identify your business and allow
        the platform to manage orders and communication effectively.
      </p>

      <ul className="mt-3 list-disc pl-5 space-y-1">
        <li>Visible to customers for transparency</li>
        <li>Used for order-related communication</li>
        <li>No impact on existing orders</li>
      </ul>
    </div>
  </div>
</div>

  )
}

export default RestaurantInfo;