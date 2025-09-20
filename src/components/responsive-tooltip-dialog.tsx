
"use client";

import * as React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface ResponsiveTooltipDialogProps {
  children: React.ReactNode;
}

export function ResponsiveTooltipDialog({ children }: ResponsiveTooltipDialogProps) {
  const isMobile = useIsMobile();
  const [open, setOpen] = React.useState(false);

  if (isMobile) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        {children}
      </Dialog>
    );
  }

  return (
    <TooltipProvider>
      <Tooltip open={open} onOpenChange={setOpen}>
        {children}
      </Tooltip>
    </TooltipProvider>
  );
}

export const ResponsiveTooltipDialogTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ children, ...props }, ref) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <DialogTrigger asChild ref={ref} {...props}>
        {children}
      </DialogTrigger>
    );
  }

  return (
    <TooltipTrigger asChild ref={ref} {...props}>
      {children}
    </TooltipTrigger>
  );
});
ResponsiveTooltipDialogTrigger.displayName = "ResponsiveTooltipDialogTrigger";

interface ResponsiveTooltipDialogContentProps {
    children: React.ReactNode;
    dialogTitle?: React.ReactNode;
    tooltipClassName?: string;
}

export function ResponsiveTooltipDialogContent({ children, dialogTitle, tooltipClassName }: ResponsiveTooltipDialogContentProps) {
    const isMobile = useIsMobile();

    if (isMobile) {
        return (
            <DialogContent>
                {dialogTitle}
                {children}
            </DialogContent>
        );
    }

    return (
        <TooltipContent className={tooltipClassName}>
            {children}
        </TooltipContent>
    );
}
