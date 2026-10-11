import MarqueeText from "react-marquee-text"
import "react-marquee-text/dist/styles.css"
import { cacheLife } from "next/cache"

const Stiker = async() => {
  "use cache"
  cacheLife("hours")
  const res = await fetch("https://openapi.programming-hero.com/api/bazardor/products")
  const data = await res.json()
  
  return (
    <div className="w-full overflow-hidden bg-white border-y border-neutral-100 py-2">
      <MarqueeText direction="right" duration={15}>
        {
          data.map(h => (
            <span key={h.id} className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-neutral-700"> 
              <span>{h.image}</span>
              <span>{h.nameBn}</span>
              <span className='mx-4 text-emerald-600'>•</span>
            </span>
          ))
        }
      </MarqueeText>
    </div>
  );
};

export default Stiker;