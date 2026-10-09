// "use client"
import Link from "next/link";


const NavLinks = async() => {
       const res = await fetch("https://api.abcz.workers.dev/api/bazardor/categories")
       const data = await res.json()
    return (
     
        <div className="flex gap-5 py-3 px-6 md:px-12">
            {
                data.map((n,i)=> <Link key={i} href={n.slug}>{n.icon}{n.nameBn}</Link>)
            }
        </div>
    );
};

export default NavLinks;