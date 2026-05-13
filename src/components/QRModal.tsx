"use client";

import * as React from "react";
import QRCode from "qrcode";
import { X, Download, Copy, Link2 } from "lucide-react";

import { cn } from "@/lib/cn";
import { Toast, useToast } from "@/components/Toast";

interface QRModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function QRModal({ isOpen, onClose }: QRModalProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [qrDataUrl, setQrDataUrl] = React.useState<string>("");
  const { toast, showToast, hideToast } = useToast();

  React.useEffect(() => {
    if (toast.visible) {
      const timer = setTimeout(() => hideToast(), 2500);
      return () => clearTimeout(timer);
    }
  }, [toast.visible, hideToast]);

  React.useEffect(() => {
    if (isOpen && typeof window !== "undefined") {
      const url = window.location.href;
      QRCode.toDataURL(url, {
        width: 280,
        margin: 2,
        color: {
          dark: "#3d2a1a",
          light: "#FFF8F0",
        },
      }).then(setQrDataUrl).catch(console.error);
    }
  }, [isOpen]);

  const handleDownload = async () => {
    if (!canvasRef.current || !qrDataUrl) return;
    const link = document.createElement("a");
    link.download = "buddas-qr.png";
    link.href = qrDataUrl;
    link.click();
    showToast("QR code downloaded!", "success");
  };

  const handleCopyLink = async () => {
    if (typeof navigator === "undefined") return;
    try {
      await navigator.clipboard.writeText(window.location.href);
      showToast("Link copied to clipboard!", "success");
    } catch {
      showToast("Couldn't copy — try again", "error");
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div
        className={cn(
          "w-full max-w-sm rounded-2xl overflow-hidden",
          "bg-[#FFF8F0] shadow-xl ring-1 ring-[#3d2a1a]/10"
        )}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-5 py-4"
          style={{ backgroundColor: "#3d2a1a" }}
        >
          <div className="flex items-center gap-2">
            <Link2 className="h-4 w-4 text-[#e9c559]" />
            <span className="text-sm font-semibold text-white">Scan QR Code</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className={cn(
              "p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10",
              "transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e9c559]"
            )}
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* QR Code Display */}
        <div className="flex items-center justify-center p-6 bg-white">
          {qrDataUrl ? (
            <div className="relative">
              <img
                src={qrDataUrl}
                alt="QR Code"
                className="w-64 h-64 rounded-xl"
              />
              <canvas ref={canvasRef} className="hidden" />
            </div>
          ) : (
            <div className="w-64 h-64 flex items-center justify-center">
              <div className="animate-pulse text-muted-foreground text-sm">Generating...</div>
            </div>
          )}
        </div>

        {/* Page URL */}
        <div className="px-5 pb-3">
          <p className="text-xs text-center text-muted-foreground truncate max-w-full">
            {typeof window !== "undefined" ? window.location.href : ""}
          </p>
        </div>

        {/* Actions */}
        <div
          className="grid grid-cols-2 divide-x divide-white/20"
          style={{ backgroundColor: "rgba(61, 42, 26, 0.04)" }}
        >
          <button
            type="button"
            onClick={handleDownload}
            className={cn(
              "flex items-center justify-center gap-2 px-4 py-3.5",
              "text-sm font-semibold text-[#3d2a1a] hover:bg-[#e9c559]/20",
              "transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#54bfa5]"
            )}
          >
            <Download className="h-4 w-4" />
            Download
          </button>
          <button
            type="button"
            onClick={handleCopyLink}
            className={cn(
              "flex items-center justify-center gap-2 px-4 py-3.5",
              "text-sm font-semibold text-[#3d2a1a] hover:bg-[#e9c559]/20",
              "transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#54bfa5]"
            )}
          >
            <Copy className="h-4 w-4" />
            Copy Link
          </button>
        </div>
      </div>

      <Toast {...toast} />
    </div>
  );
}