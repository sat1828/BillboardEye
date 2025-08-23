import React, { useRef, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Camera, MapPin, Clock, Shield, AlertTriangle, CheckCircle, XCircle, Upload, X, ArrowLeft } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';

interface DetectionResult {
  type: 'legal' | 'oversized' | 'damaged' | 'obscene' | 'no-billboard';
  confidence: number;
  boundingBox?: { x: number; y: number; width: number; height: number };
  violations?: string[];
  anomalyDetails: {
    oversized: 'OK' | 'Anomaly Detected';
    damaged: 'OK' | 'Anomaly Detected'; 
    obscene: 'OK' | 'Anomaly Detected';
    sensitive: 'OK' | 'Anomaly Detected';
  };
  ocrText: string;
}

interface LocationData {
  latitude: number;
  longitude: number;
  address: string;
  timestamp: string;
}

export const CameraInterface = ({ onBackToHome }: { onBackToHome: () => void }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [detectionResult, setDetectionResult] = useState<DetectionResult | null>(null);
  const [location, setLocation] = useState<LocationData | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({
            latitude,
            longitude,
            address: `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
            timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          toast({
            title: "Location Access Denied",
            description: "Please enable location access for accurate reporting.",
            variant: "destructive"
          });
        }
      );
    }
  }, []);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setDetectionResult(null);
    }
  };

  const analyzeImage = async () => {
    if (!selectedFile) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis (in real app, this would call your AI API)
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock analysis results matching user's image format
    const mockResults: DetectionResult[] = [
      {
        type: 'legal' as const,
        confidence: 95,
        violations: [],
        anomalyDetails: {
          oversized: 'OK',
          damaged: 'OK',
          obscene: 'OK',
          sensitive: 'OK'
        },
        ocrText: 'AUTHORIZED BILLBOARD\nPERMIT: #ABC123\nCOMPLIANT WITH MUNICIPAL RULES'
      },
      {
        type: 'oversized' as const,
        confidence: 95,
        violations: ['Exceeds municipal size limit', 'No proper permits'],
        anomalyDetails: {
          oversized: 'Anomaly Detected',
          damaged: 'OK',
          obscene: 'OK',
          sensitive: 'OK'
        },
        ocrText: 'CONTACT\n9823015375\nPRE-LAUNCHING\nCODENAME\nMADE FOR ME\nSHANGR'
      },
      {
        type: 'damaged' as const,
        confidence: 92,
        violations: ['Unsafe structural condition'],
        anomalyDetails: {
          oversized: 'OK',
          damaged: 'Anomaly Detected',
          obscene: 'OK',
          sensitive: 'OK'  
        },
        ocrText: 'WARNING: DAMAGED\nSTRUCTURAL ISSUES\nCONTACT MUNICIPAL'
      },
      {
        type: 'obscene' as const,
        confidence: 78,
        violations: ['Inappropriate content'],
        anomalyDetails: {
          oversized: 'OK',
          damaged: 'OK',
          obscene: 'Anomaly Detected',
          sensitive: 'Anomaly Detected'
        },
        ocrText: 'ADULT CONTENT\nRESTRICTED MATERIAL\nNOT SUITABLE'
      }
    ];
    
    const randomResult = mockResults[Math.floor(Math.random() * mockResults.length)];
    setDetectionResult(randomResult);
    setIsAnalyzing(false);
  };

  const clearFile = () => {
    setSelectedFile(null);
    setPreviewUrl('');
    setDetectionResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const submitReport = async () => {
    if (!detectionResult || !location) return;

    try {
      // Get current user
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) {
        toast({
          title: "Authentication Required",
          description: "Please log in to submit reports.",
          variant: "destructive",
        });
        return;
      }

      // Save report to database
      const { error: reportError } = await supabase.from('billboard_reports').insert({
        user_id: user.id,
        type: detectionResult.type,
        location: location.address,
        latitude: location.latitude,
        longitude: location.longitude,
        confidence: detectionResult.confidence,
        violations: detectionResult.violations || [],
        ocr_text: detectionResult.ocrText,
        anomaly_details: detectionResult.anomalyDetails,
        status: 'pending',
        created_at: new Date().toISOString(),
      });

      if (reportError) throw reportError;

      // Update user's report count
      const { error: updateError } = await supabase.rpc('increment_user_reports', {
        user_id: user.id
      });

      if (updateError) console.warn('Failed to update report count:', updateError);

      // Simulate report submission
      toast({
        title: "Report Submitted Successfully",
        description: "Thank you for helping keep our city safe and clean!",
      });

      // Reset for next capture
      setDetectionResult(null);
      clearFile();
    } catch (error: any) {
      toast({
        title: "Submission Failed",
        description: error.message || "Failed to submit report. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (type: string) => {
    switch (type) {
      case 'legal': return 'status-legal';
      case 'oversized': return 'status-illegal';
      case 'damaged': return 'status-illegal';
      case 'obscene': return 'status-illegal';
      default: return 'status-pending';
    }
  };

  const getStatusIcon = (type: string) => {
    switch (type) {
      case 'legal': return <CheckCircle className="w-4 h-4" />;
      case 'oversized': return <AlertTriangle className="w-4 h-4" />;
      case 'damaged': return <XCircle className="w-4 h-4" />;
      case 'obscene': return <Shield className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-primary/5 p-4">
      <div className="max-w-md mx-auto">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={onBackToHome}
            className="mb-4 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Civic Billboard Watch
            </h1>
            <p className="text-muted-foreground">
              AI-powered billboard monitoring for safer cities
            </p>
          </div>
        </div>

        {/* Location Info */}
        {location && (
          <Card className="p-4 mb-4 bg-card/80 backdrop-blur-sm border-primary/20">
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="font-medium">Location:</span>
              <span className="text-muted-foreground">{location.address}</span>
            </div>
            <div className="flex items-center gap-2 text-sm mt-1">
              <Clock className="w-4 h-4 text-primary" />
              <span className="font-medium">Time:</span>
              <span className="text-muted-foreground">{location.timestamp}</span>
            </div>
          </Card>
        )}

        {/* Image Upload Interface */}
        <Card className="overflow-hidden mb-4 civic-glow border-primary/30">
          <div className="p-4">
            {!selectedFile ? (
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center aspect-[4/3] flex flex-col items-center justify-center">
                <Upload className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
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
                <div className="relative aspect-[4/3]">
                  <img
                    src={previewUrl}
                    alt="Selected billboard"
                    className="w-full h-full object-cover rounded-lg shadow-lg"
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={clearFile}
                    className="absolute top-2 right-2"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                  
                  {isAnalyzing && (
                    <div className="absolute inset-0 bg-primary/10 flex items-center justify-center rounded-lg">
                      <div className="text-center">
                        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                        <p className="text-primary font-medium">Analyzing Billboard...</p>
                        <div className="w-full h-1 bg-primary/20 rounded-full mt-2 overflow-hidden">
                          <div className="h-full bg-primary rounded-full scan-line" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="text-center">
                  {!detectionResult && !isAnalyzing && (
                    <Button onClick={analyzeImage} className="bg-primary">
                      Analyze Billboard
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Enhanced Detection Results */}
        {detectionResult && (
          <Card className="p-4 mb-4 border-2 border-primary/30">
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-3">
                {getStatusIcon(detectionResult.type)}
                <h3 className="font-semibold text-lg">Anomaly Detection</h3>
              </div>
              
              {/* Anomaly Details */}
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 rounded border">
                  <div className="flex items-center gap-2">
                    {detectionResult.anomalyDetails.oversized === 'Anomaly Detected' ? 
                      <AlertTriangle className="w-4 h-4 text-destructive" /> : 
                      <CheckCircle className="w-4 h-4 text-success" />
                    }
                    <span>Oversized</span>
                  </div>
                  <Badge className={detectionResult.anomalyDetails.oversized === 'Anomaly Detected' ? 'status-illegal' : 'status-legal'}>
                    {detectionResult.anomalyDetails.oversized}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between p-2 rounded border">
                  <div className="flex items-center gap-2">
                    {detectionResult.anomalyDetails.damaged === 'Anomaly Detected' ? 
                      <AlertTriangle className="w-4 h-4 text-destructive" /> : 
                      <CheckCircle className="w-4 h-4 text-success" />
                    }
                    <span>Damaged</span>
                  </div>
                  <Badge className={detectionResult.anomalyDetails.damaged === 'Anomaly Detected' ? 'status-illegal' : 'status-legal'}>
                    {detectionResult.anomalyDetails.damaged}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between p-2 rounded border">
                  <div className="flex items-center gap-2">
                    {detectionResult.anomalyDetails.obscene === 'Anomaly Detected' ? 
                      <AlertTriangle className="w-4 h-4 text-destructive" /> : 
                      <CheckCircle className="w-4 h-4 text-success" />
                    }
                    <span>Obscene Content</span>
                  </div>
                  <Badge className={detectionResult.anomalyDetails.obscene === 'Anomaly Detected' ? 'status-illegal' : 'status-legal'}>
                    {detectionResult.anomalyDetails.obscene}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between p-2 rounded border">
                  <div className="flex items-center gap-2">
                    {detectionResult.anomalyDetails.sensitive === 'Anomaly Detected' ? 
                      <AlertTriangle className="w-4 h-4 text-destructive" /> : 
                      <CheckCircle className="w-4 h-4 text-success" />
                    }
                    <span>Sensitive Keywords</span>
                  </div>
                  <Badge className={detectionResult.anomalyDetails.sensitive === 'Anomaly Detected' ? 'status-illegal' : 'status-legal'}>
                    {detectionResult.anomalyDetails.sensitive}
                  </Badge>
                </div>
              </div>

              {/* Confidence Score */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Confidence Score</span>
                  <span className="font-bold">{detectionResult.confidence}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="h-2 bg-primary rounded-full transition-all duration-300" 
                    style={{ width: `${detectionResult.confidence}%` }}
                  />
                </div>
              </div>

              {/* OCR Text */}
              <div className="space-y-2">
                <h4 className="font-semibold">Extracted Text (OCR)</h4>
                <div className="bg-muted rounded p-3 text-sm font-mono max-h-32 overflow-y-auto">
                  <pre className="whitespace-pre-wrap">{detectionResult.ocrText}</pre>
                </div>
              </div>

              {/* Overall Status */}
              <div className="pt-3 border-t">
                <p className="font-medium text-center">
                  Status: {detectionResult.type === 'legal' 
                    ? 'Perfect, Legal & Compliant ✅' 
                    : 'Violation Detected ⚠️'
                  }
                </p>
                
                {detectionResult.violations?.map((violation, index) => (
                  <div key={index} className="flex items-start gap-2 text-sm mt-2">
                    <AlertTriangle className="w-4 h-4 text-warning mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">{violation}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          {!selectedFile ? (
            <Button 
              onClick={() => fileInputRef.current?.click()}
              className="w-full bg-gradient-to-r from-primary to-primary-glow hover:from-primary-dark hover:to-primary text-primary-foreground"
              size="lg"
            >
              <Upload className="w-5 h-5 mr-2" />
              Start Detection - Upload Image
            </Button>
          ) : detectionResult ? (
            <Button 
              onClick={clearFile}
              variant="outline"
              className="w-full border-muted-foreground/50 text-muted-foreground hover:bg-muted/10"
            >
              Upload Another Image
            </Button>
          ) : null}

          {detectionResult && detectionResult.type !== 'legal' && (
            <Button 
              onClick={submitReport}
              className="w-full bg-gradient-to-r from-warning to-warning/80 hover:from-warning/90 hover:to-warning/70 text-warning-foreground"
            >
              <Shield className="w-5 h-5 mr-2" />
              Submit Violation Report
            </Button>
          )}
        </div>

        <div className="text-center mt-6 text-xs text-muted-foreground">
          Data anonymized • No personal info stored • Images used only for detection
        </div>
      </div>
    </div>
  );
};