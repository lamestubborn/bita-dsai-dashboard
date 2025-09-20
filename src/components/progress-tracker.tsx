
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { subjects, currentSessions, type Subject } from "@/lib/data";
import { motion } from 'framer-motion';

interface SubjectProgress extends Subject {
  completedSessions: number;
  totalSessions: number;
  progress: number;
}

export function ProgressTracker() {
  const [subjectsWithProgress, setSubjectsWithProgress] = useState<SubjectProgress[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  
  useEffect(() => {
    if (isClient) {
      const now = new Date();
      const calculatedProgress = subjects.map((subject) => {
        const allSubjectSessions = currentSessions.filter(
          (session) => session.subject === subject.name
        );
        const completedSessions = allSubjectSessions.filter(
          (session) => session.startTime < now
        ).length;

        const totalSessions = allSubjectSessions.length > 0 ? allSubjectSessions.length : subject.totalChapters || 10;
        const progress = totalSessions > 0 ? (completedSessions / totalSessions) * 100 : 0;
        
        return {
          ...subject,
          completedSessions,
          totalSessions,
          progress,
        };
      });
      setSubjectsWithProgress(calculatedProgress);
    }
  }, [isClient]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <div className="space-y-8">
      <h2 className="font-headline text-4xl font-bold tracking-tight">
        Progress Tracker
      </h2>
      <TooltipProvider>
        <motion.div 
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            animate={isClient ? "visible" : "hidden"}
        >
          {isClient ? subjectsWithProgress.map((subject) => (
            <motion.div key={subject.id} variants={cardVariants}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Card className="group flex h-full flex-col rounded-2xl border-none bg-card shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                    <CardHeader className="flex-row items-center gap-4 space-y-0 pb-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <subject.icon className="h-7 w-7" />
                      </div>
                      <CardTitle className="font-headline text-xl">
                        {subject.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-grow flex-col justify-end">
                      <div className="relative">
                         <Progress value={subject.progress} className="h-2" />
                         <span className="absolute -top-7 right-0 text-sm font-bold text-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                           {Math.round(subject.progress)}%
                         </span>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {subject.completedSessions} / {subject.totalSessions} sessions completed
                      </p>
                    </CardContent>
                  </Card>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs text-pretty">
                  <p className="font-bold">Evaluation Criteria</p>
                  <p>{subject.evaluationCriteria || 'Evaluation criteria to be updated.'}</p>
                </TooltipContent>
              </Tooltip>
            </motion.div>
          )) : (
             [...Array(subjects.length)].map((_, i) => (
                <Card key={i} className="animate-pulse rounded-2xl border-none bg-muted/50 shadow-lg">
                  <CardHeader className="flex-row items-center gap-4 space-y-0 pb-4">
                     <div className="h-14 w-14 rounded-xl bg-muted" />
                     <div className="h-7 w-3/4 rounded-md bg-muted" />
                  </CardHeader>
                  <CardContent className="flex flex-grow flex-col justify-end">
                    <div className="h-2 w-full rounded-full bg-muted mb-2" />
                    <div className="h-4 w-2/3 rounded-md bg-muted" />
                  </CardContent>
                </Card>
             ))
          )}
        </motion.div>
      </TooltipProvider>
    </div>
  );
}
