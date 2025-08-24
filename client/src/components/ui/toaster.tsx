// client/src/components/ui/toaster.tsx
import React from "react";
import { Toaster as SonnerToaster, toast as sonnerToast } from "sonner";

/**
 * App-wide toast container. Place once near the root (you already do this in App.tsx).
 */
export function Toaster() {
  return (
    <SonnerToaster
      position="top-center"
      theme="system"
      richColors
      closeButton
      toastOptions={{
        duration: 3000,
      }}
    />
  );
}

/**
 * Re-export the toast API so you can:  import { toast } from "@/components/ui/toaster"
 * Examples:
 *   toast.success("Saved");
 *   toast.error("Something went wrong", { description: "Try again in a moment." });
 */
export const toast = sonnerToast;

export default Toaster;
