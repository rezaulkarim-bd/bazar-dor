import Link from 'next/link';

const getProductDetail = async (productId) => {
    try {
        const res = await fetch("https://openapi.programming-hero.com/api/bazardor/products", {
            cache: 'no-store'
        });
        if (!res.ok) return null;
        const data = await res.json();
        const products = Array.isArray(data) ? data : data.items || data.data || [];
        
        const foundProduct = products.find(
            (p) => String(p.id) === String(productId) || p.slug === productId
        );
        
        return foundProduct || null;
    } catch (error) {
        console.error("Error fetching product detail:", error);
        return null;
    }
};

const formatUnit = (unit) => {
    if (!unit) return "প্রতি কেজি";
    if (unit.toLowerCase() === "kg" || unit.toLowerCase() === "কেজি") return "প্রতি কেজি";
    return unit;
};

export default async function ProductDetailPage({ params }) {
  const { productId } = await params;
  const rawProduct = await getProductDetail(productId);

  if (!rawProduct) {
    return (
      <div className="min-h-screen bg-[#f4f7f4] flex flex-col items-center justify-center p-4">
        <div className="bg-white border border-neutral-200 rounded-3xl p-8 max-w-md w-full text-center space-y-4 shadow-sm">
          <h1 className="text-2xl font-bold text-neutral-900">পণ্যটি পাওয়া যায়নি</h1>
          <p className="text-sm text-neutral-500">
            দুঃখিত, এই পণ্যের কোনো লাইভ তথ্য ডাটাবেজে খুঁজে পাওয়া যায়নি।
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

  const changeObj = rawProduct.change || {};
  const isUp = changeObj.dir === "up" || changeObj.dir === "+";
  const changeText = `${isUp ? "▲" : "▼"} ${changeObj.pct || 0}%`;

  const markets = Array.isArray(rawProduct.markets) ? rawProduct.markets : [];
  
  let overallMin = 0;
  let overallMax = 0;
  let minMarketName = "নির্ধারিত বাজার";
  let maxMarketName = "নির্ধারিত বাজার";

  if (markets.length > 0) {
    let minM = markets.reduce((prev, curr) => prev.min < curr.min ? prev : curr);
    let maxM = markets.reduce((prev, curr) => prev.max > curr.max ? prev : curr);
    overallMin = minM.min;
    overallMax = maxM.max;
    minMarketName = minM.market;
    maxMarketName = maxM.market;
  }

  const avgPriceValue = markets.length > 0 
    ? Math.round(markets.reduce((acc, m) => acc + ((m.min + m.max) / 2), 0) / markets.length)
    : rawProduct.today || 0;

  const product = {
    name: rawProduct.nameBn || rawProduct.name,
    category: rawProduct.categoryNameBn || rawProduct.category || "বাজারের পণ্য",
    unit: formatUnit(rawProduct.unit),
    image: rawProduct.image || "🛒",
    todayPrice: `${rawProduct.today || 0} টাকা`,
    changeText: changeText,
    isUp: isUp,
    minPrice: `${overallMin} টাকা`,
    minMarket: minMarketName,
    maxPrice: `${overallMax} টাকা`,
    maxMarket: maxMarketName,
    avgPrice: `${avgPriceValue} টাকা`,
    avgDesc: "প্রতি কেজি-র গড় হিসাব",
    markets: markets.map(m => ({
      name: m.market,
      division: m.division,
      min: `${m.min} টাকা`,
      max: `${m.max} টাকা`,
      avg: `${Math.round((m.min + m.max) / 2)} টাকা`
    }))
  };

  return (
    <div className="min-h-screen bg-[#f4f7f4] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Breadcrumb */}
        <nav className="text-xs sm:text-sm text-neutral-500 flex items-center gap-2 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:underline">হোম</Link>
          <span>›</span>
          <span className="hover:underline">{product.category}</span>
          <span>›</span>
          <span className="text-neutral-800 font-semibold">{product.name}</span>
        </nav>

        {/* Top Summary Card */}
        <div className="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4 sm:gap-5">
            <div className="w-16 h-16 sm:w-24 sm:h-24 bg-neutral-50 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl shadow-inner border border-neutral-100 shrink-0">
              {product.image}
            </div>
            <div>
              <h1 className="text-xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
                {product.name}
              </h1>
              <p className="text-xs sm:text-sm text-neutral-500 mt-0.5">
                {product.unit} · {product.category}
              </p>
              <p className="text-xs text-neutral-600 font-medium mt-2">
                গতকালের তুলনায় আজ দাম <span className={product.isUp ? "text-emerald-600 font-bold" : "text-rose-600 font-bold"}>{product.isUp ? "বেড়েছে" : "কমেছে"}</span> {product.changeText}
              </p>
            </div>
          </div>

          <div className="bg-neutral-50 border border-neutral-200 rounded-2xl px-6 py-4 text-center w-full md:w-auto min-w-[150px] shadow-2xs">
            <p className="text-xs text-neutral-500 font-medium mb-1">আজকের দাম</p>
            <p className="text-2xl sm:text-4xl font-extrabold text-neutral-900">{product.todayPrice}</p>
            <p className="text-xs text-neutral-500 mt-0.5">টাকা / কেজি</p>
            <p className={`text-xs font-bold mt-1 ${product.isUp ? 'text-emerald-600' : 'text-rose-600'}`}>
              {product.changeText}
            </p>
          </div>
        </div>

        {/* Price Summary */}
        <div className="space-y-3">
          <h2 className="text-lg font-bold text-neutral-900">দামের সারসংক্ষেপ</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm">
              <p className="text-xs font-semibold text-neutral-500">সর্বনিম্ন দাম</p>
              <p className="text-xl sm:text-2xl font-extrabold text-emerald-600 mt-1">{product.minPrice}</p>
              <p className="text-xs text-neutral-400 mt-1 truncate">{product.minMarket}</p>
            </div>

            <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm">
              <p className="text-xs font-semibold text-neutral-500">সর্বাধিক দাম</p>
              <p className="text-xl sm:text-2xl font-extrabold text-rose-600 mt-1">{product.maxPrice}</p>
              <p className="text-xs text-neutral-400 mt-1 truncate">{product.maxMarket}</p>
            </div>

            <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm">
              <p className="text-xs font-semibold text-neutral-500">গড় দাম</p>
              <p className="text-xl sm:text-2xl font-extrabold text-neutral-800 mt-1">{product.avgPrice}</p>
              <p className="text-xs text-neutral-400 mt-1">{product.avgDesc}</p>
            </div>

          </div>
        </div>

        {/* Market-wise Table */}
        <div className="bg-white border border-neutral-200 rounded-3xl p-4 sm:p-8 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-neutral-900">বাজারভিত্তিক আজকের দাম</h2>
          
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <div className="inline-block min-w-full align-middle px-4 sm:px-0">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-neutral-200 text-neutral-500 text-xs sm:text-sm">
                    <th className="py-3 px-3 sm:px-4 font-semibold">বাজার</th>
                    <th className="py-3 px-3 sm:px-4 font-semibold">বিভাগ</th>
                    <th className="py-3 px-3 sm:px-4 font-semibold">সর্বনিম্ন</th>
                    <th className="py-3 px-3 sm:px-4 font-semibold">সর্বাধিক</th>
                    <th className="py-3 px-3 sm:px-4 font-semibold">গড়</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 text-neutral-800 text-xs sm:text-sm">
                  {product.markets.length > 0 ? (
                    product.markets.map((m, i) => (
                      <tr key={i} className="hover:bg-neutral-50 transition-colors">
                        <td className="py-3.5 px-3 sm:px-4 font-medium">{m.name}</td>
                        <td className="py-3.5 px-3 sm:px-4 text-neutral-600">{m.division}</td>
                        <td className="py-3.5 px-3 sm:px-4 font-semibold text-emerald-700">{m.min}</td>
                        <td className="py-3.5 px-3 sm:px-4 font-semibold text-rose-600">{m.max}</td>
                        <td className="py-3.5 px-3 sm:px-4 font-bold text-neutral-900">{m.avg}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="py-6 text-center text-neutral-400 text-sm">
                        এই পণ্যের জন্য কোনো বাজারভিত্তিক ডেটা পাওয়া যায়নি।
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export const API_BASE = 'https://openapi.programming-hero.com/api/bazardor';

export function fmt(value) {
  if (value === null || value === undefined || value === '') {
    return 'তথ্য নেই';
  }
  const number = Number(value);
  if (!Number.isFinite(number)) {
    return String(value);
  }
  return `${number.toLocaleString('bn-BD')} টাকা`;
}

export function normalizeProduct(product) {
  if (!product || typeof product !== 'object') {
    return null;
  }
  return {
    ...product,
    id: product.id,
    name: product.nameBn || product.name || product.title || 'নাম পাওয়া যায়নি',
    category: product.categoryNameBn || product.categoryName || product.category || 'অন্যান্য',
    unit: product.unit || 'পিস',
    markets: Array.isArray(product.markets) ? product.markets : [],
  };
}