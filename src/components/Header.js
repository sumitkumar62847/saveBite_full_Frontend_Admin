import React from 'react'
import { useNavigate } from'react-router-dom';
import logo from '../logo.png'
import './AllComponent.css'
import { useSelector } from 'react-redux';
import userIcon from '../images/userImageIcon.png'

function Header() {
    const restInfo = useSelector(state => state.restaurant.restinfo);
    const userinfo = useSelector(state => state.admin.userinfo);
    const navigate = useNavigate();

    
    return (
            <header className="w-full h-[100px]">
                <nav className="simindexnav fixed top-0 w-full  flex justify-between items-center pt-1 px-[2%] bg-white border border-[rgb(106,154,52)] h-auto pb-1">
                    <div className="flex items-center justify-center w-[30%]">
                        <a href="/">
                            <img src={logo} alt='logo' width="90px" height="90px" className='cursor-pointer'/>
                        </a>
                        <i><span className='text-[40px] pl-[10px] text-[rgb(76,201,105)]'>SAVE</span><label className='text-[40px] text-[rgb(201,126,76)]'>BITE</label></i>
                    </div>
                    <div className="flex items-center justify-between w-[25%]">
                        <div className='w-[30%] h-[40px] border flex items-center cursor-pointer rounded-lg bg-green-100' onClick={() =>{navigate('/addAds')}}><button className='w-full'>Add Ads</button></div>
                        <div className="w-[60%] group pr-1 flex justify-center items-center border gap-3 rounded-lg cursor-pointer" onClick={()=>{navigate('/profile')}}>
                            <img src={userIcon} alt='userprofile' width="40" className='rounded-full bg-green-700'/>
                            <div>
                                <p className='text-slate-400 text-[12px]'>{userinfo?.name}</p>
                                <p className='text-slate-800 text-[17px]'>{restInfo?.Restaurant_name}</p>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        
    )
}

export default Header;