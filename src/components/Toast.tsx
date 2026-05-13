"use client";

import * as React from "react";
import { CheckCircle, XCircle } from "lucide-react";

type ToastType = "success" | "error";

interface ToastProps {
  message: string;
  type: ToastType;
  visible: boolean;
}

export function Toast({ message, type, visible }: ToastProps) {
  if (!visible) return null;

  const isSuccess = type === "success";

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-full max-w-md px-4 animate-slide-up">
      <div
        className={`
          flex items-center gap-3 rounded-xl px-4 py-3 shadow-lg ring-1
          ${isSuccess
            ? "bg-[#54bfa5]/10 ring-[#54bfa5]/20"
            : "bg-red-50 ring-red-200"
          }
        `}
      >
        {isSuccess ? (
          <CheckCircle className="h-5 w-5 text-[#54bfa5] shrink-0" />
        ) : (
          <XCircle className="h-5 w-5 text-red-500 shrink-0" />
        )}
        <span
          className={`
            text-sm font-medium
            ${isSuccess ? "text-[#5a3a1f]" : "text-red-700"}
          `}
        >
          {message}
        </span>
      </div>
    </div>
  );
}

interface ToastState {
  visible: boolean;
  message: string;
  type: ToastType;
}

export function useToast() {
  const [toast, setToast] = React.useState<ToastState>({
    visible: false,
    message: "",
    type: "success",
  });

  const showToast = React.useCallback((message: string, type: ToastType = "success") => {
    setToast({ visible: true, message, type });
  }, []);

  const hideToast = React.useCallback(() => {
    setToast((prev) => ({ ...prev, visible: false }));
  }, []);

  return { toast, showToast, hideToast };
}