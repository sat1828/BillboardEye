import React, { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search, MapPin, Clock, Download, Filter, Eye, 
  AlertTriangle, CheckCircle, XCircle, TrendingUp,
  Users, FileText, Map, BarChart3, ArrowLeft
} from 'lucide-react';
import { GLOBAL_LOCATION_DATA } from '@/data/locations';
import { FileUpload } from './FileUpload';
import { ReportDetailView } from './ReportDetailView';

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

// Mock data generator
const generateMockReports = (): Report[] => {
  const reports: Report[] = [];
  let id = 1;

  Object.entries(GLOBAL_LOCATION_DATA).forEach(([country, states]) => {
    Object.entries(states).forEach(([state, data]) => {
      // Generate 3-8 reports per state
      const reportCount = Math.floor(Math.random() * 6) + 3;
      for (let i = 0; i < reportCount; i++) {
        const types = ['oversized', 'damaged', 'obscene', 'legal', 'resolved'] as const;
        const type = types[Math.floor(Math.random() * types.length)];
        const statuses = ['pending', 'resolved', 'investigating'] as const;
        const status = type === 'resolved' ? 'resolved' : statuses[Math.floor(Math.random() * 2)];
        
        reports.push({
          id: `RPT-${String(id).padStart(4, '0')}`,
          type,
          location: `${data.cities[Math.floor(Math.random() * data.cities.length)]}, ${state}`,
          country,
          state,
          coordinates: [
            data.coordinates[0] + (Math.random() - 0.5) * 2,
            data.coordinates[1] + (Math.random() - 0.5) * 2
          ],
          timestamp: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
          confidence: Math.floor(Math.random() * 20) + 80,
          violations: type === 'legal' ? [] : [
            'Exceeds municipal size limit',
            'Unsafe structural condition',
            'Inappropriate content',
            'No proper permits'
          ].slice(0, Math.floor(Math.random() * 3) + 1),
          status,
          reporterType: Math.random() > 0.3 ? 'citizen' : 'inspector',
          imageUrl: data.imageUrl || `https://images.unsplash.com/photo-${1541919329513 + id}?w=400&h=300&fit=crop`,
          ocrText: type === 'oversized' ? 'CONTACT\n9823015375\nPRE-LAUNCHING\nCODENAME\nMADE FOR ME\nSHANGR' : 
                   type === 'legal' ? 'AUTHORIZED BILLBOARD\nPERMIT: #ABC123\nCOMPLIANT WITH RULES' :
                   type === 'damaged' ? 'WARNING: DAMAGED\nSTRUCTURAL ISSUES\nCONTACT MUNICIPAL' :
                   'INAPPROPRIATE CONTENT\nVIOLATES GUIDELINES',
          anomalyDetails: {
            oversized: type === 'oversized' ? 'Anomaly Detected' : 'OK',
            damaged: type === 'damaged' ? 'Anomaly Detected' : 'OK',
            obscene: type === 'obscene' ? 'Anomaly Detected' : 'OK',
            sensitive: type === 'obscene' ? 'Anomaly Detected' : 'OK'
          },
        });
        id++;
      }
    });
  });

  return reports.slice(0, 500); // Limit to 500 reports for performance
};

export const AuthorityDashboard = ({ onBackToHome }: { onBackToHome: () => void }) => {
  const [reports] = useState<Report[]>(generateMockReports());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [selectedState, setSelectedState] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  const filteredReports = useMemo(() => {
    return reports.filter(report => {
      const matchesSearch = !searchTerm || 
        report.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.id.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCountry = selectedCountry === 'all' || report.country === selectedCountry;
      const matchesState = selectedState === 'all' || report.state === selectedState;
      const matchesType = filterType === 'all' || report.type === filterType;
      const matchesStatus = filterStatus === 'all' || report.status === filterStatus;

      return matchesSearch && matchesCountry && matchesState && matchesType && matchesStatus;
    });
  }, [reports, searchTerm, selectedCountry, selectedState, filterType, filterStatus]);

  const stats = useMemo(() => {
    const filtered = filteredReports;
    return {
      total: filtered.length,
      illegal: filtered.filter(r => ['oversized', 'damaged', 'obscene'].includes(r.type)).length,
      resolved: filtered.filter(r => r.status === 'resolved').length,
      pending: filtered.filter(r => r.status === 'pending').length,
      legal: filtered.filter(r => r.type === 'legal').length
    };
  }, [filteredReports]);

  const getStatusBadge = (type: string, status: string) => {
    if (status === 'resolved') return <Badge className="status-resolved">Resolved</Badge>;
    if (type === 'legal') return <Badge className="status-legal">Legal & Compliant</Badge>;
    return <Badge className="status-illegal">Violation</Badge>;
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'legal': return <CheckCircle className="w-4 h-4 text-success" />;
      case 'resolved': return <CheckCircle className="w-4 h-4 text-primary" />;
      default: return <AlertTriangle className="w-4 h-4 text-destructive" />;
    }
  };

  const availableStates = selectedCountry !== 'all' ? Object.keys(GLOBAL_LOCATION_DATA[selectedCountry] || {}) : [];

  const handleExport = () => {
    const csvContent = [
      ['Report ID', 'Location', 'Country', 'State', 'Type', 'Status', 'Confidence', 'Date', 'Violations'].join(','),
      ...filteredReports.map(report => [
        report.id,
        `"${report.location}"`,
        report.country,
        report.state,
        report.type,
        report.status,
        report.confidence,
        report.timestamp,
        `"${report.violations.join('; ')}"`,
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `billboard-reports-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/30 p-6">
      <div className="max-w-7xl mx-auto">
        <Button
          variant="ghost"
          onClick={onBackToHome}
          className="mb-6 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Authority Dashboard
          </h1>
          <p className="text-muted-foreground text-lg">
            Global Billboard Monitoring & Enforcement System
          </p>
        </div>

        {/* File Upload Section */}
        <FileUpload />

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <Card className="p-6 civic-glow border-primary/20">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.total}</p>
                <p className="text-sm text-muted-foreground">Total Reports</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-destructive/20 bg-destructive/5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center">
                <XCircle className="w-6 h-6 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold text-destructive">{stats.illegal}</p>
                <p className="text-sm text-muted-foreground">Violations</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-success/20 bg-success/5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-success">{stats.legal}</p>
                <p className="text-sm text-muted-foreground">Legal</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-primary/20 bg-primary/5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">{stats.resolved}</p>
                <p className="text-sm text-muted-foreground">Resolved</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 border-warning/20 bg-warning/5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold text-warning">{stats.pending}</p>
                <p className="text-sm text-muted-foreground">Pending</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search by location, country, state, or report ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <Select value={selectedCountry} onValueChange={(value) => {
                setSelectedCountry(value);
                setSelectedState('all'); // Reset state when country changes
              }}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select Country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Countries</SelectItem>
                  {Object.keys(GLOBAL_LOCATION_DATA).map(country => (
                    <SelectItem key={country} value={country}>{country}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedState} onValueChange={setSelectedState} disabled={selectedCountry === 'all'}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select State/Province" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All States</SelectItem>
                  {availableStates.map(state => (
                    <SelectItem key={state} value={state}>{state}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="oversized">Oversized</SelectItem>
                  <SelectItem value="damaged">Damaged</SelectItem>
                  <SelectItem value="obscene">Obscene</SelectItem>
                  <SelectItem value="legal">Legal</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="investigating">Investigating</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" size="sm" className="border-primary/50" onClick={handleExport}>
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </Card>

        {/* Reports Table */}
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left p-4 font-semibold">Report ID</th>
                  <th className="text-left p-4 font-semibold">Location</th>
                  <th className="text-left p-4 font-semibold">Type</th>
                  <th className="text-left p-4 font-semibold">Status</th>
                  <th className="text-left p-4 font-semibold">Confidence</th>
                  <th className="text-left p-4 font-semibold">Date</th>
                  <th className="text-left p-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredReports.slice(0, 50).map(report => (
                  <tr key={report.id} className="border-t hover:bg-muted/20 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {getTypeIcon(report.type)}
                        <span className="font-mono text-sm">{report.id}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div>
                        <p className="font-medium">{report.location}</p>
                        <p className="text-sm text-muted-foreground">{report.country}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <div>
                        <p className="capitalize font-medium">{report.type}</p>
                        {report.violations.length > 0 && (
                          <p className="text-xs text-muted-foreground">
                            {report.violations.length} violation{report.violations.length > 1 ? 's' : ''}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      {getStatusBadge(report.type, report.status)}
                    </td>
                    <td className="p-4">
                      <Badge variant="outline" className="bg-accent/10 text-accent-foreground">
                        {report.confidence}%
                      </Badge>
                    </td>
                    <td className="p-4 text-sm text-muted-foreground">
                      {report.timestamp}
                    </td>
                    <td className="p-4">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="border-primary/50"
                        onClick={() => setSelectedReport(report)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredReports.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No reports found matching your criteria</p>
            </div>
          )}
          
          {filteredReports.length > 50 && (
            <div className="p-4 border-t bg-muted/20 text-center">
              <p className="text-sm text-muted-foreground">
                Showing 50 of {filteredReports.length} reports. Use filters to narrow results.
              </p>
            </div>
          )}
        </Card>

        {/* Report Detail Modal */}
        {selectedReport && (
          <ReportDetailView 
            report={selectedReport} 
            onClose={() => setSelectedReport(null)} 
          />
        )}
      </div>
    </div>
  );
};
