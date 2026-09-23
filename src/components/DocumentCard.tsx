import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  FileText, 
  CheckSquare, 
  Eye, 
  Download, 
  Copy, 
  Check, 
  Building2, 
  ShieldCheck, 
  Boxes, 
  FileCheck2, 
  Truck, 
  Wrench, 
  Headphones, 
  Calendar,
  Layers
} from 'lucide-react';
import { DocumentItem } from '../types';
import { downloadOfficialDocument, PTS_SGI_009_DATA } from '../data/officialDocumentContent';

interface DocumentCardProps {
  key?: string | number;
  item: DocumentItem;
  index: number;
  onPreview: (url: string, title: string, category: string, code?: string) => void;
  onToast: (msg: string) => void;
}

export function DocumentCard({ item, index, onPreview, onToast }: DocumentCardProps) {
  const [copied, setCopied] = useState(false);

  const getDepartmentIcon = (category: string, title: string) => {
    const text = (category + ' ' + title).toLowerCase();
    if (text.includes('gate control')) return Truck;
    if (text.includes('cfs')) return Building2;
    if (text.includes('bodega')) return Boxes;
    if (text.includes('control documentos')) return FileCheck2;
    if (text.includes('patio') || text.includes('almacén')) return Layers;
    if (text.includes('equipo') || text.includes('maquinaria')) return Wrench;
    if (text.includes('customer service')) return Headphones;
    if (text.includes('comercial')) return ShieldCheck;
    return item.type === 'procedure' ? FileText : CheckSquare;
  };

  const IconComponent = getDepartmentIcon(item.category, item.title);

  const isInternal = Boolean(item.pdfUrl?.startsWith('#') || item.code?.includes('PTS-SGI-009'));

  const handleCopyLink = () => {
    if (!item.pdfUrl) return;
    if (isInternal) {
      navigator.clipboard.writeText(`${window.location.origin}/#${item.code?.toLowerCase().replace(/\s+/g, '-')}`);
    } else {
      navigator.clipboard.writeText(item.pdfUrl);
    }
    setCopied(true);
    onToast(`Enlace copiado: ${item.title}`);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = (e: React.MouseEvent) => {
    if (isInternal) {
      e.preventDefault();
      downloadOfficialDocument(PTS_SGI_009_DATA);
      onToast(`Descargando documento oficial: ${item.title}`);
    }
  };

  const formatTag = item.fileType?.toUpperCase() || (item.pdfUrl?.includes('docx') ? 'DOCX' : 'PDF');

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.3), ease: [0.16, 1, 0.3, 1] }}
      className="group relative bg-white rounded-xl border border-slate-200/90 hover:border-[#003B6F]/40 shadow-xs hover:shadow-md transition-all duration-200 overflow-hidden"
    >
      {/* Top corporate accent strip on hover */}
      <div className="h-0.5 w-full bg-transparent group-hover:bg-gradient-to-r group-hover:from-[#003B6F] group-hover:to-amber-400 transition-all duration-300" />

      <div className="p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          
          {/* Main Info */}
          <div className="flex items-start gap-4 flex-1 min-w-0">
            {/* Department Icon Box */}
            <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200/90 flex items-center justify-center text-[#003B6F] group-hover:bg-[#003B6F] group-hover:text-white transition-colors duration-200 shrink-0 shadow-2xs">
              <IconComponent className="w-6 h-6" />
            </div>

            <div className="flex-1 min-w-0">
              {/* Category, Code & Badges */}
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                {item.code && (
                  <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-[#E6F0FA] text-[#003B6F] rounded-md border border-sky-200">
                    {item.code}
                  </span>
                )}
                <span className="px-2.5 py-0.5 text-[10px] uppercase font-semibold tracking-wider bg-slate-100 text-slate-700 rounded-md">
                  {item.category}
                </span>
                <span className="px-2 py-0.5 text-[10px] font-medium bg-amber-50 text-amber-800 border border-amber-200/60 rounded-md">
                  {formatTag}
                </span>
              </div>

              {/* Document Title */}
              <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#003B6F] transition-colors leading-snug">
                {item.title}
              </h3>

              {/* Description Snippet */}
              {item.description && (
                <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              )}

              {/* Date & Version */}
              <div className="flex items-center gap-4 mt-2.5 text-[11px] text-slate-500">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  {item.date}
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-emerald-700 font-medium">Oficial y Vigente</span>
              </div>
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="flex items-center gap-2 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100 shrink-0 self-end sm:self-center">
            {item.pdfUrl && (
              <button
                onClick={() => onPreview(item.pdfUrl!, item.title, item.category, item.code)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-[#003B6F] hover:bg-[#00264A] text-white shadow-xs hover:shadow-sm transition-all cursor-pointer"
                title="Abrir vista previa del documento"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Vista Previa</span>
              </button>
            )}

            {item.pdfUrl && (
              isInternal ? (
                <button
                  onClick={handleDownload}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                  title="Descargar documento oficial"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">Descargar</span>
                </button>
              ) : (
                <a
                  href={item.pdfUrl}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                  title="Descargar o abrir documento"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">Descargar</span>
                </a>
              )
            )}

            {item.pdfUrl && (
              <button
                onClick={handleCopyLink}
                className="p-2 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer"
                title="Copiar enlace directo"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            )}
          </div>

        </div>
      </div>
    </motion.div>
  );
}
