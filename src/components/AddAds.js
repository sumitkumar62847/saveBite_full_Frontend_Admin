import React from 'react'
import AddAd from './AddAd';

function AddAds() {
  return (
    <div className='w-full flex justify-center flex-col items-center'>
        <h1 className='text-[40px]'>Add your Ads Here</h1>
        <AddAd></AddAd>
    </div>
  )
}

export default AddAds;