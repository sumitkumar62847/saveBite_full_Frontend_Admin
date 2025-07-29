import React from 'react'

function AddAd() {
  return (
    <div className='w-[30vw] group h-[19vw] relative border border-dashed border-[rgb(113,113,113)] m-4 hover:bg-[rgb(232,231,231)] cursor-pointer'>
        <div className='w-[50%] h-[1px] absolute top-[49%] left-[25%] border border-dashed border-[rgb(131,131,131)] group-hover:border-[rgb(120,120,120)] '></div>
        <div className='w-[1px] h-[50%] absolute top-[25%] left-[49%] border border-dashed border-[rgb(131,131,131)] group-hover:border-[rgb(120,120,120)]'></div>
    </div>
  )
}

export default AddAd;