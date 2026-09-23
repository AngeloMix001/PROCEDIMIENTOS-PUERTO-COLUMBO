import { ShieldCheck, Anchor, ExternalLink } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-16 bg-slate-900 text-slate-400 border-t border-slate-800 text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-slate-800">
          
          {/* Identity */}
          <div>
            <div className="flex items-center gap-3 text-white font-bold text-sm mb-3">
              <div className="w-7 h-7 rounded-lg bg-[#003B6F] flex items-center justify-center text-amber-400">
                <Anchor className="w-4 h-4" />
              </div>
              <span className="tracking-wide uppercase">Puerto Columbo Valparaíso</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs">
              Depósito y Terminal Portuario Extraportuario. Sistema Centralizado de Procedimientos Operativos, Protocolos de Seguridad y Check Lists de Control.
            </p>
          </div>

          {/* Standards & Security */}
          <div>
            <h4 className="text-slate-200 font-bold uppercase tracking-wider text-[11px] mb-3 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Estándares de Calidad & Seguridad
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Gestión de Calidad ISO 9001:2015</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>Estándar de Seguridad de la Cadena de Suministro BASC</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                <span>Cumplimiento Normativo Aduanero y Directivas Marítimas</span>
              </li>
            </ul>
          </div>

          {/* Quick Notice */}
          <div>
            <h4 className="text-slate-200 font-bold uppercase tracking-wider text-[11px] mb-3">
              Aviso Operativo
            </h4>
            <p className="text-slate-400 leading-relaxed text-xs">
              Los documentos normativos aquí publicados corresponden a las versiones oficiales vigentes aprobadas por la Gerencia de Operaciones de Puerto Columbo.
            </p>
            <div className="mt-3 inline-flex items-center gap-2 px-2.5 py-1 bg-slate-800/80 rounded-md text-[11px] text-slate-300 border border-slate-700/60">
              <span>Revisión Documental: 2026</span>
              <span>•</span>
              <span className="text-emerald-400 font-medium">100% Homologado</span>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div className="text-center sm:text-left">
            <p>© {currentYear} Puerto Columbo S.A. Todos los derechos reservados. Sede Valparaíso, Chile.</p>
            <p className="mt-1 text-slate-400 font-medium">Creado por Ángel Gutiérrez González by Rela Solutions</p>
          </div>
          <p className="flex items-center gap-2">
            <span>Sistema de Control Operativo VAP</span>
            <span>•</span>
            <span className="text-slate-400">Edición Corporativa</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
