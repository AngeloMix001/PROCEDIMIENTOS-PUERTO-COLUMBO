import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

interface ToastProps {
  message: string | null;
  type?: 'success' | 'info' | 'error';
}

export function Toast({ message, type = 'success' }: ToastProps) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 15, scale: 0.95 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 right-6 z-50 pointer-events-none"
        >
          <div className="flex items-center gap-3 px-5 py-3.5 bg-slate-900/95 text-white rounded-xl shadow-xl shadow-slate-950/20 border border-slate-700/60 backdrop-blur-md">
            {type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
            {type === 'error' && <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />}
            {type === 'info' && <Info className="w-4 h-4 text-sky-400 shrink-0" />}
            <span className="text-xs font-medium tracking-wide text-slate-100">{message}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
