// import Link from "next/link";
// import { cacheLife } from "next/cache";

// const NavLinks = async() => {
//   "use cache";
//   cacheLife("hours");

//   const res = await fetch("https://api.abcz.workers.dev/api/bazardor/categories");
//   const data = await res.json();

//   return (
//     <div className="flex gap-5 py-3 px-6 md:px-12 overflow-x-auto whitespace-nowrap">
//       {
//         data.map((n, i) => (
//           <Link key={i} href={`/Category/${n.slug}`} className="flex items-center gap-1.5 text-sm font-medium text-neutral-700 hover:text-emerald-600 transition-colors">
//             <span>{n.icon}</span>
//             <span>{n.nameBn}</span>
//           </Link>
//         ))
//       }
//     </div>
//   );
// };

// export default NavLinks;

import Link from "next/link";
import { cacheLife } from "next/cache";

const API_URL = "https://openapi.programming-hero.com/api/bazardor/categories";

const NavLinks = async () => {
  "use cache";
  cacheLife("hours");

  let data = [];

  try {
    const res = await fetch(API_URL);
    const contentType = res.headers.get("content-type") || "";

    if (res.ok && contentType.includes("application/json")) {
      const json = await res.json();
      data = Array.isArray(json) ? json : json.data || [];
    } else {
      console.error("Categories API problem:", res.status, contentType);
    }
  } catch (err) {
    console.error("Categories fetch error:", err);
  }

  return (
    <div className="flex gap-5 py-3 px-6 md:px-12 overflow-x-auto whitespace-nowrap">
      {data.map((n, i) => (
        <Link
          key={n.slug || i}
          href={`/Category/${n.slug}`}
          className="flex items-center gap-1.5 text-sm font-medium text-neutral-700 hover:text-emerald-600 transition-colors"
        >
          <span>{n.icon}</span>
          <span>{n.nameBn}</span>
        </Link>
      ))}
    </div>
  );
};

export default NavLinks;