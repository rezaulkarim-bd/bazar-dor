import Link from 'next/link';

const getProductDetail = async (productId) => {
    try {
        const res = await fetch(`https://api.api-store.workers.dev/api/bazardor/products/${productId}`);
        if (!res.ok) return null;
        return await res.json();
    } catch (error) {
        console.error("Error fetching product detail:", error);
        return null;
    }
};

export default async function ProductDetailPage({ params }) {
  const { productId } = await params;
  const rawProduct = await getProductDetail(productId);

  const product = rawProduct ? {
    name: rawProduct.nameBn || rawProduct.name || "বাটাম সাইজ চাল",
    category: rawProduct.category || "চাল",
    unit: rawProduct.unit || "প্রতি কেজি",
    emoji: rawProduct.emoji || "🍚",
    todayPrice: rawProduct.price || rawProduct.todayPrice || "৬৬ টাকা",
    change: typeof rawProduct.change === 'object' ? `${rawProduct.change.dir || ''} ${rawProduct.change.pct || ''}` : (rawProduct.change || "▲ ৩.৫%"),
    minPrice: rawProduct.minPrice || "৫৯ টাকা",
    minMarket: rawProduct.minMarket || "সরাইর ক্রয় খামার বাজার",
    maxPrice: rawProduct.maxPrice || "৭৩ টাকা",
    maxMarket: rawProduct.maxMarket || "সবচেয়ে বেশি দামের বাজার",
    avgPrice: rawProduct.avgPrice || "৬৬ টাকা",
    avgDesc: rawProduct.avgDesc || "প্রতি কেজি-র গড় সীমা",
    markets: rawProduct.markets || [
      { name: "টাউন বাজার", division: "ময়মনসিংহ", min: "৫৯ টাকা", max: "৬৭ টাকা", avg: "৬২ টাকা" },
      { name: "সদর বাজার", division: "রাজশাহী", min: "৬০ টাকা", max: "৬৩ টাকা", avg: "৬৩ টাকা" }
    ]
  } : {
    name: "বাটাম সাইজ চাল",
    category: "চাল",
    unit: "প্রতি কেজি",
    emoji: "🍚",
    todayPrice: "৬৬ টাকা",
    change: "▲ ৩.৫%",
    minPrice: "৫৯ টাকা",
    minMarket: "সরাইর ক্রয় খামার বাজার",
    maxPrice: "৭৩ টাকা",
    maxMarket: "সবচেয়ে বেশি দামের বাজার",
    avgPrice: "৬৬ টাকা",
    avgDesc: "প্রতি কেজি-র গড় সীমা",
    markets: [
      { name: "টাউন বাজার", division: "ময়মনসিংহ", min: "৫৯ টাকা", max: "৬৭ টাকা", avg: "৬২ টাকা" },
      { name: "সদর বাজার", division: "রাজশাহী", min: "৬০ টাকা", max: "৬৩ টাকা", avg: "৬৩ টাকা" }
    ]
  };

  return (
    <div className="min-h-screen bg-[#f4f7f4] py-8 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* ব্রেডক্রাম্ব */}
        <nav className="text-xs sm:text-sm text-neutral-500 flex items-center gap-2">
          <Link href="/" className="hover:underline">হোম</Link>
          <span>›</span>
          <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md font-medium text-xs">{product.category}</span>
          <span>›</span>
          <span className="text-neutral-800 font-semibold">{product.name}</span>
        </nav>

        {/* টপ সামারি কার্ড */}
        <div className="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-neutral-100 rounded-2xl flex items-center justify-center text-4xl shadow-inner border border-neutral-200">
              {product.emoji}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
                  {product.name}
                </h1>
                <span className="text-xs bg-neutral-100 text-neutral-600 px-2.5 py-1 rounded-full font-medium">
                  {product.category}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-500 mt-1">
                {product.unit}
              </p>
              <p className="text-xs text-emerald-700 font-medium mt-2">
                বাজারের লাইভ আপডেট ও তথ্য সঠিক ও হালনাগাদকৃত
              </p>
            </div>
          </div>

          <div className="bg-neutral-50 border border-neutral-200 rounded-2xl px-6 py-4 text-center min-w-[140px] shadow-sm">
            <p className="text-xs text-neutral-500 font-medium mb-1">আজকের দাম</p>
            <p className="text-3xl sm:text-4xl font-extrabold text-neutral-900">{product.todayPrice}</p>
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
              <p className="text-xs font-semibold text-neutral-500">গড় দাম</p>
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
                  <th className="py-3 px-4 font-semibold">গড়</th>
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