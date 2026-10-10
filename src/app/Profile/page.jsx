"use client";

import { authClient } from "@/lib/auth-client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();
  
  // BetterAuth সেশন থেকে ইউজার ডেটা নেওয়া
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  // ইউজার ডেটা লোড হলে ইনপুট স্টেট আপডেট করা
  useEffect(() => {
    if (user?.name) {
      setName(user.name);
    }
  }, [user]);

  // প্রোফাইল আপডেট হ্যান্ডলার
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("নাম খালি রাখা যাবে না!");
      return;
    }

    setLoading(true);
    try {
      // BetterAuth ইউজার নেম আপডেট API
      await authClient.updateUser({
        name: name,
      });
      toast.success("প্রোফাইল সফলভাবে আপডেট করা হয়েছে!");
    } catch (error) {
      console.error("Update error:", error);
      toast.error("প্রোফাইল আপডেট করতে সমস্যা হয়েছে।");
    } finally {
      setLoading(false);
    }
  };

  // সাইন আউট হ্যান্ডলার
  const handleSignOut = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("সাইন আউট করা হয়েছে!");
            router.push("/signin");
          },
        },
      });
    } catch (error) {
      console.error("Signout error:", error);
      toast.error("সাইন আউট ব্যর্থ হয়েছে!");
    }
  };

  // সেশন লোডিং স্টেট
  if (isPending) {
    return (
      <div className="min-h-screen bg-[#f4f7f4] flex items-center justify-center text-neutral-500 text-sm">
        লোডিং হচ্ছে...
      </div>
    );
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
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন ও আপডেট করুন
          </p>
        </div>

        {/* প্রোফাইল কার্ড ও সাইন আউট */}
        <div className="bg-white border border-neutral-200 rounded-3xl p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-neutral-100 border border-neutral-200 flex-shrink-0 flex items-center justify-center text-3xl">
              {user?.image ? (
                <img src={user.image} alt={user?.name || "User"} className="w-full h-full object-cover" />
              ) : (
                "👨‍💻"
              )}
            </div>
            <div>
              <h2 className="text-lg font-bold text-neutral-900">
                {user?.name || "রেজওয়ান আহমেদ"}
              </h2>
              <p className="text-xs sm:text-sm text-neutral-500">
                {user?.email || "rezwanahmed@gmail.com"}
              </p>
            </div>
          </div>
          
          <button 
            type="button"
            onClick={handleSignOut}
            className="w-full sm:w-auto px-5 py-2.5 border border-rose-200 text-rose-600 hover:bg-rose-50 rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-1.5"
          >
            <span>←</span> সাইন আউট
          </button>
        </div>

        {/* তথ্য ও আপডেট ফর্ম */}
        <div className="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <h2 className="text-base sm:text-lg font-bold text-neutral-900">তথ্য</h2>
          
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
                disabled={loading}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-semibold shadow-md transition-all text-center disabled:opacity-50"
              >
                {loading ? "আপডেট হচ্ছে..." : "আপডেট"}
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}