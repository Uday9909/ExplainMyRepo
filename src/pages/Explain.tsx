import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Upload, Globe } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import FileExplorer from "@/components/FileExplorer";
import AnalysisResults from "@/components/AnalysisResults";
import FileViewer from "@/components/FileViewer";
import { useAnalysis } from "@/contexts/AnalysisContext";
import { analyzeRepoZip } from "@/utils/analyzeRepo";

const ExplainContent = () => {
  const [repoUrl, setRepoUrl] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const { isAnalyzing, setIsAnalyzing, setAnalysisResults } = useAnalysis();

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];
    if (!file.name.endsWith(".zip")) {
      toast({
        title: "Invalid File Type",
        description: "Please upload a ZIP file containing your repository.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    try {
      const results = await analyzeRepoZip(file);
      setAnalysisResults(results);
      setAnalysisComplete(true);
      toast({
        title: "Analysis Complete!",
        description: `Successfully analyzed ${results.projectName}.`,
      });
    } catch (error) {
      console.error("Analysis failed:", error);
      toast({
        title: "Error",
        description: "Failed to analyze the repository.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleGithubSubmit = async () => {
    if (!repoUrl.trim()) {
      toast({
        title: "Empty URL",
        description: "Please enter a GitHub repo URL.",
        variant: "destructive",
      });
      return;
    }

    const match = repoUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/);
    if (!match) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid GitHub repository URL.",
        variant: "destructive",
      });
      return;
    }

    const [, owner, repo] = match;
    const zipUrl = `https://github.com/${owner}/${repo}/archive/refs/heads/main.zip`;

    setIsAnalyzing(true);
    try {
      const response = await fetch(zipUrl);
      if (!response.ok) throw new Error("GitHub ZIP fetch failed");
      const blob = await response.blob();
      const file = new File([blob], `${repo}.zip`, { type: "application/zip" });

      const results = await analyzeRepoZip(file);
      setAnalysisResults(results);
      setAnalysisComplete(true);
      toast({
        title: "GitHub Repo Analyzed",
        description: `Successfully analyzed ${repo}.`,
      });
    } catch (error) {
      console.error("GitHub analysis failed:", error);
      toast({
        title: "Error",
        description: "Failed to analyze GitHub repository.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files);
      e.dataTransfer.clearData();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFileUpload(e.target.files);
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upload">Upload ZIP</TabsTrigger>
          <TabsTrigger value="github">From GitHub</TabsTrigger>
        </TabsList>

        {/* Local ZIP Upload */}
        <TabsContent value="upload">
          <Card
            className={`p-4 mt-4 border-dashed border-2 ${
              dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
            }`}
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
          >
            <CardHeader>
              <CardTitle>Upload Repository</CardTitle>
              <CardDescription>
                Drop a zipped repository here or select one to analyze.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4">
              <Input
                id="repo-upload"
                type="file"
                accept=".zip"
                onChange={handleChange}
              />
              <Button>
                <Upload className="mr-2 h-4 w-4" />
                Upload ZIP
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* GitHub URL Input */}
        <TabsContent value="github">
          <Card className="p-4 mt-4">
            <CardHeader>
              <CardTitle>Analyze GitHub Repository</CardTitle>
              <CardDescription>
                Enter a public GitHub repo URL to analyze.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row gap-4">
              <Input
                placeholder="https://github.com/user/repo"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
              />
              <Button onClick={handleGithubSubmit}>
                <Globe className="mr-2 h-4 w-4" />
                Analyze GitHub Repo
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {isAnalyzing && (
        <div className="mt-6 text-center text-blue-600">Analyzing...</div>
      )}

      {analysisComplete && (
        <div className="mt-8 space-y-6">
          <AnalysisResults />
          <FileExplorer />
          <FileViewer />
        </div>
      )}
    </div>
  );
};

export default ExplainContent;
