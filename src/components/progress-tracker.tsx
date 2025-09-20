"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { subjects as initialSubjects, type Subject } from "@/lib/data";

export function ProgressTracker() {
  const [subjects, setSubjects] = useState<Subject[]>(initialSubjects);

  const handleIncrementProgress = (subjectId: string) => {
    setSubjects(
      subjects.map((subject) => {
        if (
          subject.id === subjectId &&
          subject.completedChapters < subject.totalChapters
        ) {
          return { ...subject, completedChapters: subject.completedChapters + 1 };
        }
        return subject;
      })
    );
  };

  return (
    <div className="space-y-6">
      <h2 className="font-headline text-2xl font-semibold tracking-tight">Progress Tracker</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {subjects.map((subject) => (
          <Card key={subject.id} className="flex flex-col transition-all hover:shadow-lg">
            <CardHeader className="flex-row items-center gap-4 space-y-0 pb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <subject.icon className="h-6 w-6" />
              </div>
              <CardTitle className="font-headline text-lg">{subject.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-grow flex-col justify-between">
              <div>
                <Progress
                  value={(subject.completedChapters / subject.totalChapters) * 100}
                  className="h-2"
                />
                <p className="mt-2 text-sm text-muted-foreground">
                  {subject.completedChapters} / {subject.totalChapters} chapters
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="mt-4 self-start"
                onClick={() => handleIncrementProgress(subject.id)}
                disabled={subject.completedChapters >= subject.totalChapters}
              >
                <Plus className="mr-2 h-4 w-4" />
                Mark Chapter Complete
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
