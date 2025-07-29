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
    dispatch(getitems({userid}));
    dispatch(getRestData())
    
    dispatch(getUser())
    
  },[dispatch]);



  useEffect(()=>{
    let stagelevel = localStorage.getItem('stage');
    let userid = localStorage.getItem('idtity');
    if(!stagelevel && !userid){
      navigate('/login');
    }else if(stagelevel === 'first'){
      navigate('/verify');
    }else if(stagelevel === 'second'){
      navigate('/restregister'); 
    }else if(stagelevel === 'thrid'){
      navigate('/address');
    }else if(stagelevel === 'fourth'){
      navigate('/mapaddress');
    }else if(stagelevel === 'fifth'){
      navigate('/');
    }else{
      navigate('/login');
    }
  },[navigate, dispatch]);

  return (
    <>
      <Header></Header>
      <AddItems></AddItems>
      <Footer></Footer>
    </>
  )
}

export default Home;