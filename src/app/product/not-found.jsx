
import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center bg-[#f7f8f3] px-4 text-center">
      <p className="text-6xl">🛒</p>

      <h1 className="mt-5 text-2xl font-black text-neutral-900">
        পণ্যটি খুঁজে পাওয়া যায়নি
      </h1>

      <p className="mt-3 text-sm text-neutral-600">
        পণ্যের ID ভুল হতে পারে অথবা API থেকে তথ্য পাওয়া যাচ্ছে না।
      </p>

      <Link
        href="/"
        className="mt-6 rounded-full bg-green-700 px-6 py-3 font-bold text-white transition hover:bg-green-800"
      >
        হোম পেজে ফিরে যান
      </Link>
    </main>
  );
}
