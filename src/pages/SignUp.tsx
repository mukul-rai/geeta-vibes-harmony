
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, ArrowRight, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import MobileLayout from '@/components/MobileLayout';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<SignUpFormData>();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: SignUpFormData) => {
    setIsLoading(true);
    try {
      await signup(data.name, data.email, data.password);
      toast({
        title: "Account Created",
        description: "Welcome to Bhagavad Gita",
      });
      navigate('/');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Sign Up Failed",
        description: "There was a problem creating your account.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MobileLayout currentRoute="/signup">
      <div className="px-4 py-8 animate-fade-in">
        <div className="flex flex-col items-center mb-8">
          <BookOpen className="w-12 h-12 text-saffron-600 mb-2" />
          <h1 className="font-serif text-2xl font-medium text-earth-900 dark:text-earth-50">
            श्रीमद्‍भगवद्‍गीता
          </h1>
        </div>

        <div className="mb-6 text-center">
          <h2 className="text-2xl font-medium text-earth-800 dark:text-earth-100 mb-2">Create Account</h2>
          <p className="text-earth-600 dark:text-earth-300">Begin your spiritual journey with us</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your name"
              {...register("name", { required: "Name is required" })}
              className="bg-white dark:bg-earth-800"
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register("email", { 
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Invalid email format"
                }
              })}
              className="bg-white dark:bg-earth-800"
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                {...register("password", { 
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters"
                  }
                })}
                className="bg-white dark:bg-earth-800 pr-10"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-earth-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          <Button 
            type="submit" 
            className="w-full bg-saffron-600 hover:bg-saffron-700 text-white dark:bg-saffron-700 dark:hover:bg-saffron-800"
            disabled={isLoading}
          >
            {isLoading ? "Creating Account..." : "Create Account"}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-earth-600 dark:text-earth-300">
            Already have an account?{" "}
            <Link to="/login" className="text-saffron-600 hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </MobileLayout>
  );
};

export default SignUp;
