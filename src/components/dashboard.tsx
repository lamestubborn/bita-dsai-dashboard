
"use client";

import { Button } from "@/components/ui/button";
import { CurrentSessions } from "@/components/current-sessions";
import { PreviousSessions } from "@/components/previous-sessions";
import { ProgressTracker } from "@/components/progress-tracker";
import { CalendarDays } from "lucide-react";
import { BITSLogo } from '@/components/bits-logo';
import { ThemeToggle } from './theme-toggle';
import { motion } from 'framer-motion';

export function Dashboard() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-lg transition-all duration-300">
        <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-8">
            <BITSLogo className="h-10 w-auto" />
          <div className="flex items-center gap-4">
              <Button asChild variant="ghost" className="rounded-full">
                  <a href="/api/calendar/feed.ics">
                      <CalendarDays className="mr-2 h-4 w-4" />
                      Subscribe to Calendar
                  </a>
              </Button>
              <ThemeToggle />
          </div>
        </div>
      </header>
      <main className="container mx-auto flex flex-1 flex-col gap-12 p-4 md:gap-16 md:p-8">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
        >
            <CurrentSessions />
        </motion.div>
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
        >
            <ProgressTracker />
        </motion.div>
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
        >
            <PreviousSessions />
        </motion.div>
      </main>
    </div>
  );
}
