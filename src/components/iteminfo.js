import React,{  useRef, useState} from 'react';
import { useDispatch } from 'react-redux';
import { deleteitem, itemLive } from '../Slices/ItemUpload';
import { getitems } from '../Slices/ItemUpload.js';
import DealTime from './DealTime.js';
import { useNavigate } from 'react-router-dom';
import { editItemId, getEditItem } from '../Slices/ItemEdit.js';


const initialState = {
    hours:'',
    minutes:'',
  }



function Iteminfo({item}) {
    const [hours, setHours] = useState(initialState);
    const [minutes, setMinutes] = useState(initialState);
    const dispatch = useDispatch();
    const liveuntiltime = new Date(item.LiveUntil);
    let userid = localStorage.getItem('idtity');
    const liveform = useRef(null);
    const navigate = useNavigate();

    function livehandle(e){
        e.preventDefault();
        liveform.current.style.display =  liveform.current.style.display === 'none'? 'block':'none';
      }
    
      function submitHandler(e,id){
          e.preventDefault();
          let totalTime =  (hours * 60) + (minutes * 1);
          dispatch(itemLive({id,ltime:totalTime}))
          setTimeout(()=>{ dispatch(getitems({userid}));},500)
          liveform.current.style.display =  liveform.current.style.display === 'none'? 'block':'none';
        }
    
      // function changeHandler(e){
      //   e.preventDefault();
      //   setTime({...time, [e.target.name]:e.target.value})
      // }

      function editHandle(e){
        e.preventDefault();
        dispatch(editItemId(item._id));
        dispatch(getEditItem({itemid:item._id}));
        navigate('/edit');
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
            <button disabled={item.isLiveed} className='absolute top-2 right-2 w-[60px] h-[30px] text-black bg-green-200 rounded-md hover:bg-green-300 disabled:bg-slate-400' onClick={editHandle}>Edit</button>
            <button onClick={livehandle} disabled={item.isLiveed}
                className='w-[100px] h-[40px] text-white bg-green-500 rounded-md hover:bg-green-600 m-2 disabled:bg-slate-400'>Live</button>
            <button  disabled={item.isLiveed} onClick={()=> {
                dispatch(deleteitem({id:item._id}));
                setTimeout(()=>{ dispatch(getitems({userid}));},500)
            }} 
            className='w-[100px] h-[40px] text-white bg-red-400 rounded-md hover:bg-red-500 m-2 disabled:bg-slate-400'>Delete</button>
        </div>
        <p>Status:</p>
        <div>
            <p>Available: <label>{item.quantity}</label></p>
        </div>




        <div style={{display:'none'}} ref={liveform} className="fixed z-50 flex items-center justify-center bg-black/50">
          <div className="w-[380px] rounded-2xl bg-white p-6 shadow-2xl">
            
           
            <h2 className="mb-6 text-center text-xl font-semibold text-gray-800">
              Set Time to Live
            </h2>

            
            <div className="flex items-center justify-center gap-4 mb-8">
              <input
                type="number"
                min="0"
                max="3"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                className="w-20 rounded-lg border text-center text-3xl font-bold outline-none focus:border-green-500"
              />
              <span className="text-3xl font-bold">:</span>
              <input
                type="number"
                min="0"
                max="59"
                value={minutes}
                onChange={(e) => setMinutes(e.target.value)}
                className="w-20 rounded-lg border text-center text-3xl font-bold outline-none focus:border-green-500"
              />
            </div>

            <p className="mb-6 text-center text-sm text-gray-500">
              Hours : Minutes
            </p>

            
            <div className="flex gap-3">
              <button
                onClick={(e)=>submitHandler(e,item._id)}
                className="flex-1 rounded-xl bg-green-500 py-2 text-white font-semibold hover:bg-green-600"
              >
                Start Timer
              </button>

              <button
                onClick={livehandle}
                className="flex-1 rounded-xl border border-red-400 py-2 text-red-500 font-semibold hover:bg-red-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>



    </div>
  )
}

export default Iteminfo;