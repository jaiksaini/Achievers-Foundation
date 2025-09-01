import React from 'react'

const Hero = () => {
  return (
    <section className="relative isolate bg- bg-center bg-cover">
     
      <div className="absolute inset-0 bg-black/60" aria-hidden="true" />
     
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="min-h-[70vh] sm:min-h-[75vh] lg:min-h-[80vh] flex items-center">
          <div className="max-w-2xl">
            <h1 className="text-white font-extrabold leading-tight tracking-tight text-4xl sm:text-5xl lg:text-6xl">
              Foundation of nation
              <br /> building- education
              <br /> and research!
            </h1>
            <p className="mt-6 text-white/85 text-sm sm:text-base max-w-md">
              Now donating is not just a virtue, it is also a wisdom - get tax
              exemption.
            </p>
            <div className="mt-6">
              <a
                href="#donate"
                className="inline-flex items-center rounded-md bg-white px-5 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-white/60"
              >
                Make a Donation
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
