
"use client";

import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  subjects,
  currentSessions,
  type Subject,
} from "@/lib/data";

interface SubjectProgress extends Subject {
  completedSessions: number;
  totalSessions: number;
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

        const totalSessions = allSubjectSessions.length;

        return {
          ...subject,
          completedSessions,
          totalSessions,
        };
      });
      setSubjectsWithProgress(calculatedProgress);
    }
  }, [isClient]);

  if (!isClient) {
    return null;
  }

  return (
    <div className="space-y-6">
      <h2 className="font-headline text-2xl font-semibold tracking-tight">
        Progress Tracker
      </h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {subjectsWithProgress.map((subject) => (
          <Card
            key={subject.id}
            className="flex flex-col transition-all hover:shadow-lg"
          >
            <CardHeader className="flex-row items-center gap-4 space-y-0 pb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <subject.icon className="h-6 w-6" />
              </div>
              <CardTitle className="font-headline text-lg">
                {subject.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-grow flex-col justify-between">
              <div>
                <Progress
                  value={
                    subject.totalSessions > 0
                      ? (subject.completedSessions / subject.totalSessions) * 100
                      : 0
                  }
                  className="h-2"
                />
                <div className="mt-2 flex justify-between text-sm text-muted-foreground">
                  <p>
                    {subject.completedSessions} / {subject.totalSessions} sessions
                  </p>
                  <p className="font-medium">
                    {subject.totalSessions > 0
                      ? `${Math.round(
                          (subject.completedSessions / subject.totalSessions) * 100
                        )}%`
                      : "0%"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
