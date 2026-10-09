export default function Footer() {
  return (
    <footer className="max-w-6xl btn-sm sm:btn-md bg-white border-t border-neutral-200 mt-auto py-6">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left text-xs sm:text-sm text-neutral-600">
        <div>
          <span className="font-bold text-neutral-900">বাজার দর</span> — প্রয়োজনীয় পণ্যের দাম এক নজরে।
        </div>
        <div className="text-neutral-500 italic">
          “সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।”
        </div>
      </div>
    </footer>
  );
}

// btn-sm sm:btn-md, max-w-6xl