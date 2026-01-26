import React from "react";
import { useNavigate } from "react-router-dom";

function Additem() {
  const navigate = useNavigate();

  function clickhander(e) {
    e.stopPropagation();
    navigate("/additem");
  }

  return (
    <div
      onClick={clickhander}
      className="
        p-10
        group
        flex flex-col items-center justify-center
        rounded-2xl
        border-2 border-dashed border-green-300
        bg-green-50/40
        cursor-pointer
        transition-all duration-300
        hover:border-green-500
        hover:bg-green-100
        hover:shadow-md
      "
    >
      
      <div
        className="
          w-16 h-16
          rounded-full
          flex items-center justify-center
          border-2 border-dashed border-green-400
          text-green-600
          text-4xl font-bold
          group-hover:scale-110
          transition
        "
      >
        +
      </div>

      <p className="mt-4 text-sm font-semibold text-green-700">
        Add New Item
      </p>

      <p className="text-xs text-green-600 opacity-80 mt-1">
        Create food listing
      </p>
    </div>
  );
}

export default Additem;
