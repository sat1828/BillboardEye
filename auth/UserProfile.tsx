import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  User, LogOut, MapPin, BarChart3, Award, 
  Trophy, Star, Target 
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

interface UserProfileProps {
  onLogout: () => void;
}

interface UserData {
  id: string;
  email: string;
  full_name: string;
  city: string;
  country: string;
  reports_count: number;
  created_at: string;
}

export const UserProfile: React.FC<UserProfileProps> = ({ onLogout }) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError) throw authError;

      if (user) {
        const { data, error } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) throw error;
        setUserData(data);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load profile data",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      });
      onLogout();
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to logout",
        variant: "destructive",
      });
    }
  };

  const getUserBadge = (reportsCount: number) => {
    if (reportsCount >= 100) return { title: "Guardian Elite", icon: Trophy, color: "bg-yellow-500" };
    if (reportsCount >= 50) return { title: "City Protector", icon: Award, color: "bg-purple-500" };
    if (reportsCount >= 20) return { title: "Alert Citizen", icon: Star, color: "bg-blue-500" };
    if (reportsCount >= 5) return { title: "Watchful Eye", icon: Target, color: "bg-green-500" };
    return { title: "New Reporter", icon: User, color: "bg-gray-500" };
  };

  if (isLoading) {
    return (
      <Card className="max-w-md mx-auto">
        <CardContent className="p-6">
          <div className="animate-pulse">
            <div className="w-16 h-16 bg-muted rounded-full mx-auto mb-4"></div>
            <div className="h-4 bg-muted rounded w-3/4 mx-auto mb-2"></div>
            <div className="h-3 bg-muted rounded w-1/2 mx-auto"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!userData) {
    return (
      <Card className="max-w-md mx-auto">
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">Profile not found</p>
        </CardContent>
      </Card>
    );
  }

  const badge = getUserBadge(userData.reports_count);
  const BadgeIcon = badge.icon;

  return (
    <Card className="max-w-md mx-auto border-border/40 shadow-lg">
      <CardHeader className="text-center pb-4">
        <Avatar className="w-20 h-20 mx-auto mb-4">
          <AvatarFallback className="text-xl bg-gradient-to-r from-primary to-primary-glow text-primary-foreground">
            {userData.full_name.split(' ').map(n => n[0]).join('').toUpperCase()}
          </AvatarFallback>
        </Avatar>
        
        <CardTitle className="text-xl font-bold">{userData.full_name}</CardTitle>
        <p className="text-muted-foreground text-sm">{userData.email}</p>
        
        <div className="flex items-center justify-center gap-2 mt-3">
          <MapPin className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            {userData.city}, {userData.country}
          </span>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* User Badge */}
        <div className="text-center">
          <div className={`w-12 h-12 ${badge.color} rounded-full flex items-center justify-center mx-auto mb-2`}>
            <BadgeIcon className="w-6 h-6 text-white" />
          </div>
          <Badge className="bg-primary/10 text-primary border-primary/20">
            {badge.title}
          </Badge>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-muted/30 rounded-lg">
            <BarChart3 className="w-8 h-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">{userData.reports_count}</div>
            <div className="text-xs text-muted-foreground">Reports Submitted</div>
          </div>
          
          <div className="text-center p-4 bg-muted/30 rounded-lg">
            <User className="w-8 h-8 text-success mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">
              {Math.floor((Date.now() - new Date(userData.created_at).getTime()) / (1000 * 60 * 60 * 24))}
            </div>
            <div className="text-xs text-muted-foreground">Days Active</div>
          </div>
        </div>

        {/* Progress to Next Badge */}
        <div className="space-y-2">
          <div className="text-sm text-muted-foreground text-center">
            Progress to Next Badge
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-primary to-primary-glow h-2 rounded-full transition-all duration-300"
              style={{ 
                width: `${Math.min((userData.reports_count % 5) * 20 || (userData.reports_count >= 100 ? 100 : 0), 100)}%` 
              }}
            ></div>
          </div>
          <div className="text-xs text-muted-foreground text-center">
            {userData.reports_count >= 100 
              ? "Maximum level reached!" 
              : `${5 - (userData.reports_count % 5)} more reports needed`
            }
          </div>
        </div>

        {/* Logout Button */}
        <Button
          onClick={handleLogout}
          variant="outline"
          className="w-full border-destructive/50 text-destructive hover:bg-destructive/10"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </CardContent>
    </Card>
  );
};