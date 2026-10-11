"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";

const UserInfo = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  return (
    <div>
      {user ? (
        <Link href={'/Profile'}>
          <p className="font-semibold text-neutral-800 hover:text-emerald-600 transition-colors text-xs sm:text-sm truncate max-w-[120px] sm:max-w-none">
            {user.name}
          </p>    
        </Link>
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