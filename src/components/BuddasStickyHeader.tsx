"use client";

import { lazy, Suspense, useState } from "react";
import { QrCode, Share2 } from "lucide-react";
import { trackAction } from "@/lib/analytics";
import { Toast, useToast } from "./Toast";

const QRModal = lazy(() => import("./QRModal").then((module) => ({ default: module.QRModal })));

export function BuddasStickyHeader({ brandName, canonicalUrl, profileSlug, track = true }: {
  brandName: string; canonicalUrl: string; profileSlug: string; track?: boolean;
}) {
  const [qrOpen, setQrOpen] = useState(false);
  const { toast, showToast } = useToast();
  async function share() {
    if (navigator.share) {
      try {
        await navigator.share({ title: brandName, url: canonicalUrl });
        if (track) trackAction("share", { profile: profileSlug, method: "share_api", placement: "header" });
        return;
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") return;
      }
    }
    try {
      await navigator.clipboard.writeText(canonicalUrl);
      showToast("Link copied.");
      if (track) trackAction("share", { profile: profileSlug, method: "clipboard", placement: "header" });
    } catch {
      showToast("Couldn't copy the link. Use the QR code to share this page.", "error");
    }
  }
  return <>
    <header className="profile-topbar"><div className="topbar-content">
      <span className="topbar-brand">{brandName}</span>
      <div className="topbar-controls">
        <button type="button" onClick={share} aria-label={`Share ${brandName}`}><Share2 aria-hidden="true" size={19} /><span>Share</span></button>
        <button type="button" onClick={() => { setQrOpen(true); if (track) trackAction("qr_open", { profile: profileSlug, placement: "header" }); }} aria-label={`Show QR code for ${brandName}`}><QrCode aria-hidden="true" size={19} /><span>QR</span></button>
      </div>
    </div></header>
    <Toast {...toast} />
    {qrOpen && <Suspense fallback={<p className="share-loading" role="status">Opening QR code…</p>}><QRModal isOpen={qrOpen} onClose={() => setQrOpen(false)} url={canonicalUrl} brandName={brandName} /></Suspense>}
  </>;
}
