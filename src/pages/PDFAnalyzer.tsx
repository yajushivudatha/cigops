
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, FileText, Zap, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const PDFAnalyzer = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzedReport, setAnalyzedReport] = useState<any>(null);
  const { toast } = useToast();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileUpload = (file: File) => {
    if (file.type !== 'application/pdf') {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF file.",
        variant: "destructive"
      });
      return;
    }

    console.log('Uploading file:', file.name);
    setIsAnalyzing(true);
    
    toast({
      title: "File uploaded successfully",
      description: `Analyzing ${file.name}...`
    });

    // Simulate analysis
    setTimeout(() => {
      setAnalyzedReport({
        type: 'Chest X-Ray',
        findings: 'Mild inflammation in lower lobes',
        recommendation: 'Significant improvement expected within 3 months of quitting',
        severity: 'Moderate'
      });
      setIsAnalyzing(false);
      
      toast({
        title: "Analysis complete",
        description: "Your medical report has been analyzed."
      });
    }, 3000);
  };

  const handleChooseFile = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf';
    input.onchange = (e) => handleFileInput(e as any);
    input.click();
  };

  const handleSaveToTimeline = () => {
    console.log('Saving to health timeline...');
    toast({
      title: "Saved to timeline",
      description: "Report has been added to your health timeline."
    });
  };

  return (
    <div className="min-h-screen p-4 pt-20">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-serif text-white mb-4 text-glow">
            Medical PDF Analyzer 🔬
          </h1>
          <p className="text-cyan-300 text-lg opacity-80">
            Upload your medical reports for AI-powered smoking impact analysis
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <Card className="glass-card p-8 animate-scale-in">
            <CardContent className="p-0">
              <h3 className="text-2xl font-semibold text-white mb-6 flex items-center">
                <Upload className="w-6 h-6 mr-3 text-cyan-400" />
                Upload Medical Report
              </h3>

              {/* Drag & Drop Zone */}
              <div
                className={`
                  border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 cursor-pointer
                  ${isDragging 
                    ? 'border-cyan-400 bg-cyan-500/10' 
                    : 'border-gray-600 hover:border-cyan-500 hover:bg-cyan-500/5'
                  }
                `}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={handleChooseFile}
              >
                <div className="mb-4">
                  <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h4 className="text-xl text-white mb-2">
                    {isDragging ? 'Drop your file here' : 'Drag & Drop PDF'}
                  </h4>
                  <p className="text-gray-400 mb-4">
                    Supported: X-rays, Blood tests, Lung function tests
                  </p>
                </div>

                <Button 
                  className="bg-cyan-500 hover:bg-cyan-600"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleChooseFile();
                  }}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Choose File
                </Button>
              </div>

              {/* Supported Formats */}
              <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                <div className="p-3 bg-white/5 rounded-lg">
                  <div className="text-2xl mb-2">🫁</div>
                  <p className="text-sm text-gray-300">Chest X-rays</p>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  <div className="text-2xl mb-2">🩸</div>
                  <p className="text-sm text-gray-300">Blood Tests</p>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  <div className="text-2xl mb-2">💨</div>
                  <p className="text-sm text-gray-300">Lung Function</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Analysis Results */}
          <Card className="glass-card p-8 animate-scale-in">
            <CardContent className="p-0">
              <h3 className="text-2xl font-semibold text-white mb-6 flex items-center">
                <Zap className="w-6 h-6 mr-3 text-yellow-400" />
                AI Analysis Results
              </h3>

              {isAnalyzing ? (
                <div className="text-center py-12">
                  <div className="w-24 h-24 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
                    <Zap className="w-12 h-12 text-cyan-400 animate-pulse" />
                  </div>
                  <h4 className="text-xl text-white mb-2">Analyzing...</h4>
                  <p className="text-gray-400">
                    AI is processing your medical report
                  </p>
                </div>
              ) : analyzedReport ? (
                <div className="space-y-6">
                  {/* Report Type */}
                  <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                    <h4 className="text-blue-300 font-semibold mb-2">Report Type</h4>
                    <p className="text-white">{analyzedReport.type}</p>
                  </div>

                  {/* Findings */}
                  <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                    <h4 className="text-orange-300 font-semibold mb-2 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-2" />
                      Key Findings
                    </h4>
                    <p className="text-white">{analyzedReport.findings}</p>
                  </div>

                  {/* Recommendation */}
                  <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <h4 className="text-green-300 font-semibold mb-2">Recovery Outlook</h4>
                    <p className="text-white">{analyzedReport.recommendation}</p>
                  </div>

                  {/* Severity Indicator */}
                  <div className="flex items-center justify-between p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                    <span className="text-purple-300 font-semibold">Severity Level:</span>
                    <span className={`
                      px-3 py-1 rounded-full text-sm font-medium
                      ${analyzedReport.severity === 'Moderate' 
                        ? 'bg-yellow-500/20 text-yellow-300' 
                        : 'bg-red-500/20 text-red-300'
                      }
                    `}>
                      {analyzedReport.severity}
                    </span>
                  </div>

                  {/* Action Button */}
                  <Button 
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500"
                    onClick={handleSaveToTimeline}
                  >
                    Save to Health Timeline
                  </Button>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-24 h-24 bg-gray-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-12 h-12 text-gray-400" />
                  </div>
                  <h4 className="text-xl text-gray-300 mb-2">Ready to Analyze</h4>
                  <p className="text-gray-400">
                    Upload a medical report to see AI-powered insights about your recovery journey
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Privacy Notice */}
        <Card className="glass-card p-6 mt-8 animate-fade-in">
          <CardContent className="p-0">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-blue-400 mt-1" />
              <div>
                <h4 className="text-blue-300 font-semibold mb-2">Privacy & Security</h4>
                <p className="text-gray-300 text-sm">
                  Your medical data is processed locally and encrypted. We never store your personal health information. 
                  This tool provides educational insights only and should not replace professional medical advice.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PDFAnalyzer;
