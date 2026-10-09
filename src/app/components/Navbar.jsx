import React from 'react';
import NavLinks from '../components/NavLinks';

export default function Header() {
  return (
    <div>
    <header className="w-full bg-white border-b border-gray-100 py-3 px-6 md:px-12 flex items-center justify-between">
      {/* বাম পাশের লোগো ও টাইটেল */}
      <div className="flex items-center gap-3">
        <div className="bg-emerald-600 p-2.5 rounded-lg flex items-center justify-center text-white">
          {/* শপিং ব্যাগ আইকন */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-800 leading-none">বাজার দর</h1>
          <p className="text-xs text-gray-400 mt-1">বুধবার, ৭ অক্টোবর ২০২৬</p>
        </div>
      </div>

      {/* ডান পাশের বাটনসমূহ */}
      <div className="flex items-center gap-4">
        <button className="text-sm font-medium text-gray-700 hover:text-emerald-600 transition-colors">
          সাইন ইন
        </button>
        <button className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium px-4 py-2 rounded-md transition-colors">
          সাইন আপ
        </button>
      </div>
      
    </header>
    <NavLinks></NavLinks>
    </div>
  );
}