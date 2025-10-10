
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { type Subject } from "@/lib/data";
import { motion } from 'framer-motion';
import { X, Presentation, FileText } from 'lucide-react';
import { Button } from './ui/button';
import { Icon } from './icons';

interface SubjectProgress extends Subject {
  progress: number;
}

export function ProgressTracker() {
  const [subjectsWithProgress, setSubjectsWithProgress] = useState<SubjectProgress[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [flippedCard, setFlippedCard] = useState<string | null>(null);

  useEffect(() => {
    setIsClient(true);
    const fetchSubjectsAndCalculateProgress = async () => {
      const { getSubjects } = await import('@/lib/dynamic-data');
      const subjects = await getSubjects();

      const calculatedProgress = subjects.map((subject) => {
        const progress = subject.totalChapters > 0 ? (subject.completedChapters / subject.totalChapters) * 100 : 0;
        
        return {
          ...subject,
          progress,
        };
      });
      setSubjectsWithProgress(calculatedProgress);
    };

    fetchSubjectsAndCalculateProgress();
  }, []);

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
              onMouseEnter={() => setFlippedCard(subject.id)}
              onMouseLeave={() => setFlippedCard(null)}
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
                >
                  <CardHeader className="flex-row items-start justify-between gap-4 space-y-0 pb-4">
                    <div className='flex items-center gap-4'>
                      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-accent/10 text-accent">
                        <Icon name={subject.icon} className="h-7 w-7" />
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
                      {subject.completedChapters} / {subject.totalChapters} sessions completed
                    </p>
                  </CardContent>
                </Card>

                {/* Back of the card */}
                <Card 
                  className="absolute flex h-full w-full flex-col rounded-2xl border-none bg-card p-6 shadow-lg backdrop-blur-sm"
                  style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
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
                    <CardFooter className='p-0 pt-4 justify-end gap-2'>
                      {subject.slidesUrl && (
                        <Button asChild variant="secondary" size="sm" className="rounded-full">
                          <a href={subject.slidesUrl} target="_blank" rel="noopener noreferrer">
                            <Presentation className="mr-2 h-4 w-4" />
                            View Slides
                          </a>
                        </Button>
                      )}
                      {subject.projectDetailsUrl && (
                        <Button asChild variant="secondary" size="sm" className="rounded-full">
                          <a href={subject.projectDetailsUrl} target="_blank" rel="noopener noreferrer">
                            <FileText className="mr-2 h-4 w-4" />
                            Project Details
                          </a>
                        </Button>
                      )}
                    </CardFooter>
                </Card>
              </motion.div>
            </motion.div>
          )) : (
             [...Array(6)].map((_, i) => (
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
