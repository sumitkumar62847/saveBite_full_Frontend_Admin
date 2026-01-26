import React from "react";
import Additem from "./Additem";
import Iteminfo from "./iteminfo.js";

function Items({ items }) {
  return (
    <div
      className="
        grid gap-4
        grid-cols-2
        sm:grid-cols-3
        md:grid-cols-4
        xl:grid-cols-5
        xl:gap-8
      "
    >
      {items && items.length > 0 ? (
        items.map((item) => (
          <Iteminfo item={item} key={item._id} />
        ))
      ) : (
        <div className="col-span-full flex flex-col items-center justify-center py-20">
          <span className="text-6xl mb-4">📦</span>
          <p className="text-lg font-semibold text-gray-700">
            No items added yet
          </p>
          <p className="text-sm text-gray-500">
            Start by adding your first food item
          </p>
        </div>
      )}
      {items && items.length > 0 ? (
          <div className="flex flex-col items-center justify-center py-5">
            <Additem />
         </div>
      ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-5">
            <Additem />
          </div>
      )}
      
      
    </div>
  );
}

export default Items;
