export type DocumentType = 'procedure' | 'checklist';

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

export type ViewMode = 'cards' | 'compact';
