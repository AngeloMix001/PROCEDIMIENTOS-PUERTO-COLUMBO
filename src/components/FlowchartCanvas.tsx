import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  Minimize2, 
  RotateCcw, 
  Crosshair, 
  Hand, 
  Move, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  UserCheck, 
  Layers, 
  ArrowRight, 
  X, 
  Search, 
  Info,
  ChevronRight,
  ShieldAlert,
  Building2,
  Truck,
  Wrench,
  HelpCircle,
  Download,
  Share2
} from 'lucide-react';
import { FlowchartItem, FlowchartNode } from '../types';

interface FlowchartCanvasProps {
  flowchart: FlowchartItem;
  flowchartsList: FlowchartItem[];
  onSelectFlowchart: (id: string) => void;
  onToast: (msg: string) => void;
}

export function FlowchartCanvas({
  flowchart,
  flowchartsList,
  onSelectFlowchart,
  onToast,
}: FlowchartCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Pan & Zoom state
  const [zoom, setZoom] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 80, y: 60 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Interaction Mode: 'pan' (move entire canvas) or 'dragNodes' (move nodes around)
  const [interactionMode, setInteractionMode] = useState<'pan' | 'dragNodes'>('dragNodes');

  // Dynamic node positions (movable nodes)
  const [nodePositions, setNodePositions] = useState<Record<string, { x: number; y: number }>>({});
  const [draggedNodeId, setDraggedNodeId] = useState<string | null>(null);
  const [dragNodeOffset, setDragNodeOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Selected node for detail drawer
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [nodeSearch, setNodeSearch] = useState<string>('');

  // Track if positions were modified
  const [hasMovedNodes, setHasMovedNodes] = useState(false);

  // Initialize node positions when flowchart changes
  useEffect(() => {
    const initialPos: Record<string, { x: number; y: number }> = {};
    flowchart.nodes.forEach((n) => {
      initialPos[n.id] = { x: n.x, y: n.y };
    });
    setNodePositions(initialPos);
    setHasMovedNodes(false);
    setSelectedNodeId(null);
    setPan({ x: 60, y: 50 });
    setZoom(0.9);
  }, [flowchart.id]);

  // Handle Canvas Pan (Mouse Events)
  const handleCanvasMouseDown = (e: React.MouseEvent) => {
    // If clicking on node or in dragNodes mode with a node target, let node drag take over
    if ((e.target as HTMLElement).closest('[data-node-id]')) {
      return;
    }

    if (e.button === 0 || e.button === 1) { // Left or middle click on empty canvas
      setIsPanning(true);
      setPanStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    }
  };

  const handleCanvasMouseMove = (e: React.MouseEvent) => {
    if (isPanning) {
      setPan({
        x: e.clientX - panStart.x,
        y: e.clientY - panStart.y,
      });
      return;
    }

    if (draggedNodeId) {
      const containerRect = containerRef.current?.getBoundingClientRect();
      if (!containerRect) return;

      // Calculate new node coordinates accounting for pan and zoom
      const mouseCanvasX = (e.clientX - containerRect.left - pan.x) / zoom;
      const mouseCanvasY = (e.clientY - containerRect.top - pan.y) / zoom;

      setNodePositions((prev) => ({
        ...prev,
        [draggedNodeId]: {
          x: Math.round(mouseCanvasX - dragNodeOffset.x),
          y: Math.round(mouseCanvasY - dragNodeOffset.y),
        },
      }));
      setHasMovedNodes(true);
    }
  };

  const handleCanvasMouseUp = () => {
    if (isPanning) setIsPanning(false);
    if (draggedNodeId) setDraggedNodeId(null);
  };

  // Handle Node Mouse Down (for dragging node)
  const handleNodeMouseDown = (e: React.MouseEvent, nodeId: string) => {
    e.stopPropagation();
    if (e.button !== 0) return; // Only left click

    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return;

    const currentPos = nodePositions[nodeId] || { x: 0, y: 0 };
    const mouseCanvasX = (e.clientX - containerRect.left - pan.x) / zoom;
    const mouseCanvasY = (e.clientY - containerRect.top - pan.y) / zoom;

    setDraggedNodeId(nodeId);
    setDragNodeOffset({
      x: mouseCanvasX - currentPos.x,
      y: mouseCanvasY - currentPos.y,
    });
  };

  // Wheel zoom
  const handleWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey || e.metaKey || e.altKey) {
      e.preventDefault();
      const delta = -e.deltaY * 0.0015;
      setZoom((prev) => Math.min(Math.max(0.4, prev + delta), 2.2));
    } else {
      // Pan with normal wheel
      setPan((prev) => ({
        x: prev.x - e.deltaX * 0.6,
        y: prev.y - e.deltaY * 0.6,
      }));
    }
  };

  // Zoom controls
  const handleZoomIn = () => setZoom((z) => Math.min(2.0, Number((z + 0.15).toFixed(2))));
  const handleZoomOut = () => setZoom((z) => Math.max(0.4, Number((z - 0.15).toFixed(2))));
  const handleResetView = () => {
    setZoom(0.9);
    setPan({ x: 60, y: 50 });
    onToast('Vista de lienzo centrada');
  };

  const handleResetPositions = () => {
    const initialPos: Record<string, { x: number; y: number }> = {};
    flowchart.nodes.forEach((n) => {
      initialPos[n.id] = { x: n.x, y: n.y };
    });
    setNodePositions(initialPos);
    setHasMovedNodes(false);
    onToast('Posiciones originales restablecidas');
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  // Selected node object
  const selectedNode = useMemo(() => {
    return flowchart.nodes.find((n) => n.id === selectedNodeId) || null;
  }, [selectedNodeId, flowchart.nodes]);

  // Center on a specific node
  const centerOnNode = (nodeId: string) => {
    const pos = nodePositions[nodeId];
    if (!pos || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setPan({
      x: rect.width / 2 - (pos.x + 100) * zoom,
      y: rect.height / 2 - (pos.y + 40) * zoom,
    });
    setSelectedNodeId(nodeId);
  };

  // Render SVG connector bezier lines between nodes
  const renderConnections = () => {
    return flowchart.connections.map((conn) => {
      const fromPos = nodePositions[conn.from];
      const toPos = nodePositions[conn.to];
      if (!fromPos || !toPos) return null;

      // Approximate dimensions of boxes: 200px wide, 80px high
      const nodeWidth = 200;
      const nodeHeight = 80;

      const isReverse = toPos.x < fromPos.x;
      const isVertical = Math.abs(toPos.y - fromPos.y) > 100 && Math.abs(toPos.x - fromPos.x) < 80;

      let startX: number;
      let startY: number;
      let endX: number;
      let endY: number;

      if (isVertical) {
        // Vertical connection
        startX = fromPos.x + nodeWidth / 2;
        startY = toPos.y > fromPos.y ? fromPos.y + nodeHeight : fromPos.y;
        endX = toPos.x + nodeWidth / 2;
        endY = toPos.y > fromPos.y ? toPos.y : toPos.y + nodeHeight;
      } else if (isReverse) {
        // Source connects from bottom/left to top/right
        startX = fromPos.x;
        startY = fromPos.y + nodeHeight / 2;
        endX = toPos.x + nodeWidth;
        endY = toPos.y + nodeHeight / 2;
      } else {
        // Standard left-to-right flow
        startX = fromPos.x + nodeWidth;
        startY = fromPos.y + nodeHeight / 2;
        endX = toPos.x;
        endY = toPos.y + nodeHeight / 2;
      }

      // Smooth cubic bezier calculation
      const dx = Math.abs(endX - startX);
      const cp1X = startX + Math.max(dx * 0.45, 40);
      const cp1Y = startY;
      const cp2X = endX - Math.max(dx * 0.45, 40);
      const cp2Y = endY;

      const pathData = `M ${startX} ${startY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${endX} ${endY}`;
      const midX = (startX + endX) / 2;
      const midY = (startY + endY) / 2 - 8;

      let strokeColor = '#003B6F';
      if (conn.condition === 'yes') strokeColor = '#16A34A';
      if (conn.condition === 'no') strokeColor = '#DC2626';

      return (
        <g key={conn.id} className="transition-all duration-75">
          {/* Outer glow line */}
          <path
            d={pathData}
            fill="none"
            stroke={strokeColor}
            strokeWidth="5"
            strokeOpacity="0.15"
          />
          {/* Main line with marker arrow */}
          <path
            d={pathData}
            fill="none"
            stroke={strokeColor}
            strokeWidth="2.5"
            strokeDasharray={conn.condition ? '4 2' : 'none'}
            markerEnd={
              conn.condition === 'yes'
                ? 'url(#arrow-green)'
                : conn.condition === 'no'
                ? 'url(#arrow-red)'
                : 'url(#arrow-blue)'
            }
          />
          {/* Label if decision condition */}
          {conn.label && (
            <g transform={`translate(${midX}, ${midY})`}>
              <rect
                x="-40"
                y="-11"
                width="80"
                height="20"
                rx="6"
                fill="#FFFFFF"
                stroke={strokeColor}
                strokeWidth="1.5"
                className="shadow-xs"
              />
              <text
                x="0"
                y="3"
                textAnchor="middle"
                fontSize="9"
                fontWeight="700"
                fill={strokeColor}
                className="select-none pointer-events-none font-sans"
              >
                {conn.label}
              </text>
            </g>
          )}
        </g>
      );
    });
  };

  // Node background styling by type
  const getNodeBadge = (type: FlowchartNode['type']) => {
    switch (type) {
      case 'start':
        return { label: 'INICIO', bg: 'bg-emerald-100 text-emerald-800 border-emerald-300' };
      case 'task':
        return { label: 'TAREA', bg: 'bg-sky-100 text-sky-800 border-sky-300' };
      case 'decision':
        return { label: 'DECISIÓN', bg: 'bg-amber-100 text-amber-900 border-amber-300' };
      case 'subprocess':
        return { label: 'SUBPROCESO', bg: 'bg-indigo-100 text-indigo-800 border-indigo-300' };
      case 'end':
        return { label: 'FIN DE FLUJO', bg: 'bg-rose-100 text-rose-800 border-rose-300' };
      default:
        return { label: 'ACTIVIDAD', bg: 'bg-slate-100 text-slate-800 border-slate-300' };
    }
  };

  return (
    <div className="space-y-4">
      {/* Top Selector: Operational Flowcharts */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider bg-amber-100 text-amber-900 border border-amber-300 rounded-sm">
                BPMN Interactivo
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {flowchartsList.length} Diagramas Oficiales Vigentes
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#003B6F]" />
              {flowchart.title}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono px-2.5 py-1 bg-[#E6F0FA] text-[#003B6F] font-bold rounded-lg border border-sky-200">
              {flowchart.code}
            </span>
            <span className="text-[11px] text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
              {flowchart.version}
            </span>
          </div>
        </div>

        {/* Quick Tabs to Switch Flowcharts */}
        <div className="flex items-center gap-2 overflow-x-auto pt-3 scrollbar-none text-xs">
          {flowchartsList.map((fc) => (
            <button
              key={fc.id}
              onClick={() => onSelectFlowchart(fc.id)}
              className={`px-3 py-2 rounded-xl font-medium whitespace-nowrap transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
                fc.id === flowchart.id
                  ? 'bg-[#003B6F] text-white shadow-xs'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
              }`}
            >
              <span className="font-mono text-[10px] opacity-75">{fc.code}</span>
              <span>{fc.category}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Flowchart Canvas Container */}
      <div
        ref={containerRef}
        className={`relative w-full h-[620px] bg-slate-900 rounded-2xl overflow-hidden shadow-lg border border-slate-700 select-none ${
          isFullscreen ? 'fixed inset-0 z-50 rounded-none h-screen' : ''
        }`}
        onMouseDown={handleCanvasMouseDown}
        onMouseMove={handleCanvasMouseMove}
        onMouseUp={handleCanvasMouseUp}
        onMouseLeave={handleCanvasMouseUp}
        onWheel={handleWheel}
        style={{ cursor: isPanning ? 'grabbing' : interactionMode === 'pan' ? 'grab' : 'default' }}
      >
        {/* Subtle Engineering Blueprint Grid */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: `
              radial-gradient(circle, #38BDF8 1px, transparent 1px),
              linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)
            `,
            backgroundSize: `24px 24px, ${40 * zoom}px ${40 * zoom}px, ${40 * zoom}px ${40 * zoom}px`,
            backgroundPosition: `${pan.x}px ${pan.y}px`,
          }}
        />

        {/* Top Interactive Notification / Hint Pill */}
        <div className="absolute top-4 left-4 z-20 flex flex-wrap items-center gap-2 pointer-events-auto">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-800/90 backdrop-blur-md rounded-xl border border-slate-700 text-xs text-slate-200 shadow-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400" />
            </span>
            <span className="font-semibold text-amber-300">Modo Interactivo:</span>
            <span className="hidden sm:inline text-slate-300">
              ¡Puedes arrastrar y mover cualquier bloque o arrastrar el lienzo!
            </span>
          </div>

          {hasMovedNodes && (
            <button
              onClick={handleResetPositions}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
              title="Restablecer posición inicial de los nodos"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restablecer Bloques</span>
            </button>
          )}
        </div>

        {/* Search inside nodes */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2 pointer-events-auto">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar etapa (ej: balanza, sello)..."
              value={nodeSearch}
              onChange={(e) => setNodeSearch(e.target.value)}
              className="bg-slate-800/90 text-xs text-white placeholder:text-slate-400 pl-8 pr-3 py-1.5 rounded-xl border border-slate-700 focus:border-amber-400 outline-none w-44 sm:w-56 backdrop-blur-md shadow-md"
            />
            {nodeSearch && (
              <button
                onClick={() => setNodeSearch('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        {/* Floating Zoom & Canvas Controls */}
        <div className="absolute bottom-4 left-4 z-20 flex items-center gap-1.5 p-1 bg-slate-800/90 backdrop-blur-md rounded-xl border border-slate-700 shadow-xl pointer-events-auto">
          <button
            onClick={() => setInteractionMode(interactionMode === 'dragNodes' ? 'pan' : 'dragNodes')}
            className={`flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              interactionMode === 'dragNodes'
                ? 'bg-amber-400 text-slate-900 shadow-xs'
                : 'text-slate-300 hover:bg-slate-700'
            }`}
            title="Cambiar entre mover bloques o mover lienzo"
          >
            {interactionMode === 'dragNodes' ? <Move className="w-3.5 h-3.5" /> : <Hand className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">
              {interactionMode === 'dragNodes' ? 'Mover Bloques' : 'Mover Lienzo'}
            </span>
          </button>

          <div className="h-4 w-px bg-slate-700 mx-1" />

          <button
            onClick={handleZoomOut}
            className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
            title="Reducir Zoom"
          >
            <ZoomOut className="w-4 h-4" />
          </button>

          <span className="text-xs font-mono font-bold text-slate-300 px-1 min-w-[42px] text-center">
            {Math.round(zoom * 100)}%
          </span>

          <button
            onClick={handleZoomIn}
            className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
            title="Aumentar Zoom"
          >
            <ZoomIn className="w-4 h-4" />
          </button>

          <button
            onClick={handleResetView}
            className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
            title="Centrar vista"
          >
            <Crosshair className="w-4 h-4" />
          </button>

          <button
            onClick={toggleFullscreen}
            className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
            title={isFullscreen ? 'Salir de pantalla completa' : 'Pantalla completa'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>

        {/* Scalable & Pannable Virtual Stage */}
        <div
          className="absolute inset-0 origin-top-left pointer-events-none"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          }}
        >
          {/* Swimlanes Background Canvas */}
          <div className="relative pointer-events-none" style={{ width: '1750px', height: '650px' }}>
            {flowchart.lanes.map((lane, idx) => (
              <div
                key={lane.id}
                className="absolute left-0 right-0 border-b border-slate-700/60 bg-slate-800/40 rounded-xl overflow-hidden"
                style={{
                  top: `${lane.y}px`,
                  height: `${lane.height}px`,
                  width: '1650px',
                }}
              >
                {/* Lane Header */}
                <div 
                  className="absolute left-0 top-0 bottom-0 w-44 px-3 py-2 flex flex-col justify-center border-r border-slate-700/80 bg-slate-800/90 text-white z-10 shadow-md"
                  style={{ borderLeft: `5px solid ${lane.color}` }}
                >
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                    {lane.role}
                  </span>
                  <h4 className="text-xs font-bold text-slate-100 leading-tight mt-0.5">
                    {lane.name}
                  </h4>
                </div>
              </div>
            ))}

            {/* SVG Connecting Flow Lines Layer */}
            <svg
              className="absolute inset-0 pointer-events-none z-10"
              style={{ width: '1750px', height: '650px', overflow: 'visible' }}
            >
              <defs>
                <marker
                  id="arrow-blue"
                  viewBox="0 0 10 10"
                  refX="9"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#003B6F" />
                </marker>
                <marker
                  id="arrow-green"
                  viewBox="0 0 10 10"
                  refX="9"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#16A34A" />
                </marker>
                <marker
                  id="arrow-red"
                  viewBox="0 0 10 10"
                  refX="9"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#DC2626" />
                </marker>
              </defs>

              {renderConnections()}
            </svg>

            {/* Interactive Draggable Nodes Layer */}
            {flowchart.nodes.map((node) => {
              const pos = nodePositions[node.id] || { x: node.x, y: node.y };
              const isSelected = selectedNodeId === node.id;
              const isDragging = draggedNodeId === node.id;
              const badgeInfo = getNodeBadge(node.type);

              const matchesSearch = nodeSearch.trim() !== '' && (
                node.label.toLowerCase().includes(nodeSearch.toLowerCase()) ||
                node.description.toLowerCase().includes(nodeSearch.toLowerCase()) ||
                node.role.toLowerCase().includes(nodeSearch.toLowerCase())
              );

              return (
                <div
                  key={node.id}
                  data-node-id={node.id}
                  onMouseDown={(e) => handleNodeMouseDown(e, node.id)}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedNodeId(node.id);
                  }}
                  className={`absolute z-20 pointer-events-auto rounded-xl p-3.5 transition-shadow duration-150 cursor-grab active:cursor-grabbing border ${
                    isSelected
                      ? 'ring-3 ring-amber-400 border-amber-400 bg-white shadow-2xl'
                      : matchesSearch
                      ? 'ring-3 ring-sky-400 border-sky-400 bg-white shadow-xl animate-pulse'
                      : 'border-slate-200 bg-white hover:border-[#003B6F] shadow-md hover:shadow-lg'
                  }`}
                  style={{
                    left: `${pos.x}px`,
                    top: `${pos.y}px`,
                    width: '200px',
                    minHeight: '80px',
                    transform: isDragging ? 'scale(1.04)' : 'scale(1)',
                    boxShadow: isDragging ? '0 20px 25px -5px rgba(0, 0, 0, 0.4)' : undefined,
                  }}
                >
                  {/* Top Node Header: Type Badge & Role */}
                  <div className="flex items-center justify-between gap-1 mb-1.5">
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-sm uppercase tracking-wide border ${badgeInfo.bg}`}>
                      {badgeInfo.label}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-500 truncate">
                      {node.role}
                    </span>
                  </div>

                  {/* Title / Action */}
                  <h4 className="text-xs font-bold text-slate-900 leading-snug line-clamp-2">
                    {node.label}
                  </h4>

                  {/* Move Grab Indicator */}
                  <div className="mt-2 pt-1 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <Move className="w-2.5 h-2.5 text-slate-400" />
                      Arrastrable
                    </span>
                    {node.sla && (
                      <span className="flex items-center gap-1 font-medium text-amber-700">
                        <Clock className="w-2.5 h-2.5" />
                        {node.sla}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Side Drawer: Detailed Node Inspector */}
        <AnimatePresence>
          {selectedNode && (
            <motion.div
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 300 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-0 right-0 bottom-0 w-80 sm:w-96 bg-white border-l border-slate-200 shadow-2xl z-30 flex flex-col pointer-events-auto overflow-hidden"
            >
              {/* Drawer Header */}
              <div className="px-5 py-4 bg-gradient-to-r from-[#002244] to-[#003B6F] text-white flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 text-[9px] font-bold uppercase bg-amber-400 text-slate-950 rounded-xs">
                      {selectedNode.type}
                    </span>
                    <span className="text-xs font-medium text-sky-200 truncate">
                      {selectedNode.role}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-white truncate">
                    {selectedNode.label}
                  </h3>
                </div>

                <button
                  onClick={() => setSelectedNodeId(null)}
                  className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Drawer Body */}
              <div className="p-5 space-y-4 overflow-y-auto flex-1 text-xs">
                {/* Description */}
                <div>
                  <h4 className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-[#003B6F]" />
                    Descripción Operativa
                  </h4>
                  <p className="text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200/70">
                    {selectedNode.description}
                  </p>
                </div>

                {/* Inputs / Required Documents */}
                {selectedNode.inputs && selectedNode.inputs.length > 0 && (
                  <div>
                    <h4 className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-sky-600" />
                      Documentación / Entradas Requeridas
                    </h4>
                    <div className="space-y-1.5">
                      {selectedNode.inputs.map((inp, i) => (
                        <div key={i} className="flex items-start gap-2 bg-sky-50/60 border border-sky-100 p-2 rounded-lg text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0 mt-0.5" />
                          <span>{inp}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Outputs / Results */}
                {selectedNode.outputs && selectedNode.outputs.length > 0 && (
                  <div>
                    <h4 className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      <ArrowRight className="w-3.5 h-3.5 text-emerald-600" />
                      Salidas & Resultados Operacionales
                    </h4>
                    <div className="space-y-1.5">
                      {selectedNode.outputs.map((out, i) => (
                        <div key={i} className="flex items-start gap-2 bg-emerald-50/60 border border-emerald-100 p-2 rounded-lg text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{out}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* SLA / Estimated Time */}
                {selectedNode.sla && (
                  <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">Tiempo Estimado (SLA)</div>
                      <div className="text-xs font-semibold text-amber-950">{selectedNode.sla}</div>
                    </div>
                  </div>
                )}

                {/* Center view on this node button */}
                <button
                  onClick={() => centerOnNode(selectedNode.id)}
                  className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Crosshair className="w-3.5 h-3.5 text-[#003B6F]" />
                  <span>Centrar este paso en pantalla</span>
                </button>
              </div>

              {/* Drawer Footer */}
              <div className="p-3 bg-slate-50 border-t border-slate-200 text-[11px] text-slate-500 text-center">
                Puerto Columbo Valparaíso • Sistema de Gestión de Procesos
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Process Information Bar & Instructions */}
      <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#003B6F]/10 text-[#003B6F] flex items-center justify-center shrink-0">
            <Info className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-slate-800">
              Instrucciones de Interacción con los Diagramas de Flujo
            </h4>
            <p className="text-slate-600 mt-0.5">
              • <strong>Mover elementos:</strong> Haz clic sobre cualquier bloque y arrástralo libremente para reorganizar el flujo. Las flechas recalculan su trayectoria automáticamente.
              <br />
              • <strong>Mover lienzo:</strong> Haz clic sobre el fondo oscuro y arrastra con el ratón o usa la rueda para desplazarte.
              <br />
              • <strong>Ver detalles del paso:</strong> Haz clic en cualquier bloque para ver requisitos documentales, roles, salidas y tiempos SLA.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end md:self-center shrink-0">
          <button
            onClick={handleResetPositions}
            className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-lg transition-colors cursor-pointer"
          >
            Restablecer Posición Original
          </button>
        </div>
      </div>
    </div>
  );
}
