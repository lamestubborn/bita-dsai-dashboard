

"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { CurrentSessions } from "@/components/current-sessions";
import { PreviousSessions } from "@/components/previous-sessions";
import { ProgressTracker } from "@/components/progress-tracker";
import { CalendarDays, Linkedin, Newspaper, BookOpen, Search } from "lucide-react";
import { BITSLogo } from '@/components/bits-logo';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from 'framer-motion';
import { ImportantUpdates } from "./important-updates";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { ApexProjectRegistration } from "./apex-project-registration";
import { Chatbot } from "./chatbot";
import { BuyMeACoffeeButton } from "./buy-me-a-coffee-button";
import { ThemeToggle } from "./theme-toggle";
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { SearchResults } from './search-results';

export type FilterType = 'all' | 'session' | 'update' | 'subject';
export type SortType = 'relevance' | 'date-desc' | 'date-asc';
export type SubjectFilterType = 'all' | 'dvs' | 'fe' | 'dp' | 'smi' | 'dsp' | 'aap';

export function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [subjectFilter, setSubjectFilter] = useState<SubjectFilterType>('all');
  const [sortType, setSortType] = useState<SortType>('relevance');

  const showSearchResults = searchQuery.trim() !== '';

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

        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
              placeholder="Search sessions, updates, subjects..."
              className="w-full pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Select value={filterType} onValueChange={(value: FilterType) => setFilterType(value)}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="session">Sessions</SelectItem>
                <SelectItem value="update">Updates</SelectItem>
                <SelectItem value="subject">Subjects</SelectItem>
              </SelectContent>
            </Select>
            <Select value={subjectFilter} onValueChange={(value: SubjectFilterType) => setSubjectFilter(value)}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                <SelectItem value="dvs">Data Visualization</SelectItem>
                <SelectItem value="fe">Feature Engineering</SelectItem>
                <SelectItem value="dp">Data Pre-processing</SelectItem>
                <SelectItem value="smi">Statistical Modelling</SelectItem>
                <SelectItem value="dsp">Data Stores & Pipelines</SelectItem>
                <SelectItem value="aap">Advanced Apex Project</SelectItem>
              </SelectContent>
            </Select>
             <Select value={sortType} onValueChange={(value: SortType) => setSortType(value)}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="date-desc">Date (Newest)</SelectItem>
                <SelectItem value="date-asc">Date (Oldest)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {showSearchResults ? (
           <SearchResults 
              query={searchQuery}
              filter={filterType}
              subjectFilter={subjectFilter}
              sort={sortType}
            />
        ) : (
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
        )}
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
