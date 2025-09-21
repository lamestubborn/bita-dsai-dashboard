
import { Megaphone } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export function ImportantUpdates() {
  // In a real app, this data would likely come from a CMS or API
  const updates = [
    {
      id: 'update-1',
      title: 'Mid-term Exam Schedule Announced',
      description: 'The mid-term examination schedule for all subjects has been published. Please check your emails and the student portal for details.',
    },
    {
      id: 'update-2',
      title: 'Project Submission Deadline Extended',
      description: 'The deadline for the Advanced Apex Project I has been extended by one week. The new submission date is November 15th.',
    }
  ];

  if (updates.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
        {updates.map(update => (
            <Alert key={update.id}>
                <Megaphone className="h-4 w-4" />
                <AlertTitle className="font-bold">{update.title}</AlertTitle>
                <AlertDescription>
                {update.description}
                </AlertDescription>
            </Alert>
        ))}
    </div>
  );
}
