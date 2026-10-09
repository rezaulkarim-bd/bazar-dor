"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug || "batam-size-chal";
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // API ফেচ বা ফলব্যাক ডেটা লোড করার লজিক
    setTimeout(() => {
      setProduct({
        name: "বাটাম সাইজ চাল",
        unit: "প্রতি কেজি • চাল",
        todayPrice: "৬৬",
        unitText: "টাকা / কেজি",
        change: "▲ ৩.৫%",
        minPrice: "৫৯ টাকা",
        minMarket: "সরাইর ক্রয় খামার বাজার",
        maxPrice: "৭৩ টাকা",
        maxMarket: "সবচেয়ে বেশি দামের বাজার",
        avgPrice: "৬৬ টাকা",
        avgDesc: "প্রতি কেজি-র এর সিমান্ত",
        markets: [
          { name: "টাউন বাজার", division: "ময়মনসিংহ", min: "৫৯ টাকা", max: "৩৭ টাকা", avg: "৬২ টাকা" },
          { name: "সদর বাজার", division: "রাজশাহী", min: "৬০ টাকা", max: "৬৩ টাকা", avg: "৬৩ টাকা" },
          { name: "বাজারঘাট", division: "খুলনা", min: "৬০ টাকা", max: "৭৭ টাকা", avg: "৬৮.৫০ টাকা" },
          { name: "পাময়হাটি বাজার", division: "রাজশাহী", min: "৫৩ টাকা", max: "৬৮ টাকা", avg: "৫৮ টাকা" },
          { name: "চেরি বাজার", division: "ময়মনসিংহ", min: "৬০ টাকা", max: "৬৯ টাকা", avg: "৬৪.৫০ টাকা" },
          { name: "আমতলী বাজার", division: "চট্টগ্রাম", min: "৬১ টাকা", max: "৬৯ টাকা", avg: "৬৫ টাকা" },
          { name: "তবলসেট বাজার", division: "খুলনা", min: "৬২ টাকা", max: "৬৯ টাকা", avg: "৬৫.৫০ টাকা" },
          { name: "চৌরাস্তা বাজার", division: "সিলেট", min: "৬৩ টাকা", max: "৭৬ টাকা", avg: "৬৭ টাকা" },
          { name: "গ্রীন মার্কেট, মিরপুর", division: "ঢাকা", min: "৬৪ টাকা", max: "৭৪ টাকা", avg: "৬৭.৫০ টাকা" },
          { name: "চৌমুহনী বাজার", division: "চট্টগ্রাম", min: "৬৩ টাকা", max: "৭৩ টাকা", avg: "৬৮ টাকা" },
          { name: "আত্রবাজার", division: "সিলেট", min: "৬৪ টাকা", max: "৭৩ টাকা", avg: "৬৮.৫০ টাকা" },
          { name: "কাউরান বাজার", division: "ঢাকা", min: "৬২ টাকা", max: "৭৩ টাকা", avg: "৬৯ টাকা" },
        ]
      });
      setLoading(false);
    }, 500);
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f4f7f4] flex items-center justify-center text-neutral-600">
        লোড হচ্ছে...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f7f4] py-8 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* ব্রেডক্রাম্ব */}
        <nav className="text-xs sm:text-sm text-neutral-500 flex items-center gap-2">
          <Link href="/" className="hover:underline">হোম</Link>
          <span>›</span>
          <Link href="/categories/chal" className="hover:underline">চাল</Link>
          <span>›</span>
          <span className="text-neutral-800 font-semibold">{product.name}</span>
        </nav>

        {/* টপ সামারি কার্ড */}
        <div className="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-neutral-100 rounded-2xl flex items-center justify-center text-4xl shadow-inner border border-neutral-200">
              🍚
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
                {product.name}
              </h1>
              <p className="text-xs sm:text-sm text-neutral-500 mt-1">
                {product.unit}
              </p>
              <p className="text-xs text-emerald-700 font-medium mt-2">
                গতকালের তুলনায় আজ দাম কমেছে • ২ টাকা
              </p>
            </div>
          </div>

          <div className="bg-neutral-50 border border-neutral-200 rounded-2xl px-6 py-4 text-center min-w-[140px] shadow-sm">
            <p className="text-xs text-neutral-500 font-medium mb-1">আজকের দাম</p>
            <p className="text-3xl sm:text-4xl font-extrabold text-neutral-900">{product.todayPrice}</p>
            <p className="text-xs text-neutral-500 mt-0.5">{product.unitText}</p>
            <p className="text-xs font-bold text-emerald-600 mt-1">{product.change}</p>
          </div>
        </div>

        {/* দামের সারসংক্ষেপ */}
        <div className="space-y-3">
          <h2 className="text-lg font-bold text-neutral-900">দামের সারসংক্ষেপ</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm">
              <p className="text-xs font-semibold text-neutral-500">সর্বনিম্ন দাম</p>
              <p className="text-2xl font-extrabold text-emerald-600 mt-1">{product.minPrice}</p>
              <p className="text-xs text-neutral-400 mt-1">{product.minMarket}</p>
            </div>

            <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm">
              <p className="text-xs font-semibold text-neutral-500">সর্বাধিক দাম</p>
              <p className="text-2xl font-extrabold text-rose-600 mt-1">{product.maxPrice}</p>
              <p className="text-xs text-neutral-400 mt-1">{product.maxMarket}</p>
            </div>

            <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm">
              <p className="text-xs font-semibold text-neutral-500">গড় দাম</p>
              <p className="text-2xl font-extrabold text-neutral-800 mt-1">{product.avgPrice}</p>
              <p className="text-xs text-neutral-400 mt-1">{product.avgDesc}</p>
            </div>

          </div>
        </div>

        {/* বাজারভিত্তিক আজকের দাম টেবিল */}
        <div className="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-neutral-900">বাজারভিত্তিক আজকের দাম</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-neutral-200 text-neutral-500 text-xs sm:text-sm">
                  <th className="py-3 px-4 font-semibold">বাজার</th>
                  <th className="py-3 px-4 font-semibold">বিভাগ</th>
                  <th className="py-3 px-4 font-semibold">সর্বনিম্ন</th>
                  <th className="py-3 px-4 font-semibold">সর্বাধিক</th>
                  <th className="py-3 px-4 font-semibold">গড়</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 text-neutral-800 text-xs sm:text-sm">
                {product.markets.map((m, i) => (
                  <tr key={i} className="hover:bg-neutral-50 transition-colors">
                    <td className="py-3.5 px-4 font-medium">{m.name}</td>
                    <td className="py-3.5 px-4 text-neutral-600">{m.division}</td>
                    <td className="py-3.5 px-4 font-semibold text-emerald-700">{m.min}</td>
                    <td className="py-3.5 px-4 font-semibold text-rose-600">{m.max}</td>
                    <td className="py-3.5 px-4 font-bold text-neutral-900">{m.avg}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}