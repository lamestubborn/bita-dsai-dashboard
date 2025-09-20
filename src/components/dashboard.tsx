
"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { CurrentSessions } from "@/components/current-sessions";
import { PreviousSessions } from "@/components/previous-sessions";
import { ProgressTracker } from "@/components/progress-tracker";
import { CalendarDays } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BITSLogo } from '@/components/bits-logo';
import { ThemeToggle } from './theme-toggle';

export function Dashboard() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <header className="sticky top-0 z-10 flex h-20 items-center gap-4 border-b bg-background/95 px-4 backdrop-blur-sm md:px-8">
        <div className="flex items-center gap-4">
            <BITSLogo className="h-10 w-auto dark:bg-white" />
        </div>
        <div className="ml-auto flex items-center gap-4">
            <Button asChild>
                <a href="/api/calendar/feed.ics">
                    <CalendarDays className="mr-2 h-4 w-4" />
                    Subscribe to Calendar
                </a>
            </Button>
            <ThemeToggle />
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <Tabs defaultValue="current" className="w-full">
            <div className="mb-4 flex justify-center">
                <TabsList className="bg-transparent border">
                    <TabsTrigger value="current">Upcoming</TabsTrigger>
                    <TabsTrigger value="previous">Archive</TabsTrigger>
                    <TabsTrigger value="progress">Progress</TabsTrigger>
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
