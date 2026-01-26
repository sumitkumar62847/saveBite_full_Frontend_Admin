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
    <div className="w-full lg:w-[260px] flex flex-col gap-4">

  <div className="bg-white border rounded-lg shadow-lg flex flex-col items-center">
    
    <div className="w-full border-b flex flex-col items-center py-4">
      <div className="w-16 h-16 rounded-full bg-slate-300 overflow-hidden">
        <img src={userIcon} alt="user" className="w-full h-full object-cover" />
      </div>
      <h1 className="mt-2 text-lg font-semibold text-green-900">
        {userinfo.name}
      </h1>
    </div>

    <div
      ref={perInfoRef}
      onClick={() => handertoggle(0)}
      className="w-full px-4 py-3 cursor-pointer border-b hover:bg-slate-100 transition"
    >
      <h2 className="text-sm sm:text-base text-slate-600">
        Personal Information
      </h2>
    </div>

    <div
      ref={restInfoRef}
      onClick={() => handertoggle(1)}
      className="w-full px-4 py-3 cursor-pointer border-b hover:bg-slate-100 transition"
    >
      <h2 className="text-sm sm:text-base text-slate-600">
        Restaurant Information
      </h2>
    </div>

    <div
      ref={addressRef}
      onClick={() => handertoggle(2)}
      className="w-full px-4 py-3 cursor-pointer hover:bg-slate-100 transition"
    >
      <h2 className="text-sm sm:text-base text-slate-600">
        Address Information
      </h2>
    </div>
  </div>

  <div className="bg-white border rounded-lg">
    <button
      onClick={logoutHandle}
      className="w-full py-3 text-red-500 font-semibold hover:bg-red-50 transition"
    >
      Log Out
    </button>
  </div>
</div>

  )
}

export default ShortInfo;