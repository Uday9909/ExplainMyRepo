import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronDown, FileText, Folder, Github } from "lucide-react";
import { useAnalysis } from "@/contexts/AnalysisContext";

interface FileNode {
  name: string;
  type: 'file' | 'folder';
  children?: FileNode[];
  path: string;
}

const mockFileStructure: FileNode = {
  name: "react-todo-app",
  type: "folder",
  path: "/",
  children: [
    {
      name: "src",
      type: "folder",
      path: "/src",
      children: [
        {
          name: "components",
          type: "folder",
          path: "/src/components",
          children: [
            { name: "TodoItem.tsx", type: "file", path: "/src/components/TodoItem.tsx" },
            { name: "TodoList.tsx", type: "file", path: "/src/components/TodoList.tsx" },
            { name: "AddTodo.tsx", type: "file", path: "/src/components/AddTodo.tsx" },
          ]
        },
        {
          name: "hooks",
          type: "folder", 
          path: "/src/hooks",
          children: [
            { name: "useTodos.ts", type: "file", path: "/src/hooks/useTodos.ts" },
            { name: "useLocalStorage.ts", type: "file", path: "/src/hooks/useLocalStorage.ts" },
          ]
        },
        { name: "App.tsx", type: "file", path: "/src/App.tsx" },
        { name: "main.tsx", type: "file", path: "/src/main.tsx" },
        { name: "index.css", type: "file", path: "/src/index.css" },
      ]
    },
    {
      name: "public",
      type: "folder",
      path: "/public",
      children: [
        { name: "index.html", type: "file", path: "/public/index.html" },
        { name: "favicon.ico", type: "file", path: "/public/favicon.ico" },
      ]
    },
    { name: "package.json", type: "file", path: "/package.json" },
    { name: "README.md", type: "file", path: "/README.md" },
    { name: "tsconfig.json", type: "file", path: "/tsconfig.json" },
    { name: "vite.config.ts", type: "file", path: "/vite.config.ts" },
  ]
};

const mockFileContents: { [path: string]: string } = {
  "/src/components/TodoItem.tsx": `import React from 'react';
import { Button } from '@/components/ui/button';

interface TodoItemProps {
  id: string;
  text: string;
  completed: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ 
  id, 
  text, 
  completed, 
  onToggle, 
  onDelete 
}) => {
  return (
    <div className="flex items-center space-x-3 p-3 border rounded-lg">
      <input
        type="checkbox"
        checked={completed}
        onChange={() => onToggle(id)}
        className="w-4 h-4"
      />
      <span className={completed ? 'line-through text-gray-500' : ''}>
        {text}
      </span>
      <Button 
        variant="destructive" 
        size="sm"
        onClick={() => onDelete(id)}
      >
        Delete
      </Button>
    </div>
  );
};

export default TodoItem;`,
  "/src/components/TodoList.tsx": `import React from 'react';
import TodoItem from './TodoItem';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

interface TodoListProps {
  todos: Todo[];
  onToggleTodo: (id: string) => void;
  onDeleteTodo: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onToggleTodo, onDeleteTodo }) => {
  return (
    <div className="space-y-2">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          text={todo.text}
          completed={todo.completed}
          onToggle={onToggleTodo}
          onDelete={onDeleteTodo}
        />
      ))}
    </div>
  );
};

export default TodoList;`,
  "/package.json": `{
  "name": "react-todo-app",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.0.28",
    "@types/react-dom": "^18.0.11",
    "@vitejs/plugin-react": "^3.1.0",
    "typescript": "^4.9.3",
    "vite": "^4.1.0"
  }
}`,
  "/README.md": `# React Todo App

A simple todo application built with React and TypeScript.

## Features

- Add new todos
- Mark todos as completed
- Delete todos
- Persistent storage with localStorage

## Getting Started

1. Install dependencies: \`npm install\`
2. Start the development server: \`npm run dev\`
3. Open your browser to \`http://localhost:5173\`

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS`,
};

const FileExplorer = () => {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(["/", "/src"]));
  const { selectedFile, setSelectedFile, analysisResults, setFileContents } = useAnalysis();

  useEffect(() => {
    // Load mock file contents when analysis is complete
    if (analysisResults) {
      setFileContents(mockFileContents);
    }
  }, [analysisResults, setFileContents]);

  const toggleFolder = (path: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(path)) {
      newExpanded.delete(path);
    } else {
      newExpanded.add(path);
    }
    setExpandedFolders(newExpanded);
  };

  const handleFileClick = (path: string) => {
    setSelectedFile(path);
    console.log("Selected file:", path);
  };

  const renderFileNode = (node: FileNode, level: number = 0): React.ReactNode => {
    const isExpanded = expandedFolders.has(node.path);
    const isSelected = selectedFile === node.path;

    return (
      <div key={node.path}>
        <div
          className={`flex items-center space-x-2 py-2 px-2 rounded cursor-pointer hover:bg-slate-700/50 transition-colors group ${
            isSelected ? "bg-blue-500/20 border-l-2 border-blue-400" : ""
          }`}
          style={{ paddingLeft: `${level * 20 + 8}px` }}
          onClick={() => {
            if (node.type === "folder") {
              toggleFolder(node.path);
            } else {
              handleFileClick(node.path);
            }
          }}
        >
          {node.type === "folder" ? (
            <>
              {isExpanded ? (
                <ChevronDown className="w-4 h-4 text-slate-400" />
              ) : (
                <ChevronRight className="w-4 h-4 text-slate-400" />
              )}
              <Folder className="w-4 h-4 text-blue-400" />
            </>
          ) : (
            <>
              <div className="w-4" />
              <FileText className="w-4 h-4 text-slate-400" />
            </>
          )}
          <span className={`text-sm flex-1 ${node.type === "folder" ? "text-white font-medium" : "text-slate-300"}`}>
            {node.name}
          </span>
          {node.type === "file" && (
            <Button
              variant="ghost"
              size="sm"
              className="ml-auto opacity-0 group-hover:opacity-100 h-6 px-2 text-xs text-blue-400 hover:text-blue-300"
              onClick={(e) => {
                e.stopPropagation();
                handleFileClick(node.path);
              }}
            >
              View
            </Button>
          )}
        </div>
        {node.type === "folder" && isExpanded && node.children && (
          <div>
            {node.children.map((child) => renderFileNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700 h-fit">
      <CardHeader className="pb-3">
        <CardTitle className="text-white flex items-center space-x-2">
          <Github className="w-5 h-5" />
          <span>File Explorer</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="max-h-96 overflow-y-auto">
          <div className="group">
            {renderFileNode(mockFileStructure)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FileExplorer;
