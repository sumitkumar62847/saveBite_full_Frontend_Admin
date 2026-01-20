import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Header from './Header'
import AddItems from './AddItems'
import { getitems } from '../Slices/ItemUpload.js';
import { getUser } from '../Slices/RegisterSlice';
import { getRestData} from '../Slices/ResraurantDataSlice';
import Footer from './Footer'

function Home() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(()=>{
    let userid = localStorage.getItem('idtity');

    if(!userid){
      navigate('/login');
    }

    dispatch(getitems({userid}));
    dispatch(getRestData())
    dispatch(getUser())
    let stagelevel = localStorage.getItem('stage');
    
    switch(stagelevel){
      case 'first':
        navigate('/verify');
        break;
      case 'second':
        navigate('/restregister');
        break;
      case 'thrid':
        navigate('/address');
        break;
      case 'fourth':
        navigate('/mapaddress');
        break;
      default:
        break;
    }
    
  },[dispatch,navigate]);

  return (
    <>
      <Header></Header>
      <AddItems></AddItems>
      <Footer></Footer>
    </>
  )
}

export default Home;