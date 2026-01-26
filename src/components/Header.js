import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../logo.png";
import "./AllComponent.css";
import { useDispatch, useSelector } from "react-redux";
import userIcon from "../images/userImageIcon.png";
import { setMlItems } from "../Slices/RegisterSlice";

function Header() {
  const restInfo = useSelector((state) => state.restaurant.restinfo);
  const userinfo = useSelector((state) => state.admin.userinfo);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  function predictionClick(e) {
    e.preventDefault();
    dispatch(setMlItems());
    navigate("/prediction");
  }

  return (
    <header className="w-full sm:h-[90px] h-[140px] ">
      <nav
        className="
        fixed top-0 z-50
        w-full
        p-4
        flex flex-col items-center justify-between
        bg-white/90 backdrop-blur-xl
        border-b border-green-200
        shadow-md
      "
      >
        <main className="w-full flex items-center justify-between ">
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img
            src={logo}
            alt="logo"
            className="w-[60px] hover:scale-105 transition"
          />
          <div className="leading-tight">
            <p className="text-2xl font-extrabold text-green-500">
              SAVE<span className="text-orange-400">BITE</span>
            </p>
            <p className="text-xs text-gray-500">
              Restaurant Dashboard
            </p>
          </div>
        </div>

        <div className="sm:flex items-center gap-4 hidden  ">
          <button
            onClick={predictionClick}
            className="
            px-6 py-2 rounded-xl
            font-semibold text-sm
            bg-gradient-to-r from-green-400 to-green-600
            text-white shadow
            hover:scale-105 transition
          "
          >
            📊 Prediction
          </button>

          <button
            onClick={() => navigate("/addAds")}
            className="
            px-6 py-2 rounded-xl
            font-semibold text-sm
            border border-green-400
            text-green-600
            hover:bg-green-50
            transition
          "
          >
            ➕ Add Ads
          </button>
        </div>

        <div
          onClick={() => navigate("/profile")}
          className="
          flex items-center gap-3
          px-4 py-2
          rounded-2xl
          border border-gray-200
          hover:shadow-md
          cursor-pointer
          transition
        "
        >
          <img
            src={userIcon}
            alt="userprofile"
            className="w-10 h-10 rounded-full bg-green-600 p-1"
          />

          <div className="leading-tight">
            <p className="text-xs text-gray-400">
              {userinfo?.name || "Admin"}
            </p>
            <p className="text-sm font-semibold text-gray-800 truncate max-w-[160px]">
              {restInfo?.Restaurant_name || "Restaurant"}
            </p>
          </div>
        </div>
        </main>
         <div className="sm:hidden items-center gap-4 flex pt-2  ">
          <button
            onClick={predictionClick}
            className="
            px-6 py-2 rounded-xl
            font-semibold text-sm
            bg-gradient-to-r from-green-400 to-green-600
            text-white shadow
            hover:scale-105 transition
          "
          >
            📊 Prediction
          </button>

          <button
            onClick={() => navigate("/addAds")}
            className="
            px-6 py-2 rounded-xl
            font-semibold text-sm
            border border-green-400
            text-green-600
            hover:bg-green-50
            transition
          "
          >
            ➕ Add Ads
          </button>
        </div>
      </nav>
      
    </header>
  );
}

export default Header;
