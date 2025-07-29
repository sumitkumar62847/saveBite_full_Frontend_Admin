import React,{  useRef, useState} from 'react';
import { useDispatch } from 'react-redux';
import { deleteitem, itemLive } from '../Slices/ItemUpload';
import { getitems } from '../Slices/ItemUpload.js';
import DealTime from './DealTime.js';

const initialState = {
    hours:'',
    minutes:'',
  }



function Iteminfo({item}) {
    const [time, setTime] = useState(initialState);
    const dispatch = useDispatch();
    const liveuntiltime = new Date(item.LiveUntil);
    let userid = localStorage.getItem('idtity');
    const liveform = useRef(null);


    function livehandle(e){
        e.preventDefault();
        liveform.current.style.display =  liveform.current.style.display === 'none'? 'block':'none';
      }
    
      function submitHandler(e,id){
          e.preventDefault();
          let totalTime =  (time.hours * 60) + (time.minutes * 1);
          dispatch(itemLive({id,ltime:totalTime}))
          setTimeout(()=>{ dispatch(getitems({userid}));},500)
          liveform.current.style.display =  liveform.current.style.display === 'none'? 'block':'none';
        }
    
      function changeHandler(e){
        e.preventDefault();
        setTime({...time, [e.target.name]:e.target.value})
      }
  return (
    <div key={item._id} className='relative w-[18vw] h-[26vw] bg-slate-100 flex flex-col border items-center'>
        <img src={item.imageUrl[0]} alt='' className='w-full h-[50%] bg-white '></img>
        <p>{item.item_name}</p>
        <p>Price: {item.price} Rs  <label>({item.discount}%)</label></p>
        <p className='text-red-500'>
            <DealTime liveTime={liveuntiltime}></DealTime>
        </p>
        <div>
            <button onClick={livehandle} disabled={item.isLiveed}
                className='w-[100px] h-[40px] text-white bg-green-500 rounded-md hover:bg-green-600 m-2 disabled:bg-slate-400'>Live</button>
            <button  disabled={item.isLiveed} onClick={()=> {
                dispatch(deleteitem({id:item._id}));
                setTimeout(()=>{ dispatch(getitems({userid}));},500)
            }} 
            className='w-[100px] h-[40px] text-white bg-red-400 rounded-md hover:bg-red-500 m-2 disabled:bg-slate-400'>Delete</button>
            <button disabled={item.isLiveed} className='absolute top-2 right-2 w-[60px] h-[30px] text-black bg-green-200 rounded-md hover:bg-green-300 disabled:bg-slate-400'>Edit</button>
        </div>
        <p>Status:</p>
        <div>
            <p>Available: <label>{item.quantity}</label></p>
            <p>Order: <label>{item.order}</label></p>
            <p>Sold: <label>{item.sold}</label></p>
        </div>
        <div  style={{display:'none'}} ref={liveform} className='w-[800px] h-[500px] border fixed top-[20%] left-[25%] z-50 '>
            <form className='w-full h-full bg-green-100 flex flex-col justify-between items-center p-4 ' onSubmit={(e)=>submitHandler(e,item._id)}>
            <h1 className='text-black'>Set Time to Live</h1>
            <div>
                <input required type='number' max='5' placeholder='00' name='hours' onChange={changeHandler}
                className='w-[40px] h-[30px] border outline-none' /><label>hours</label>
                <input required type='number' max='59' placeholder='00' name='minutes'  onChange={changeHandler}
                className='w-[40px] h-[30px] border outline-none ml-2' /><label>Minutes</label>
            </div>
            <div className='w-full'>
                <button  type='submit' className='text-2xl border w-full text-green-500 h-[50px] bg-white '>Submit</button>
                <button onClick={livehandle} className='text-2xl border w-full text-red-500 h-[50px] bg-white '>Cencel</button>
            </div>
            </form>
        </div>
    </div>
  )
}

export default Iteminfo;