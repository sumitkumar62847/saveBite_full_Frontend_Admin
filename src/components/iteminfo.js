import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteitem, itemLive } from "../Slices/ItemUpload";
import { getitems } from "../Slices/ItemUpload.js";
import DealTime from "./DealTime.js";
import { useNavigate } from "react-router-dom";
import { editItemId, getEditItem } from "../Slices/ItemEdit.js";

const initialState = {
  hours: "",
  minutes: "",
};

function Iteminfo({ item }) {
  const [hours, setHours] = useState(initialState);
  const [minutes, setMinutes] = useState(initialState);
  const dispatch = useDispatch();
  const liveuntiltime = new Date(item.LiveUntil);
  let userid = localStorage.getItem("idtity");
  const liveform = useRef(null);
  const navigate = useNavigate();

  function livehandle(e) {
    e.preventDefault();
    liveform.current.style.display =
      liveform.current.style.display === "none" ? "block" : "none";
  }

  function submitHandler(e, id) {
    e.preventDefault();
    let totalTime = hours * 60 + minutes * 1;
    dispatch(itemLive({ id, ltime: totalTime }));
    setTimeout(() => {
      dispatch(getitems({ userid }));
    }, 500);
    liveform.current.style.display =
      liveform.current.style.display === "none" ? "block" : "none";
  }

  // function changeHandler(e){
  //   e.preventDefault();
  //   setTime({...time, [e.target.name]:e.target.value})
  // }

  function editHandle(e) {
    e.preventDefault();
    dispatch(editItemId(item._id));
    dispatch(getEditItem({ itemid: item._id }));
    navigate("/edit");
  }
  return (
    <div
      key={item._id}
      className="
    relative bg-slate-100 border rounded-lg
    flex flex-col
    w-full h-full
    overflow-hidden
  "
    >
      <img
        src={item.imageUrl[0]}
        alt=""
        className="
      w-full aspect-square
      object-contain bg-white
    "
      />

      <div className="flex flex-col gap-1 p-3 text-xs sm:text-sm">
        <p className="font-semibold truncate">{item.item_name}</p>

        <p>
          Price:
          <span className="font-medium"> {item.price} Rs </span>
          <label className="text-gray-500">({item.discount}%)</label>
        </p>

        <p className="text-red-500 text-xs">
          <DealTime liveTime={liveuntiltime} />
        </p>

        <p className="text-xs">
          Status: <span className="font-medium">Available</span>
        </p>

        <p className="text-xs">
          Quantity: <span className="font-medium">{item.quantity}</span>
        </p>
      </div>

      <button
        disabled={item.isLiveed}
        onClick={editHandle}
        className="
      absolute top-2 right-2
      px-3 py-1 text-xs
      bg-green-200 rounded-md
      hover:bg-green-300
      disabled:bg-slate-400
    "
      >
        Edit
      </button>

      <div className="mt-auto p-3 flex flex-col sm:flex-row gap-2">
        <button
          onClick={livehandle}
          disabled={item.isLiveed}
          className="
        w-full px-3 py-2 text-xs sm:text-sm
        text-white bg-green-500 rounded-md
        hover:bg-green-600
        disabled:bg-slate-400
      "
        >
          Live
        </button>

        <button
          disabled={item.isLiveed}
          onClick={() => {
            dispatch(deleteitem({ id: item._id }));
            setTimeout(() => {
              dispatch(getitems({ userid }));
            }, 500);
          }}
          className="
        w-full px-3 py-2 text-xs sm:text-sm
        text-white bg-red-400 rounded-md
        hover:bg-red-500
        disabled:bg-slate-400
      "
        >
          Delete
        </button>
      </div>

      <div
        style={{ display: "none" }}
        ref={liveform}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
      >
        <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
          <h2 className="mb-6 text-center text-lg sm:text-xl font-semibold">
            Set Time to Live
          </h2>

          <div className="flex items-center justify-center gap-3 mb-6">
            <input
              type="number"
              min="0"
              max="3"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              className="w-20 rounded-lg border text-center text-2xl font-bold focus:border-green-500"
            />
            <span className="text-2xl font-bold">:</span>
            <input
              type="number"
              min="0"
              max="59"
              value={minutes}
              onChange={(e) => setMinutes(e.target.value)}
              className="w-20 rounded-lg border text-center text-2xl font-bold focus:border-green-500"
            />
          </div>

          <p className="mb-6 text-center text-sm text-gray-500">
            Hours : Minutes
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={(e) => submitHandler(e, item._id)}
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
  );
}

export default Iteminfo;
