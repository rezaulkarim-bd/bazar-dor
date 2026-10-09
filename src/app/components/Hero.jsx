import Image from "next/image";

export default function Hero() {
  return (
    <section className="w-full bg-[#f4f7f4] py-8 sm:py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-10 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-8">
          
          <div className="flex flex-col items-start text-left space-y-4 max-w-xl">
            <span className="inline-block px-3.5 py-1 text-xs sm:text-sm font-semibold text-emerald-800 bg-emerald-100/80 rounded-full">
              মঙ্গলবার, ৬ অক্টোবর, ২০২৬
            </span>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 tracking-tight">
              আজকের বাজারের দাম এক নজরে
            </h1>

            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
            </p>

            <div className="pt-2">
              <a
                href="#সব-পণ্য"
                className="inline-flex items-center justify-center btn-sm sm:btn-md rounded-xl bg-emerald-700 px-5 py-2.5 sm:px-6 sm:py-3 text-sm font-semibold text-white shadow-md hover:bg-emerald-800 transition-all"
              >
                সব পণ্য দেখুন
              </a>
            </div>
          </div>

          <div className="flex-shrink-0 w-full lg:w-auto flex justify-center">
            <div className="w-64 sm:w-80 lg:w-96 h-auto">
              <Image
                src={"/bazar-hero.png"}
                alt="বাজারের পণ্যের ঝুড়ি"
                height={50}
                width={50}
                className="w-full h-full object-contain"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}