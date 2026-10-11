import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#f4f7f4] flex flex-col items-center justify-center p-4">
      <div className="bg-white border border-neutral-200 rounded-3xl p-8 max-w-md w-full text-center space-y-4 shadow-sm">
        <div className="text-6xl mb-2">🛒</div>
        <h1 className="text-2xl font-bold text-neutral-900">পেজটি পাওয়া যায়নি (404)</h1>
        <p className="text-sm text-neutral-500">
          আপনি যে পেজটি খুঁজছেন তা মুছে ফেলা হয়েছে অথবা ভুল ইউআরএল টাইপ করেছেন।
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