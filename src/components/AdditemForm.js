import React, { useState,useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from'react-router-dom';
import { createItem } from '../Slices/ItemUpload.js';
import Loader from './Loader.js';
import { UpdataItem } from '../Slices/ItemEdit.js';

const initialState ={
    foodtype: "",
    suitableFor: [],
    item_name: "",
    item_id:"",
    price: "",
    discount: "",
    amount:"",
    quantity: "",
    description: "",
    images: [],               
    ingredients: [],
    masalaType: "",
}

const grains = [
  "Rice", "Basmati Rice", "Brown Rice", "Wheat", "Maize/Corn", "Jowar",
  "Bajra", "Ragi", "Barley", "Poha", "Dalia", "Sabudana", "Suji/Rava",
  "Vermicelli", "Oats"
];

const pulses = [
  "Toor Dal", "Moong Dal", "Whole Green Moong", "Urad Dal", "Masoor Dal",
  "Chana Dal", "Whole Chana", "Kabuli Chana", "Rajma", "Lobiya",
  "Horse Gram", "Moth Beans", "Soya Chunks", "Sprouted Moong", "Sprouted Moth"
];

const vegetables = [
  "Potato", "Onion", "Tomato", "Brinjal/Eggplant", "Lady Finger", "Bottle Gourd",
  "Bitter Gourd", "Ridge Gourd", "Pumpkin", "Cauliflower", "Cabbage",
  "Capsicum", "Spinach", "Fenugreek Leaves", "Coriander Leaves"
];


const fruits = [
  "Mango", "Banana", "Papaya", "Apple", "Guava", "Watermelon", "Muskmelon",
  "Orange", "Grapes", "Pomegranate", "Lemon", "Litchi", "Sapota/Chikoo",
  "Pineapple", "Custard Apple"
];


const dairyProducts = [
  "Milk", "Curd", "Paneer", "Ghee", "Butter", "Cream", "Chhena", "Khoya/Mawa",
  "Buttermilk", "Lassi"
];


const spices = [
  "Turmeric Powder", "Red Chilli Powder", "Coriander Powder", "Cumin Seeds",
  "Mustard Seeds", "Fennel Seeds", "Fenugreek Seeds", "Asafoetida",
  "Black Pepper", "Cardamom", "Cloves", "Cinnamon", "Bay Leaf",
  "Dry Mango Powder", "Garam Masala"
];


const oils = [
  "Mustard Oil", "Groundnut Oil", "Sunflower Oil", "Coconut Oil", "Desi Ghee"
];


const otherItems = [
  "Salt", "Sugar", "Jaggery", "Tamarind", "Gram Flour", "Rice Flour",
  "Pickles", "Papad", "Dry Fruits", "Tea Leaves"
];

function AdditemForm({edit}) {
    const [formData, setFormData] = useState(initialState);
    const [previews, setPreviews] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isUploaded = useSelector((state)=> state.items.isUploaded);
    const isLoader = useSelector((state)=> state.items.isLoader);

    const isUploadededit = useSelector((state)=> state.itemedit.isUploaded);
    const isLoaderedit = useSelector((state)=> state.itemedit.isLoader);

    const editItemId = useSelector((state)=> state.itemedit.editItemId);
    const editItem = useSelector((state)=> state.itemedit.edititem);
    let userid = useSelector((state)=> state.admin.userid);
    if(!userid){
        userid = localStorage.getItem('idtity');
    }

    function formHandler(e){
        setFormData({...formData, [e.target.name]: e.target.value});
    }


    useEffect(()=>{
        if(edit && editItemId){
            setFormData(editItem)
        }
    },[edit,editItemId, editItem]);

    useEffect(()=>{
        if( (isUploaded && !isLoader) || (isUploadededit && !isLoaderedit) ){
            navigate('/')
        }
    },[isUploaded, navigate, isLoader, isUploadededit, isLoaderedit])



    function submitHandler(e){
        e.preventDefault();
        if(edit){
            const editFormData = new FormData();
            for (let key in formData) {
                if (key === 'images' || key === 'suitableFor' || key === 'ingredients') {
                    continue;
                }
                editFormData.append(key, formData[key]);
            }

            formData.suitableFor?.forEach(val => {
                editFormData.append('suitableFor[]', val);
            });

            formData.ingredients?.forEach((ing, index) => {
                editFormData.append(`ingredients[${index}][name]`, ing.name);
                editFormData.append(`ingredients[${index}][qty]`, ing.qty);
            });
            editFormData.append('userid' , userid);
            editFormData.append('itemId', editItemId);
            dispatch(UpdataItem(formData));
        }else{
            if(!e.target.checkValidity()){
                alert('Please fill in required fields');
                return;
            }else{
                const allFormData = new FormData();
                for (let key in formData) {
                    if (key === 'images' || key === 'suitableFor' || key === 'ingredients') {
                        continue;
                    }
                    allFormData.append(key, formData[key]);
                }

                formData.suitableFor?.forEach(val => {
                    allFormData.append('suitableFor[]', val);
                });

                formData.ingredients?.forEach((ing, index) => {
                    allFormData.append(`ingredients[${index}][name]`, ing.name);
                    allFormData.append(`ingredients[${index}][qty]`, ing.qty);
                });

                formData.images?.forEach((img) => {
                    allFormData.append("images", img);
                });
                allFormData.append('userid' , userid);
                dispatch(createItem(allFormData)); 
            }
        }
    }

    function changeHandle(e){
        e.preventDefault();
        const newFiles = Array.from(e.target.files);

        const uploadedFiles = [...formData.images, ...newFiles];
        setFormData((prev)=>({
            ...prev,
            images:uploadedFiles
        }))

        const newPreviews = newFiles.map(file => URL.createObjectURL(file));
        setPreviews(prev => [...prev, ...newPreviews]);
    }

    function handleSuitableChange(e){
        const {value , checked} = e.target;
        setFormData((prev) => ({
            ...prev,
            suitableFor : checked ? [...prev.suitableFor , value] : prev.suitableFor.filter((v)=> v !== value)
        }))
    }
    function handleIngredientsChange(e,val){
        const { value, checked} = e.target;
        setFormData((prev)=>({
            ...prev,
            ingredients: checked ? [...prev.ingredients , {name: value,qty:val}] : prev.ingredients.filter((v)=> v.name !== value)
        }))
    }

    function handleAmt(e, ele) {
        setFormData((prev) => ({
            ...prev,
            ingredients: prev.ingredients.map((ingredient) =>
                ingredient.name === ele
                    ? { ...ingredient, qty: e.target.value }
                    : ingredient
            )
        }));
    }
    function handleAmtBtn(e,val, ele) {
        e.preventDefault();
        setFormData((prev) => ({
            ...prev,
            ingredients: prev.ingredients.map((ingredient) =>
                ingredient.name === ele
                    ? { ...ingredient, qty: Number(ingredient.qty) + Number(val) >= Math.abs(val) ? Number(ingredient.qty) + Number(val) : ingredient.qty}
                    : ingredient
            )
        }));
    }

  return (
    <div className='w-full h-auto flex justify-center'>
        <div className='w-[50%] bg-white border-2 p-4 my-4 h-auto'>
            <h1 className='text-center text-3xl text-slate-700 py-4'>Add New Item</h1>
            <form className='w-full h-auto flex flex-col gap-4' onSubmit={submitHandler}>
                <div className='w-full h-auto p-2'> 
                    <div className='w-full h-auto my-2'>
                        <label><strong>Food Type</strong></label>
                        <div className='w-full  flex flex-wrap'>
                            <div className='w-[50%] md:w-[25%] h-8 flex items-center gap-2'>
                                <input type='radio' required name='foodtype' onChange={formHandler} id='veg' checked={formData.foodtype === 'veg'}  value='veg' className='h-8 accent-green-500'></input>
                                <label htmlFor='veg'>Veg</label>
                            </div>
                            <div className='w-[50%] md:w-[25%] h-8 flex items-center gap-2'>
                                <input type='radio' required name='foodtype' onChange={formHandler} id='non-veg' checked={formData.foodtype === 'non-veg'}   value='non-veg' className='h-8 accent-green-500'></input>
                                <label htmlFor='non-veg'>Non-Veg</label>
                            </div> 
                            <div className='w-[50%] md:w-[25%] h-8 flex items-center gap-2'>
                                <input type='radio' required name='foodtype' onChange={formHandler} id='vegan' checked={formData.foodtype === 'vegan'}   value='vegan' className='h-8 accent-green-500'></input>
                                <label htmlFor='vegan'>Vegan</label>
                            </div>
                            <div className='w-[50%] md:w-[25%] h-8 flex items-center gap-2'>
                                <input type='radio' required name='foodtype' onChange={formHandler} id='eggetarian' checked={formData.foodtype === 'eggetarian'}   value='eggetarian' className='h-8 accent-green-500'></input>
                                <label htmlFor='eggetarian'>Eggetarian</label>
                            </div>
                        </div>
                    </div>
                    <div className='w-full h-auto my-2'>
                        <label><strong>Suitable For</strong></label>
                        <div className='w-full'>
                            <div className='w-[50%] md:w-[25%] h-8 flex items-center gap-2'>
                                <input type='checkbox'  name='suitable' onChange={handleSuitableChange} checked={formData.suitableFor?.includes("children")} id='children'  value='children' className='h-8 accent-green-300'></input>
                                <label htmlFor='children'>Children</label>
                            </div>
                            <div className='w-[50%] md:w-[25%] h-8 flex items-center gap-2'>
                                <input type='checkbox' name='suitable' onChange={handleSuitableChange}  checked={formData.suitableFor?.includes("adults")} id='adults'  value='adults' className='h-8 accent-green-300'></input>
                                <label htmlFor='adults'>Adults</label>
                            </div> 
                            <div className='w-[50%] md:w-[25%] h-8 flex items-center gap-2'>
                                <input type='checkbox' name='suitable' onChange={handleSuitableChange} checked={formData.suitableFor?.includes("elderly")} id='elderly'  value='elderly' className='h-8 accent-green-300'></input>
                                <label htmlFor='elderly'>Elderly</label>
                            </div>
                        </div>
                    </div>
                    <label><strong>Item Name</strong></label>
                    <input type='text' required name='item_name' value={formData.item_name} placeholder='Item Name' onChange={formHandler}
                    className=' my-2 w-full p-2 rounded-md border border-slate-400 focus:outline-none focus:border-slate-600'/>
                    <label><strong>Item ID</strong></label>
                    <input type='number' maxLength={4} required name='item_id' value={formData.item_id} placeholder='Item Id' onChange={formHandler}
                    className=' my-2 w-full p-2 rounded-md border border-slate-400 focus:outline-none focus:border-slate-600'/>
                    <label><strong>Price On Menu: </strong></label>
                    <input type='number' required name='price' value={formData.price} placeholder='Price' onChange={formHandler}
                    className='my-2 w-full p-2 rounded-md border border-slate-400 focus:outline-none focus:border-slate-600'/>
                    <label><strong>Discount on Menu Price</strong></label>
                    <select name='discount' required  onChange={formHandler} className=' my-2 w-full h-[40px] border outline-none rounded-md'>
                        <option value='0'>No Discount</option>
                        <option value='10'>10%</option>
                        <option value='20'>20%</option>
                        <option value='30'>30%</option>
                        <option value='40'>40%</option>
                        <option value='50'>50%</option>
                    </select>
                    <label><strong>Quantity: </strong></label>
                    <div className='w-full flex gap-2 my-2'>
                        <div className='w-1/2'>
                            <label>One Bowl</label>
                            <input type='number' required name='amount' value={formData.amount} placeholder='Volume or Weight' onChange={formHandler}
                            className='w-full p-2 rounded-md border border-slate-400 focus:outline-none focus:border-slate-600'/>
                        </div>
                        <div className='w-1/2'>
                            <label>Number Bowl</label>
                            <input type='number' required name='quantity' value={formData.quantity} placeholder='Number' onChange={formHandler}
                            className='w-full p-2 rounded-md border border-slate-400 focus:outline-none focus:border-slate-600'/>
                        </div>
                    </div>
                    <label><strong>Description</strong></label>
                    <textarea name='description' value={formData.description} required placeholder='Description ' onChange={formHandler}
                        className='w-full my-2 p-2 rounded-md border border-slate-400 focus:outline-none focus:border-slate-600'/>
                    
                   {!edit && <div className='w-full flex gap-2 my-2'>
                        <label><strong>Image</strong></label>
                        <input type='file' required multiple  className='w-[30%] p-2 rounded-md border border-slate-400 focus:outline-none focus:border-slate-600' onChange={changeHandle}/>
                        <div className='w-full my-2 h-auto flex items-center justify-start gap-2 '>
                            {previews.map((view, index) =>(
                                    <img src={view} key={index} alt='preview' className='w-[80px] h-[60px] object-cover'/>
                            ))}
                        </div>
                    </div>}
                    
                </div>
                <div className='w-full'>
                    <div className='w-full py-2'>
                        <div className='w-full h-auto my-2'>
                            <label><strong>Masala Type</strong></label>
                            <div className='w-full  flex flex-wrap'>
                                <div className='w-[50%] md:w-[25%] h-8 flex items-center gap-2'>
                                    <input type='radio' required name='masalaType' onChange={formHandler} id='mild'  value='mild' checked={formData.masalaType === 'mild'} className='h-8 accent-green-500'></input>
                                    <label htmlFor='veg'>Mild</label>
                                </div>
                                <div className='w-[50%] md:w-[25%] h-8 flex items-center gap-2'>
                                    <input type='radio' required name='masalaType' onChange={formHandler} id='medium'  value='medium' checked={formData.masalaType === 'medium'} className='h-8 accent-green-500'></input>
                                    <label htmlFor='medium'>Medium</label>
                                </div> 
                                <div className='w-[50%] md:w-[25%] h-8 flex items-center gap-2'>
                                    <input type='radio' required name='masalaType' onChange={formHandler} id='spicy'  value='spicy' checked={formData.masalaType === 'spicy'} className='h-8 accent-green-500'></input>
                                    <label htmlFor='spicy'>Spicy</label>
                                </div>
                                <div className='w-[50%] md:w-[25%] h-8 flex items-center gap-2'>
                                    <input type='radio' required name='masalaType' onChange={formHandler} id='extra_spicy'  value='extra_spicy' checked={formData.masalaType === 'extra_spicy'} className='h-8 accent-green-500'></input>
                                    <label htmlFor='extra_spicy'>Extra Spicy</label>
                                </div>
                            </div>
                        </div>
                        <div className='w-full mb-4'>
                            <label><strong>Ingredients: </strong></label>
                            <div className='w-full py-2 flex flex-col gap-2'>
                                <div className=' relative w-full h-auto border rounded-lg grid grid-cols-2  sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 auto-rows-[25px] gap-2 py-3 px-1'>
                                    <span className="absolute -top-2 left-4 bg-white px-2 text-sm font-medium">
                                        Grains
                                    </span>
                                    {grains?.map((ele,index)=>(
                                        <div key={index} className={`flex flex-col   px-1 ${ formData.ingredients?.some(item => item.name?.toLowerCase() === ele?.toLowerCase()) ? 'row-span-2 border border-green-400': 'row-span-1'}`}>
                                            <div className='flex items-center w-full gap-2 h-[25px]'>
                                                <input type='checkbox' name='ingredients' id='fish' onChange={(e)=> handleIngredientsChange(e,100)} checked={formData.ingredients?.some(item => item.name?.toLowerCase() === ele?.toLowerCase())}  value={`${ele}`} className=' h-[25px] accent-green-300'></input>
                                                <label className=' text-[10px] md:text-[12px] ' htmlFor='fish'>{ele}</label>
                                            </div>
                                            { formData.ingredients?.some(item => item.name?.toLowerCase() === ele?.toLowerCase()) && 
                                                <div className='w-full flex gap-[2px]'>
                                                    <button className='border w-[25px] text-[10px] rounded-md ' onClick={(e)=> handleAmtBtn(e,-10,ele)}>-10</button>
                                                    <input className=' w-[30px] h-[25px] focus:outline-none bg-gray-200 p-[1px] text-[14px]' name='amt' value={formData.ingredients[formData.ingredients.findIndex(v => v.name === ele)].qty} type='number' onChange={(e)=> handleAmt(e,ele)}></input>g                                                 
                                                    <button className='border w-[25px] text-[10px] rounded-md ' onClick={(e)=> handleAmtBtn(e,10,ele)}>+10</button>
                                                </div>
                                            }                                            
                                        </div>
                                    ))}
                                </div>
                                <div className=' relative w-full h-auto border rounded-lg grid grid-cols-2 auto-rows-[25px] sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 py-3 px-1'>
                                    <span className="absolute -top-2 left-4 bg-white px-2 text-sm font-medium">
                                        Pulses
                                    </span>
                                    {pulses?.map((ele,index)=>(
                                        <div key={index} className={`flex flex-col   px-1 ${ formData.ingredients?.some(item => item.name?.toLowerCase() === ele?.toLowerCase()) ? 'row-span-2 border border-green-400': 'row-span-1'}`}>
                                            <div className='flex items-center w-full gap-2 h-[25px]'>
                                                <input type='checkbox' name='ingredients' id='fish' onChange={(e)=> handleIngredientsChange(e,100)} checked={formData.ingredients?.some(item => item.name?.toLowerCase() === ele?.toLowerCase())}  value={`${ele}`} className=' h-[25px] accent-green-300'></input>
                                                <label className=' text-[10px] md:text-[12px] ' htmlFor='fish'>{ele}</label>
                                            </div>
                                            { formData.ingredients?.some(item => item.name?.toLowerCase() === ele?.toLowerCase()) && 
                                                <div className='w-full flex gap-[2px]'>
                                                    <button className='border w-[25px] text-[10px] rounded-md ' onClick={(e)=> handleAmtBtn(e,-10,ele)}>-10</button>
                                                    <input className=' w-[30px] h-[25px] focus:outline-none bg-gray-200 p-[1px] text-[14px]' value={formData.ingredients[formData.ingredients.findIndex(v => v.name === ele)].qty} type='number' onChange={(e)=> handleAmt(e,ele)}></input>g                                                 
                                                    <button className='border w-[25px] text-[10px] rounded-md ' onClick={(e)=> handleAmtBtn(e,10,ele)}>+10</button>
                                                </div>
                                            }                                            
                                        </div>
                                    ))}
                                </div>
                                <div className=' relative w-full h-auto border rounded-lg grid grid-cols-2 auto-rows-[25px] sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 py-3 px-1'>
                                    <span className="absolute -top-2 left-4 bg-white px-2 text-sm font-medium">
                                        Vegetables
                                    </span>
                                    {vegetables?.map((ele,index)=>(
                                        <div key={index} className={`flex flex-col   px-1 ${ formData.ingredients?.some(item => item.name?.toLowerCase() === ele?.toLowerCase()) ? 'row-span-2 border border-green-400': 'row-span-1'}`}>
                                            <div className='flex items-center w-full gap-2 h-[25px]'>
                                                <input type='checkbox' name='ingredients' id='fish' onChange={(e)=> handleIngredientsChange(e,100)} checked={formData.ingredients?.some(item => item.name?.toLowerCase() === ele?.toLowerCase())}  value={`${ele}`} className=' h-[25px] accent-green-300'></input>
                                                <label className=' text-[10px] md:text-[12px] ' htmlFor='fish'>{ele}</label>
                                            </div>
                                            { formData.ingredients?.some(item => item.name?.toLowerCase() === ele?.toLowerCase()) && 
                                                <div className='w-full flex gap-[2px]'>
                                                    <button className='border w-[25px] text-[10px] rounded-md ' onClick={(e)=> handleAmtBtn(e,-10,ele)}>-10</button>
                                                    <input className=' w-[30px] h-[25px] focus:outline-none bg-gray-200 p-[1px] text-[14px]' value={formData.ingredients[formData.ingredients.findIndex(v => v.name === ele)].qty} type='number' onChange={(e)=> handleAmt(e,ele)}></input>g                                                 
                                                    <button className='border w-[25px] text-[10px] rounded-md ' onClick={(e)=> handleAmtBtn(e,10,ele)}>+10</button>
                                                </div>
                                            }                                            
                                        </div>
                                    ))}
                                </div>
                                <div className=' relative w-full h-auto border rounded-lg grid grid-cols-2 auto-rows-[25px] sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 py-3 px-1'>
                                    <span className="absolute -top-2 left-4 bg-white px-2 text-sm font-medium">
                                        Fruits
                                    </span>
                                    {fruits?.map((ele,index)=>(
                                        <div key={index} className={`flex flex-col   px-1 ${ formData.ingredients?.some(item => item.name?.toLowerCase() === ele?.toLowerCase()) ? 'row-span-2 border border-green-400': 'row-span-1'}`}>
                                            <div className='flex items-center w-full gap-2 h-[25px]'>
                                                <input type='checkbox' name='ingredients' id='fish' onChange={(e)=> handleIngredientsChange(e,100)} checked={formData.ingredients?.some(item => item.name?.toLowerCase() === ele?.toLowerCase())}  value={`${ele}`} className=' h-[25px] accent-green-300'></input>
                                                <label className=' text-[10px] md:text-[12px] ' htmlFor='fish'>{ele}</label>
                                            </div>
                                            { formData.ingredients?.some(item => item.name?.toLowerCase() === ele?.toLowerCase()) && 
                                                <div className='w-full flex gap-[2px]'>
                                                    <button className='border w-[25px] text-[10px] rounded-md ' onClick={(e)=> handleAmtBtn(e,-10,ele)}>-10</button>
                                                    <input className=' w-[30px] h-[25px] focus:outline-none bg-gray-200 p-[1px] text-[14px]' value={formData.ingredients[formData.ingredients.findIndex(v => v.name === ele)].qty} type='number' onChange={(e)=> handleAmt(e,ele)}></input>g                                                 
                                                    <button className='border w-[25px] text-[10px] rounded-md ' onClick={(e)=> handleAmtBtn(e,10,ele)}>+10</button>
                                                </div>
                                            }                                            
                                        </div>
                                    ))}
                                </div>
                                <div className=' relative w-full h-auto border rounded-lg grid grid-cols-2 auto-rows-[25px] sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 py-3 px-1'>
                                    <span className="absolute -top-2 left-4 bg-white px-2 text-sm font-medium">
                                        DairyProducts 
                                    </span>
                                    {dairyProducts?.map((ele,index)=>(
                                        <div key={index} className={`flex flex-col   px-1 ${ formData.ingredients?.some(item => item.name?.toLowerCase() === ele?.toLowerCase()) ? 'row-span-2 border border-green-400': 'row-span-1'}`}>
                                            <div className='flex items-center w-full gap-2 h-[25px]'>
                                                <input type='checkbox' name='ingredients' id='fish' onChange={(e)=> handleIngredientsChange(e,50)} checked={formData.ingredients?.some(item => item.name?.toLowerCase() === ele?.toLowerCase())}  value={`${ele}`} className=' h-[25px] accent-green-300'></input>
                                                <label className='text-[10px] md:text-[12px] ' htmlFor='fish'>{ele}</label>
                                            </div>
                                            { formData.ingredients?.some(item => item.name?.toLowerCase() === ele?.toLowerCase()) && 
                                                <div className='w-full flex gap-[2px]'>
                                                    <button className='border w-[25px] text-[10px] rounded-md ' onClick={(e)=> handleAmtBtn(e,-5,ele)}>-5</button>
                                                    <input className=' w-[30px] h-[25px] focus:outline-none bg-gray-200 p-[1px] text-[14px]' value={formData.ingredients[formData.ingredients.findIndex(v => v.name === ele)].qty} type='number' onChange={(e)=> handleAmt(e,ele)}></input>g                                                 
                                                    <button className='border w-[25px] text-[10px] rounded-md ' onClick={(e)=> handleAmtBtn(e,5,ele)}>+5</button>
                                                </div>
                                            }                                            
                                        </div>
                                    ))}
                                </div>
                                <div className=' relative w-full h-auto border rounded-lg grid grid-cols-2 auto-rows-[25px] sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 py-3 px-1'>
                                    <span className="absolute -top-2 left-4 bg-white px-2 text-sm font-medium">
                                        Spices
                                    </span>
                                    {spices?.map((ele,index)=>(
                                        <div key={index} className={`flex flex-col   px-1 ${ formData.ingredients?.some(item => item.name?.toLowerCase() === ele?.toLowerCase()) ? 'row-span-2 border border-green-400': 'row-span-1'}`}>
                                            <div className='flex items-center w-full gap-2 h-[25px]'>
                                                <input type='checkbox' name='ingredients' id='fish' onChange={(e)=> handleIngredientsChange(e,30)} checked={formData.ingredients?.some(item => item.name?.toLowerCase() === ele?.toLowerCase())}  value={`${ele}`} className=' h-[25px] accent-green-300'></input>
                                                <label className=' text-[10px] md:text-[12px] ' htmlFor='fish'>{ele}</label>
                                            </div>
                                            { formData.ingredients?.some(item => item.name?.toLowerCase() === ele?.toLowerCase()) && 
                                                <div className='w-full flex gap-[2px]'>
                                                    <button className='border w-[25px] text-[10px] rounded-md ' onClick={(e)=> handleAmtBtn(e,-3,ele)}>-3</button>
                                                    <input className=' w-[30px] h-[25px] focus:outline-none bg-gray-200 p-[1px] text-[14px]' value={formData.ingredients[formData.ingredients.findIndex(v => v.name === ele)].qty} type='number' onChange={(e)=> handleAmt(e,ele)}></input>g                                                 
                                                    <button className='border w-[25px] text-[10px] rounded-md ' onClick={(e)=> handleAmtBtn(e,3,ele)}>+3</button>
                                                </div>
                                            }                                            
                                        </div>
                                    ))}
                                </div>
                                <div className=' relative w-full h-auto border rounded-lg grid grid-cols-2 auto-rows-[25px] sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 py-3 px-1'>
                                    <span className="absolute -top-2 left-4 bg-white px-2 text-sm font-medium">
                                        Oils
                                    </span>
                                    {oils?.map((ele,index)=>(
                                        <div key={index} className={`flex flex-col   px-1 ${ formData.ingredients?.some(item => item.name?.toLowerCase() === ele?.toLowerCase()) ? 'row-span-2 border border-green-400': 'row-span-1'}`}>
                                            <div className='flex items-center w-full gap-2 h-[25px]'>
                                                <input type='checkbox' name='ingredients' id='fish' onChange={(e)=> handleIngredientsChange(e,30)} checked={formData.ingredients?.some(item => item.name?.toLowerCase() === ele?.toLowerCase())}  value={`${ele}`} className=' h-[25px] accent-green-300'></input>
                                                <label className=' text-[10px] md:text-[12px] ' htmlFor='fish'>{ele}</label>
                                            </div>
                                            { formData.ingredients?.some(item => item.name?.toLowerCase() === ele?.toLowerCase()) && 
                                                <div className='w-full flex gap-[2px]'>
                                                    <button className='border w-[25px] text-[10px] rounded-md ' onClick={(e)=> handleAmtBtn(e,-3,ele)}>-3</button>
                                                    <input className=' w-[30px] h-[25px] focus:outline-none bg-gray-200 p-[1px] text-[14px]' value={formData.ingredients[formData.ingredients.findIndex(v => v.name === ele)].qty} type='number' onChange={(e)=> handleAmt(e,ele)}></input>g                                                 
                                                    <button className='border w-[25px] text-[10px] rounded-md ' onClick={(e)=> handleAmtBtn(e,3,ele)}>+3</button>
                                                </div>
                                            }                                            
                                        </div>
                                    ))}
                                </div>
                                <div className=' relative w-full h-auto border rounded-lg grid grid-cols-2 auto-rows-[25px] sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 py-3 px-1'>
                                    <span className="absolute -top-2 left-4 bg-white px-2 text-sm font-medium">
                                        OtherItems
                                    </span>
                                    {otherItems?.map((ele,index)=>(
                                        <div key={index} className={`flex flex-col   px-1 ${ formData.ingredients?.some(item => item.name?.toLowerCase() === ele?.toLowerCase()) ? 'row-span-2 border border-green-400': 'row-span-1'}`}>
                                            <div className='flex items-center w-full gap-2 h-[25px]'>
                                                <input type='checkbox' name='ingredients' id='fish' onChange={(e)=> handleIngredientsChange(e,50)} checked={formData.ingredients?.some(item => item.name?.toLowerCase() === ele?.toLowerCase())}  value={`${ele}`} className=' h-[25px] accent-green-300'></input>
                                                <label className=' text-[10px] md:text-[12px] ' htmlFor='fish'>{ele}</label>
                                            </div>
                                            { formData.ingredients?.some(item => item.name?.toLowerCase() === ele?.toLowerCase()) && 
                                                <div className='w-full flex gap-[2px]'>
                                                    <button className='border w-[25px] text-[10px] rounded-md ' onClick={(e)=> handleAmtBtn(e,-5,ele)}>-5</button>
                                                    <input className=' w-[30px] h-[25px] focus:outline-none bg-gray-200 p-[1px] text-[14px]' value={formData.ingredients[formData.ingredients.findIndex(v => v.name === ele)].qty} type='number' onChange={(e)=> handleAmt(e,ele)}></input>g                                                 
                                                    <button className='border w-[25px] text-[10px] rounded-md ' onClick={(e)=> handleAmtBtn(e,5,ele)}>+5</button>
                                                </div>
                                            }                                            
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <button type='submit'  className='w-full h-12 text-white bg-green-500 rounded-md hover:bg-green-600'>Submit</button>
                </div>
            </form>
            {isLoader && <Loader></Loader>}
        </div>
    </div>
  )
}

export default AdditemForm;