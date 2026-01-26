import React,{useEffect, useState} from 'react'
import { useNavigate } from'react-router-dom';
import { useDispatch, useSelector } from'react-redux';
import { setEmail, emailVerification } from '../Slices/RegisterSlice.js'

const initialState = {
    emailAddress: '',
    fullname:'',
    eotp: '',
    userid: '',
}




function EmailVerify() {
    const [isOpt , setIsOpt] = useState(false);
    const [emaildata , setEmaildata] = useState(initialState);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isEmail = useSelector((state)=> state.admin.isEmail);
    let userid = useSelector((state)=> state.admin.userid);
    if(!userid){
        userid = localStorage.getItem('idtity');
    }

    useEffect(()=>{
        if(isEmail){
            navigate('/restregister');
        }
    },[isEmail, navigate]);

    function handleEmail(e){
        e.preventDefault();
        if(!e.target.checkValidity()){
            alert('please fill in required fill');
            return;
        }else{
            dispatch(setEmail(emaildata));
            setIsOpt(true);
        }  
    }
    function handleotp(e){
        e.preventDefault();
        if(!e.target.checkValidity()){
            alert('please fill in required fill');
            return;
        }else if(emaildata.eotp.length !== 6){
            alert('please fill correct OTP');
            return;
        }else{
            dispatch(emailVerification(emaildata));
        }
    }
    
    function handlechange(e){
        setEmaildata(emaildata.userid = userid);
        setEmaildata({...emaildata,[e.target.name]:e.target.value}); 
    }

  return (
    <div className='w-full h-[100vh] bg-white flex justify-center items-center '>
        <div className='w-[90%] h-[80%] sm:w-[70%] md:w-[50%] lg:w-[40%] bg-green-50  rounded-xl flex flex-col items-center justify-around'>
            <div className='w-full h-auto p-4 flex flex-col justify-center items-center'>
                <h1 className='text-3xl text-green-500 py-4'>Email Varification</h1>
                <p className="text-sm sm:text-base text-slate-400 mt-2 px-10">
                    A full-stack restaurant and cloud kitchen platform with smart search and sales insights.
                </p>
            </div>
            <div className='w-full h-auto flex justify-center items-center gap-4'>
                {!isOpt && <form className='w-full h-auto flex flex-col items-center gap-10 ' onSubmit={handleEmail}>
                    <input type='text' required name='fullname' placeholder='Full Name' onChange={handlechange}
                    className='placeholder:text-lg w-[70%] h-[50px] text-2xl border-b-2 focus:border-green-500 focus:outline-none  px-4'/>  
                    <input type='email' required name='emailAddress' placeholder='Email Address' onChange={handlechange}
                    className='placeholder:text-lg w-[70%] h-[50px] text-2xl border-b-2 focus:border-green-500 focus:outline-none  px-4'/>
                    <button type='submit' className='w-[200px] h-[50px] bg-green-500 text-white rounded-xl font-semibold' >Send OTP </button>
                </form>}
                {isOpt && <form className='w-full h-auto flex flex-col items-center gap-10 'onSubmit={handleotp}>
                    <input type='number' required name='eotp' placeholder='OTP' pattern='\d*'  onChange={handlechange}
                    className='placeholder:text-lg w-[70%] h-[50px] text-2xl border-b-2 focus:border-green-500 focus:outline-none  px-4'/>
                    <button type='submit' className='w-[200px] h-[50px] bg-green-500 text-white rounded-xl font-semibold' >Verify & continus</button>
                </form>}
            </div>
        </div>
    </div>
  )
}

export default EmailVerify;