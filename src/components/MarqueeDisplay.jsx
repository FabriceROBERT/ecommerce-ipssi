import React from "react";
import Marquee from "react-fast-marquee";

export default function MarqueeDisplay() {
  return (
    <Marquee className="bg-sky-500 tracking-widest  text-[10px] py-4  text-white">
      <span>Free delivery from May 3 to May 7, 2024 on 50€ purchases.</span>
      <span> Don't hesitate to take advantage of this limited offer !</span>
    </Marquee>
  );
}
