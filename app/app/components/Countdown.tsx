"use client";
import { useEffect, useState } from "react";

export default function Countdown({ endsAt }: { endsAt: string }) {
  const [text, setText] = useState("");

  useEffect(() => {
    const end = new Date(endsAt).getTime();
    const tick = () => {
      const ms = Math.max(0, end - Date.now());
      const h = Math.floor(ms/3.6e6);
      const m = Math.floor((ms%3.6e6)/6e4);
      const s = Math.floor((ms%6e4)/1e3);
      setText(`${h}h ${m}m ${s}s`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [endsAt]);

  return <span>{text}</span>;
}
