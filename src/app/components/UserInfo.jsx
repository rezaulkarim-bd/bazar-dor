import Image from "next/image";


const UserInfo = () => {
    return (
        <div>
            {
                user? <div>
                         <div className="flex items-center gap-2.5 cursor-pointer hover:opacity-80 transition-opacity">
          <div className="w-9 h-9 rounded-xl overflow-hidden border border-neutral-200 relative bg-neutral-100">
         
            <Image
              src="user?.image" 
              alt="" 
              fill 
              className="object-cover"
            />
          </div>
          <span className="font-semibold text-sm text-neutral-800">
              {user?.name}
          </span>
          <span className="text-xs text-neutral-400">▼</span>
        </div>
                     </div>     :       <div className="flex items-center gap-4">
        <button className="text-sm font-medium text-gray-700 hover:text-emerald-600 transition-colors">
          সাইন ইন
        </button>
        <button className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium px-4 py-2 rounded-md transition-colors">
          সাইন আপ
        </button>
      </div>
            }
              

        </div>
    );
};

export default UserInfo;