
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { subjects as staticSubjects, currentSessions as staticSessions, type Subject } from "@/lib/data";
import { motion } from 'framer-motion';
import { X, Presentation } from 'lucide-react';
import { Button } from './ui/button';

interface SubjectProgress extends Subject {
  completedSessions: number;
  totalSessions: number;
  progress: number;
}

export function ProgressTracker() {
  const [subjectsWithProgress, setSubjectsWithProgress] = useState<SubjectProgress[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [flippedCard, setFlippedCard] = useState<string | null>(null);
  const [subjects, setSubjects] = useState(staticSubjects);
  const [currentSessions, setCurrentSessions] = useState(staticSessions);


  useEffect(() => {
    setIsClient(true);
    // In a real app, you might fetch this dynamically
    // For now, we simulate a dynamic load by just setting it.
    // import('@/lib/dynamic-data').then(module => {
    //   setSubjects(module.getSubjects());
    //   setCurrentSessions(module.getCurrentSessions());
    // });
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
  }, [isClient, subjects, currentSessions]);

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
        <motion.div 
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
            style={{ perspective: '1200px' }}
            variants={containerVariants}
            initial="hidden"
            animate={isClient ? "visible" : "hidden"}
        >
          {isClient ? subjectsWithProgress.map((subject) => (
            <motion.div 
              key={subject.id} 
              variants={cardVariants}
            >
              <motion.div
                className="relative h-full w-full"
                style={{ transformStyle: 'preserve-3d', minHeight: '190px' }}
                initial={false}
                animate={{ rotateY: flippedCard === subject.id ? 180 : 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* Front of the card */}
                <Card 
                  className="group absolute flex h-full w-full flex-col rounded-2xl border-none bg-card shadow-lg backdrop-blur-sm transition-all duration-300"
                  style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                  onMouseEnter={() => setFlippedCard(subject.id)}
                  onMouseLeave={() => setFlippedCard(null)}
                >
                  <CardHeader className="flex-row items-start justify-between gap-4 space-y-0 pb-4">
                    <div className='flex items-center gap-4'>
                      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <subject.icon className="h-7 w-7" />
                      </div>
                      <CardTitle className="font-headline text-xl">
                        {subject.name}
                      </CardTitle>
                    </div>
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

                {/* Back of the card */}
                <Card 
                  className="absolute flex h-full w-full flex-col rounded-2xl border-none bg-card p-6 shadow-lg backdrop-blur-sm"
                  style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                  onMouseLeave={() => setFlippedCard(null)}
                >
                    <CardHeader className='p-0'>
                      <CardTitle className="font-headline text-xl mb-4">Evaluation Criteria</CardTitle>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-2 h-8 w-8 rounded-full"
                        onClick={() => setFlippedCard(null)}
                      >
                        <X className="h-5 w-5" />
                        <span className="sr-only">Close</span>
                      </Button>
                    </CardHeader>
                    <CardContent className="flex-grow overflow-auto p-0">
                      <p className="text-sm pt-2">{subject.evaluationCriteria || 'Evaluation criteria to be updated.'}</p>
                    </CardContent>
                    {subject.slidesUrl && (
                      <CardFooter className='p-0 pt-4 justify-end'>
                        <Button asChild variant="secondary" size="sm" className="rounded-full">
                          <a href={subject.slidesUrl} target="_blank" rel="noopener noreferrer">
                            <Presentation className="mr-2 h-4 w-4" />
                            View Slides
                          </a>
                        </Button>
                      </CardFooter>
                    )}
                </Card>
              </motion.div>
            </motion.div>
          )) : (
             [...Array(subjects.length)].map((_, i) => (
                <Card key={i} className="animate-pulse rounded-2xl border-none bg-muted/50 shadow-lg h-[190px]">
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
    </div>
  );
}
