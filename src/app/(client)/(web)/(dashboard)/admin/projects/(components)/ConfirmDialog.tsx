"use client";

import { AlertTriangle, X } from "lucide-react";

type ConfirmDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isDestructive?: boolean;
};

export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Delete",
  cancelText = "Cancel",
  isDestructive = true,
}: ConfirmDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/45 backdrop-blur-xs" onClick={onClose} />

      <div className="relative z-10 w-full max-w-md rounded-2xl border border-gray-100 bg-white p-6 shadow-xl">
        <div className="flex items-start gap-4">
          <div
            className={`shrink-0 rounded-xl p-3 ${
              isDestructive ? "bg-red-50 text-red-600" : "bg-blue-50 text-blue-600"
            }`}
          >
            <AlertTriangle size={22} />
          </div>

          <div className="flex-1">
            <h3 className="text-base font-extrabold text-gray-900">{title}</h3>
            <p className="mt-2 text-xs font-medium leading-relaxed text-gray-500">
              {message}
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-1 text-gray-400 hover:bg-gray-50 hover:text-gray-600"
          >
            <X size={16} />
          </button>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-xs font-bold text-gray-600 hover:bg-gray-50"
          >
            {cancelText}
          </button>

          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`rounded-xl px-4.5 py-2.5 text-xs font-bold text-white ${
              isDestructive
                ? "bg-[#e31b23] hover:bg-[#ff2d35]"
                : "bg-blue-600 hover:bg-blue-500"
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
