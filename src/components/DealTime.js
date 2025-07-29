import React, { useState,useEffect } from 'react'
import { getitems } from '../Slices/ItemUpload.js';
import { useDispatch } from 'react-redux';

function DealTime({liveTime}) {
    const [dealSec, setDealSec] = useState(null);
    const [isShow, setIsShow] = useState(false);
    const dispatch = useDispatch();

    useEffect(()=>{
        if(!isShow){
            setTimeout(()=>{
                let userid = localStorage.getItem('idtity');
                dispatch(getitems({userid}));
            },500);
        }
    },[dispatch,isShow])

    useEffect(() => {
        const idt = setInterval(() => {
            const now = Date.now();
            const diffMs = liveTime - now;
            const sec = Math.floor(diffMs / 1000);
            if (sec < 0){
                setIsShow(false);
                clearInterval(idt);
            }else if(sec){
                setDealSec(sec);
                setIsShow(true);
            }
        }, 1000);
    
        return () => clearInterval(idt);
    }, [liveTime]);
  return (
    <>{isShow && `0${Math.floor(dealSec/3600)}h : ${Math.floor((dealSec % 3600)/60)}min : ${Math.floor(dealSec % 60)}sec`}</>
  )
}

export default DealTime;