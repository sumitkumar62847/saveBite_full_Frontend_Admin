import React,{useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from'react-redux';
import { createRestaurantAddress } from '../Slices/ResraurantDataSlice';

const initialState = {
    fullname: '',
    mobileNo:'',
    pinCode: '',
    locality: '',
    fullAddress: '',
    city: '',
    state: '',
    landmark: '',
    alternate_phone: '',
    userid: '',
};

function Address() {
    const [address, setAddress] = useState(initialState);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isAddress = useSelector((state)=> state.restaurant.isAddress);
    let userid = useSelector((state)=> state.admin.userid);
    if(!userid){
        userid = localStorage.getItem('idtity');
    }
    useEffect(()=>{
        if(isAddress){
            navigate('/');
        }
    },[isAddress, navigate]);

    function handleSubmit(e){
        e.preventDefault();
        if(!e.target.checkValidity()){
                alert('please fill in required fill');
                return;
            }else{
            dispatch(createRestaurantAddress(address));
            }
    }

    function changehandler(e){
        setAddress(address.userid = userid);
        setAddress({...address, [e.target.name]: e.target.value });

    }
  return (
    <div className='w-full h-[100vh] bg-white flex justify-center items-center '>
        <div className='w-[95%] h-[80%] sm:w-[80%] md:w-[60%] lg:w-[50%] bg-green-50  rounded-xl flex flex-col items-center justify-around'>
            <div className='w-full h-auto p-4 flex flex-col justify-center items-center'>
                <h1 className='text-3xl text-green-500 py-4'>Address Informantion</h1>
                <p className='text-slate-400'>something abount web site</p>
            </div>
            <div className='w-full h-auto flex justify-center items-center gap-4'>
                <form name='personalInfo' className='w-[90%] my-2 h-auto' onSubmit={handleSubmit}>
                    <div className='flex items-center gap-2'>
                        <input type='text' placeholder='Full Name' name='fullname' required onChange={changehandler}
                        className='my-3 w-[80%] h-[40px]  px-3 bg-white focus:bg-slate-100 focus:outline-none border-b-2 required focus:border-green-500'/>
                        <input type='number' placeholder='Mobile Number' name='mobileNo' required onChange={changehandler}
                        className='w-[80%] h-[40px]  px-3 bg-white focus:bg-slate-100 focus:outline-none border-b-2 required focus:border-green-500'/>
                    </div>
                    <div className='flex items-center gap-2'>
                        <input type='number' placeholder='PinCode' name='pinCode' required onChange={changehandler}
                        className='my-3 w-[80%] h-[40px]  px-3 bg-white focus:bg-slate-100 focus:outline-none border-b-2 required focus:border-green-500'/>
                        <input type='text' placeholder='Locality' name='locality' required onChange={changehandler}
                        className='w-[80%] h-[40px]  px-3 bg-white focus:bg-slate-100 focus:outline-none border-b-2 required focus:border-green-500'/>
                    </div>
                    <div className='flex items-center gap-2'>
                        <textarea type='textarea' rows={2} maxLength={100} placeholder='Adress ( Area & Street)' name='fullAddress' required onChange={changehandler}
                        className='my-3 w-[100%] h-[80px]  p-3 bg-white focus:bg-slate-100 focus:outline-none border-b-2 required focus:border-green-500'/>
                    </div>
                    <div className='flex items-center gap-2'>
                        <input type='text' placeholder='City/District/Town' name='city' required onChange={changehandler}
                        className='my-3 w-[80%] h-[40px]  px-3 bg-white focus:bg-slate-100 focus:outline-none border-b-2 required focus:border-green-500'/>
                        <input type='text' placeholder='State' name='state' required onChange={changehandler}
                        className='w-[80%] h-[40px]  px-3 bg-white focus:bg-slate-100 focus:outline-none border-b-2 required focus:border-green-500'/>
                    </div>
                    <div className='flex items-center gap-2'>
                        <input type='text' placeholder='Landmark (Optional)' name='landmark'  onChange={changehandler}
                        className='my-3 w-[80%] h-[40px]  px-3 bg-white focus:bg-slate-100 focus:outline-none border-b-2 required focus:border-green-500'/>
                        <input type='number' placeholder='Alternate Phone (Optional)' name='alternate_phone' onChange={changehandler}
                        className='w-[80%] h-[40px]  px-3 bg-white focus:bg-slate-100 focus:outline-none border-b-2 required focus:border-green-500'/>
                    </div>
                    <div className='w-full h-[100px] flex justify-center'>
                        <button type='submit' className=' px-4 py-2 text-white  bg-green-600 hover:bg-green-800 rounded-xl my-10 absolute'>Save</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Address;