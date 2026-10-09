import Image from "next/image";
import Hero from "./components/Banner";
import PriceTicker from "./components/stiker";


export default function Home() {
  return (
    <div>
       {/* PriceTicker */}
       <PriceTicker></PriceTicker>
     <Hero></Hero>
    </div>
  );
}
