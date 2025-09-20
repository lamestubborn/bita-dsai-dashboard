
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock } from "lucide-react";
import { currentSessions } from "@/lib/data";
import { format, startOfWeek, endOfWeek } from "date-fns";
import type { Session } from "@/lib/data";
import { motion } from 'framer-motion';

export function CurrentSessions() {
  const [upcomingSessions, setUpcomingSessions] = useState<Session[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      const now = new Date();
      const weekStart = startOfWeek(now, { weekStartsOn: 0 });
      const weekEnd = endOfWeek(now, { weekStartsOn: 0 });

      const filteredSessions = currentSessions
        .filter(session => 
          session.endTime > now &&
          session.startTime >= weekStart &&
          session.startTime <= weekEnd
        )
        .sort((a, b) => a.startTime.getTime() - b.startTime.getTime());
      
      setUpcomingSessions(filteredSessions);
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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  if (!isClient) {
    return (
      <div className="space-y-8">
        <h2 className="font-headline text-4xl font-bold tracking-tight">This Week’s Sessions</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => (
             <Card key={i} className="animate-pulse rounded-2xl border-none bg-muted/50 shadow-lg">
              <CardHeader>
                <div className="h-8 w-3/4 rounded-md bg-muted" />
                <div className="mt-2 h-4 w-1/2 rounded-md bg-muted" />
              </CardHeader>
              <CardContent>
                <div className="h-5 w-1/3 rounded-md bg-muted" />
              </CardContent>
              <CardFooter>
                 <div className="ml-auto h-12 w-32 rounded-full bg-muted" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-8">
      <h2 className="font-headline text-4xl font-bold tracking-tight">This Week’s Sessions</h2>
      {upcomingSessions.length > 0 ? (
        <motion.div 
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
          {upcomingSessions.map((session) => (
            <motion.div key={session.id} variants={cardVariants} whileHover={{ y: -5, scale: 1.02 }} transition={{ type: 'spring', stiffness: 300 }}>
              <Card className="flex h-full flex-col rounded-2xl border-none bg-card shadow-lg backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="font-headline text-2xl font-bold">{session.title}</CardTitle>
                  <CardDescription className="text-muted-foreground">{session.subject}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="mr-2 h-4 w-4" />
                    <span>
                      {format(session.startTime, "eee, MMM d 'at' h:mm a")}
                    </span>
                  </div>
                </CardContent>
                <CardFooter>
                  {session.joinUrl === "#" ? (
                    <Button disabled variant="secondary" className="w-full sm:w-auto ml-auto rounded-full px-6 py-3">
                      Link coming soon
                    </Button>
                  ) : (
                    <Button asChild className="w-full sm:w-auto ml-auto rounded-full px-6 py-3 bg-accent text-accent-foreground hover:bg-accent/90">
                      <a href={session.joinUrl} target="_blank" rel="noopener noreferrer">
                        Join
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <p className="text-muted-foreground py-12 text-center text-lg">No upcoming sessions this week. Enjoy the break!</p>
      )}
    </div>
  );
}
