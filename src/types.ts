export type DocumentType = 'procedure' | 'checklist' | 'flowchart';

export interface SubDocument {
  id: string;
  code?: string;
  title: string;
  category?: string;
  date: string;
  pdfUrl: string;
  fileType?: 'docx' | 'pdf' | 'drive' | 'gdoc';
}

export interface DocumentItem {
  id: string;
  code?: string;
  title: string;
  category: string;
  date: string;
  type: DocumentType;
  pdfUrl?: string;
  fileType?: 'docx' | 'pdf' | 'drive' | 'gdoc';
  steps?: string[];
  isFolder?: boolean;
  badge?: string;
  subItems?: SubDocument[];
  description?: string;
}

export interface FlowchartNode {
  id: string;
  label: string;
  role: string;
  type: 'start' | 'task' | 'decision' | 'end' | 'subprocess';
  description: string;
  x: number;
  y: number;
  inputs?: string[];
  outputs?: string[];
  sla?: string;
}

export interface FlowchartConnection {
  id: string;
  from: string;
  to: string;
  label?: string;
  condition?: 'yes' | 'no' | 'default';
}

export interface FlowchartLane {
  id: string;
  name: string;
  color: string;
  role: string;
  y: number;
  height: number;
}

export interface FlowchartItem {
  id: string;
  code: string;
  title: string;
  category: string;
  description: string;
  version: string;
  estimatedTime?: string;
  lanes: FlowchartLane[];
  nodes: FlowchartNode[];
  connections: FlowchartConnection[];
}

export type ViewMode = 'cards' | 'compact';

