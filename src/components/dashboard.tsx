

"use client";

import { Button } from "@/components/ui/button";
import { CurrentSessions } from "@/components/current-sessions";
import { PreviousSessions } from "@/components/previous-sessions";
import { ProgressTracker } from "@/components/progress-tracker";
import { CalendarDays, Linkedin, Newspaper, BookOpen } from "lucide-react";
import { BITSLogo } from '@/components/bits-logo';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from 'framer-motion';
import { ImportantUpdates } from "./important-updates";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { ApexProjectRegistration } from "./apex-project-registration";
import { Chatbot } from "./chatbot";
import { BuyMeACoffeeButton } from "./buy-me-a-coffee-button";
import { ThemeToggle } from "./theme-toggle";


export function Dashboard() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-lg transition-all duration-300">
        <TooltipProvider>
          <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-8">
              <BITSLogo className="h-10 w-auto" />
              
              <div className="flex items-center gap-2">
                {/* Mobile Icon Buttons */}
                <div className="flex md:hidden items-center gap-1">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button asChild variant="ghost" size="icon">
                        <a href="https://drive.google.com/drive/folders/1w0ecymnFR6UKVDApGB8-NKI_0XAUrfue?usp=sharing" target="_blank" rel="noopener noreferrer">
                            <BookOpen className="h-5 w-5" />
                            <span className="sr-only">Study Materials</span>
                        </a>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Study Materials</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button asChild variant="ghost" size-="icon">
                          <a href="/api/calendar/feed.ics">
                              <CalendarDays className="h-5 w-5" />
                              <span className="sr-only">Subscribe to Calendar</span>
                          </a>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Subscribe to Calendar</p>
                    </TooltipContent>
                  </Tooltip>
                </div>

                {/* Desktop Full Buttons */}
                <div className="hidden md:flex items-center gap-2">
                  <Button asChild variant="ghost" className="rounded-full">
                      <a href="https://drive.google.com/drive/folders/1w0ecymnFR6UKVDApGB8-NKI_0XAUrfue?usp=sharing" target="_blank" rel="noopener noreferrer">
                          <BookOpen className="mr-2 h-4 w-4" />
                          Study Materials
                      </a>
                  </Button>
                  <Button asChild variant="ghost" className="rounded-full">
                      <a href="/api/calendar/feed.ics">
                          <CalendarDays className="mr-2 h-4 w-4" />
                          Subscribe to Calendar
                      </a>
                  </Button>
                </div>
                <ThemeToggle />
              </div>
          </div>
        </TooltipProvider>
      </header>
      <main className="container mx-auto flex flex-1 flex-col gap-8 p-4 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ApexProjectRegistration />
          <ImportantUpdates />
        </div>
        <Tabs defaultValue="this-week">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="this-week">This Week</TabsTrigger>
              <TabsTrigger value="progress">Progress</TabsTrigger>
              <TabsTrigger value="archive">Archive</TabsTrigger>
            </TabsList>
          </motion.div>
            <TabsContent value="this-week">
              <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
              >
                  <CurrentSessions />
              </motion.div>
            </TabsContent>
            <TabsContent value="progress">
              <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
              >
                  <ProgressTracker />
              </motion.div>
            </TabsContent>
            <TabsContent value="archive">
              <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
              >
                  <PreviousSessions />
              </motion.div>
            </TabsContent>
        </Tabs>
      </main>
      <footer className="py-4 border-t">
        <div className="container mx-auto flex items-center justify-center gap-4 flex-wrap">
            <Button asChild size="icon" className="bg-[#0077b5] text-white hover:bg-[#0077b5]/90 rounded-full">
                <a href="https://www.linkedin.com/in/thestubbornsailor/" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-5 w-5" />
                    <span className="sr-only">Connect with developer</span>
                </a>
            </Button>
            <Button asChild variant="outline" className="rounded-full">
                <a href="https://www.linkedin.com/newsletters/7353139620018081793/" target="_blank" rel="noopener noreferrer">
                    <Newspaper className="mr-2 h-4 w-4" />
                    Read my newsletter
                </a>
            </Button>
            <BuyMeACoffeeButton />
        </div>
      </footer>
      <Chatbot />
    </div>
  );
}
