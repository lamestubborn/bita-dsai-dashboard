
"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { CurrentSessions } from "@/components/current-sessions";
import { PreviousSessions } from "@/components/previous-sessions";
import { ProgressTracker } from "@/components/progress-tracker";
import { CalendarDays, BookOpenCheck } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function Dashboard() {
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
        <Tabs defaultValue="current" className="w-full">
            <div className="flex justify-center">
                <TabsList>
                    <TabsTrigger value="current">Upcoming Sessions</TabsTrigger>
                    <TabsTrigger value="previous">Session Archive</TabsTrigger>
                    <TabsTrigger value="progress">Progress Tracker</TabsTrigger>
                </TabsList>
            </div>
          <TabsContent value="current"><CurrentSessions /></TabsContent>
          <TabsContent value="previous"><PreviousSessions /></TabsContent>
          <TabsContent value="progress"><ProgressTracker /></TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

    
