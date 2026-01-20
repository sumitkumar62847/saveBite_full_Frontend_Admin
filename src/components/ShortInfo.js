import React ,{useRef, useEffect} from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import userIcon from '../images/userImageIcon.png'


function ShortInfo({toggleProfileItem , showProfileItem}) {
    const addressRef = useRef(null);
    const restInfoRef = useRef(null);
    const perInfoRef = useRef(null);
    const userinfo = useSelector(state => state.admin.userinfo);
    const navigate = useNavigate();
    function handertoggle(e){
        toggleProfileItem(e)
    }
    useEffect(() => {
        addressRef.current.style.backgroundColor = showProfileItem[2] ? '#F2F2F2' : '#ffffff';
        restInfoRef.current.style.backgroundColor = showProfileItem[1] ? '#F2F2F2' : '#ffffff';
        perInfoRef.current.style.backgroundColor = showProfileItem[0] ? '#F2F2F2' : '#ffffff';
    }, [showProfileItem])
 
    function logoutHandle(e){
        e.preventDefault();
        localStorage.clear();
        navigate('/');

    }
  return (
    <div>
        <div className='lg:w-[250px] h-[50vh] bg-white m-4 border rounded-lg shadow-lg flex flex-col items-center'>
            <div className='border-b-2 w-[100%] flex flex-col items-center pb-3'>
                <div className='lg:w-[80px] md:w-[60px] lg:h-[80px] md:h-[60px] rounded-full bg-slate-400 m-2'>
                    <img src={userIcon} alt='user-img' className='w-[100%] h-[100%] rounded-full'></img>
                </div>
                <h1 className='text-xl text-green-900'>{userinfo.name}</h1>
            </div>
            <div ref={perInfoRef} style={{backgroundColor:'white'}}  className='w-[100%] flex justify-start border-b-2 cursor-pointer ' onClick={()=>handertoggle(0)}>
                <h2 className='text-xl m-3 pl-2 text-slate-600'>Personal Information</h2>
            </div>
            <div ref={restInfoRef} style={{backgroundColor:'white'}}  className='w-[100%] flex justify-start border-b-2 cursor-pointer ' onClick={()=>handertoggle(1)}>
                <h2 className='text-xl m-3 pl-2 text-slate-600'>Restaurant Information</h2>
            </div>
            <div ref={addressRef} style={{backgroundColor:'white'}} className='w-[100%] flex justify-start border-b-2 cursor-pointer ' onClick={()=>handertoggle(2)}>
                <h2 className='text-xl m-3 pl-2 text-slate-600'>Address Information</h2>
            </div>
        </div>
        <div className='lg:w-[250px] bg-white m-4 border rounded-lg flex flex-col items-center'>
            <div onClick={logoutHandle} className='w-[100%] flex justify-start border-b-2 cursor-pointer hover:bg-slate-100'>
                <button className='w-full text-xl m-3 text-red-400 text-center'>LogOut</button>
            </div>
        </div>
    </div>
  )
}

export default ShortInfo;