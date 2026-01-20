import React from "react";

function AddAd() {
  return (
    <div
      className="
        group
        w-full
        max-w-2xl
        aspect-[16/6]
        mx-auto
        flex flex-col items-center justify-center
        rounded-3xl
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

      <p className="mt-4 text-lg font-semibold text-green-700">
        Upload Advertisement Banner
      </p>

      <p className="text-sm text-green-600 opacity-80 mt-1 text-center px-6">
        Recommended size: 1600 × 600 • JPG / PNG
      </p>
    </div>
  );
}

export default AddAd;
