import React from 'react'
import Items from './items'
import { useSelector } from 'react-redux';
import Loader from './Loader';

function AddItems(){
      const isLoader = useSelector((state)=> state.items.isLoader);
      const items = useSelector(state => state.items.items);
  return (
    <div className='w-full min-h-[90vh] mt-2 p-4 bg-[rgb(255,255,255)] border z-1'>
      <Items items={items}></Items>
      {isLoader && <Loader></Loader>}
    </div>
  )
}

export default AddItems;