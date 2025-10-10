
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Calendar, Percent } from "lucide-react";
import { format } from "date-fns";
import type { Quiz } from "@/lib/data";
import { motion } from 'framer-motion';
import { Separator } from './ui/separator';
import { getQuizzes } from '@/lib/dynamic-data';
import { Badge } from './ui/badge';
import { cn } from '@/lib/utils';

export function Quizzes() {
  const [currentQuizzes, setCurrentQuizzes] = useState<Quiz[]>([]);
  const [pastQuizzes, setPastQuizzes] = useState<Quiz[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const fetchQuizzes = async () => {
      const allQuizzes = await getQuizzes();
      const now = new Date();
      
      const current = allQuizzes
        .filter(quiz => quiz.dueDate >= now)
        .sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime());
      
      const past = allQuizzes
        .filter(quiz => quiz.dueDate < now)
        .sort((a, b) => b.dueDate.getTime() - a.dueDate.getTime());

      setCurrentQuizzes(current);
      setPastQuizzes(past);
    };

    fetchQuizzes();
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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const QuizCard = ({ quiz, isCurrent = false }: { quiz: Quiz, isCurrent?: boolean }) => (
    <motion.div variants={cardVariants} whileHover={{ y: -5, scale: 1.02 }} transition={{ type: 'spring', stiffness: 300 }}>
      <Card className={cn("flex h-full flex-col rounded-2xl border-none bg-card shadow-lg backdrop-blur-sm", isCurrent && "border-primary/50 border-2")}>
        <CardHeader>
          <CardTitle className="font-headline text-2xl font-bold flex justify-between items-start">
            {quiz.title}
            {quiz.weightage && (
                <Badge variant="secondary" className="flex items-center gap-1 text-sm">
                    <Percent className="h-3 w-3" />
                    {quiz.weightage}
                </Badge>
            )}
          </CardTitle>
          <CardDescription className="text-muted-foreground">{quiz.subject}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow space-y-2">
            <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="mr-2 h-4 w-4" />
                <span>Due: {format(quiz.dueDate, "eee, MMM d 'at' h:mm a")}</span>
            </div>
        </CardContent>
        <CardFooter>
          {isCurrent && (
            <>
              {quiz.link === "#" ? (
                <Button disabled variant="secondary" className="w-full sm:w-auto ml-auto rounded-full px-6 py-3">
                  Link coming soon
                </Button>
              ) : (
                <Button asChild className="w-full sm:w-auto ml-auto rounded-full px-6 py-3 bg-accent text-accent-foreground hover:bg-accent/90">
                  <a href={quiz.link} target="_blank" rel="noopener noreferrer">
                    Go to Quiz
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              )}
            </>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );

  return (
    <div className="space-y-8">
      <h2 className="font-headline text-4xl font-bold tracking-tight">Quizzes & Assignments</h2>
      
      {/* Current Quizzes */}
      <div className="space-y-6">
        <h3 className="text-2xl font-semibold text-foreground">Current</h3>
        {isClient ? (
          currentQuizzes.length > 0 ? (
            <motion.div 
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
              {currentQuizzes.map((quiz) => <QuizCard key={quiz.id} quiz={quiz} isCurrent />)}
            </motion.div>
          ) : (
            <p className="text-muted-foreground py-12 text-center">No current quizzes or assignments. Keep an eye out for updates!</p>
          )
        ) : (
           <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, i) => (
                <Card key={i} className="animate-pulse rounded-2xl border-none bg-muted/50 shadow-lg h-[240px]" />
            ))}
          </div>
        )}
      </div>

      <Separator />

      {/* Past Quizzes */}
      <div className="space-y-6">
        <h3 className="text-2xl font-semibold text-foreground">Past</h3>
        {isClient ? (
          pastQuizzes.length > 0 ? (
            <motion.div 
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
              {pastQuizzes.map((quiz) => <QuizCard key={quiz.id} quiz={quiz} />)}
            </motion.div>
          ) : (
            <p className="text-muted-foreground py-12 text-center">No past quizzes found.</p>
          )
        ) : (
           <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, i) => (
                <Card key={i} className="animate-pulse rounded-2xl border-none bg-muted/50 shadow-lg h-[240px]" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
