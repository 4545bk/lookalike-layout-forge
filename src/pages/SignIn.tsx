import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone, Lock, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FacialVerification } from '@/components/FacialVerification';
import { useToast } from '@/hooks/use-toast';

const SignIn = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState<'form' | 'facial'>('form');
  const [formData, setFormData] = useState({
    phoneNumber: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.phoneNumber || !formData.password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    // Move to facial verification
    setStep('facial');
  };

  const handleFacialVerified = () => {
    toast({
      title: "Success",
      description: "Signed in successfully!",
    });
    setTimeout(() => navigate('/'), 1000);
  };

  if (step === 'facial') {
    return (
      <FacialVerification
        mode="signin"
        onVerified={handleFacialVerified}
        onCancel={() => setStep('form')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-4 flex items-center gap-3">
        <button onClick={() => navigate('/')} className="p-1">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-semibold">Sign In</h1>
      </div>

      {/* Form */}
      <div className="p-6">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Welcome Back</h2>
            <p className="text-muted-foreground">Sign in to your Telebirr account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <div className="relative mt-1">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="phoneNumber"
                  type="tel"
                  placeholder="+251 9XX XXX XXX"
                  className="pl-10"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className="pl-10"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                className="text-sm text-primary hover:underline"
                onClick={() => toast({ title: "Info", description: "Password reset feature coming soon" })}
              >
                Forgot Password?
              </button>
            </div>

            <Button type="submit" className="w-full mt-6" size="lg">
              <Camera className="w-5 h-5 mr-2" />
              Continue to Facial Verification
            </Button>
          </form>

          <p className="text-center mt-6 text-sm text-muted-foreground">
            Don't have an account?{' '}
            <button
              onClick={() => navigate('/signup')}
              className="text-primary font-semibold hover:underline"
            >
              Sign Up
            </button>
          </p>

          <div className="mt-8 p-4 bg-muted/50 rounded-lg">
            <p className="text-xs text-muted-foreground text-center">
              🔒 Your biometric data is encrypted and stored securely
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
