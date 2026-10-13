"use client";

import { useEffect, useRef, useState } from "react";
import { Copy, Download, X } from "lucide-react";
import { Toast, useToast } from "./Toast";

export function QRModal({ isOpen, onClose, url, brandName }: {
  isOpen: boolean; onClose: () => void; url: string; brandName: string;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [qrDataUrl, setQrDataUrl] = useState("");
  const [error, setError] = useState(false);
  const { toast, showToast } = useToast();
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !isOpen) return;
    const previousFocus = document.activeElement;
    dialog.showModal();
    return () => { dialog.close(); if (previousFocus instanceof HTMLElement) previousFocus.focus(); };
  }, [isOpen]);
  useEffect(() => {
    if (!isOpen) return;
    let active = true;
    setQrDataUrl("");
    setError(false);
    import("qrcode").then((module) => module.default.toDataURL(url, {
      width: 280, margin: 3, color: { dark: "#123d32", light: "#ffffff" },
    })).then((data) => { if (active) setQrDataUrl(data); }).catch(() => { if (active) setError(true); });
    return () => { active = false; };
  }, [isOpen, url]);
  async function copyLink() {
    try { await navigator.clipboard.writeText(url); showToast("Link copied."); }
    catch { showToast("Couldn't copy. You can select and copy the link below.", "error"); }
  }
  return <dialog ref={dialogRef} className="qr-dialog" aria-labelledby="qr-heading" aria-describedby="qr-description" onCancel={(event) => { event.preventDefault(); onClose(); }} onClick={(event) => {
    if (event.target !== event.currentTarget) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) onClose();
  }}>
    <div className="qr-heading"><h2 id="qr-heading">Share {brandName}</h2><button autoFocus type="button" onClick={onClose} aria-label="Close QR code"><X aria-hidden="true" size={20} /></button></div>
    <p id="qr-description">Scan to open this page.</p>
    <div className="qr-image">{qrDataUrl ? <img src={qrDataUrl} alt={`QR code for ${brandName}`} width={280} height={280} /> : <p role={error ? "alert" : "status"}>{error ? "Couldn't generate the QR code. Close and try again, or copy the link." : "Generating QR code…"}</p>}</div>
    <p className="qr-url">{url}</p>
    <div className="qr-actions">{qrDataUrl && <a className="secondary-link" href={qrDataUrl} download="restaurant-profile-qr.png"><Download aria-hidden="true" size={18} />Download QR</a>}<button className="secondary-link" type="button" onClick={copyLink}><Copy aria-hidden="true" size={18} />Copy link</button></div>
    <Toast {...toast} />
  </dialog>;
}
