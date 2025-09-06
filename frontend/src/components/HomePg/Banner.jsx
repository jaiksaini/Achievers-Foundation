import React from "react";
import assets from "../../assets/assets";

const Banner = () => {
  return (
    <section className="relative isolate h-1/20 sm:h-[50vh] lg:h-[60vh] overflow-hidden">
      <img
        src={assets.Banner}
        alt="Children"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 flex flex-col items-center justify-center text-center text-white py-32 px-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold max-w-3xl">
          You can contribute to provide a place for children with special needs!
        </h1>
        <div className="mt-6 flex flex-wrap gap-4 justify-center">
          <a
            href="#join"
            className="bg-yellow-400 text-gray-900 px-6 py-3 rounded-md font-semibold hover:bg-yellow-300"
          >
            Join as a Member
          </a>
          <a
            href="#donate"
            className="bg-white text-gray-900 px-6 py-3 rounded-md font-semibold hover:bg-gray-200"
          >
            Donate
          </a>
        </div>
      </div>
    </section>
  );
};

export default Banner;
