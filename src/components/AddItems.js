import React from 'react'
import Items from './items'
import { useSelector } from 'react-redux';
import Loader from './Loader';

function AddItems(){
      const isLoader = useSelector((state)=> state.items.isLoader);

  return (
    <div className='w-full min-h-[90vh] bg-[rgb(255,255,255)] border z-1'>
      <Items></Items>
      {isLoader && <Loader></Loader>}
    </div>
  )
}

export default AddItems