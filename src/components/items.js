import React from 'react'
import Additem from './Additem'
import { useSelector } from 'react-redux';
import Iteminfo from './iteminfo.js';




function Items() {
  
  const items = useSelector(state => state.items.items);
 
  return (
    <div className='w-auto h-auto  gap-4 m-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
        {items && items.map(item => (
          <Iteminfo item={item} key={item._id} ></Iteminfo>
      ))}
        <Additem></Additem>
    </div>
  )
}

export default Items;