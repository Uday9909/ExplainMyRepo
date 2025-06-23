
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FileNode {
  name: string;
  type: 'file' | 'folder';
  children?: FileNode[];
  path: string;
  content?: string;
}

interface AnalysisContextType {
  selectedFile: string | null;
  setSelectedFile: (path: string | null) => void;
  fileStructure: FileNode | null;
  setFileStructure: (structure: FileNode | null) => void;
  analysisResults: any;
  setAnalysisResults: (results: any) => void;
  isAnalyzing: boolean;
  setIsAnalyzing: (analyzing: boolean) => void;
  fileContents: { [path: string]: string };
  setFileContents: (contents: { [path: string]: string }) => void;
}

const AnalysisContext = createContext<AnalysisContextType | undefined>(undefined);

export const useAnalysis = () => {
  const context = useContext(AnalysisContext);
  if (!context) {
    throw new Error('useAnalysis must be used within an AnalysisProvider');
  }
  return context;
};

interface AnalysisProviderProps {
  children: ReactNode;
}

export const AnalysisProvider: React.FC<AnalysisProviderProps> = ({ children }) => {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [fileStructure, setFileStructure] = useState<FileNode | null>(null);
  const [analysisResults, setAnalysisResults] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [fileContents, setFileContents] = useState<{ [path: string]: string }>({});

  return (
    <AnalysisContext.Provider
      value={{
        selectedFile,
        setSelectedFile,
        fileStructure,
        setFileStructure,
        analysisResults,
        setAnalysisResults,
        isAnalyzing,
        setIsAnalyzing,
        fileContents,
        setFileContents,
      }}
    >
      {children}
    </AnalysisContext.Provider>
  );
};
