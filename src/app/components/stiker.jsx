// "use client";
import MarqueeText from "react-marquee-text"
import "react-marquee-text/dist/styles.css"
// src/app/components/NavLinks.jsx
import { cacheLife } from "next/cache"







const Stiker = async() => {
      "use cache"
  cacheLife("hours")
    const res = await fetch("https://openapi.programming-hero.com/api/bazardor/products")
    const data = await res.json()
    // const Headlines = data.nameBn
    return (
      <div>
            {/* MarqueeText */}
            <MarqueeText direction="right" duration={10}>
            {
                data.map(h => <span key={h.id}>
                    <span>{h.nameBn}</span>
                    <span className='mx-5'>ㆍ</span>3
                </span>)
            }
            </MarqueeText>
        </div>
    );
};

export default Stiker;