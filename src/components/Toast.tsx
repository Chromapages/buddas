"use client";

import { useCallback, useEffect, useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";

type ToastType = "success" | "error";
interface ToastState { message: string; type: ToastType; visible: boolean; }

export function Toast({ message, type, visible }: ToastState) {
  const Icon = type === "success" ? CheckCircle : XCircle;
  return <div className={`profile-toast ${type}`} role="status" aria-live="polite" aria-atomic="true">
    {visible && <div><Icon aria-hidden="true" size={20} /><span>{message}</span></div>}
  </div>;
}

export function useToast() {
  const [toast, setToast] = useState<ToastState>({ message: "", type: "success", visible: false });
  const showToast = useCallback((message: string, type: ToastType = "success") => setToast({ message, type, visible: true }), []);
  const hideToast = useCallback(() => setToast((previous) => ({ ...previous, visible: false })), []);
  useEffect(() => {
    if (!toast.visible) return;
    const timer = setTimeout(hideToast, toast.type === "error" ? 7000 : 4000);
    return () => clearTimeout(timer);
  }, [toast, hideToast]);
  return { toast, showToast, hideToast };
}
