import React from 'react';
import NavLinks from './NavLinks';
import UserInfo from './UserInfo';
import Image from 'next/image';

export default function Header() {
  return (
    <div>
      <header className="w-full bg-white border-b border-gray-100 py-3 px-6 md:px-12 flex items-center justify-between">
        {/* বাম পাশের লোগো ও টাইটেল */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center overflow-hidden border border-emerald-100 p-1.5 shadow-sm">
            <Image 
              src="/logo-icon.png" 
              alt="বাজার দর লোগো" 
              height={50}
              width={50}
              className="w-full h-full object-contain [image-rendering:_crisp-edges]"
            />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800 leading-none">বাজার দর</h1>
            <p className="text-xs text-gray-400 mt-1">রবিবার, ১১ অক্টোবর ২০২৬</p>
          </div>
        </div>

        <UserInfo />
      </header>
      <NavLinks />
    </div>
  );
}