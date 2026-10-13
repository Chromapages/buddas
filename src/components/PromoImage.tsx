"use client";

import Image from "next/image";
import { useState } from "react";

export function PromoImage({ src, alt, priority = false, contain = false }: {
  src: string; alt: string; priority?: boolean; contain?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  return failed
    ? <div className="image-unavailable" role="img" aria-label={alt}>{contain ? "" : "Photo unavailable"}</div>
    : <Image src={src} alt={alt} fill className={contain ? "object-contain" : "object-cover"} sizes={contain ? "200px" : "(max-width: 480px) 90vw, 440px"} priority={priority} onError={() => setFailed(true)} />;
}
