
"use client";

import { useState, useEffect } from 'react';
import { Card, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Video } from "lucide-react";
import { format, differenceInCalendarWeeks } from "date-fns";
import type { Session } from "@/lib/data";
import { motion } from 'framer-motion';
import { Separator } from './ui/separator';
import { useUser, useFirestore, useCollection, updateUserSession, useMemoFirebase } from '@/firebase';
import { collection } from 'firebase/firestore';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';

type GroupedSessions = {
  [week: string]: Session[];
};

export function PreviousSessions() {
  const [groupedSessions, setGroupedSessions] = useState<GroupedSessions>({});
  const [isClient, setIsClient] = useState(false);
  const { user } = useUser();
  const firestore = useFirestore();

  const userSessionsQuery = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return collection(firestore, 'users', user.uid, 'user_sessions');
  }, [user, firestore]);

  const { data: userSessions } = useCollection(userSessionsQuery);


  useEffect(() => {
    setIsClient(true);

    const fetchSessions = async () => {
      const { getCurrentSessions } = await import('@/lib/dynamic-data');
      const currentSessions = await getCurrentSessions();

      const now = new Date();
      const allSessionStartTimes = currentSessions.map(s => s.startTime.getTime());
      if (allSessionStartTimes.length === 0) return;

      const courseStartDate = new Date(Math.min(...allSessionStartTimes));

      const filteredSessions = currentSessions
        .filter((session) => session.endTime < now)
        .sort((a, b) => b.startTime.getTime() - a.startTime.getTime());
      
      const sessionsByWeek = filteredSessions.reduce((acc: GroupedSessions, session) => {
        const week = differenceInCalendarWeeks(session.startTime, courseStartDate, { weekStartsOn: 1 }) + 1;
        const key = `Week ${week}`;
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(session);
        return acc;
      }, {});

      setGroupedSessions(sessionsByWeek);
    };

    fetchSessions();
  }, []);

  const handleMarkAsComplete = (sessionId: string, completed: boolean) => {
    if (!user || !firestore) return;
    updateUserSession(firestore, user.uid, sessionId, { completed });
  };

  const isSessionCompleted = (sessionId: string) => {
    return userSessions?.some(us => us.sessionId === sessionId && us.completed) || false;
  };

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
  
  const sortedWeeks = Object.keys(groupedSessions).sort((a, b) => {
    const weekA = parseInt(a.replace('Week ', ''), 10);
    const weekB = parseInt(b.replace('Week ', ''), 10);
    return weekB - weekA;
  });

  return (
    <div className="space-y-8">
      <h2 className="font-headline text-4xl font-bold tracking-tight">Session Archive</h2>
      <div className="relative">
        {isClient && sortedWeeks.length > 0 ? (
          <div className="space-y-8">
            {sortedWeeks.map((weekKey) => (
              <div key={weekKey} className="space-y-6">
                 <div className="flex items-center">
                    <Separator className="flex-1" />
                    <h3 className="mx-4 text-lg font-semibold text-muted-foreground">{weekKey}</h3>
                    <Separator className="flex-1" />
                 </div>
                <motion.div 
                  className="grid grid-cols-1 gap-6 md:grid-cols-2"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {groupedSessions[weekKey].map((session) => (
                    <motion.div 
                      key={session.id}
                      variants={cardVariants}
                      whileHover={{ y: -5, scale: 1.02 }} 
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <Card className="flex h-full flex-col rounded-2xl border-none bg-card shadow-lg backdrop-blur-sm">
                        <CardHeader>
                          <CardTitle className="font-headline text-xl">{session.title}</CardTitle>
                          <CardDescription className="text-muted-foreground">
                            {format(session.startTime, "MMMM d, yyyy 'at' h:mm a")}
                          </CardDescription>
                        </CardHeader>
                        <CardFooter className="flex-grow items-end justify-between gap-2">
                           <div className="flex items-center space-x-2">
                            <Checkbox
                              id={`complete-archive-${session.id}`}
                              checked={isSessionCompleted(session.id)}
                              onCheckedChange={(checked) => handleMarkAsComplete(session.id, !!checked)}
                              disabled={!user}
                            />
                            <Label htmlFor={`complete-archive-${session.id}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                              Mark as Complete
                            </Label>
                          </div>
                          {session.recordingUrl === "#" ? (
                            <Button disabled variant="secondary" size="sm" className="rounded-full">
                              Recording soon
                            </Button>
                          ) : (
                            <Button asChild variant="secondary" size="sm" className="rounded-full">
                              <a href={session.recordingUrl} target="_blank" rel="noopener noreferrer">
                                <Video className="mr-2 h-4 w-4" />
                                Watch Recording
                              </a>
                            </Button>
                          )}
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            ))}
          </div>
        ) : isClient ? (
          <p className="text-muted-foreground py-12 text-center">No sessions have been archived yet.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {[...Array(2)].map((_, i) => (
              <Card key={i} className="animate-pulse rounded-2xl border-none bg-muted/50 shadow-lg">
                <CardHeader>
                    <div className="h-6 w-3/4 rounded-md bg-muted" />
                    <div className="mt-2 h-4 w-1/2 rounded-md bg-muted" />
                </CardHeader>
                <CardFooter className="flex justify-end gap-2">
                    <div className="h-9 w-36 rounded-full bg-muted" />
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
