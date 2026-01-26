import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const initialState = {
    fullname:'',
    mobileNo:'',
    pinCode:'',
    locality:'',
    fulladdress:'',
    city:'',
    state:'',
    landmark:'',
    alt_mobile:'',
}

function AddressInfo() {
    const [address, setAddress] = useState(initialState);

    const restaddressinfo = useSelector(state => state.restaurant.addressinfo);

    useEffect(()=>{
        setAddress({
            fullname:restaddressinfo.Full_name || '',
            mobileNo:restaddressinfo.Mobile_no || '',
            pinCode:restaddressinfo.Pincode || '',
            locality:restaddressinfo.Locality || '',
            fulladdress:restaddressinfo.Full_Address || '',
            city:restaddressinfo.City || '',
            state:restaddressinfo.State || '',
            landmark:restaddressinfo.Landmark || '',
            alt_mobile:restaddressinfo.Alternate_mobile || '',

        })
    },[restaddressinfo])

    function changeHandler(e){
        e.preventdefault();
        setAddress({
            ...address,
            [e.target.name]:e.target.value
        })
    }

  return (
    <div className="w-full lg:max-w-[900px] bg-white border rounded-lg shadow-lg px-4 py-6">
  <div className="w-full max-w-3xl mx-auto">
    <form className="flex flex-col gap-6">
      <h2 className="text-xl sm:text-2xl font-semibold text-center text-gray-900">
        Address Information
      </h2>

      <div className="flex flex-col sm:flex-row gap-4">
        <input
          value={address.fullname}
          onClick={changeHandler}
          disabled
          type="text"
          placeholder="Full Name"
          className="w-full h-11 px-3 bg-slate-100 border-b-2 focus:border-green-500 outline-none"
        />
        <input
          value={address.mobileNo}
          disabled
          type="number"
          placeholder="Mobile Number"
          className="w-full h-11 px-3 bg-slate-100 border-b-2 focus:border-green-500 outline-none"
        />
      </div>


      <div className="flex flex-col sm:flex-row gap-4">
        <input
          value={address.pinCode}
          disabled
          type="number"
          placeholder="Pin Code"
          className="w-full h-11 px-3 bg-slate-100 border-b-2 focus:border-green-500 outline-none"
        />
        <input
          value={address.locality}
          disabled
          type="text"
          placeholder="Locality"
          className="w-full h-11 px-3 bg-slate-100 border-b-2 focus:border-green-500 outline-none"
        />
      </div>

      <textarea
        value={address.fulladdress}
        disabled
        rows={3}
        placeholder="Area & Street Address"
        className="w-full p-3 bg-slate-100 border-b-2 focus:border-green-500 outline-none resize-none"
      />

      <div className="flex flex-col sm:flex-row gap-4">
        <input
          value={address.city}
          disabled
          type="text"
          placeholder="City / District"
          className="w-full h-11 px-3 bg-slate-100 border-b-2 focus:border-green-500 outline-none"
        />
        <input
          value={address.state}
          disabled
          type="text"
          placeholder="State"
          className="w-full h-11 px-3 bg-slate-100 border-b-2 focus:border-green-500 outline-none"
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <input
          value={address.landmark}
          disabled
          type="text"
          placeholder="Landmark (Optional)"
          className="w-full h-11 px-3 bg-slate-100 border-b-2 focus:border-green-500 outline-none"
        />
        <input
          value={address.alt_mobile}
          disabled
          type="number"
          placeholder="Alternate Phone"
          className="w-full h-11 px-3 bg-slate-100 border-b-2 focus:border-green-500 outline-none"
        />
      </div>

      <button className="self-start px-6 py-2 border rounded-lg text-blue-500 font-semibold">
        Edit
      </button>
    </form>

    <div className="mt-10 text-sm text-gray-600 leading-relaxed">
      <h3 className="mb-2 font-semibold text-gray-800">
        About Address Information
      </h3>

      <p>
        Address details are used to ensure accurate delivery and service
        availability.
      </p>

      <ul className="mt-3 list-disc pl-5 space-y-1">
        <li>Used for delivery and verification</li>
        <li>Landmarks improve delivery accuracy</li>
        <li>Past orders remain unaffected</li>
      </ul>
    </div>
  </div>
</div>

  )
}

export default AddressInfo;