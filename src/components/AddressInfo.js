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
    <div className='w-[850px]  bg-white m-4 border'>
        <div className='lg:w-[75%] md:w-[80%] sm:w-[90%] h-auto mt-10 mx-auto my-4'>
             <form name='personalInfo' className='w-full my-2 h-auto'>
                <h1 className='text-slate-950 text-[30px] text-center mb-4'>Address Information</h1>
                <div className='flex items-center gap-2'>
                    <input value={address.fullname} disabled={true} type='text' placeholder='Full Name' name='fullname' required onClick={changeHandler} className='my-3 w-[80%] h-[40px]  px-3 bg-slate-100 focus:bg-slate-100 focus:outline-none border-b-2 required focus:border-green-500'/>
                    <input value={address.mobileNo} disabled={true} type='number' placeholder='Mobile Number' name='mobileNo' onClick={changeHandler} className='w-[80%] h-[40px]  px-3 bg-slate-100 focus:bg-slate-100 focus:outline-none border-b-2 required focus:border-green-500'/>
                </div>
                <div className='flex items-center gap-2'>
                    <input value={address.pinCode} disabled={true} type='number' placeholder='PinCode' name='pinCode' required onClick={changeHandler} className='my-3 w-[80%] h-[40px]  px-3 bg-slate-100 focus:bg-slate-100 focus:outline-none border-b-2 required focus:border-green-500'/>
                    <input value={address.locality} disabled={true} type='text' placeholder='Locality' name='locality' onClick={changeHandler} className='w-[80%] h-[40px]  px-3 bg-slate-100 focus:bg-slate-100 focus:outline-none border-b-2 required focus:border-green-500'/>
                </div>
                <div className='flex items-center gap-2'>
                    <textarea value={address.fulladdress} disabled={true} type='textarea' rows={2} maxLength={100} onClick={changeHandler} placeholder='Adress ( Area & Street)' name='fulladdress' required className='my-3 w-[100%] h-[80px]  p-3 bg-slate-100 focus:bg-slate-100 focus:outline-none border-b-2 required focus:border-green-500'/>
                </div>
                <div className='flex items-center gap-2'>
                    <input value={address.city} disabled={true} type='text' placeholder='City/District/Town' name='city' required onClick={changeHandler} className='my-3 w-[80%] h-[40px]  px-3 bg-slate-100 focus:bg-slate-100 focus:outline-none border-b-2 required focus:border-green-500'/>
                    <input value={address.state} disabled={true} type='text' placeholder='State' name='state' onClick={changeHandler} className='w-[80%] h-[40px]  px-3 bg-slate-100 focus:bg-slate-100 focus:outline-none border-b-2 required focus:border-green-500'/>
                </div>
                <div className='flex items-center gap-2'>
                    <input value={address.landmark} disabled={true} type='text' placeholder='Landmark (Optional)' name='landmark'  onClick={changeHandler} className='my-3 w-[80%] h-[40px]  px-3 bg-slate-100 focus:bg-slate-100 focus:outline-none border-b-2 required focus:border-green-500'/>
                    <input value={address.alt_mobile} disabled={true} type='number' placeholder='Alternate Phone (Optional)' name='alt_mobile' onClick={changeHandler} className='w-[80%] h-[40px]  px-3 bg-slate-100 focus:bg-slate-100 focus:outline-none border-b-2 required focus:border-green-500'/>
                </div>
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

export default AddressInfo;