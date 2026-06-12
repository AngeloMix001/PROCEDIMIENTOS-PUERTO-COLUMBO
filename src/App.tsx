import React, { useState } from 'react';
import {
  FileText,
  CheckSquare,
  Folder,
  Calendar,
  Eye,
  Download,
  Search,
  ChevronDown,
  ChevronUp,
  Building
} from 'lucide-react';

const proceduresData = [
  { id: 1, title: "Procedimientos Gate Control", category: "Gate Control", date: "Actual", type: "procedure" as const, steps: ["Paso 1: Verificar...", "Paso 2: Confirmar..."], pdfUrl: "https://res.cloudinary.com/djmo7ydpm/raw/upload/v1776862024/Gate_Control_version_001_ukl3jq.docx" },
  { id: 2, title: "Procedimientos CFS", category: "CFS", date: "Actual", type: "procedure" as const, steps: ["Paso 1: Recepcionar...", "Paso 2: Coordinar..."], pdfUrl: "https://res.cloudinary.com/djmo7ydpm/raw/upload/v1776862024/CFS_version_001_d5oi8r.docx" },
  { id: 3, title: "Procedimientos Almacén Patio", category: "Almacén Patio", date: "Actual", type: "procedure" as const, steps: ["Paso 1: Identificar...", "Paso 2: Segregar..."], pdfUrl: "https://res.cloudinary.com/djmo7ydpm/raw/upload/v1776862024/Almac%C3%A9n_Patio_version_001_lafumx.docx" },
  { id: 4, title: "Procedimientos Control Documentos", category: "Control Documentos", date: "Actual", type: "procedure" as const, steps: ["Paso 1: Activar alarma...", "Paso 2: Evacuar..."], pdfUrl: "https://res.cloudinary.com/djmo7ydpm/raw/upload/v1776862024/Control_Documentos_version_002_kxsihk.docx" },
  { id: 5, title: "Procedimientos Bodega", category: "Bodega", date: "Actual", type: "procedure" as const, steps: ["Paso 1: Iniciar...", "Paso 2: Registrar..."], pdfUrl: "https://res.cloudinary.com/djmo7ydpm/raw/upload/v1776862025/Bodega_version_001_qbzlws.docx" },
  { 
    id: 6, 
    title: "Procedimientos CMPC", 
    category: "CMPC", 
    date: "Actual", 
    type: "procedure" as const, 
    isFolder: true,
    badge: "CARPETA DE PROCEDIMIENTOS & FICHAS",
    subItems: [
      { id: "default-1", title: "CMPC - Proceso Operacional", date: "Actual", pdfUrl: "https://docs.google.com/document/d/1hwMHfc-LtSWlQmyw95_vlw6RWBTA-U4S/edit?usp=sharing&ouid=115558709160216474718&rtpof=true&sd=true" },
      { id: "default-2", title: "CMPC - Proceso Planificacion de Consolidados", date: "Actual", pdfUrl: "https://docs.google.com/document/d/1hcH1x2WwGFGUTQApYfL-Cyu9K3lJHa7y/edit?usp=sharing&ouid=115558709160216474718&rtpof=true&sd=true" },
      { id: "default-3", title: "CMPC - Proceso Recepcion de carga de productos", date: "Actual", pdfUrl: "https://docs.google.com/document/d/1q3CK7_HAvrokRjn4tZu6FYDHq3a2mWgk/edit?usp=sharing&ouid=115558709160216474718&rtpof=true&sd=true" },
      { id: "default-4", title: "CMPC - Proceso Almacenamiento de la carga", date: "Actual", pdfUrl: "https://docs.google.com/document/d/1iexYGXFjj5fqGlIrAyIEkTtHi5puvovu/edit?usp=sharing&ouid=115558709160216474718&rtpof=true&sd=true" },
      { id: "default-5", title: "CMPC - Proceso Picking de  carga", date: "Actual", pdfUrl: "https://docs.google.com/document/d/1Cj4a4iwTtt-7dzooBDPTZTfEvxWbmtK7/edit?usp=sharing&ouid=115558709160216474718&rtpof=true&sd=true" },
      { id: "default-6", title: "CMPC - Proceso Consolidacion de la carga", date: "Actual", pdfUrl: "https://docs.google.com/document/d/1WNVASqmJ5YuuInoTje9l2xIoOReudewG/edit?usp=sharing&ouid=115558709160216474718&rtpof=true&sd=true" },
      { id: "default-7", title: "CMPC - Proceso Despacho de Contenedor", date: "Actual", pdfUrl: "https://docs.google.com/document/d/1MR7Fwm2p6JdkZPCxsy8JyRSb0hqf3OOi/edit?usp=sharing&ouid=115558709160216474718&rtpof=true&sd=true" },
      { id: "default-8", title: "CMPC - Proceso Liquidacion de embarque", date: "Actual", pdfUrl: "https://docs.google.com/document/d/1l_tcGAfw7lWUBAXVOA3aROUmXPKmmjXE/edit?usp=sharing&ouid=115558709160216474718&rtpof=true&sd=true" },
      { id: "default-9", title: "CMPC - Procedimiento Operaciones", date: "Actual", pdfUrl: "https://docs.google.com/document/d/1EX4QZ2jsYFboBcof2bQNj24mGU4Ni-Gl/edit?usp=sharing&ouid=115558709160216474718&rtpof=true&sd=true" },
    ]
  },
  { id: 7, title: "Procedimiento Acuerdos Comerciales", category: "Área Comercial", date: "Actual", type: "procedure" as const, steps: ["Paso 1: Recepción y análisis de requerimientos del cliente para el acuerdo comercial", "Paso 2: Definición de tarifas, plazos, condiciones de pago and volumen proyectado", "Paso 3: Confección del borrador del acuerdo y validación jurídica/operativa", "Paso 4: Firma del acuerdo comercial, registro en el sistema y difusión a operaciones"], pdfUrl: "https://docs.google.com/document/d/1xyS6JuMp4xgBxDzdZXTepsz8BEzcfugF/edit?usp=sharing" },
  { id: 8, title: "Procedimiento Customer Service", category: "Customer Service", date: "Actual", type: "procedure" as const, steps: ["Paso 1: Recepción de requerimientos de clientes", "Paso 2: Verificación de factibilidad comercial y operativa", "Paso 3: Elaboración, validación y envío de oferta/cotización", "Paso 4: Confirmación del servicio y registro en sistema de control operativo"], pdfUrl: "https://docs.google.com/document/d/1hlLfLAFa637Znrt8oycVwLO1o_2KDM3L/edit?usp=sharing" },
];

const checklistsData = [
  { id: 1, title: "Check List Bodega", category: "Bodega", date: "Versión 001", type: "checklist" as const, steps: ["1. Verificar CFS...", "2. Enviar programación..."], pdfUrl: "https://drive.google.com/file/d/1-o7RkBU63e2kIn9vSeSpJZqkW93GvUZV/view?usp=sharing" },
  { id: 2, title: "Check List CFS", category: "CFS", date: "Versión 001", type: "checklist" as const, steps: ["1. Recepcionar listado...", "2. Coordinar retiro..."], pdfUrl: "https://drive.google.com/file/d/1gsCL7DzoLyiJZqwHpr8duIoXbn29lM9L/view?usp=sharing" },
  { id: 3, title: "Check List Gate Control", category: "Gate Control", date: "Versión 001", type: "checklist" as const, steps: ["1. Verificar Gate...", "2. Revisar sello..."], pdfUrl: "https://drive.google.com/file/d/1nCHLAlTD_yMgUqlWfWZOKLnGHYGeuuT_/view?usp=sharing" },
  { id: 4, title: "Check List Control Documentos", category: "Control Documentos", date: "Versión 002", type: "checklist" as const, steps: ["1. Revisar planificación...", "2. Identificar naves..."], pdfUrl: "https://drive.google.com/file/d/1-xrVViIgY2P66KgbjMSN32g645jepwHB/view?usp=sharing" },
  { id: 5, title: "Check List Almacén Patio", category: "Almacén Patio", date: "Versión 001", type: "checklist" as const, steps: ["1. Verificar contenedor...", "2. Confirmar contacto..."], pdfUrl: "https://drive.google.com/file/d/1PY0lVHuJwrxyKZY1COBBFh5EjpWC1GZy/view?usp=sharing" },
  { id: 6, title: "Check List Bodega - CMPC", category: "Bodega - CMPC", date: "Versión 001", type: "checklist" as const, pdfUrl: "https://drive.google.com/file/d/1u1jqAsxIMBhnPhhZLoeiBxzoABwiNFeF/view?usp=sharing" },
  { id: 7, title: "Check List Customer Service", category: "Customer Service", date: "Versión 001", type: "checklist" as const, pdfUrl: "https://drive.google.com/file/d/1cPx-MXcLaV1XbuFXkIvry3JNwM20xUjN/view?usp=sharing" },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'procedures' | 'checklists'>('procedures');
  const [searchQuery, setSearchQuery] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const filteredProcedures = proceduresData.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (item.subItems && item.subItems.some(sub => sub.title.toLowerCase().includes(searchQuery.toLowerCase())))
  );

  const filteredChecklists = checklistsData.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background font-body text-on-surface p-4 sm:p-8 md:p-12 max-w-5xl mx-auto">
      <header className="mb-8 sm:mb-12 border-b border-outline pb-6 sm:pb-8 flex items-center gap-4 sm:gap-6">
        <img src="https://res.cloudinary.com/djmo7ydpm/image/upload/v1776870967/logo-puerto_2xaaaaaaaaa_olrchx.png" alt="Puerto Columbo Logo" className="h-16 sm:h-20 w-auto" />
        <div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-headline tracking-tight text-primary uppercase">Puerto Columbo VALPARAÍSO</h1>
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-on-surface-variant mt-1 sm:mt-3">Sistema de Control Operativo</p>
        </div>
      </header>

      {/* Preview Modal */}
      {previewUrl && (
        <div className="fixed inset-0 z-50 bg-background/80 flex items-center justify-center p-2 sm:p-4">
          <div className="bg-surface w-full max-w-4xl h-[80vh] border border-outline p-2 sm:p-4 relative">
            <button 
              onClick={() => setPreviewUrl(null)} 
              className="absolute top-2 right-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-primary text-on-primary text-[10px] sm:text-xs uppercase"
            >
              Cerrar
            </button>
            <iframe 
              src={previewUrl.includes('drive.google.com') 
                ? previewUrl.replace('/view', '/preview') 
                : previewUrl.includes('docs.google.com')
                  ? previewUrl.split('/edit')[0] + '/preview'
                  : `https://docs.google.com/viewer?url=${encodeURIComponent(previewUrl)}&embedded=true`
              }
              className="w-full h-full mt-10" 
              title="Vista previa del documento"
            />
          </div>
        </div>
      )}

      <div className="relative mb-10">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
        <input
          type="text"
          placeholder="BUSCAR DOCUMENTOS O CATEGORÍAS..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-transparent border border-outline py-4 pl-12 pr-4 focus:border-primary text-xs uppercase tracking-widest outline-none transition-colors text-primary placeholder:text-on-surface-variant/50"
        />
      </div>

      <div className="flex gap-8 mb-10 border-b border-outline">
        <button
          className={`pb-4 text-xs md:text-sm uppercase tracking-widest transition-colors ${
            activeTab === 'procedures' 
              ? 'text-primary border-b border-primary' 
              : 'text-on-surface-variant hover:text-primary'
          }`}
          onClick={() => setActiveTab('procedures')}
        >
          Procedimientos
        </button>
        <button
          className={`pb-4 text-xs md:text-sm uppercase tracking-widest transition-colors ${
            activeTab === 'checklists' 
              ? 'text-primary border-b border-primary' 
              : 'text-on-surface-variant hover:text-primary'
          }`}
          onClick={() => setActiveTab('checklists')}
        >
          Check Lists
        </button>
      </div>

      <main>
        {activeTab === 'procedures' ? (
          <List items={filteredProcedures} emptyMessage="No se encontraron procedimientos." onPreview={(url) => setPreviewUrl(url)} />
        ) : (
          <List items={filteredChecklists} emptyMessage="No se encontraron check lists." onPreview={(url) => setPreviewUrl(url)} />
        )}
      </main>
    </div>
  );
}

function List({ items, emptyMessage, onPreview }: { items: any[], emptyMessage: string, onPreview: (url: string) => void }) {
  if (items.length === 0) {
    return (
      <div className="py-12 text-center text-on-surface-variant text-xs uppercase tracking-widest border border-outline border-dashed">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-in fade-in duration-500">
      {items.map(item => (
        <ItemCard 
          key={item.id}
          title={item.title} 
          category={item.category} 
          date={item.date} 
          type={item.type} 
          steps={item.steps}
          pdfUrl={item.pdfUrl}
          onPreview={onPreview}
          isFolder={item.isFolder}
          badge={item.badge}
          subItems={item.subItems}
        />
      ))}
    </div>
  );
}

function ItemCard({ 
  title, 
  category, 
  date, 
  type, 
  steps, 
  pdfUrl, 
  onPreview,
  isFolder,
  badge,
  subItems 
}: { 
  key?: React.Key;
  title: string; 
  category: string; 
  date: string; 
  type: 'procedure' | 'checklist'; 
  steps?: string[]; 
  pdfUrl?: string; 
  onPreview?: (url: string) => void; 
  isFolder?: boolean;
  badge?: string;
  subItems?: { id: string | number; title: string; date: string; pdfUrl?: string }[];
}) {
  const [isExpanded, setIsExpanded] = useState(isFolder ? true : false);
  let Icon = type === 'procedure' ? FileText : CheckSquare;
  if (title.includes("CFS") && type === 'procedure') {
    Icon = Building;
  }
  
  if (isFolder && subItems) {
    return (
      <div className={`bg-surface border transition-all ${isExpanded ? 'border-primary' : 'border-outline hover:border-primary'}`}>
        <div className="p-6 flex flex-col sm:flex-row sm:items-center gap-6">
          <div className="w-12 h-12 border border-outline flex items-center justify-center text-primary bg-surface-container-lowest shrink-0">
            <Folder className="w-5 h-5 text-primary" />
          </div>
          
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-2">
              <h4 className="font-headline text-xl text-primary font-normal">{title}</h4>
              {badge && (
                <span className="inline-flex items-center bg-[#E5EEF9] text-[#003B6F] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider">
                  {badge}
                </span>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-6 text-[10px] uppercase tracking-widest text-on-surface-variant">
              <span className="flex items-center gap-2"><Folder className="w-3 h-3" /> {category}</span>
              <span className="flex items-center gap-2"><Calendar className="w-3 h-3" /> {date}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3 mt-4 sm:mt-0">
            <button 
              className="p-3 border border-outline text-primary hover:bg-surface-container-highest transition-colors" 
              onClick={() => setIsExpanded(!isExpanded)}
              title={isExpanded ? "Contraer" : "Expandir"}
            >
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>
        
        {isExpanded && (
          <div className="px-6 pb-6 pt-6 border-t border-outline bg-background animate-in slide-in-from-top-2">
            {/* Folder Subheader */}
            <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4 pb-2 border-b border-outline gap-2">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-primary font-bold">
                <Folder className="w-4 h-4 text-primary" />
                <span>PROCEDIMIENTOS & FICHAS DE PROCEDIMIENTOS CMPC</span>
              </div>
              <span className="bg-[#ECE6F0] text-[#49454E] text-[10px] px-2 py-0.5 uppercase tracking-wider font-semibold self-start sm:self-auto">
                {subItems.length} DOCUMENTO(S)
              </span>
            </div>

            {/* Sub-items List */}
            <div className="space-y-3">
              {subItems.map((sub, idx) => (
                <div 
                  key={sub.id || idx} 
                  className="bg-surface border border-outline hover:border-primary p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 border border-outline flex items-center justify-center text-primary bg-surface-container-lowest shrink-0">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="font-headline text-sm font-bold text-primary uppercase">{sub.title}</h5>
                      <p className="text-[10px] text-on-surface-variant uppercase tracking-widest mt-0.5">{sub.date}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-2 sm:mt-0">
                    {sub.pdfUrl && (
                      <button 
                        onClick={() => onPreview && onPreview(sub.pdfUrl!)}
                        className="p-2.5 border border-outline text-primary hover:bg-surface-container-highest transition-colors flex items-center justify-center" 
                        title="Vista previa"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    )}
                    {sub.pdfUrl && (
                      <a 
                        href={sub.pdfUrl}
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 border border-outline text-primary hover:bg-surface-container-highest transition-colors flex items-center justify-center" 
                        title="Descargar"
                      >
                        <Download className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="group bg-surface border border-outline hover:border-primary transition-all">
      <div className="p-6 flex flex-col sm:flex-row sm:items-center gap-6">
        <div className="w-12 h-12 border border-outline flex items-center justify-center text-on-surface-variant bg-surface-container-lowest shrink-0">
          <Icon className="w-5 h-5" />
        </div>
        
        <div className="flex-1">
          <h4 className="font-headline text-xl text-primary mb-3">{title}</h4>
          <div className="flex flex-wrap items-center gap-6 text-[10px] uppercase tracking-widest text-on-surface-variant">
            <span className="flex items-center gap-2"><Folder className="w-3 h-3" /> {category}</span>
            <span className="flex items-center gap-2"><Calendar className="w-3 h-3" /> {date}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-3 mt-4 sm:mt-0">
          {pdfUrl && (
            <button 
              onClick={() => onPreview && onPreview(pdfUrl)}
              className="p-3 border border-outline text-primary hover:bg-surface-container-highest transition-colors" 
              title="Vista previa"
            >
              <Eye className="w-4 h-4" />
            </button>
          )}

          {pdfUrl && (
            <a 
              href={pdfUrl}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 border border-outline text-primary hover:bg-surface-container-highest transition-colors" 
              title="Descargar"
            >
              <Download className="w-4 h-4" />
            </a>
          )}

          {!pdfUrl && (
            <button 
              className="p-3 border border-outline text-primary hover:bg-surface-container-highest transition-colors" 
              onClick={() => setIsExpanded(!isExpanded)}
              title={isExpanded ? "Contraer" : "Expandir"}
            >
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          )}

        </div>
      </div>
      
      {isExpanded && steps && (
        <div className="px-6 pb-6 pt-0 border-t border-outline animate-in slide-in-from-top-2">
          <ul className="space-y-2 mt-4 text-sm text-on-surface-variant font-body">
            {steps.map((step, index) => (
              <li key={index} className="flex gap-3">
                <span className="text-primary">{index + 1}.</span>
                {step}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

