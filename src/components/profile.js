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
    <div className="bg-[rgb(253,255,253)] min-h-screen flex flex-col">
  <Header search={false} />

  {/* Back Button */}
  <button
    onClick={() => navigate(-1)}
    className="self-start m-4 px-4 py-2 text-white text-lg bg-green-600 hover:bg-green-800 rounded-xl"
  >
    ← Back
  </button>

  {/* Main Content */}
  <div className="flex flex-col lg:flex-row justify-center items-start gap-6 px-4 pb-10">
    <ShortInfo
      toggleProfileItem={toggleProfileItem}
      showProfileItem={showProfileItem}
    />

    {showProfileItem[0] && <ProfileInfo />}
    {showProfileItem[1] && <RestaurantInfo />}
    {showProfileItem[2] && <AddressInfo />}
  </div>

  <Footer />
</div>

    
  )
}

export default Profile;