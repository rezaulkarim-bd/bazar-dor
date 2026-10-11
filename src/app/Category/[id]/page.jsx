"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

export default function CategoryPage() {
  const params = useParams();
  const id = params?.id;

  const [categoryData, setCategoryData] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // সর্ট করার জন্য লোকাল স্টেট
  const [currentSort, setCurrentSort] = useState("default");

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        
        // ১. ক্যাটাগরি তথ্য ফেচ করা
        const res = await fetch(`https://openapi.programming-hero.com/api/bazardor/categories/${id}`);
        const catJson = await res.json().catch(() => null);

        // ২. সব পণ্য ফেচ করে ক্যাটাগরি অনুযায়ী ফিল্টার করা
        const prodRes = await fetch(`https://openapi.programming-hero.com/api/bazardor/products`);
        const prodJson = await prodRes.json().catch(() => []);
        const allProducts = Array.isArray(prodJson) ? prodJson : (prodJson.items || prodJson.data || []);

        const matchedProducts = allProducts.filter(
          (p) => String(p.category).toLowerCase() === String(id).toLowerCase() || 
                 String(p.categoryId) === String(id) ||
                 String(p.slug) === String(id)
        );

        setCategoryData(catJson);
        
        let items = matchedProducts.length > 0 
          ? matchedProducts 
          : (catJson?.items || catJson?.products || []);

        setProducts(items);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching category products:", err);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const categoryName = categoryData?.nameBn || categoryData?.name || products[0]?.categoryNameBn || "পণ্যের তালিকা";
  const categoryIcon = categoryData?.icon || categoryData?.categoryIcon || products[0]?.categoryIcon || "🛒";

  // সর্টিং অপশন পরিবর্তন হ্যান্ডেল করা (লোকালি স্টেট আপডেট হবে)
  const handleSortChange = (e) => {
    setCurrentSort(e.target.value);
  };

  // পণ্যের দামের ওপর ভিত্তি করে সঠিকভাবে সর্ট করা
  const sortedProducts = [...products].sort((a, b) => {
    const getPrice = (item) => {
      const val = item.today || item.price || item.todayPrice || 0;
      if (typeof val === 'number') return val;
      const num = Number(String(val).replace(/[^0-9.-]+/g, ""));
      return isNaN(num) ? 0 : num;
    };

    const priceA = getPrice(a);
    const priceB = getPrice(b);

    if (currentSort === "low-high") {
      return priceA - priceB;
    } else if (currentSort === "high-low") {
      return priceB - priceA;
    }
    return 0; // ডিফল্ট
  });

  // যদি ক্যাটাগরি বা পণ্য না থাকে (Invalid slug / Empty state)
  if (!loading && products.length === 0 && !categoryData?.name) {
    return (
      <div className="min-h-screen bg-[#f4f7f4] flex flex-col items-center justify-center p-4">
        <div className="bg-white border border-neutral-200 rounded-3xl p-8 max-w-md w-full text-center space-y-4 shadow-sm">
          <h1 className="text-2xl font-bold text-neutral-900">পণ্য বা ক্যাটাগরি পাওয়া যায়নি</h1>
          <p className="text-sm text-neutral-500">
            দুঃখিত, এই ক্যাটাগরিতে কোনো তথ্য খুঁজে পাওয়া যায়নি।
          </p>
          <div className="pt-2">
            <Link 
              href="/" 
              className="inline-flex items-center justify-center rounded-xl bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-emerald-800 transition-all"
            >
              হোম পেজে ফিরে যান
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f4f7f4] flex items-center justify-center text-neutral-500 text-sm">
        লোড হচ্ছে...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f7f4] py-8 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* ক্যাটাগরি হেডার সেকশন */}
        <div className="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-3">
                <span className="text-3xl">{categoryIcon}</span>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
                  {categoryName}
                </h1>
              </div>
              <p className="text-xs text-neutral-500 mt-2">
                প্রতি পণ্যের আজকের দাম ও পরিবর্তন
              </p>
            </div>
          </div>
        </div>

        {/* পণ্যের সংখ্যা ও সর্ট কন্ট্রোল */}
        <div className="flex items-center justify-between text-xs sm:text-sm text-neutral-600 px-1">
          <p>মোট {sortedProducts.length}টি পণ্য দেখানো হচ্ছে</p>
          <div className="flex items-center gap-2">
            <span className="text-neutral-500">সাজান:</span>
            <select
              value={currentSort}
              onChange={handleSortChange}
              className="font-semibold text-neutral-800 bg-white border border-neutral-200 px-3 py-1.5 rounded-xl shadow-sm focus:outline-none cursor-pointer"
            >
              <option value="default">ডিফল্ট</option>
              <option value="low-high">দাম: কম থেকে বেশি</option>
              <option value="high-low">দাম: বেশি থেকে কম</option>
            </select>
          </div>
        </div>

        {/* পণ্যের রেসপনসিভ গ্রিড কার্ড */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedProducts.length > 0 ? (
            sortedProducts.map((item, index) => (
              <Link 
                key={item.id || index} 
                href={`/product/${item.slug || item.id || 'item'}`}
                className="bg-white border border-neutral-200 rounded-2xl p-4 shadow-sm hover:border-emerald-600 transition-all flex flex-col justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{item.image || item.emoji || categoryIcon}</span>
                  <div>
                    <h3 className="font-bold text-neutral-900 text-sm sm:text-base">
                      {item.nameBn || item.name}
                    </h3>
                    <p className="text-xs text-neutral-500">{item.unit || "প্রতি কেজি"}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-neutral-100 text-xs">
                  <span className="text-neutral-500">আজকের দাম</span>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-neutral-900 text-sm">{item.today || item.price || item.todayPrice} টাকা</span>
                    <span className={`font-bold ${String(item.change?.dir || item.change).includes('up') || String(item.trend) === 'up' ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {typeof item.change === 'object' ? `${item.change.dir === 'up' ? '▲' : '▼'} ${item.change.pct || ''}%` : (item.change || "—০.০%")}
                    </span>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full py-12 text-center text-neutral-500 bg-white rounded-2xl border border-neutral-200">
              এই ক্যাটাগরিতে বর্তমানে কোনো পণ্য উপলব্ধ নেই।
            </div>
          )}
        </div>

      </div>
    </div>
  );
}