
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, LogOut, Moon, Sun, ChevronRight, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import MobileLayout from '@/components/MobileLayout';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { useToast } from '@/hooks/use-toast';

const Profile = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = () => {
    setIsLoggingOut(true);
    setTimeout(() => {
      logout();
      toast({
        title: "Signed Out",
        description: "You have been successfully logged out",
      });
      navigate('/login');
    }, 500);
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <MobileLayout currentRoute="/profile">
      <div className="px-4 py-6 animate-fade-in">
        <h1 className="text-2xl font-medium text-earth-900 dark:text-earth-100 mb-6 text-center">My Account</h1>
        
        <div className="bg-white dark:bg-earth-800 rounded-xl p-6 mb-6 shadow-sm">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16 border-2 border-saffron-200">
              <AvatarImage src={user.profilePicture || ''} alt={user.name} />
              <AvatarFallback className="bg-saffron-100 text-saffron-700 text-lg flex items-center justify-center">{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-medium text-earth-900 dark:text-earth-100">{user.name}</h2>
              <p className="text-earth-600 dark:text-earth-300">{user.email}</p>
            </div>
          </div>
          
          <Button 
            variant="outline" 
            className="mt-4 w-full border-dashed"
            onClick={() => navigate('/edit-profile')}
          >
            Edit Profile
          </Button>
        </div>
        
        <div className="bg-white dark:bg-earth-800 rounded-xl overflow-hidden shadow-sm mb-6">
          <div className="p-4 border-b border-earth-100 dark:border-earth-700">
            <h3 className="text-lg font-medium text-earth-900 dark:text-earth-100">Preferences</h3>
          </div>
          
          <div className="divide-y divide-earth-100 dark:divide-earth-700">
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {theme === 'dark' ? <Moon className="text-earth-600 dark:text-earth-300" size={20} /> : <Sun className="text-earth-600 dark:text-earth-300" size={20} />}
                <Label htmlFor="theme-mode" className="text-earth-800 dark:text-earth-200 cursor-pointer">
                  Dark Mode
                </Label>
              </div>
              <Switch 
                id="theme-mode" 
                checked={theme === 'dark'}
                onCheckedChange={toggleTheme}
              />
            </div>
            
            <div className="p-4 flex items-center justify-between cursor-pointer" onClick={() => navigate('/notifications')}>
              <div className="flex items-center gap-3">
                <Bell className="text-earth-600 dark:text-earth-300" size={20} />
                <span className="text-earth-800 dark:text-earth-200">Notifications</span>
              </div>
              <ChevronRight className="text-earth-400" size={20} />
            </div>
          </div>
        </div>
        
        <Button 
          variant="outline" 
          className="w-full flex items-center justify-center gap-2 text-red-500 border-red-100 hover:bg-red-50 hover:text-red-600 dark:border-red-900 dark:hover:bg-red-950"
          onClick={handleLogout}
          disabled={isLoggingOut}
        >
          <LogOut size={18} />
          {isLoggingOut ? "Signing Out..." : "Sign Out"}
        </Button>
      </div>
    </MobileLayout>
  );
};

export default Profile;
