import MarqueeText from "react-marquee-text"
import "react-marquee-text/dist/styles.css"
import { cacheLife } from "next/cache"

const Stiker = async() => {
  "use cache"
  cacheLife("hours")
  const res = await fetch("https://openapi.programming-hero.com/api/bazardor/products")
  const json = await res.json()
  const data = Array.isArray(json) ? json : json.items || json.data || [];
  
  return (
    <div className="w-full overflow-hidden bg-white border-y border-neutral-100 py-2">
      <MarqueeText direction="right" duration={10}>
        {
          data.map(h => {
            const change = h.change;
            let dir = "";
            let pct = "";

            if (typeof change === 'object' && change !== null) {
              dir = String(change.dir || change.type || change.symbol || "");
              pct = String(change.pct || change.value || change.rate || "");
            } else if (typeof change === 'string') {
              dir = change;
            }

            const trend = String(h.trend || "").toLowerCase();
            const isUp = trend === "up" || trend === "positive" || dir.includes("▲") || dir.includes("+") || dir.toLowerCase().includes("up");
            const isDown = trend === "down" || trend === "negative" || dir.includes("▼") || dir.includes("-") || dir.toLowerCase().includes("down");

            let arrow = isUp ? "▲" : isDown ? "▼" : "";
            let rawVal = pct || dir.replace(/[^0-9.-]/g, "") || "০.০";
            let formattedPct = rawVal.endsWith("%") ? rawVal : `${rawVal}%`;

            return (
              <span key={h.id} className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-neutral-700 mx-4"> 
                <span>{h.image}</span>
                <span>{h.nameBn || h.name}</span>
                <span className="font-bold text-neutral-900">{h.today || h.price || 0} টাকা/কেজি</span>
                <span className={`inline-flex items-center gap-1 font-bold ${isUp ? 'text-emerald-600' : isDown ? 'text-rose-600' : 'text-neutral-500'}`}>
                  {arrow} {formattedPct}
                </span>
              </span>
            );
          })
        }
      </MarqueeText>
    </div>
  );
};

export default Stiker;