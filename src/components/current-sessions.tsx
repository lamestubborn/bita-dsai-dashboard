
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
    return null; 
  }
  
  return (
    <div className="space-y-6">
      <h2 className="font-headline text-2xl font-semibold tracking-tight">Upcoming Sessions</h2>
      <div className="space-y-4">
        {upcomingSessions.length > 0 ? (
          upcomingSessions.map((session) => (
            <Card key={session.id} className="transition-all hover:shadow-lg">
              <CardHeader>
                <CardTitle className="font-headline">{session.title}</CardTitle>
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
                  <Button disabled className="w-full sm:w-auto ml-auto">
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
          <p className="text-muted-foreground">No upcoming sessions this week.</p>
        )}
      </div>
    </div>
  );
}
