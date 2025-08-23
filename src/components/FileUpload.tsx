
import React, { useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Upload, Image, CheckCircle, AlertTriangle, X } from 'lucide-react';

interface AnalysisResult {
  type: 'legal' | 'oversized' | 'damaged' | 'obscene';
  confidence: number;
  violations: string[];
  status: 'authorized' | 'violation';
}

export const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setAnalysis(null);
    }
  };

  const analyzeImage = async () => {
    if (!selectedFile) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis (in real app, this would call your AI API)
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock analysis results
    const mockResults: AnalysisResult[] = [
      {
        type: 'legal',
        confidence: 95,
        violations: [],
        status: 'authorized'
      },
      {
        type: 'oversized',
        confidence: 87,
        violations: ['Exceeds municipal size limit', 'No proper permits'],
        status: 'violation'
      },
      {
        type: 'damaged',
        confidence: 92,
        violations: ['Unsafe structural condition'],
        status: 'violation'
      },
      {
        type: 'obscene',
        confidence: 78,
        violations: ['Inappropriate content'],
        status: 'violation'
      }
    ];
    
    const randomResult = mockResults[Math.floor(Math.random() * mockResults.length)];
    setAnalysis(randomResult);
    setIsAnalyzing(false);
  };

  const clearFile = () => {
    setSelectedFile(null);
    setPreviewUrl('');
    setAnalysis(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getStatusBadge = (result: AnalysisResult) => {
    if (result.status === 'authorized') {
      return <Badge className="status-legal">✓ Authorized & Legal</Badge>;
    }
    return <Badge className="status-illegal">⚠ Violation Detected</Badge>;
  };

  return (
    <Card className="p-6 mb-6">
      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Image className="w-5 h-5" />
        Upload Billboard Image for Analysis
      </h3>
      
      <div className="space-y-4">
        {!selectedFile ? (
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
            <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg font-medium mb-2">Upload Billboard Image</p>
            <p className="text-muted-foreground mb-4">
              Drag and drop an image or click to select
            </p>
            <Button onClick={() => fileInputRef.current?.click()}>
              Select Image
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>
        ) : (
          <div className="space-y-4">
            <div className="relative">
              <img
                src={previewUrl}
                alt="Selected billboard"
                className="w-full max-w-md mx-auto rounded-lg shadow-lg"
              />
              <Button
                variant="destructive"
                size="sm"
                onClick={clearFile}
                className="absolute top-2 right-2"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="text-center space-y-4">
              {!analysis && !isAnalyzing && (
                <Button onClick={analyzeImage} className="bg-primary">
                  Analyze Billboard
                </Button>
              )}
              
              {isAnalyzing && (
                <div className="text-center">
                  <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-2"></div>
                  <p className="text-muted-foreground">Analyzing image with AI...</p>
                </div>
              )}
              
              {analysis && (
                <div className="bg-muted/20 rounded-lg p-4 max-w-md mx-auto">
                  <div className="flex items-center justify-center gap-2 mb-3">
                    {analysis.status === 'authorized' ? (
                      <CheckCircle className="w-6 h-6 text-success" />
                    ) : (
                      <AlertTriangle className="w-6 h-6 text-destructive" />
                    )}
                    {getStatusBadge(analysis)}
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Confidence:</span>
                      <Badge variant="outline">{analysis.confidence}%</Badge>
                    </div>
                    
                    <div className="flex justify-between">
                      <span>Type:</span>
                      <span className="capitalize font-medium">{analysis.type}</span>
                    </div>
                    
                    {analysis.violations.length > 0 && (
                      <div>
                        <p className="font-medium mb-1">Violations:</p>
                        <ul className="text-xs text-muted-foreground space-y-1">
                          {analysis.violations.map((violation, index) => (
                            <li key={index}>• {violation}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {analysis.status === 'authorized' && (
                      <p className="text-success text-xs mt-2">
                        ✓ This billboard meets all regulatory requirements
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
