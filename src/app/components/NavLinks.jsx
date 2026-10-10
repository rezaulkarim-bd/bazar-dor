import Link from "next/link";
import { cacheLife } from "next/cache";

const NavLinks = async() => {
  "use cache";
  cacheLife("hours");

  const res = await fetch("https://api.api-store.workers.dev/api/bazardor/categories");
  const data = await res.json();

  return (
    <div className="flex gap-5 py-3 px-6 md:px-12 overflow-x-auto whitespace-nowrap">
      {
        data.map((n, i) => (
          <Link key={i} href={`/Category/${n.slug}`} className="flex items-center gap-1.5 text-sm font-medium text-neutral-700 hover:text-emerald-600 transition-colors">
            <span>{n.icon}</span>
            <span>{n.nameBn}</span>
          </Link>
        ))
      }
    </div>
  );
};

export default NavLinks;