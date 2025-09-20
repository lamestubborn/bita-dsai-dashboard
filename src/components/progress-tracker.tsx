"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  subjects,
  currentSessions,
  previousSessions,
  type Subject,
} from "@/lib/data";

interface SubjectProgress extends Subject {
  completedSessions: number;
  totalSessions: number;
}

export function ProgressTracker() {
  const now = new Date();

  const subjectsWithProgress: SubjectProgress[] = subjects.map((subject) => {
    const allSubjectSessions = currentSessions.filter(
      (session) => session.subject === subject.name
    );
    const completedCurrentSessions = allSubjectSessions.filter(
      (session) => session.startTime < now
    ).length;
    const completedPastSessions = previousSessions.filter(
      (session) => session.subject === subject.name
    ).length;

    const totalSessions = allSubjectSessions.length;
    const completedSessions = completedCurrentSessions + completedPastSessions;

    return {
      ...subject,
      completedSessions,
      totalSessions,
    };
  });

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
                <p className="mt-2 text-sm text-muted-foreground">
                  {subject.completedSessions} / {subject.totalSessions} sessions
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}