import React,{useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import ShortInfo from './ShortInfo';
import ProfileInfo from './profileInfo';
import AddressInfo from './AddressInfo';
import Footer from './Footer';
import { getUser } from '../Slices/RegisterSlice';
import { getRestData ,getAddressData} from '../Slices/ResraurantDataSlice';
import RestaurantInfo from './RestaurantInfo';
import { useDispatch } from 'react-redux';


let initItem = [true, false, false]
function Profile() {
    const [showProfileItem, setShowProfileItem] = useState(initItem);
    function toggleProfileItem(num){
        let newArr = [...showProfileItem];
        newArr = newArr.map((_, index) => (index === num ? true : false));
        setShowProfileItem(newArr); 
    }

    const dispatch = useDispatch();

    useEffect(()=>{
      dispatch(getUser())
      dispatch(getRestData())
      dispatch(getAddressData())
    },[dispatch])

    const navigate = useNavigate();
  return (
    <>
      <div className='bg-[rgb(253,255,253)] w-full min-h-[100vh]'>
          <Header search={false}></Header>
          <button onClick={()=>{navigate(-1)}} className='px-4 py-2 text-white text-2xl bg-green-600 hover:bg-green-800 rounded-xl m-3 absolute'>{'<-'}</button>
          <div className='w-full h-auto  flex justify-center'>
              <ShortInfo toggleProfileItem={toggleProfileItem} showProfileItem={showProfileItem}></ShortInfo>
              {showProfileItem[0] && <ProfileInfo></ProfileInfo>}
              {showProfileItem[1] && <RestaurantInfo></RestaurantInfo>}
              {showProfileItem[2] && <AddressInfo></AddressInfo>}
          </div>
      </div>
      <Footer></Footer>
    </>
    
  )
}

export default Profile;