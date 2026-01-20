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
    <div className='w-[850px]  bg-white m-4 border rounded-lg shadow-lg'>
        <div className='lg:w-[75%] md:w-[80%] sm:w-[90%] h-auto mt-10 mx-auto my-4'>
            <form name='personalInfo' className='w-full my-5'>
                <label className='text-slate-950 text-2xl'>Personal Information</label>
                <div className='flex items-center gap-2'>
                    <input value={user.fullname} disabled={true} type='text' placeholder='Full Name' name='fullname' required onChange={handleChange}
                     className='my-3 w-[80%] h-[40px] bg-slate-100 px-3 hover:bg-white focus:bg-slate-100 focus:outline-none border-b-2 required focus:border-green-500 disabled:bg-slate-100'/>
                </div>
            </form>
            <form name='emailInfo' className='w-full my-5'>
                <label className='text-slate-950 text-2xl'>Email Address</label>
                <div className='flex items-center gap-2'>
                    <input value={user.email} disabled={true}  type='email' placeholder='Email' name='email' required onChange={handleChange}
                     className='my-3 w-[80%] h-[40px] bg-slate-100 px-3 hover:bg-white focus:bg-slate-100 focus:outline-none border-b-2 required focus:border-green-500 disabled:bg-slate-100'/>
                </div>
            </form>
            <form name='mobileNoInfo' className='w-full my-5'>
                <label className='text-slate-950 text-2xl'>Mobile Number</label>
                <div className='flex items-center gap-2'>
                    <input value={user.mobilNo} disabled={true} type='number' placeholder='Mobile Number' name='mobileNo' required onChange={handleChange}
                     className='my-3 w-[80%] h-[40px] bg-slate-100 px-3 hover:bg-white focus:bg-slate-100 focus:outline-none border-b-2 required focus:border-green-500 appearance-none disabled:bg-slate-100' />
                </div>
            </form>
            <button className='w-[100px] h-[50px] text-blue-500 rounded-xl font-semibold border' >Edit</button>
        </div>
        <div className='lg:w-[75%] md:w-[80%] sm:w-[90%] h-auto mx-auto my-5 pb-5'>
            <div className="mt-6 text-sm text-gray-600 leading-relaxed">
                <h3 className="mb-2 font-semibold text-gray-800">
                    About Contact Information Updates
                </h3>

                <p>
                    Your email address or mobile number is used for login and important
                    account-related communication.
                </p>

                <ul className="mt-3 list-disc pl-5 space-y-1">
                    <li>You will receive a verification code on the updated contact detail</li>
                    <li>Your account is updated immediately after verification</li>
                    <li>Your order history and saved information remain unchanged</li>
                </ul>
            </div>

        </div>
    </div>
  )
}

export default ProfileInfo;