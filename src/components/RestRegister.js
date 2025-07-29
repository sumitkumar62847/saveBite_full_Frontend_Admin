import React,{useState, useEffect} from 'react'
import { useNavigate } from'react-router-dom';
import { useDispatch, useSelector } from'react-redux';
import { createRestaurantData } from '../Slices/ResraurantDataSlice';

const initialState = {
    rest_name: '',
    owner_name: '',
    rest_mobile_no: '',
    fssai_no: '',
    userid: '',
}

function RestRegister() {
    const [user , setUser] = useState(initialState);
    const [isVerification , setIsVerification] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isRegistered = useSelector((state)=> state.restaurant.isRegistered);
    let userid = useSelector((state)=> state.admin.userid);
    if(!userid){
        userid = localStorage.getItem('idtity');
    }

    useEffect(()=>{
        if(isRegistered){
            navigate('/');
        }
    },[isRegistered, navigate]);

    function handleVerification(e){
        e.preventDefault();
        setIsVerification(true);
        alert('Verifed');
    }
    function handleSubmit(e){
        e.preventDefault();
        if(!e.target.checkValidity()){
            alert('please fill in required fill');
            return;
        }else{
        dispatch(createRestaurantData(user));
        }
    }

    function changeHandler(e){
        e.preventDefault();
        setUser(user.userid = userid);
        setUser({...user,[e.target.name]:e.target.value});
    }
  return (
    <div className='w-full h-[100vh] bg-white flex justify-center items-center '>
        <div className='w-[80%] h-[80%] md:w-[50%] lg:w-[40%] bg-green-50  rounded-xl flex flex-col items-center justify-around'>
            <div className='w-full h-auto p-4 flex flex-col justify-center items-center'>
                <h1 className='text-3xl text-green-500 py-4'>Register Restaurant</h1>
                <p className='text-slate-400'>something abount web site</p>
            </div>
            <div className='w-full h-auto flex justify-center items-center gap-4'>
                <form className='w-full h-auto flex flex-col items-center gap-10 'onSubmit={handleSubmit}>
                    <input type='text' name='rest_name' required placeholder='Restaurant Name' onChange={changeHandler}
                     className='placeholder:text-lg w-[70%] h-[50px] text-2xl border-b-2 focus:border-green-500 focus:outline-none  px-4'/>
                    <input type='text' name='owner_name' required placeholder='Owner Name' onChange={changeHandler}
                     className='placeholder:text-lg w-[70%] h-[50px] text-2xl border-b-2 focus:border-green-500 focus:outline-none  px-4'/>
                    <input type='number' name='rest_mobile_no' required placeholder='Mobile Number' onChange={changeHandler}
                     className='placeholder:text-lg w-[70%] h-[50px] text-2xl border-b-2 focus:border-green-500 focus:outline-none  px-4'/>
                    <div className='flex w-[70%] justify-between'>
                        <input type='number' name='fssai_no' required placeholder='Fssai license No. ' onChange={changeHandler}
                         className='placeholder:text-lg w-[60%] h-[50px] text-2xl border-b-2 focus:border-green-500 focus:outline-none  px-4'/>
                        <button className='w-[100px] h-[50px]  text-white rounded-xl font-semibold' style={{backgroundColor:`${isVerification ? 'green':'gray'}`}} onClick={(e)=>{handleVerification(e)}} >{isVerification ? 'verifed' :'Verify'}</button>
                    </div>
                    <button type='submit' className='w-[100px] h-[50px] bg-green-500 text-white rounded-xl font-semibold' >Save & continus</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default RestRegister;