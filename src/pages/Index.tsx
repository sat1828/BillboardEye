import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Camera, Shield, Users, MapPin, BarChart3, 
  Eye, AlertTriangle, CheckCircle, Smartphone,
  Globe, TrendingUp, Award, LogIn, UserPlus, User
} from 'lucide-react';
import { CameraInterface } from '@/components/CameraInterface';
import { AuthorityDashboard } from '@/components/AuthorityDashboard';
import { UserProfile } from '@/components/auth/UserProfile';

interface IndexProps {
  isAuthenticated: boolean;
  onShowLogin: () => void;
  onShowSignup: () => void;
  onLogout: () => void;
}

const Index: React.FC<IndexProps> = ({ 
  isAuthenticated, 
  onShowLogin, 
  onShowSignup, 
  onLogout 
}) => {
  const [currentView, setCurrentView] = useState<'home' | 'camera' | 'dashboard' | 'profile'>('home');

  if (currentView === 'camera') {
    return <CameraInterface onBackToHome={() => setCurrentView('home')} />;
  }

  if (currentView === 'dashboard') {
    return <AuthorityDashboard onBackToHome={() => setCurrentView('home')} />;
  }

  if (currentView === 'profile') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-primary/5 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Button
            variant="ghost"
            onClick={() => setCurrentView('home')}
            className="mb-6 text-muted-foreground hover:text-foreground"
          >
            ← Back to Home
          </Button>
          <UserProfile onLogout={onLogout} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-primary/5">
      {/* Navigation */}
      <nav className="border-b border-border/40 bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-primary-glow rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Civic Billboard Watch</h1>
                <p className="text-xs text-muted-foreground">AI-Powered City Monitoring</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {isAuthenticated ? (
                <>
                  <Button 
                    variant="outline" 
                    onClick={() => setCurrentView('profile')}
                    className="border-primary/50 text-primary hover:bg-primary/10"
                  >
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setCurrentView('dashboard')}
                    className="border-primary/50 text-primary hover:bg-primary/10"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Dashboard
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    variant="outline" 
                    onClick={onShowLogin}
                    className="border-primary/50 text-primary hover:bg-primary/10"
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    Login
                  </Button>
                  <Button 
                    onClick={onShowSignup}
                    className="bg-gradient-to-r from-primary to-primary-glow text-primary-foreground"
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    Sign Up
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
                <Globe className="w-4 h-4 mr-1" />
                Global Billboard Monitoring System
              </Badge>
              
              <h1 className="text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                AI-Powered
                <span className="block bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                  Billboard Detection
                </span>
                for Safer Cities
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Empowering citizens and authorities to detect, flag, and remove unauthorized 
                billboards in real-time using advanced AI detection, GPS tracking, and 
                comprehensive reporting dashboard.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button 
                  size="lg"
                  onClick={() => isAuthenticated ? setCurrentView('camera') : onShowSignup}
                  className="bg-gradient-to-r from-primary to-primary-glow hover:from-primary-dark hover:to-primary text-primary-foreground text-lg px-8 py-6 civic-glow"
                >
                  <Camera className="w-5 h-5 mr-2" />
                  {isAuthenticated ? 'Start Detection' : 'Join & Start Detection'}
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  onClick={() => setCurrentView('dashboard')}
                  className="border-primary/50 text-primary hover:bg-primary/10 text-lg px-8 py-6"
                >
                  <BarChart3 className="w-5 h-5 mr-2" />
                  View Analytics
                </Button>
              </div>

              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span>92%+ Accuracy</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-primary" />
                  <span>Privacy Protected</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-accent" />
                  <span>Global Coverage</span>
                </div>
              </div>
            </div>

            <div className="relative">
              {/* Mock Phone Interface */}
              <div className="relative max-w-sm mx-auto">
                <div className="bg-card border border-border/40 rounded-3xl p-6 shadow-2xl civic-glow">
                  <div className="aspect-[9/16] bg-gradient-to-br from-muted/50 to-secondary/30 rounded-2xl relative overflow-hidden">
                    {/* Mock camera interface */}
                    <div className="absolute inset-4 border-2 border-dashed border-primary/30 rounded-xl flex items-center justify-center">
                      <div className="text-center">
                        <Camera className="w-12 h-12 text-primary mx-auto mb-3" />
                        <p className="text-sm text-muted-foreground font-medium">Billboard Detection</p>
                        <p className="text-xs text-muted-foreground">Ready to Scan</p>
                      </div>
                    </div>
                    
                    {/* Mock detection box */}
                    <div className="absolute top-8 left-8 right-8 h-24 border-2 border-destructive rounded-lg pulse-detection">
                      <div className="absolute -top-6 left-0">
                        <Badge className="bg-destructive/10 text-destructive border-destructive/20 text-xs">
                          Billboard Violation Detected
                        </Badge>
                      </div>
                    </div>

                    {/* Mock bottom info */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-card/90 backdrop-blur-sm rounded-lg p-3 border border-border/40">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                          <MapPin className="w-3 h-3" />
                          <span>Location: Detected</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <AlertTriangle className="w-3 h-3 text-warning" />
                          <span>Confidence: 94.2%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Floating elements */}
                <div className="absolute -top-6 -right-6 w-20 h-20 bg-success/10 rounded-full flex items-center justify-center border border-success/20">
                  <CheckCircle className="w-8 h-8 text-success" />
                </div>
                <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center border border-primary/20">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Comprehensive Billboard Monitoring
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From AI-powered detection to global analytics dashboard - 
              everything you need for effective billboard regulation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-8 border-border/40 hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                <Smartphone className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Mobile AI Detection</h3>
              <p className="text-muted-foreground mb-4">
                Advanced YOLOv8 AI model detects billboard violations instantly. 
                Identifies oversized, damaged, and inappropriate content with 92%+ accuracy.
              </p>
              <div className="flex items-center gap-2 text-sm">
                <Badge className="bg-success/10 text-success border-success/20">Real-time</Badge>
                <Badge className="bg-primary/10 text-primary border-primary/20">Offline Ready</Badge>
              </div>
            </Card>

            <Card className="p-8 border-border/40 hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
              <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mb-6">
                <MapPin className="w-6 h-6 text-success" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">GPS Geotagging</h3>
              <p className="text-muted-foreground mb-4">
                Automatic location capture with precise GPS coordinates and timestamps. 
                Cross-reference with restricted zones and municipal regulations.
              </p>
              <div className="flex items-center gap-2 text-sm">
                <Badge className="bg-accent/10 text-accent-foreground border-accent/20">Automatic</Badge>
                <Badge className="bg-warning/10 text-warning border-warning/20">Precise</Badge>
              </div>
            </Card>

            <Card className="p-8 border-border/40 hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
              <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center mb-6">
                <BarChart3 className="w-6 h-6 text-warning" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Global Dashboard</h3>
              <p className="text-muted-foreground mb-4">
                Comprehensive analytics dashboard for authorities. Track violations 
                across countries, states, and cities with interactive maps and filters.
              </p>
              <div className="flex items-center gap-2 text-sm">
                <Badge className="bg-primary/10 text-primary border-primary/20">Global</Badge>
                <Badge className="bg-success/10 text-success border-success/20">Interactive</Badge>
              </div>
            </Card>

            <Card className="p-8 border-border/40 hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
              <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center mb-6">
                <AlertTriangle className="w-6 h-6 text-destructive" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Violation Detection</h3>
              <p className="text-muted-foreground mb-4">
                Detects multiple violation types: oversized billboards, structural damage, 
                inappropriate content, and unpermitted installations.
              </p>
              <div className="flex items-center gap-2 text-sm">
                <Badge className="bg-destructive/10 text-destructive border-destructive/20">Multi-type</Badge>
                <Badge className="bg-muted/50 text-muted-foreground border-muted">Comprehensive</Badge>
              </div>
            </Card>

            <Card className="p-8 border-border/40 hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Citizen Engagement</h3>
              <p className="text-muted-foreground mb-4">
                Gamified reporting system encourages citizen participation. 
                Leaderboards, badges, and transparency features build community trust.
              </p>
              <div className="flex items-center gap-2 text-sm">
                <Badge className="bg-accent/10 text-accent-foreground border-accent/20">Gamified</Badge>
                <Badge className="bg-primary/10 text-primary border-primary/20">Community</Badge>
              </div>
            </Card>

            <Card className="p-8 border-border/40 hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">Privacy & Ethics</h3>
              <p className="text-muted-foreground mb-4">
                Complete data anonymization, no personal information stored. 
                Images used only for detection purposes with ethical AI practices.
              </p>
              <div className="flex items-center gap-2 text-sm">
                <Badge className="bg-success/10 text-success border-success/20">Secure</Badge>
                <Badge className="bg-primary/10 text-primary border-primary/20">Ethical</Badge>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">92%+</div>
              <div className="text-muted-foreground">Detection Accuracy</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-success mb-2">15K+</div>
              <div className="text-muted-foreground">Reports Processed</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-warning mb-2">50+</div>
              <div className="text-muted-foreground">Countries Covered</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent mb-2">98%</div>
              <div className="text-muted-foreground">User Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 via-primary-glow/10 to-primary/5">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-foreground mb-6">
            Ready to Make Your City Safer?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of citizens and authorities already using our platform 
            to create cleaner, safer urban environments.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              onClick={() => isAuthenticated ? setCurrentView('camera') : onShowSignup}
              className="bg-gradient-to-r from-primary to-primary-glow hover:from-primary-dark hover:to-primary text-primary-foreground text-lg px-8 py-6"
            >
              <Camera className="w-5 h-5 mr-2" />
              {isAuthenticated ? 'Start Monitoring Now' : 'Join & Start Monitoring'}
            </Button>
            <Button 
              size="lg"
              variant="outline"
              onClick={() => setCurrentView('dashboard')}
              className="border-primary/50 text-primary hover:bg-primary/10 text-lg px-8 py-6"
            >
              <TrendingUp className="w-5 h-5 mr-2" />
              Explore Dashboard
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-card/50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-primary-glow rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <div className="font-bold text-foreground">Civic Billboard Watch</div>
                <div className="text-xs text-muted-foreground">AI-Powered City Monitoring</div>
              </div>
            </div>
            <div className="text-sm text-muted-foreground text-center">
              <p>Data anonymized • No personal info stored • Images used only for detection</p>
              <p className="mt-1">Empowering citizens & authorities for safer cities worldwide</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;