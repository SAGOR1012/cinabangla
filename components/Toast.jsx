"use client";
import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";
export default function Toast() {
  const { toast } = useStore();
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-[70] flex justify-center px-4" role="status" aria-live="polite">
      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }}
            className="pointer-events-auto flex items-center gap-3 rounded bg-ink px-4 py-3 text-sm text-white shadow-lift">
            <Check size={16} className="text-green-400" aria-hidden /> {toast}
            <Link href="/cart" className="font-semibold underline underline-offset-2">View cart</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
