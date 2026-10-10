import Link from "next/link";
import { cacheLife } from "next/cache";

const CategoryPage = async ({ params }) => {
  const { id } = await params;

  // ক্যাটাগরি ও সংশ্লিষ্ট পণ্যের ডেটা ফেচ করা
  const res = await fetch(`https://api.api-store.workers.dev/api/bazardor/categories/${id}`);
  const categoryData = await res.json();

  // বিকল্প হিসেবে ক্যাটাগরি ফিল্টার করে প্রোডাক্ট ফেচ করা যেতে পারে
  const prodRes = await fetch(`https://api.api-store.workers.dev/api/bazardor/products?category=${id}`);
  const prodData = await prodRes.json().catch(() => []);

  const categoryName = categoryData?.nameBn || categoryData?.name || "মাংস";
  const categoryIcon = categoryData?.icon || "🍗";
  
  const products = Array.isArray(prodData) && prodData.length > 0 
    ? prodData 
    : (categoryData?.items || categoryData?.products || []);

  return (
    <div className="min-h-screen bg-[#f4f7f4] py-8 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* ক্যাটাগরি হেডার ও ইউজার ইনফো সেকশন */}
        <div className="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <p className="text-xs text-neutral-500">rezaulkarim3659@gmail.com</p>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-3xl">{categoryIcon}</span>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
                  {categoryName}
                </h1>
              </div>
              <p className="text-xs text-neutral-500 mt-1">
                প্রতি পণ্যের আজকের দাম ও পরিবর্তন
              </p>
            </div>
          </div>
        </div>

        {/* পণ্যের সংখ্যা ও সর্ট কন্ট্রোল */}
        <div className="flex items-center justify-between text-xs sm:text-sm text-neutral-600 px-1">
          <p>মোট {products.length}টি পণ্য দেখানো হচ্ছে</p>
          <div className="flex items-center gap-2">
            <span className="text-neutral-500">সাজান:</span>
            <span className="font-semibold text-neutral-800 bg-white border border-neutral-200 px-3 py-1.5 rounded-xl shadow-sm">
              ডিফল্ট ▼
            </span>
          </div>
        </div>

        {/* পণ্যের রেসপনসিভ গ্রিড কার্ড */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.length > 0 ? (
            products.map((item, index) => (
              <Link 
                key={item.id || index} 
                href={`/product/${item.slug || item.id || 'item'}`}
                className="bg-white border border-neutral-200 rounded-2xl p-4 shadow-sm hover:border-emerald-600 transition-all flex flex-col justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{item.emoji || categoryIcon}</span>
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
                    <span className="font-bold text-neutral-900 text-sm">{item.price || item.todayPrice}</span>
                    <span className={`font-bold ${String(item.change).includes('▲') || String(item.trend) === 'up' ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {typeof item.change === 'object' ? `${item.change.dir || ''} ${item.change.pct || ''}` : (item.change || "—০.০%")}
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
};

export default CategoryPage;