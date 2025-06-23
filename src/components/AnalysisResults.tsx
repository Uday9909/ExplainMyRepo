
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronRight, Github, ArrowUp, FileText, Info } from "lucide-react";
import { useState } from "react";

const AnalysisResults = () => {
  const [openSections, setOpenSections] = useState<Set<string>>(new Set(["overview", "structure"]));

  const toggleSection = (section: string) => {
    const newOpenSections = new Set(openSections);
    if (newOpenSections.has(section)) {
      newOpenSections.delete(section);
    } else {
      newOpenSections.add(section);
    }
    setOpenSections(newOpenSections);
  };

  const techStack = [
    "React", "TypeScript", "Vite", "CSS", "HTML"
  ];

  const keyFiles = [
    { name: "App.tsx", description: "Main application component with todo state management" },
    { name: "TodoList.tsx", description: "Renders list of todo items with filtering capabilities" },
    { name: "useTodos.ts", description: "Custom hook for todo operations and state management" },
    { name: "useLocalStorage.ts", description: "Hook for persisting data to browser storage" },
  ];

  const improvements = [
    "Add TypeScript interfaces for better type safety",
    "Implement error boundaries for better error handling",
    "Add unit tests for components and hooks",
    "Consider using React Query for better state management",
    "Add accessibility attributes for better UX"
  ];

  return (
    <div className="space-y-6">
      {/* Project Overview */}
      <Collapsible open={openSections.has("overview")} onOpenChange={() => toggleSection("overview")}>
        <Card className="bg-slate-800/50 border-slate-700">
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-slate-700/30 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Info className="w-5 h-5 text-blue-400" />
                  <CardTitle className="text-white">Project Overview</CardTitle>
                </div>
                {openSections.has("overview") ? (
                  <ChevronDown className="w-5 h-5 text-slate-400" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-slate-400" />
                )}
              </div>
              <CardDescription className="text-slate-400">
                AI-generated summary of the project's purpose and functionality
              </CardDescription>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent>
              <div className="prose prose-invert max-w-none">
                <p className="text-slate-300 leading-relaxed mb-4">
                  This is a <strong>Todo List Application</strong> built with React and TypeScript. The application 
                  allows users to create, manage, and organize their daily tasks with a clean and intuitive interface.
                </p>
                <p className="text-slate-300 leading-relaxed mb-4">
                  Key features include adding new todos, marking them as complete, filtering by status, and 
                  persisting data using browser local storage. The app follows modern React patterns with 
                  custom hooks for state management and separation of concerns.
                </p>
                <div className="flex flex-wrap gap-2">
                  {techStack.map((tech) => (
                    <Badge key={tech} variant="secondary" className="bg-slate-700 text-slate-300">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* Project Structure */}
      <Collapsible open={openSections.has("structure")} onOpenChange={() => toggleSection("structure")}>
        <Card className="bg-slate-800/50 border-slate-700">
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-slate-700/30 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-purple-400" />
                  <CardTitle className="text-white">Architecture & Structure</CardTitle>
                </div>
                {openSections.has("structure") ? (
                  <ChevronDown className="w-5 h-5 text-slate-400" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-slate-400" />
                )}
              </div>
              <CardDescription className="text-slate-400">
                Component hierarchy and code organization analysis
              </CardDescription>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-white mb-3">Key Components & Files</h4>
                  <div className="space-y-3">
                    {keyFiles.map((file) => (
                      <div key={file.name} className="border border-slate-700 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-mono text-blue-400">{file.name}</span>
                          <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                            View Details
                          </Button>
                        </div>
                        <p className="text-slate-300 text-sm">{file.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-white mb-3">Component Flow</h4>
                  <div className="bg-slate-900/50 rounded-lg p-4 font-mono text-sm">
                    <div className="text-slate-300">
                      <div className="text-blue-400">App.tsx</div>
                      <div className="ml-4 text-slate-400">├── TodoList.tsx</div>
                      <div className="ml-8 text-slate-400">│   └── TodoItem.tsx</div>
                      <div className="ml-4 text-slate-400">├── AddTodo.tsx</div>
                      <div className="ml-4 text-slate-400">└── useTodos.ts (custom hook)</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* Suggestions */}
      <Collapsible open={openSections.has("suggestions")} onOpenChange={() => toggleSection("suggestions")}>
        <Card className="bg-slate-800/50 border-slate-700">
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-slate-700/30 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <ArrowUp className="w-5 h-5 text-green-400" />
                  <CardTitle className="text-white">Improvement Suggestions</CardTitle>
                </div>
                {openSections.has("suggestions") ? (
                  <ChevronDown className="w-5 h-5 text-slate-400" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-slate-400" />
                )}
              </div>
              <CardDescription className="text-slate-400">
                AI-powered recommendations to enhance your codebase
              </CardDescription>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent>
              <div className="space-y-3">
                {improvements.map((improvement, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-slate-900/30 rounded-lg">
                    <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-green-400 text-xs font-bold">{index + 1}</span>
                    </div>
                    <p className="text-slate-300">{improvement}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>
    </div>
  );
};

export default AnalysisResults;
