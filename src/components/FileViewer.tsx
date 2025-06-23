
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Copy, Download } from "lucide-react";
import { useAnalysis } from "@/contexts/AnalysisContext";
import { toast } from "@/hooks/use-toast";

const FileViewer = () => {
  const { selectedFile, fileContents } = useAnalysis();

  if (!selectedFile) {
    return (
      <Card className="bg-slate-800/50 border-slate-700 h-fit">
        <CardContent className="p-8 text-center">
          <FileText className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-white mb-2">No File Selected</h3>
          <p className="text-slate-400">Select a file from the explorer to view its content and analysis</p>
        </CardContent>
      </Card>
    );
  }

  const getFileExtension = (filename: string) => {
    return filename.split('.').pop()?.toLowerCase() || '';
  };

  const getLanguageFromExtension = (ext: string) => {
    const langMap: { [key: string]: string } = {
      'ts': 'typescript',
      'tsx': 'typescript',
      'js': 'javascript',
      'jsx': 'javascript',
      'css': 'css',
      'json': 'json',
      'md': 'markdown',
      'html': 'html',
      'py': 'python',
    };
    return langMap[ext] || 'text';
  };

  const fileContent = fileContents[selectedFile] || "// File content not available\n// This might be a binary file or the content couldn't be loaded";
  const ext = getFileExtension(selectedFile);
  const language = getLanguageFromExtension(ext);

  const handleCopyContent = () => {
    navigator.clipboard.writeText(fileContent);
    toast({
      title: "Content Copied",
      description: "File content has been copied to clipboard",
    });
  };

  const generateMockAnalysis = (filename: string, content: string) => {
    const ext = getFileExtension(filename);
    
    if (ext === 'tsx' || ext === 'jsx') {
      return "This is a React component written in TypeScript/JavaScript. It likely contains JSX elements and may use React hooks for state management and side effects.";
    } else if (ext === 'ts' || ext === 'js') {
      return "This is a TypeScript/JavaScript file that may contain utility functions, type definitions, or business logic.";
    } else if (ext === 'css') {
      return "This is a CSS file containing styles and layout definitions for the application.";
    } else if (ext === 'json') {
      return "This is a JSON configuration file containing structured data or configuration settings.";
    } else if (ext === 'md') {
      return "This is a Markdown file, likely containing documentation or README information.";
    }
    
    return "This file contains code or configuration that contributes to the overall functionality of the project.";
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-blue-400" />
            <CardTitle className="text-white">{selectedFile.split('/').pop()}</CardTitle>
            <Badge variant="secondary" className="bg-slate-700 text-slate-300">
              {language}
            </Badge>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopyContent}
              className="text-slate-400 hover:text-white"
            >
              <Copy className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-slate-400 hover:text-white"
            >
              <Download className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <CardDescription className="text-slate-400">
          {selectedFile}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="bg-slate-900/50 rounded-lg p-4 overflow-x-auto">
          <pre className="text-sm text-slate-300 font-mono whitespace-pre-wrap">
            <code>{fileContent}</code>
          </pre>
        </div>
        
        <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <h4 className="font-semibold text-blue-400 mb-2">AI Analysis</h4>
          <p className="text-slate-300 text-sm">
            {generateMockAnalysis(selectedFile, fileContent)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default FileViewer;
