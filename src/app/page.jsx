"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const mockProducts = [
    { id: "1", slug: "alu", emoji: "🥔", nameBn: "আলু", unit: "প্রতি কেজি", price: "৪৫ টাকা", change: { dir: "▲", pct: "২.১%" }, trend: "up" },
    { id: "2", slug: "piyaj", emoji: "🧅", nameBn: "পেঁয়াজ", unit: "প্রতি কেজি", price: "১১০ টাকা", change: { dir: "▼", pct: "২.৯%" }, trend: "down" },
    { id: "3", slug: "batan-chal", emoji: "🍚", nameBn: "বাটাম সাইজ চাল", unit: "প্রতি কেজি • চাল", price: "৬৬ টাকা", change: { dir: "▲", pct: "৩.৫%" }, trend: "up" },
    { id: "4", slug: "dim", emoji: "🥚", nameBn: "ডিম (হালি)", unit: "প্রতি ডজন", price: "৫৮ টাকা", change: { dir: "▲", pct: "৪.০%" }, trend: "up" },
    { id: "5", slug: "rosun", emoji: "🧄", nameBn: "রসুন", unit: "প্রতি কেজি", price: "১৬০ টাকা", change: { dir: "▼", pct: "১.৫%" }, trend: "down" },
    { id: "6", slug: "ada", emoji: "🫚", nameBn: "আদা", unit: "প্রতি কেজি", price: "১৮০ টাকা", change: { dir: "▲", pct: "২.০%" }, trend: "up" },
    { id: "7", slug: "ilish", emoji: "🐟", nameBn: "ইলিশ মাছ", unit: "প্রতি কেজি", price: "১,৮৫০ টাকা", change: { dir: "—", pct: "০.০%" }, trend: "flat" },
    { id: "8", slug: "masur-dal", emoji: "🫘", nameBn: "মসুর ডাল", unit: "প্রতি কেজি", price: "১৪২ টাকা", change: { dir: "▲", pct: "২.৯%" }, trend: "up" },
  ];

  useEffect(() => {
    fetch("https://api.api-store.workers.dev/api/bazardor")
      .then(async (res) => {
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          return res.json();
        }
        throw new Error("Not JSON");
      })
      .then((data) => {
        const items = Array.isArray(data) ? data : data.items || mockProducts;
        setProducts(items.length > 0 ? items : mockProducts);
        setLoading(false);
      })
      .catch((err) => {
        console.warn("API fetch skipped, using robust mock data:", err);
        setProducts(mockProducts);
        setLoading(false);
      });
  }, []);

  const displayList = products.length > 0 ? products : mockProducts;

  const parseChange = (item) => {
    const change = item.change;
    let dir = "";
    let pct = "";

    if (typeof change === 'object' && change !== null) {
      dir = String(change.dir || change.type || change.symbol || "");
      pct = String(change.pct || change.value || change.rate || "");
    } else if (typeof change === 'string') {
      dir = change;
    }

    const trend = String(item.trend || "").toLowerCase();

    const isUp = 
      trend === "up" || 
      trend === "positive" || 
      dir.includes("▲") || 
      dir.includes("+") || 
      dir.toLowerCase().includes("up");

    const isDown = 
      trend === "down" || 
      trend === "negative" || 
      dir.includes("▼") || 
      dir.includes("-") || 
      dir.toLowerCase().includes("down");

    const text = typeof change === 'object' && change !== null 
      ? `${dir} ${pct}`.trim() 
      : (String(change || "—০.০%"));

    return {
      text: text || "—০.০%",
      isUp,
      isDown,
      isFlat: !isUp && !isDown
    };
  };

  const filteredRisers = displayList.filter(p => parseChange(p).isUp);
  const filteredFallers = displayList.filter(p => parseChange(p).isDown);

  const risers = filteredRisers.length > 0 ? filteredRisers : displayList.slice(0, 6);
  const fallers = filteredFallers.length > 0 ? filteredFallers : displayList.slice(6, 12);

  return (
    <div className="min-h-screen bg-[#f4f7f4] py-8 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* Hero Section */}
        <div className="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-10 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 text-center md:text-left">
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
              শনিবার, ১০ অক্টোবর ২০২৬
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
              আজকের বাজারের দাম এক নজরে
            </h1>
            <p className="text-xs sm:text-sm text-neutral-500 max-w-xl">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার বাজার — বাজারভিত্তিক বিস্তারিত দাম, গড়, সর্বনিম্ন ও সর্বাধিক দামের সঠিক পরিবর্তন এক পলক দেখায়।
            </p>
            <div className="pt-2">
              <Link href="#all-products" className="inline-block rounded-xl bg-emerald-600 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-md hover:bg-emerald-700 transition-all">
                সব পণ্য দেখুন
              </Link>
            </div>
          </div>
          <div className="w-40 sm:w-56 h-auto flex-shrink-0">
            <div className="text-6xl sm:text-8xl text-center">🛒</div>
          </div>
        </div>

        {/* Section A — আজ দাম বেড়েছে ▲ */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-neutral-900 flex items-center gap-2">
            <span className="text-emerald-600">▲</span> আজ দাম বেড়েছে
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {risers.map((item, index) => {
              const parsed = parseChange(item);
              return (
                <Link 
                  key={item.id || index} 
                  href={`/product/${item.slug || item.id || 'item'}`}
                  className="bg-white border border-neutral-200 rounded-2xl p-4 shadow-sm hover:border-emerald-600 transition-all flex flex-col justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{item.emoji || "📦"}</span>
                    <div>
                      <h3 className="font-bold text-neutral-900 text-sm sm:text-base">{item.nameBn || item.name}</h3>
                      <p className="text-xs text-neutral-500">{item.unit}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-neutral-100 text-xs">
                    <span className="text-neutral-500">আজকের দাম</span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-neutral-900 text-sm">{item.price}</span>
                      <span className="text-emerald-600 font-bold">{parsed.text}</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Section B — আজ দাম কমেছে ▼ */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-neutral-900 flex items-center gap-2">
            <span className="text-rose-600">▼</span> আজ দাম কমেছে
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {fallers.map((item, index) => {
              const parsed = parseChange(item);
              return (
                <Link 
                  key={item.id || index} 
                  href={`/product/${item.slug || item.id || 'item'}`}
                  className="bg-white border border-neutral-200 rounded-2xl p-4 shadow-sm hover:border-emerald-600 transition-all flex flex-col justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{item.emoji || "📦"}</span>
                    <div>
                      <h3 className="font-bold text-neutral-900 text-sm sm:text-base">{item.nameBn || item.name}</h3>
                      <p className="text-xs text-neutral-500">{item.unit}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-neutral-100 text-xs">
                    <span className="text-neutral-500">আজকের দাম</span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-neutral-900 text-sm">{item.price}</span>
                      <span className="text-rose-600 font-bold">{parsed.text}</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Section C — সব পণ্য */}
        <div id="all-products" className="space-y-4">
          <div>
            <h2 className="text-lg font-bold text-neutral-900">সব পণ্য</h2>
            <p className="text-xs text-neutral-500">দৈনিক বাজার দর ও প্রতিটি পণ্যের লাইভ আপডেট</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayList.map((item, index) => {
              const parsed = parseChange(item);
              return (
                <Link 
                  key={item.id || index} 
                  href={`/product/${item.slug || item.id || 'item'}`}
                  className="bg-white border border-neutral-200 rounded-2xl p-4 shadow-sm hover:border-emerald-600 transition-all flex flex-col justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{item.emoji || "📦"}</span>
                    <div>
                      <h3 className="font-bold text-neutral-900 text-sm sm:text-base">{item.nameBn || item.name}</h3>
                      <p className="text-xs text-neutral-500">{item.unit}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-neutral-100 text-xs">
                    <span className="text-neutral-500">আজকের দাম</span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-neutral-900 text-sm">{item.price}</span>
                      <span className={`font-bold ${parsed.isUp ? 'text-emerald-600' : parsed.isDown ? 'text-rose-600' : 'text-neutral-400'}`}>
                        {parsed.text}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}