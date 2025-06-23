
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Github, ArrowUp, Info } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CE</span>
              </div>
              <span className="text-xl font-bold text-white">Code Explainr</span>
            </div>
            <div className="flex items-center space-x-6">
              <Link to="/" className="text-slate-300 hover:text-white transition-colors">
                Home
              </Link>
              <Link to="/explain" className="text-slate-300 hover:text-white transition-colors">
                Explain
              </Link>
              <Link to="/about" className="text-slate-300 hover:text-white transition-colors">
                About
              </Link>
              <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                <Github className="w-4 h-4 mr-2" />
                GitHub
              </Button>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
            Understand Any <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Codebase</span> in Minutes
          </h1>
          <p className="text-xl text-slate-300 mb-8 leading-relaxed">
            Upload a GitHub repository or ZIP file and get instant AI-powered explanations of the project structure, 
            tech stack, and key components. Perfect for onboarding or exploring new codebases.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link to="/explain">
              <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-6 text-lg">
                <Upload className="w-5 h-5 mr-2" />
                Start Explaining Code
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="border-slate-600 text-slate-300 hover:bg-slate-700 px-8 py-6 text-lg">
              <Info className="w-5 h-5 mr-2" />
              See Demo
            </Button>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                <Upload className="w-6 h-6 text-blue-400" />
              </div>
              <CardTitle className="text-white">Easy Upload</CardTitle>
              <CardDescription className="text-slate-400">
                Drop a ZIP file or paste a GitHub URL. We'll handle the rest automatically.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors">
            <CardHeader>
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                <Github className="w-6 h-6 text-purple-400" />
              </div>
              <CardTitle className="text-white">Smart Analysis</CardTitle>
              <CardDescription className="text-slate-400">
                AI-powered insights into project structure, tech stack, and component relationships.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors">
            <CardHeader>
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
                <ArrowUp className="w-6 h-6 text-green-400" />
              </div>
              <CardTitle className="text-white">Deep Dive</CardTitle>
              <CardDescription className="text-slate-400">
                Click any file for detailed explanations and improvement suggestions.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-slate-700/50 bg-slate-800/30">
        <div className="container mx-auto px-6 py-16 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to decode your next project?</h2>
          <p className="text-slate-400 mb-8">Join developers who save hours understanding complex codebases.</p>
          <Link to="/explain">
            <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-6">
              Get Started Free
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
