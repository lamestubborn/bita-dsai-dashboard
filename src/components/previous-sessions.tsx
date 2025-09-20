
"use client";

import { useState, useEffect } from 'react';
import { Card, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Video } from "lucide-react";
import { currentSessions } from "@/lib/data";
import { format } from "date-fns";
import type { Session } from "@/lib/data";
import { motion } from 'framer-motion';

export function PreviousSessions() {
  const [expiredSessions, setExpiredSessions] = useState<Session[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      const now = new Date();
      const filteredSessions = currentSessions
        .filter((session) => session.endTime < now)
        .sort((a, b) => b.startTime.getTime() - a.startTime.getTime());
      setExpiredSessions(filteredSessions);
    }
  }, [isClient]);

  const cardVariants = {
    offscreen: {
      opacity: 0,
      x: -50
    },
    onscreen: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8
      }
    }
  };
  
  return (
    <div className="space-y-8">
      <h2 className="font-headline text-4xl font-bold tracking-tight">Session Archive</h2>
      <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:bg-border before:content-['']">
        {isClient && expiredSessions.length > 0 ? (
          expiredSessions.map((session) => (
            <motion.div 
              key={session.id}
              className="relative"
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.5 }}
              variants={cardVariants}
            >
              <div className="absolute left-0 top-2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <span className="text-sm font-bold">{format(session.startTime, "dd")}</span>
              </div>
              <Card className="ml-16 rounded-2xl border-none bg-card shadow-lg backdrop-blur-sm transition-shadow hover:shadow-xl">
                <CardHeader>
                  <CardTitle className="font-headline text-xl">{session.title}</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {format(session.startTime, "MMMM d, yyyy 'at' h:mm a")}
                  </CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-end gap-2">
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
          ))
        ) : isClient ? (
          <p className="text-muted-foreground py-12 text-center">No sessions have been archived yet.</p>
        ) : (
          [...Array(3)].map((_, i) => (
             <div key={i} className="relative animate-pulse">
                <div className="absolute left-0 top-2 z-10 h-10 w-10 rounded-full bg-muted"></div>
                <Card className="ml-16 rounded-2xl border-none bg-muted/50 shadow-lg">
                  <CardHeader>
                     <div className="h-6 w-3/4 rounded-md bg-muted" />
                     <div className="mt-2 h-4 w-1/2 rounded-md bg-muted" />
                  </CardHeader>
                  <CardFooter className="flex justify-end gap-2">
                     <div className="h-9 w-36 rounded-full bg-muted" />
                  </CardFooter>
                </Card>
             </div>
          ))
        )}
      </div>
    </div>
  );
}
