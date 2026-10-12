"use client";

import { useState, useRef, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

const UserInfo = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/SignIn");
        },
      },
    });
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {user ? (
        <div>
        
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 group cursor-pointer focus:outline-none"
          >
            {user.image ? (
              <Image 
                src={user.image} 
                alt={user.name || "User"} 
                 width={40} 
                 height={40} 
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover border border-neutral-200 shadow-sm"
              />
            ) : (
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs sm:text-sm shadow-sm">
                {user.name ? user.name.charAt(0).toUpperCase() : "U"}
              </div>
            )}
            <span className="font-semibold text-neutral-800 group-hover:text-emerald-600 transition-colors text-xs sm:text-sm truncate max-w-[100px] sm:max-w-none">
              {user.name ? user.name.split(" ")[0] : "User"}
            </span>
            <span className={`text-[10px] text-neutral-500 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}>
              ▼
            </span>
          </button>


          {isOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white border border-neutral-200 rounded-2xl shadow-xl py-3 px-4 z-50 space-y-3">
              <div className="border-b border-neutral-100 pb-3">
                <p className="font-bold text-neutral-900 text-sm truncate">{user.name}</p>
                <p className="text-xs text-neutral-500 truncate">{user.email}</p>
              </div>

              <div className="space-y-1">
                <Link 
                  href="/Profile" 
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-neutral-700 hover:text-emerald-600 hover:bg-neutral-50 p-2 rounded-xl transition-colors"
                >
                  <span>👤</span> আমার প্রোফাইল
                </Link>

                <button 
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-2.5 text-xs sm:text-sm font-medium text-rose-600 hover:bg-rose-50 p-2 rounded-xl transition-colors text-left"
                >
                  <span>↪</span> সাইন আউট
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center gap-2 sm:gap-4">
          <Link 
            href={'/SignIn'} 
            className="text-xs sm:text-sm font-medium text-gray-700 hover:text-emerald-600 transition-colors"
          >
            সাইন ইন
          </Link>
          
          <Link 
            href={'/SignUp'} 
            className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-medium px-3 py-1.5 sm:px-4 sm:py-2 rounded-md transition-colors"
          >
            সাইন আপ
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserInfo;