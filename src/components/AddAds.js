import React from "react";
import AddAd from "./AddAd";

function AddAds() {
  return (
    <section className="w-full min-h-[80vh] bg-gradient-to-b from-slate-50 to-white flex justify-center">
      <div className="w-full max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            Create Promotional Ads
          </h1>
          <p className="text-gray-500 mt-2 max-w-2xl mx-auto">
            Promote your restaurant or special offers by uploading ads that
            appear on the home banner.
          </p>
        </div>
        <div className="bg-white rounded-3xl shadow-lg p-6 sm:p-8">
          <AddAd />
        </div>
      </div>
    </section>
  );
}

export default AddAds;
