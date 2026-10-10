"use client"



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
        <p>{user.name}</p>    
       </Link>
      ) : (
        <div className="flex items-center gap-4">
          <Link href={'/SignIn'}><button className="text-sm font-medium text-gray-700 hover:text-emerald-600 transition-colors">
            সাইন ইন
          </button>
          </Link>
            <Link href={'SignUp'}><button className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium px-4 py-2 rounded-md transition-colors">
            সাইন আপ
          </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserInfo;