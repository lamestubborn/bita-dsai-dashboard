
"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { initiateGoogleSignIn, useAuth } from '@/firebase';
import { useToast } from '@/hooks/use-toast';
import { BITSLogo } from './bits-logo';

interface LoginDialogProps {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    showTrigger?: boolean;
}

export function LoginDialog({ open: controlledOpen, onOpenChange: controlledOnOpenChange, showTrigger = true }: LoginDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const auth = useAuth();
  const { toast } = useToast();

  const open = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setOpen = controlledOnOpenChange !== undefined ? controlledOnOpenChange : setInternalOpen;
  
  const handleGoogleSignIn = async () => {
    if (!auth) {
       toast({
        variant: "destructive",
        title: "Authentication service not available.",
        description: "Please try again later.",
      });
      return;
    }
    try {
      await initiateGoogleSignIn(auth);
      setOpen(false); // Close dialog on action
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Authentication Failed",
        description: error.message || "An unexpected error occurred.",
      });
    }
  };

  const dialogContent = (
    <DialogContent className="sm:max-w-[425px]" onInteractOutside={(e) => e.preventDefault()} hideCloseButton={!showTrigger}>
      <DialogHeader className="items-center text-center">
        <BITSLogo className="h-12 w-auto" />
        <DialogTitle className='pt-4'>BITS Pilani DSAI Dashboard</DialogTitle>
        <DialogDescription>
          Please sign in with your BITS Pilani Google account to continue.
        </DialogDescription>
      </DialogHeader>
      <div className="py-4">
        <Button onClick={handleGoogleSignIn} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
            Sign in with BITS Pilani Google Account
        </Button>
      </div>
    </DialogContent>
  );

  if (!showTrigger) {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            {dialogContent}
        </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
          {/* This trigger is not shown when forced login is active, but kept for potential future use */}
         <Button>Sign In</Button>
      </DialogTrigger>
      {dialogContent}
    </Dialog>
  );
}
