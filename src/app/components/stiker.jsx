"use client";

import { useState, useEffect } from "react";

export default function PriceTicker() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("https://api.abcz.workers.dev/api/bazardor")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setItems(data);
        } else if (data && Array.isArray(data.items)) {
          setItems(data.items);
        }
      })
      .catch((err) => console.error("Error fetching ticker data:", err));
  }, []);

  if (items.length === 0) {
    return (
      <div className="bg-emerald-700 text-white text-xs py-2 px-4">
        বাজার দর লোড হচ্ছে...
      </div>
    );
  }

  const tickerContent = items.concat(items);

  return (
    <div className="bg-emerald-700 text-white text-xs py-2 overflow-hidden relative flex items-center">
      <div className="flex whitespace-nowrap animate-marquee items-center gap-6 sm:gap-8 px-4 w-full">
        {tickerContent.map((item, index) => {
          const isUp = item.change?.startsWith("▲") || item.trend === "up";
          const changeText = item.change || (isUp ? "▲" : "▼");

          return (
            <div
              key={index}
              className="flex items-center gap-1.5 font-medium bg-emerald-800/60 px-3 py-1 rounded-md shadow-inner"
            >
              <span>{item.emoji || "📦"}</span>
              <span className="font-bold">{item.name}:</span>
              <span>{item.price}</span>
              <span className={isUp ? "text-emerald-300 font-bold" : "text-rose-300 font-bold"}>
                {changeText}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}