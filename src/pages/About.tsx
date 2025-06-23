
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Github, ArrowUp, Upload, Info } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <nav className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CE</span>
              </div>
              <span className="text-xl font-bold text-white">Code Explainr</span>
            </Link>
            <div className="flex items-center space-x-6">
              <Link to="/" className="text-slate-300 hover:text-white transition-colors">
                Home
              </Link>
              <Link to="/explain" className="text-slate-300 hover:text-white transition-colors">
                Explain
              </Link>
              <Link to="/about" className="text-white font-medium">
                About
              </Link>
            </div>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-white mb-6">About Code Explainr</h1>
            <p className="text-xl text-slate-300 leading-relaxed">
              Making complex codebases accessible to every developer through AI-powered analysis and clear explanations.
            </p>
          </div>

          {/* Mission Section */}
          <Card className="bg-slate-800/50 border-slate-700 mb-12">
            <CardHeader>
              <CardTitle className="text-2xl text-white">Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-300 text-lg leading-relaxed">
                Every developer has faced the challenge of understanding unfamiliar codebases. Whether you're 
                onboarding to a new team, exploring open-source projects, or reviewing legacy code, the learning 
                curve can be steep. Code Explainr bridges this gap by providing instant, AI-powered insights 
                that help you understand any repository's structure, purpose, and architecture in minutes.
              </p>
            </CardContent>
          </Card>

          {/* How It Works */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-slate-800/50 border-slate-700 text-center">
                <CardHeader>
                  <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Upload className="w-8 h-8 text-blue-400" />
                  </div>
                  <CardTitle className="text-white">1. Upload</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-400">
                    Drop a ZIP file of your repository or paste a GitHub URL. Our system securely processes your code.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700 text-center">
                <CardHeader>
                  <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Info className="w-8 h-8 text-purple-400" />
                  </div>
                  <CardTitle className="text-white">2. Analyze</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-400">
                    Advanced AI models examine your code structure, dependencies, and patterns to generate insights.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700 text-center">
                <CardHeader>
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ArrowUp className="w-8 h-8 text-green-400" />
                  </div>
                  <CardTitle className="text-white">3. Understand</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-400">
                    Get clear explanations, visual diagrams, and actionable insights about your codebase.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Tech Stack */}
          <Card className="bg-slate-800/50 border-slate-700 mb-12">
            <CardHeader>
              <CardTitle className="text-2xl text-white">Built With Modern Tech</CardTitle>
              <CardDescription className="text-slate-400">
                Code Explainr is built using cutting-edge technologies for optimal performance and user experience.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-white mb-3">Frontend</h4>
                  <ul className="space-y-2 text-slate-300">
                    <li>• React with TypeScript</li>
                    <li>• Tailwind CSS for styling</li>
                    <li>• shadcn/ui components</li>
                    <li>• React Router for navigation</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-3">AI & Backend</h4>
                  <ul className="space-y-2 text-slate-300">
                    <li>• OpenAI GPT for code analysis</li>
                    <li>• Node.js serverless functions</li>
                    <li>• Secure file processing</li>
                    <li>• Real-time analysis updates</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA Section */}
          <div className="text-center bg-gradient-to-r from-blue-500/10 to-purple-600/10 rounded-lg border border-slate-700 p-8">
            <h3 className="text-2xl font-bold text-white mb-4">Ready to Understand Your Code?</h3>
            <p className="text-slate-300 mb-6">
              Join thousands of developers who use Code Explainr to decode complex projects.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/explain">
                <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">
                  Start Analyzing Code
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                <Github className="w-5 h-5 mr-2" />
                View on GitHub
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
