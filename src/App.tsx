import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SearchX, RefreshCw } from 'lucide-react';
import { proceduresData, checklistsData } from './data/documents';
import { flowchartsData } from './data/flowcharts';
import { DocumentType, DocumentItem } from './types';
import { Header } from './components/Header';
import { Toolbar } from './components/Toolbar';
import { DocumentCard } from './components/DocumentCard';
import { FolderCard } from './components/FolderCard';
import { FlowchartCanvas } from './components/FlowchartCanvas';
import { PreviewModal } from './components/PreviewModal';
import { Toast } from './components/Toast';
import { Footer } from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState<DocumentType>('procedure');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedFlowchartId, setSelectedFlowchartId] = useState<string>(flowchartsData[0].id);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Preview Modal state
  const [previewState, setPreviewState] = useState<{
    url: string | null;
    title: string;
    category: string;
    code?: string;
  }>({
    url: null,
    title: '',
    category: '',
    code: '',
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const handleOpenPreview = (url: string, title: string, category: string, code?: string) => {
    setPreviewState({ url, title, category, code });
  };

  const handleClosePreview = () => {
    setPreviewState({ url: null, title: '', category: '', code: '' });
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    showToast('Filtros restablecidos');
  };

  // Base list depending on active tab (for documents)
  const currentBaseList: DocumentItem[] = useMemo(() => {
    return activeTab === 'procedure' ? proceduresData : checklistsData;
  }, [activeTab]);

  // Unique categories for current tab
  const categories = useMemo(() => {
    const set = new Set<string>();
    currentBaseList.forEach((item) => {
      if (item.category) set.add(item.category);
    });
    return Array.from(set);
  }, [currentBaseList]);

  // Filtered documents
  const filteredItems = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return currentBaseList.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }

      // Search query filter
      if (!q) return true;

      const titleMatch = item.title.toLowerCase().includes(q);
      const catMatch = item.category.toLowerCase().includes(q);
      const codeMatch = item.code ? item.code.toLowerCase().includes(q) : false;
      const descMatch = item.description ? item.description.toLowerCase().includes(q) : false;
      const stepsMatch = item.steps ? item.steps.some((s) => s.toLowerCase().includes(q)) : false;
      const subItemsMatch = item.subItems
        ? item.subItems.some(
            (sub) =>
              sub.title.toLowerCase().includes(q) ||
              (sub.code && sub.code.toLowerCase().includes(q))
          )
        : false;

      return titleMatch || catMatch || codeMatch || descMatch || stepsMatch || subItemsMatch;
    });
  }, [currentBaseList, selectedCategory, searchQuery]);

  // Filtered Flowcharts
  const filteredFlowcharts = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return flowchartsData;

    return flowchartsData.filter(
      (fc) =>
        fc.title.toLowerCase().includes(q) ||
        fc.code.toLowerCase().includes(q) ||
        fc.category.toLowerCase().includes(q) ||
        fc.description.toLowerCase().includes(q) ||
        fc.nodes.some((n) => n.label.toLowerCase().includes(q) || n.role.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  // Active Flowchart
  const currentFlowchart = useMemo(() => {
    const found = filteredFlowcharts.find((f) => f.id === selectedFlowchartId);
    return found || filteredFlowcharts[0] || flowchartsData[0];
  }, [filteredFlowcharts, selectedFlowchartId]);

  const cmpcCount = useMemo(() => {
    const cmpcItem = proceduresData.find((p) => p.isFolder);
    return cmpcItem?.subItems?.length || 9;
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-body text-slate-900 flex flex-col maritime-grid">
      {/* Executive Header */}
      <Header
        proceduresCount={proceduresData.length}
        checklistsCount={checklistsData.length}
        cmpcCount={cmpcCount}
        flowchartsCount={flowchartsData.length}
      />

      {/* Main Content Workspace */}
      <main className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex-1">
        {/* Interactive Controls & Filters */}
        <Toolbar
          activeTab={activeTab}
          onTabChange={(tab) => {
            setActiveTab(tab);
            setSelectedCategory('all');
          }}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          categories={categories}
          proceduresCount={proceduresData.length}
          checklistsCount={checklistsData.length}
          flowchartsCount={flowchartsData.length}
          totalFiltered={activeTab === 'flowchart' ? filteredFlowcharts.length : filteredItems.length}
          totalItems={activeTab === 'flowchart' ? flowchartsData.length : currentBaseList.length}
          onResetFilters={handleResetFilters}
        />

        {/* Tab 3: Interactive Flowcharts View */}
        {activeTab === 'flowchart' ? (
          filteredFlowcharts.length > 0 ? (
            <motion.div
              key="flowchart-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <FlowchartCanvas
                flowchart={currentFlowchart}
                flowchartsList={filteredFlowcharts}
                onSelectFlowchart={(id) => setSelectedFlowchartId(id)}
                onToast={showToast}
              />
            </motion.div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-xs">
              <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4 text-slate-400">
                <SearchX className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">
                No se encontraron diagramas de flujo
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto mb-6">
                No existen flujogramas que coincidan con la búsqueda "{searchQuery}".
              </p>
              <button
                onClick={handleResetFilters}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#003B6F] hover:bg-[#00264A] text-white text-xs font-semibold rounded-xl transition-all shadow-xs cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Restablecer Filtros</span>
              </button>
            </div>
          )
        ) : (
          /* Document List with Fluid Transitions */
          <AnimatePresence mode="wait">
            {filteredItems.length > 0 ? (
              <motion.div
                key={`${activeTab}-${selectedCategory}-${searchQuery}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                {filteredItems.map((item, index) =>
                  item.isFolder ? (
                    <FolderCard
                      key={item.id}
                      item={item}
                      index={index}
                      onPreview={handleOpenPreview}
                      onToast={showToast}
                    />
                  ) : (
                    <DocumentCard
                      key={item.id}
                      item={item}
                      index={index}
                      onPreview={handleOpenPreview}
                      onToast={showToast}
                    />
                  )
                )}
              </motion.div>
            ) : (
              <motion.div
                key="empty-state"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-xs"
              >
                <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4 text-slate-400">
                  <SearchX className="w-7 h-7" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1">
                  No se encontraron documentos oficiales
                </h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto mb-6">
                  No existen registros que coincidan con la búsqueda "{searchQuery}" o la categoría seleccionada en este apartado.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#003B6F] hover:bg-[#00264A] text-white text-xs font-semibold rounded-xl transition-all shadow-xs cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Restablecer Filtros</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </main>

      {/* Embedded Document Preview Modal */}
      <PreviewModal
        url={previewState.url}
        title={previewState.title}
        category={previewState.category}
        code={previewState.code}
        onClose={handleClosePreview}
        onToast={showToast}
      />

      {/* Toast Feedback */}
      <Toast message={toastMessage} />

      {/* Institutional Footer */}
      <Footer />
    </div>
  );
}

