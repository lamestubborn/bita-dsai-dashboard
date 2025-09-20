import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LogIn, Video } from "lucide-react";
import { previousSessions } from "@/lib/data";
import { format } from "date-fns";

export function PreviousSessions() {
    const sortedSessions = [...previousSessions].sort((a, b) => b.date.getTime() - a.date.getTime());

  return (
    <div className="space-y-6">
      <h2 className="font-headline text-2xl font-semibold tracking-tight">Session Archive</h2>
      <div className="space-y-4">
        {sortedSessions.map((session) => (
          <Card key={session.id} className="transition-all hover:shadow-lg">
            <CardHeader className="flex-row justify-between items-start">
              <div>
                <CardTitle className="font-headline">{session.subject}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {format(session.date, "MMMM d, yyyy")}
                </p>
              </div>
            </CardHeader>
            <CardFooter className="flex justify-end gap-2">
              <Button asChild variant="outline" size="sm">
                <a href={session.joinUrl}>
                  <LogIn className="mr-2 h-4 w-4" />
                  Join
                </a>
              </Button>
              <Button
                asChild
                variant="secondary"
                size="sm"
                disabled={!session.recordingUrl}
              >
                <a href={session.recordingUrl || "#"}>
                  <Video className="mr-2 h-4 w-4" />
                  Recording
                </a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
