
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import MobileLayout from '@/components/MobileLayout';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';

const EditProfile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [isSaving, setIsSaving] = useState(false);

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Mock update - in a real app, you would call an API
    setTimeout(() => {
      // In a real app, this would be handled by the AuthContext update method
      const updatedUser = {
        ...user,
        name,
        email
      };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated",
      });
      navigate('/profile');
      setIsSaving(false);
    }, 800);
  };

  return (
    <MobileLayout currentRoute="/profile">
      <div className="px-4 py-6 animate-fade-in">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            size="icon" 
            className="mr-2 flex items-center justify-center"
            onClick={() => navigate('/profile')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-medium text-earth-900 dark:text-earth-100">Edit Profile</h1>
        </div>
        
        <div className="flex flex-col items-center mb-8">
          <div className="relative group">
            <Avatar className="h-24 w-24 border-2 border-saffron-200 group-hover:opacity-80 transition-opacity">
              <AvatarImage src={user.profilePicture || ''} alt={user.name} />
              <AvatarFallback className="bg-saffron-100 text-saffron-700 text-xl flex items-center justify-center">{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="bg-earth-900 bg-opacity-50 rounded-full p-2 flex items-center justify-center">
                <Camera className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>
          <Button 
            variant="ghost" 
            className="mt-2 text-saffron-600 hover:text-saffron-700 hover:bg-transparent flex items-center justify-center"
          >
            Change Photo
          </Button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-white dark:bg-earth-800 text-center"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white dark:bg-earth-800 text-center"
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-saffron-600 hover:bg-saffron-700 dark:bg-saffron-700 dark:hover:bg-saffron-800 flex items-center justify-center"
            disabled={isSaving}
          >
            {isSaving ? "Saving Changes..." : "Save Changes"}
          </Button>
        </form>
      </div>
    </MobileLayout>
  );
};

export default EditProfile;
