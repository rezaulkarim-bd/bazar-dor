"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ProductSkeleton from "@/app/components/ProductSkeleton";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://openapi.programming-hero.com/api/bazardor/products")
      .then((res) => res.json())
      .then((data) => {
        const items = Array.isArray(data) ? data : data.items || [];
        setProducts(items);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

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
    const isUp = trend === "up" || trend === "positive" || dir.includes("▲") || dir.includes("+") || dir.toLowerCase().includes("up");
    const isDown = trend === "down" || trend === "negative" || dir.includes("▼") || dir.includes("-") || dir.toLowerCase().includes("down");

    let arrow = isUp ? "▲ " : isDown ? "▼ " : "";
    let rawVal = pct || dir.replace(/[^0-9.-]/g, "") || "০.০";
    let formattedPct = rawVal.endsWith("%") ? rawVal : `${rawVal}%`;
    let text = `${arrow}${formattedPct}`;

    return { text, isUp, isDown, isFlat: !isUp && !isDown };
  };

  const formatUnit = (unit) => {
    if (!unit) return "প্রতি কেজি";
    if (unit.toLowerCase() === "kg" || unit.toLowerCase() === "কেজি") return "প্রতি কেজি";
    return unit;
  };

  const filteredRisers = products.filter(p => parseChange(p).isUp);
  const filteredFallers = products.filter(p => parseChange(p).isDown);

  const risers = filteredRisers.length > 0 ? filteredRisers.slice(0, 6) : products.slice(0, 6);
  const fallers = filteredFallers.length > 0 ? filteredFallers.slice(0, 6) : products.slice(6, 12);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f4f7f4] py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-neutral-900 flex items-center gap-2">
              <span className="text-emerald-600">▲</span> আজ দাম বেড়েছে (লোড হচ্ছে...)
            </h2>
            <ProductSkeleton />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f7f4] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-10">

       
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
                  href={`/product/${item.slug || item.id}`}
                  className="bg-white border border-neutral-200 rounded-2xl p-4 shadow-sm hover:border-emerald-600 transition-all flex flex-col justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{item.image}</span>
                    <div className="min-w-0">
                      <h3 className="font-bold text-neutral-900 text-sm sm:text-base truncate">{item.nameBn || item.name}</h3>
                      <p className="text-xs text-neutral-500">{formatUnit(item.unit)}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-neutral-100 text-xs">
                    <div>
                      <span className="text-neutral-500 block">আজকের দাম</span>
                      <span className="text-xs font-bold text-neutral-800">{item.today} টাকা</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-neutral-900 text-sm">{item.price || item.todayPrice}</span>
                      <span className="text-emerald-600 font-bold">{parsed.text}</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        
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
                  href={`/product/${item.slug || item.id}`}
                  className="bg-white border border-neutral-200 rounded-2xl p-4 shadow-sm hover:border-emerald-600 transition-all flex flex-col justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{item.image}</span>
                    <div className="min-w-0">
                      <h3 className="font-bold text-neutral-900 text-sm sm:text-base truncate">{item.nameBn || item.name}</h3>
                      <p className="text-xs text-neutral-500">{formatUnit(item.unit)}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-neutral-100 text-xs">
                    <div>
                      <span className="text-neutral-500 block">আজকের দাম</span>
                      <span className="text-xs font-bold text-neutral-800">{item.today} টাকা</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-neutral-900 text-sm">{item.price || item.todayPrice}</span>
                      <span className="text-rose-600 font-bold">{parsed.text}</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

       
        <div id="all-products" className="space-y-4">
          <div>
            <h2 className="text-lg font-bold text-neutral-900">সব পণ্য</h2>
            <p className="text-xs text-neutral-500">দৈনিক বাজার দর ও প্রতিটি পণ্যের লাইভ আপডেট</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((item, index) => {
              const parsed = parseChange(item);
              return (
                <Link 
                  key={item.id || index} 
                  href={`/product/${item.slug || item.id}`}
                  className="bg-white border border-neutral-200 rounded-2xl p-4 shadow-sm hover:border-emerald-600 transition-all flex flex-col justify-between gap-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{item.image}</span>
                    <div className="min-w-0">
                      <h3 className="font-bold text-neutral-900 text-sm sm:text-base truncate">{item.nameBn || item.name}</h3>
                      <p className="text-xs text-neutral-500">{formatUnit(item.unit)}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-neutral-100 text-xs">
                    <div>
                      <span className="text-neutral-500 block">আজকের দাম</span>
                      <span className="text-xs font-bold text-neutral-800">{item.today} টাকা</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-neutral-900 text-sm">{item.price || item.todayPrice}</span>
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