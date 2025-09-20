import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LogIn, Video } from "lucide-react";
import { currentSessions } from "@/lib/data";
import { format } from "date-fns";

export function PreviousSessions() {
  const now = new Date();
  const expiredSessions = currentSessions
    .filter((session) => session.endTime < now)
    .sort((a, b) => b.startTime.getTime() - a.startTime.getTime());

  return (
    <div className="space-y-6">
      <h2 className="font-headline text-2xl font-semibold tracking-tight">Session Archive</h2>
      <div className="space-y-4">
        {expiredSessions.length > 0 ? (
          expiredSessions.map((session) => (
          <Card key={session.id} className="transition-all hover:shadow-lg">
            <CardHeader className="flex-row justify-between items-start">
              <div>
                <CardTitle className="font-headline">{session.title}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {format(session.startTime, "MMMM d, yyyy")}
                </p>
              </div>
            </CardHeader>
            <CardFooter className="flex justify-end gap-2">
              <Button asChild variant="outline" size="sm">
                <a href={session.joinUrl}>
                  <LogIn className="mr-2 h-4 w-4" />
                  Details
                </a>
              </Button>
              <Button
                asChild
                variant="secondary"
                size="sm"
                disabled={true}
              >
                <a href={"#"}>
                  <Video className="mr-2 h-4 w-4" />
                  Recording
                </a>
              </Button>
            </CardFooter>
          </Card>
        ))
        ) : (
          <p className="text-muted-foreground">No sessions have been archived yet.</p>
        )}
      </div>
    </div>
  );
}
