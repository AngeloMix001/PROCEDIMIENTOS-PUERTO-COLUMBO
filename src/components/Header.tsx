import { motion } from 'motion/react';
import { ShieldCheck, FileText, CheckSquare, Layers, Clock } from 'lucide-react';

interface HeaderProps {
  proceduresCount: number;
  checklistsCount: number;
  cmpcCount: number;
}

export function Header({ proceduresCount, checklistsCount, cmpcCount }: HeaderProps) {
  return (
    <header className="relative bg-gradient-to-b from-[#002244] via-[#003B6F] to-[#002E59] text-white border-b border-sky-950/40 shadow-xl">
      {/* Subtle background glow effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(3,102,181,0.25),transparent_60%)] pointer-events-none" />
      
      {/* Decorative top accent line */}
      <div className="h-1 w-full bg-gradient-to-r from-amber-400 via-sky-400 to-[#003B6F]" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          
          {/* Brand identity */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex items-center gap-4 sm:gap-6"
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-400/30 to-sky-400/30 rounded-2xl blur-xs opacity-75 group-hover:opacity-100 transition duration-300" />
              <div className="relative bg-white p-2.5 sm:p-3 rounded-xl shadow-lg border border-white/20">
                <img 
                  src="https://res.cloudinary.com/djmo7ydpm/image/upload/v1776870967/logo-puerto_2xaaaaaaaaa_olrchx.png" 
                  alt="Puerto Columbo Logo" 
                  className="h-12 sm:h-14 w-auto object-contain"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2.5 mb-1">
                <span className="px-2 py-0.5 text-[10px] uppercase font-bold tracking-widest bg-amber-400/20 text-amber-300 border border-amber-400/40 rounded-sm">
                  Valparaíso
                </span>
                <span className="flex items-center gap-1.5 text-[11px] font-medium text-sky-200">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                  </span>
                  Sistema Operativo Vigente
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-headline font-bold tracking-tight text-white flex items-center gap-2">
                PUERTO COLUMBO
              </h1>
              <p className="text-xs sm:text-sm font-light tracking-wide text-sky-100/90 mt-0.5">
                Sistema Integral de Control Operativo y Normativa Técnica
              </p>
            </div>
          </motion.div>

          {/* Institutional KPI Badges */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="flex flex-wrap items-center gap-2.5 sm:gap-3"
          >
            <div className="flex items-center gap-3 px-3.5 py-2 rounded-xl bg-white/10 border border-white/15 backdrop-blur-md">
              <div className="p-2 rounded-lg bg-sky-500/20 text-sky-300">
                <FileText className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-white">{proceduresCount}</div>
                <div className="text-[10px] text-sky-200 uppercase tracking-wider">Procedimientos</div>
              </div>
            </div>

            <div className="flex items-center gap-3 px-3.5 py-2 rounded-xl bg-white/10 border border-white/15 backdrop-blur-md">
              <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-300">
                <CheckSquare className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-white">{checklistsCount}</div>
                <div className="text-[10px] text-emerald-200 uppercase tracking-wider">Check Lists</div>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-3 px-3.5 py-2 rounded-xl bg-white/10 border border-white/15 backdrop-blur-md">
              <div className="p-2 rounded-lg bg-amber-500/20 text-amber-300">
                <Layers className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-white">{cmpcCount}</div>
                <div className="text-[10px] text-amber-200 uppercase tracking-wider">Fichas CMPC</div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </header>
  );
}
