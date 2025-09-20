import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock } from "lucide-react";
import { currentSessions } from "@/lib/data";
import { format } from "date-fns";

export function CurrentSessions() {
  const sortedSessions = [...currentSessions].sort((a, b) => a.startTime.getTime() - b.startTime.getTime());
  
  return (
    <div className="space-y-6">
      <h2 className="font-headline text-2xl font-semibold tracking-tight">This Week's Sessions</h2>
      <div className="space-y-4">
        {sortedSessions.length > 0 ? (
          sortedSessions.map((session) => (
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
                <Button asChild className="w-full sm:w-auto ml-auto">
                  <a href={session.joinUrl}>
                    Join Session
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
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
