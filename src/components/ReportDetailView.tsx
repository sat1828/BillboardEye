
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, MapPin, Clock, User, Camera, AlertTriangle, CheckCircle } from 'lucide-react';

interface Report {
  id: string;
  type: 'oversized' | 'damaged' | 'obscene' | 'legal' | 'resolved';
  location: string;
  country: string;
  state: string;
  coordinates: [number, number];
  timestamp: string;
  confidence: number;
  violations: string[];
  status: 'pending' | 'resolved' | 'investigating';
  reporterType: 'citizen' | 'inspector';
  imageUrl?: string;
  ocrText?: string;
  anomalyDetails?: {
    oversized: 'OK' | 'Anomaly Detected';
    damaged: 'OK' | 'Anomaly Detected'; 
    obscene: 'OK' | 'Anomaly Detected';
    sensitive: 'OK' | 'Anomaly Detected';
  };
}

interface ReportDetailViewProps {
  report: Report;
  onClose: () => void;
}

export const ReportDetailView = ({ report, onClose }: ReportDetailViewProps) => {
  const getStatusBadge = (type: string, status: string) => {
    if (status === 'resolved') return <Badge className="status-resolved">Resolved</Badge>;
    if (type === 'legal') return <Badge className="status-legal">Legal & Compliant</Badge>;
    return <Badge className="status-illegal">Violation</Badge>;
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'legal': return <CheckCircle className="w-6 h-6 text-success" />;
      case 'resolved': return <CheckCircle className="w-6 h-6 text-primary" />;
      default: return <AlertTriangle className="w-6 h-6 text-destructive" />;
    }
  };

  // Use report's image URL or fallback
  const imageUrl = report.imageUrl || "https://images.unsplash.com/photo-1541919329513-35f7af297129?w=400&h=300&fit=crop";

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              {getTypeIcon(report.type)}
              <div>
                <h2 className="text-2xl font-bold">{report.id}</h2>
                <p className="text-muted-foreground">Billboard Report Details</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          <div className="space-y-6">
            {/* Enhanced Analysis Results */}
            {report.anomalyDetails && (
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">Anomaly Detection</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 rounded border">
                    <div className="flex items-center gap-2">
                      {report.anomalyDetails.oversized === 'Anomaly Detected' ? 
                        <AlertTriangle className="w-4 h-4 text-destructive" /> : 
                        <CheckCircle className="w-4 h-4 text-success" />
                      }
                      <span>Oversized</span>
                    </div>
                    <Badge className={report.anomalyDetails.oversized === 'Anomaly Detected' ? 'status-illegal' : 'status-legal'}>
                      {report.anomalyDetails.oversized}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-2 rounded border">
                    <div className="flex items-center gap-2">
                      {report.anomalyDetails.damaged === 'Anomaly Detected' ? 
                        <AlertTriangle className="w-4 h-4 text-destructive" /> : 
                        <CheckCircle className="w-4 h-4 text-success" />
                      }
                      <span>Damaged</span>
                    </div>
                    <Badge className={report.anomalyDetails.damaged === 'Anomaly Detected' ? 'status-illegal' : 'status-legal'}>
                      {report.anomalyDetails.damaged}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-2 rounded border">
                    <div className="flex items-center gap-2">
                      {report.anomalyDetails.obscene === 'Anomaly Detected' ? 
                        <AlertTriangle className="w-4 h-4 text-destructive" /> : 
                        <CheckCircle className="w-4 h-4 text-success" />
                      }
                      <span>Obscene Content</span>
                    </div>
                    <Badge className={report.anomalyDetails.obscene === 'Anomaly Detected' ? 'status-illegal' : 'status-legal'}>
                      {report.anomalyDetails.obscene}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-2 rounded border">
                    <div className="flex items-center gap-2">
                      {report.anomalyDetails.sensitive === 'Anomaly Detected' ? 
                        <AlertTriangle className="w-4 h-4 text-destructive" /> : 
                        <CheckCircle className="w-4 h-4 text-success" />
                      }
                      <span>Sensitive Keywords</span>
                    </div>
                    <Badge className={report.anomalyDetails.sensitive === 'Anomaly Detected' ? 'status-illegal' : 'status-legal'}>
                      {report.anomalyDetails.sensitive}
                    </Badge>
                  </div>
                </div>

                {/* Confidence Score */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Confidence Score</span>
                    <span className="font-bold">{report.confidence}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="h-2 bg-primary rounded-full transition-all duration-300" 
                      style={{ width: `${report.confidence}%` }}
                    />
                  </div>
                </div>

                {/* OCR Text */}
                {report.ocrText && (
                  <div className="space-y-2">
                    <h4 className="font-semibold">Extracted Text (OCR)</h4>
                    <div className="bg-muted rounded p-3 text-sm font-mono max-h-32 overflow-y-auto">
                      <pre className="whitespace-pre-wrap">{report.ocrText}</pre>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Details Section */}
            <div className="space-y-6">
              {/* Status */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Status</h3>
                <div className="flex flex-wrap gap-2">
                  {getStatusBadge(report.type, report.status)}
                  <Badge variant="outline" className="bg-accent/10">
                    {report.confidence}% Confidence
                  </Badge>
                </div>
              </div>

              {/* Location - Prominent Display */}
              <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-primary">
                  <MapPin className="w-5 h-5" />
                  Location Details
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  <div className="bg-background rounded p-3">
                    <p className="text-sm text-muted-foreground">Address</p>
                    <p className="font-medium">{report.location}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-background rounded p-3">
                      <p className="text-sm text-muted-foreground">Country</p>
                      <p className="font-medium">{report.country}</p>
                    </div>
                    <div className="bg-background rounded p-3">
                      <p className="text-sm text-muted-foreground">State</p>
                      <p className="font-medium">{report.state}</p>
                    </div>
                  </div>
                  <div className="bg-background rounded p-3">
                    <p className="text-sm text-muted-foreground">GPS Coordinates</p>
                    <p className="font-mono font-medium">{report.coordinates[0].toFixed(6)}, {report.coordinates[1].toFixed(6)}</p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-2"
                      onClick={() => window.open(`https://maps.google.com/?q=${report.coordinates[0]},${report.coordinates[1]}`, '_blank')}
                    >
                      <MapPin className="w-3 h-3 mr-1" />
                      View on Map
                    </Button>
                  </div>
                </div>
              </div>

              {/* Report Info */}
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Report Information
                </h3>
                <div className="space-y-2 text-sm">
                  <p><strong>Reported:</strong> {report.timestamp}</p>
                  <p><strong>Reporter:</strong> 
                    <Badge variant="outline" className="ml-2 capitalize">
                      <User className="w-3 h-3 mr-1" />
                      {report.reporterType}
                    </Badge>
                  </p>
                  <p><strong>Type:</strong> <span className="capitalize">{report.type}</span></p>
                </div>
              </div>

              {/* Violations */}
              {report.violations.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-destructive">Violations Detected</h3>
                  <ul className="space-y-1 text-sm">
                    {report.violations.map((violation, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                        {violation}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {report.type === 'legal' && (
                <div className="bg-success/10 border border-success/20 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-success">
                    <CheckCircle className="w-5 h-5" />
                    <strong>Authorized Billboard</strong>
                  </div>
                  <p className="text-sm text-success/80 mt-1">
                    This billboard meets all regulatory requirements and is properly authorized.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-6 pt-6 border-t">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button className="bg-primary">
              Mark as Resolved
            </Button>
            {report.status !== 'resolved' && (
              <Button variant="outline">
                Assign Inspector
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};
