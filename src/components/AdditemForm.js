import React, { useState,useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from'react-router-dom';
import { createItem } from '../Slices/ItemUpload.js';
import Loader from './Loader.js';

const initialState ={
    foodtype: "",
    suitableFor: [],
    item_name: "",
    price: "",
    discount: "",
    amount:"",
    quantity: "",
    description: "",
    images: [],               
    allergens: [],
    masalaType: "",
    ingredients: [{name:"", qty:""}]
}

function AdditemForm() {
    const [formData, setFormData] = useState(initialState);
    const [previews, setPreviews] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isUploaded = useSelector((state)=> state.items.isUploaded);
    const isLoader = useSelector((state)=> state.items.isLoader);
    let userid = useSelector((state)=> state.admin.userid);
    if(!userid){
        userid = localStorage.getItem('idtity');
    }

    function formHandler(e){
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    useEffect(()=>{
        if(isUploaded && !isLoader){
            navigate('/')
        }
    },[isUploaded, navigate, isLoader])

    function submitHandler(e){
         e.preventDefault();
        if(!e.target.checkValidity()){
            alert('Please fill in required fields');
            return;
        }else{
            const allFormData = new FormData();
            for (let key in formData) {
                if (key === 'images' || key === 'suitableFor' || key === 'allergens' || key === 'ingredients') {
                    continue;
                }
                allFormData.append(key, formData[key]);
            }

            formData.suitableFor?.forEach(val => {
                allFormData.append('suitableFor[]', val);
            });

            formData.allergens?.forEach(val => {
                allFormData.append('allergens[]', val);
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
    function addIngredient(e){
        e.preventDefault();
        setFormData((prev)=>({
            ...prev,
            ingredients:[...prev.ingredients,{ name: "", qty: "" }]
        }))
    }

    function handleIngredients(index,e){
        const {name,value} = e.target;
        const updatedIngredients = [...formData.ingredients];
        updatedIngredients[index][name] = value;
        setFormData((prev)=>({
            ...prev,
            ingredients:updatedIngredients
        }))  
    }

    function handleSuitableChange(e){
        const {value , checked} = e.target;
        setFormData((prev) => ({
            ...prev,
            suitableFor : checked ? [...prev.suitableFor , value] : prev.suitableFor.filter((v)=> v !== value)
        }))
    }
    function handleAllerangeChange(e){
        const { value, checked} = e.target;
        setFormData((prev)=>({
            ...prev,
            allergens: checked ? [...prev.allergens , value] : prev.allergens.filter((v)=> v !== value)
        }))
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
                                <input type='radio' required name='foodtype' onChange={formHandler} id='veg'  value='veg' className='h-8 accent-green-500'></input>
                                <label htmlFor='veg'>Veg</label>
                            </div>
                            <div className='w-[50%] md:w-[25%] h-8 flex items-center gap-2'>
                                <input type='radio' required name='foodtype' onChange={formHandler} id='non-veg'  value='non-veg' className='h-8 accent-green-500'></input>
                                <label htmlFor='non-veg'>Non-Veg</label>
                            </div> 
                            <div className='w-[50%] md:w-[25%] h-8 flex items-center gap-2'>
                                <input type='radio' required name='foodtype' onChange={formHandler} id='vegan'  value='vegan' className='h-8 accent-green-500'></input>
                                <label htmlFor='vegan'>Vegan</label>
                            </div>
                            <div className='w-[50%] md:w-[25%] h-8 flex items-center gap-2'>
                                <input type='radio' required name='foodtype' onChange={formHandler} id='eggetarian'  value='eggetarian' className='h-8 accent-green-500'></input>
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
                    <input type='text' required name='item_name' placeholder='Item Name' onChange={formHandler}
                    className=' my-2 w-full p-2 rounded-md border border-slate-400 focus:outline-none focus:border-slate-600'/>
                    <label><strong>Price On Menu: </strong></label>
                    <input type='number' required name='price' placeholder='Price' onChange={formHandler}
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
                            <input type='number' required name='amount' placeholder='Volume or Weight' onChange={formHandler}
                            className='w-full p-2 rounded-md border border-slate-400 focus:outline-none focus:border-slate-600'/>
                        </div>
                        <div className='w-1/2'>
                            <label>Number Bowl</label>
                            <input type='number' required name='quantity' placeholder='Number' onChange={formHandler}
                            className='w-full p-2 rounded-md border border-slate-400 focus:outline-none focus:border-slate-600'/>
                        </div>
                    </div>
                    <label><strong>Description</strong></label>
                    <textarea name='description' required placeholder='Description ' onChange={formHandler}
                        className='w-full my-2 p-2 rounded-md border border-slate-400 focus:outline-none focus:border-slate-600'/>
                    <label><strong>Image</strong></label>
                    <input type='file' required multiple  className='w-[30%] p-2 rounded-md border border-slate-400 focus:outline-none focus:border-slate-600' onChange={changeHandle}/>
                    <div className='w-full my-2 h-auto flex items-center justify-start gap-2 '>
                        {previews.map((view, index) =>(
                                <img src={view} key={index} alt='preview' className='w-[80px] h-[60px] object-cover'/>
                        ))}
                    </div>
                </div>
                <div className='w-full'>
                    <div className='w-full py-2'>
                        <div className='w-full'>
                            <label><strong>Allergens: </strong></label>
                            <div className='w-[50%] md:w-[25%] h-8 flex items-center gap-2'>
                                <input type='checkbox' name='allergens' id='nuts' onChange={handleAllerangeChange} checked={formData.allergens.includes("nuts")}  value='nuts' className='h-8 accent-green-300'></input>
                                <label htmlFor='nuts'>Nuts</label>
                            </div>
                            <div className='w-[50%] md:w-[25%] h-8 flex items-center gap-2'>
                                <input type='checkbox' name='allergens' id='dairy' onChange={handleAllerangeChange} checked={formData.allergens.includes("dairy")}  value='dairy' className='h-8 accent-green-300'></input>
                                <label htmlFor='dairy'>Dairy</label>
                            </div> 
                            <div className='w-[50%] md:w-[25%] h-8 flex items-center gap-2'>
                                <input type='checkbox'  name='allergens' id='gluten' onChange={handleAllerangeChange} checked={formData.allergens.includes("gluten")}  value='gluten' className='h-8 accent-green-300'></input>
                                <label htmlFor='gluten'>Gluten</label>
                            </div>
                            <div className='w-[50%] md:w-[25%] h-8 flex items-center gap-2'>
                                <input type='checkbox'  name='allergens' id='soy' onChange={handleAllerangeChange} checked={formData.allergens.includes("soy")}  value='soy' className='h-8 accent-green-300'></input>
                                <label htmlFor='soy'>Soy</label>
                            </div>
                            <div className='w-[50%] md:w-[25%] h-8 flex items-center gap-2'>
                                <input type='checkbox'  name='allergens' id='fish' onChange={handleAllerangeChange} checked={formData.allergens.includes("fish")}  value='fish' className='h-8 accent-green-300'></input>
                                <label htmlFor='fish'>Fish</label>
                            </div>
                        </div>
                        <div className='w-full h-auto my-2'>
                            <label><strong>Masala Type</strong></label>
                            <div className='w-full  flex flex-wrap'>
                                <div className='w-[50%] md:w-[25%] h-8 flex items-center gap-2'>
                                    <input type='radio' required name='masalaType' onChange={formHandler} id='mild'  value='mild' className='h-8 accent-green-500'></input>
                                    <label htmlFor='veg'>Mild</label>
                                </div>
                                <div className='w-[50%] md:w-[25%] h-8 flex items-center gap-2'>
                                    <input type='radio' required name='masalaType' onChange={formHandler} id='medium'  value='medium' className='h-8 accent-green-500'></input>
                                    <label htmlFor='medium'>Medium</label>
                                </div> 
                                <div className='w-[50%] md:w-[25%] h-8 flex items-center gap-2'>
                                    <input type='radio' required name='masalaType' onChange={formHandler} id='spicy'  value='spicy' className='h-8 accent-green-500'></input>
                                    <label htmlFor='spicy'>Spicy</label>
                                </div>
                                <div className='w-[50%] md:w-[25%] h-8 flex items-center gap-2'>
                                    <input type='radio' required name='masalaType' onChange={formHandler} id='extra_spicy'  value='extra_spicy' className='h-8 accent-green-500'></input>
                                    <label htmlFor='extra_spicy'>Extra Spicy</label>
                                </div>
                            </div>
                        </div>
                        <div className='w-full mb-4'>
                            <label><strong>Ingredients: </strong></label>
                            <div className='w-full border p-1'>
                                {formData.ingredients?.map((ele,index)=>(
                                    <div key={index} className='w-full flex py-1'>
                                        <div className='w-1/2'>
                                            <label className=''>Name: </label>
                                            <input type='text' required onChange={(e)=> handleIngredients(index, e)} value={ele.name} name='name' placeholder='ex - paneer' className='border rounded-md focus:outline-none p-[2px] focus:border-slate-600'></input>
                                        </div>
                                        <div className='w-1/2'>
                                            <label>Amount: </label>
                                            <input type='number' required onChange={(e)=> handleIngredients(index, e)}  value={ele.qty} name='qty' placeholder='ex - 22g' className='border rounded-md focus:outline-none p-[2px] focus:border-slate-600'></input>
                                        </div>
                                    </div>
                                ))}
                                <div className='w-full flex items-center justify-center'>
                                    <button onClick={addIngredient} className='w-[130px] px-2 my-2 h-8 text-center text-white bg-green-400 rounded-md hover:bg-green-600'>Add Ingredient</button>
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