import React, { useEffect, useState } from 'react'
import './AllComponent.css'
import { useSelector } from 'react-redux';

const initialState = {
    fullname: 'ss',
    email: '',
    mobilNo: ''
};

function ProfileInfo() {
    const [user, setUser] = useState(initialState);
    const userinfo = useSelector(state => state.admin.userinfo);

    useEffect(() => {
        setUser({
            fullname: userinfo.name || '',
            email: userinfo.Email || '',
            mobilNo: userinfo.mobile || ''
        });
    }, [userinfo]);

    function handleChange(e){
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    }


  return (
   <div className="w-full lg:max-w-[900px] bg-white border rounded-lg shadow-lg px-4 py-6">
  <div className="w-full max-w-3xl mx-auto">
    <form className="mb-6">
      <label className="block text-lg font-semibold mb-2">
        Personal Information
      </label>
      <input
        value={user.fullname}
        onClick={handleChange}
        disabled
        type="text"
        className="w-full h-10 bg-slate-100 px-3 border-b-2 focus:border-green-500 outline-none"
      />
    </form>

    <form className="mb-6">
      <label className="block text-lg font-semibold mb-2">
        Email Address
      </label>
      <input
        value={user.email}
        disabled
        type="email"
        className="w-full h-10 bg-slate-100 px-3 border-b-2 focus:border-green-500 outline-none"
      />
    </form>

    <form className="mb-6">
      <label className="block text-lg font-semibold mb-2">
        Mobile Number
      </label>
      <input
        value={user.mobilNo}
        disabled
        type="number"
        className="w-full h-10 bg-slate-100 px-3 border-b-2 focus:border-green-500 outline-none"
      />
    </form>

    <button className="px-6 py-2 border rounded-lg text-blue-500 font-semibold">
      Edit
    </button>

    <div className="mt-8 text-sm text-gray-600 leading-relaxed">
      <h3 className="mb-2 font-semibold text-gray-800">
        About Contact Information Updates
      </h3>
      <p>
        Your contact details are used for login and important
        account-related updates.
      </p>

      <ul className="mt-3 list-disc pl-5 space-y-1">
        <li>Verification required for updates</li>
        <li>Account updates instantly after verification</li>
        <li>No impact on order history</li>
      </ul>
    </div>
  </div>
</div>

  )
}

export default ProfileInfo;