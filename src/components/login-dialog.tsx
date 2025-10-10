
"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { initiateEmailSignIn, initiateEmailSignUp, initiateAnonymousSignIn, useAuth } from '@/firebase';
import { LogIn } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function LoginDialog() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [open, setOpen] = useState(false);
  const auth = useAuth();
  const { toast } = useToast();

  const handleAuthAction = async () => {
    if (!auth) {
      toast({
        variant: "destructive",
        title: "Authentication service not available.",
        description: "Please try again later.",
      });
      return;
    }
    
    try {
      if (isSignUp) {
        initiateEmailSignUp(auth, email, password);
      } else {
        initiateEmailSignIn(auth, email, password);
      }
      setOpen(false); // Close dialog on action
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Authentication Failed",
        description: error.message || "An unexpected error occurred.",
      });
    }
  };
  
  const handleAnonymousSignIn = async () => {
    if (!auth) {
       toast({
        variant: "destructive",
        title: "Authentication service not available.",
        description: "Please try again later.",
      });
      return;
    }
    try {
      initiateAnonymousSignIn(auth);
      setOpen(false); // Close dialog on action
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Authentication Failed",
        description: error.message || "An unexpected error occurred.",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="rounded-full">
            <LogIn className="mr-2 h-4 w-4" />
            Login
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isSignUp ? 'Create an account' : 'Sign In'}</DialogTitle>
          <DialogDescription>
            {isSignUp ? 'Enter your email and password to sign up.' : 'Enter your credentials to access your dashboard.'}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="col-span-3"
              placeholder="name@example.com"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password" text-right" className="text-right">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
            <Button onClick={handleAuthAction}>
              {isSignUp ? 'Sign Up' : 'Sign In'}
            </Button>
            <Button variant="secondary" onClick={handleAnonymousSignIn}>
                Continue as Guest
            </Button>
        </div>
        <p className="text-center text-sm text-muted-foreground">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <Button variant="link" className="p-0 h-auto" onClick={() => setIsSignUp(!isSignUp)}>
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </Button>
        </p>
      </DialogContent>
    </Dialog>
  );
}
