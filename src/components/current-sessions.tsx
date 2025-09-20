
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock } from "lucide-react";
import { currentSessions } from "@/lib/data";
import { format, startOfWeek, endOfWeek } from "date-fns";
import type { Session } from "@/lib/data";

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

  if (!isClient) {
    return (
      <div className="space-y-6">
        <h2 className="font-headline text-3xl font-bold tracking-tight">Upcoming Sessions</h2>
        <div className="space-y-4">
          {[...Array(2)].map((_, i) => (
             <Card key={i} className="bg-card/50 shadow-none border-dashed animate-pulse">
              <CardHeader>
                <div className="h-6 w-3/4 rounded-md bg-muted" />
                <div className="h-4 w-1/2 rounded-md bg-muted" />
              </CardHeader>
              <CardContent>
                <div className="h-5 w-1/3 rounded-md bg-muted" />
              </CardContent>
              <CardFooter>
                 <div className="ml-auto h-10 w-48 rounded-md bg-muted" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <h2 className="font-headline text-3xl font-bold tracking-tight">Upcoming Sessions</h2>
      <div className="space-y-4">
        {upcomingSessions.length > 0 ? (
          upcomingSessions.map((session) => (
            <Card key={session.id} className="bg-card/50 shadow-none border-dashed">
              <CardHeader>
                <CardTitle className="font-headline text-xl">{session.title}</CardTitle>
                <CardDescription>{session.subject}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="mr-2 h-4 w-4" />
                  <span>
                    {format(session.startTime, "eeee, MMM d 'at' h:mm a")}
                  </span>
                </div>
              </CardContent>
              <CardFooter>
                {session.joinUrl === "#" ? (
                  <Button disabled variant="secondary" className="w-full sm:w-auto ml-auto">
                    Joining link will be updated soon
                  </Button>
                ) : (
                  <Button asChild className="w-full sm:w-auto ml-auto">
                    <a href={session.joinUrl}>
                      Join Session
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))
        ) : (
          <p className="text-muted-foreground py-12 text-center">No upcoming sessions this week.</p>
        )}
      </div>
    </div>
  );
}
