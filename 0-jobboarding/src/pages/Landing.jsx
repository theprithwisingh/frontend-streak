import React from 'react'
import { Link } from 'react-router-dom'

const Landing = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      {/* Hero */}
      <div className="text-center max-w-2xl">
        <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-black leading-tight">
          Find Your <span className="underline decoration-4 underline-offset-4">Dream Job</span>
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-gray-600 leading-relaxed">
          The modern job board that connects talent with opportunity. Simple, fast, no distractions.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/login"
            className="inline-flex items-center justify-center px-8 py-3.5 text-sm font-semibold tracking-wide uppercase bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-200 shadow-lg shadow-black/20"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="inline-flex items-center justify-center px-8 py-3.5 text-sm font-semibold tracking-wide uppercase border-2 border-black text-black rounded-lg hover:bg-black hover:text-white transition-colors duration-200"
          >
            Register
          </Link>
        </div>
      </div>

      {/* Footer note */}
      <p className="mt-20 text-xs text-gray-400 tracking-widest uppercase">
        Built with purpose
      </p>
    </div>
  )
}

export default Landing