"use client";

import { authClient } from "@/lib/auth-client";
import { useState } from "react";

export default function ProfilePage() {
  const [name, setName] = useState("Rezwan Ahmed");

  const handleUpdate = (e) => {
    e.preventDefault();
    alert("প্রোফাইল সফলভাবে আপডেট করা হয়েছে!");
  };


  const handleSignOut = async()=>{
    await authClient.signOut()
  }

  return (
    <div className="min-h-screen bg-[#f4f7f4] py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* পেজ হেডার */}
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
            আমার প্রোফাইল
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন
          </p>
        </div>

        {/* প্রোফাইল কার্ড ও সাইন আউট */}
        <div className="bg-white border border-neutral-200 rounded-3xl p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-neutral-100 border border-neutral-200 relative flex-shrink-0 flex items-center justify-center text-3xl">
              👨‍💻
            </div>
            <div>
              <h2 className="text-lg font-bold text-neutral-900">Rezwan Ahmed</h2>
              <p className="text-xs sm:text-sm text-neutral-500">rezwanahmed@gmail.com</p>
            </div>
          </div>
          
          <button onClick={handleSignOut}
            onClick={() => alert("সাইন আউট করা হয়েছে!")}
            className="w-full sm:w-auto px-4 py-2 border border-rose-200 text-rose-600 hover:bg-rose-50 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2"
          >
            <span className="text-base">↩</span> সাইন আউট
          </button>
        </div>

        {/* তথ্য ও আপডেট ফর্ম */}
        <div className="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <h2 className="text-base sm:text-lg font-bold text-neutral-900">তথ্য[cite: 4]</h2>
          
          <form onSubmit={handleUpdate} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs sm:text-sm font-medium text-neutral-700">
                নাম
              </label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 bg-white border border-neutral-200 rounded-xl text-sm text-neutral-900 focus:outline-none focus:border-emerald-600 transition-all"
                placeholder="আপনার নাম লিখুন"
              />
            </div>

            <div className="pt-2">
              <button 
                type="submit"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-semibold shadow-md transition-all text-center"
              >
                আপডেট
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}