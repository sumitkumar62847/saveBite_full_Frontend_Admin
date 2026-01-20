import { useState } from 'react';
import Header from './Header';
import { useSelector,useDispatch } from 'react-redux';
import Loader from './Loader.js';
import { prediction } from '../Slices/RegisterSlice.js';
import Items from './items.js';


const initialState = {
    Restaurant_name:"",
    restaurant_ID:"",
    weather:"",
    season:"",
    meal:"",
    day:""
}

function Prediction() {

    const [formdata, setData] = useState(initialState);
    const isLoader = useSelector((state)=> state.admin.isLoader);
    const items = useSelector((state) => state.admin.predictedData);
    const isprediction = useSelector((state) => state.admin.isprediction);
    console.log(items.items_ml);
    
    const dispatch = useDispatch();
    function ChangeHandler(e){
        setData({...formdata, [e.target.name]: e.target.value});
    }

    function submitHandle(e){
        e.preventDefault();
        dispatch(prediction(formdata));
    }

  return (
    <div className='w-full '>
        <Header></Header>
        <div className='w-full flex justify-center flex-col items-center p-4'>

            {!isprediction && (
            <div className="mx-auto mt-10 w-full max-w-2xl rounded-2xl bg-green-50 p-8 shadow-lg">
                
                <div className="mb-6 text-center">
                <h1 className="text-2xl font-semibold text-gray-800">
                    Sales Prediction
                </h1>
                <p className="mt-1 text-sm text-gray-600">
                    Predict top 5 selling items based on previous sales data
                </p>
                </div>

                <form
                onSubmit={submitHandle}
                className="grid grid-cols-1 gap-4"
                >
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                    Restaurant Name
                    </label>
                    <input
                    type="text"
                    name="Restaurant_name"
                    value={formdata.Restaurant_name}
                    onChange={ChangeHandler}
                    required
                    className="w-full rounded-lg border px-3 py-2 text-sm focus:border-green-500 focus:outline-none"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                    Restaurant ID
                    </label>
                    <input
                    type="number"
                    name="restaurant_ID"
                    value={formdata.restaurant_ID}
                    onChange={ChangeHandler}
                    required
                    className="w-full rounded-lg border px-3 py-2 text-sm focus:border-green-500 focus:outline-none"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                    Weather Type
                    </label>
                    <input
                    type="text"
                    name="weather"
                    value={formdata.weather}
                    onChange={ChangeHandler}
                    placeholder="Sunny, Rainy..."
                    className="w-full rounded-lg border px-3 py-2 text-sm focus:border-green-500 focus:outline-none"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                    Season Type
                    </label>
                    <input
                    type="text"
                    name="season"
                    value={formdata.season}
                    onChange={ChangeHandler}
                    placeholder="Summer, Winter..."
                    className="w-full rounded-lg border px-3 py-2 text-sm focus:border-green-500 focus:outline-none"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                    Meal Type
                    </label>
                    <input
                    type="text"
                    name="meal"
                    value={formdata.meal}
                    onChange={ChangeHandler}
                    placeholder="Breakfast, Lunch..."
                    className="w-full rounded-lg border px-3 py-2 text-sm focus:border-green-500 focus:outline-none"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                    Day
                    </label>
                    <input
                    type="text"
                    name="day"
                    value={formdata.day}
                    onChange={ChangeHandler}
                    placeholder="Monday..."
                    className="w-full rounded-lg border px-3 py-2 text-sm focus:border-green-500 focus:outline-none"
                    />
                </div>

                <button
                    type="submit"
                    className="mt-4 w-full rounded-xl bg-green-500 py-3 font-semibold text-white transition hover:bg-green-600"
                >
                    Predict Top Items
                </button>
                </form>

                {isLoader && (
                <div className="mt-4 flex justify-center">
                    <Loader />
                </div>
                )}
            </div>
            )}
            { isprediction &&  <div className='w-full border m-4 '>
                <h1 className='text-[30px] border-b text-center'>Most selled {items.items_ml?.length} Items </h1>
                <Items items={items.items_ml} ml={true}></Items>
                </div>}
        </div>
    </div>
  )
}

export default Prediction;