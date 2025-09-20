
"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { CurrentSessions } from "@/components/current-sessions";
import { PreviousSessions } from "@/components/previous-sessions";
import { ProgressTracker } from "@/components/progress-tracker";
import { CalendarDays, BookOpenCheck } from "lucide-react";

type View = 'progress' | 'current' | 'previous';

export function Dashboard() {
  const [activeView, setActiveView] = useState<View>('progress');

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:px-6">
        <div className="flex items-center gap-2">
            <BookOpenCheck className="h-7 w-7 text-primary" />
            <h1 className="font-headline text-2xl font-bold tracking-tighter">
                StudyPulse
            </h1>
        </div>
        <div className="ml-auto">
            <Button asChild>
                <a href="/api/calendar/feed.ics">
                    <CalendarDays className="mr-2 h-4 w-4" />
                    Subscribe to Calendar
                </a>
            </Button>
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex justify-center">
            <div className="flex gap-2 rounded-lg bg-muted p-1">
                <Button variant={activeView === 'progress' ? 'default' : 'ghost'} onClick={() => setActiveView('progress')} className="w-full justify-center">Progress Tracker</Button>
                <Button variant={activeView === 'current' ? 'default' : 'ghost'} onClick={() => setActiveView('current')} className="w-full justify-center">This Week's Sessions</Button>
                <Button variant={activeView === 'previous' ? 'default' : 'ghost'} onClick={() => setActiveView('previous')} className="w-full justify-center">Session Archive</Button>
            </div>
        </div>
        <div>
            {activeView === 'progress' && <ProgressTracker />}
            {activeView === 'current' && <CurrentSessions />}
            {activeView === 'previous' && <PreviousSessions />}
        </div>
      </main>
    </div>
  );
}
