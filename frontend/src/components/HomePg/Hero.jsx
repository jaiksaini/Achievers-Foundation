import React from "react";
import assets from "../../assets/assets";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative isolate max-h-[92vh] sm:h-[75vh] lg:h-[92vh] overflow-hidden">
      <img
        src={assets.homeBg}
        alt="Hero background"
        className="absolute inset-0 h-[100vh] w-[100vw] object-cover"
      />

      <div className="absolute inset-0 bg-black/60" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="min-h-[70vh] sm:min-h-[75vh] lg:min-h-[80vh] flex items-center">
          <div className="max-w-2xl">
            <h1 className="text-white font-roboto-bold leading-tight tracking-tight text-4xl sm:text-5xl lg:text-6xl">
              Foundation of nation
              <br /> building – education
              <br /> and research!
            </h1>

            <p className="mt-6 text-white/85 text-sm sm:text-base max-w-md">
              Now donating is not just a virtue, it is also a wisdom – get tax
              exemption.
            </p>

            <div className="mt-6">
              <a
                onClick={() => navigate("/donation")}
                className="inline-flex items-center rounded-md bg-white px-5 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-white/60"
              >
                Make a Donation
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
