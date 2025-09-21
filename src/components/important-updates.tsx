
import { Megaphone } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
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
    <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
        <AccordionItem value="item-1" className="border-none">
            <Alert>
                <AccordionTrigger className="w-full text-left p-0 hover:no-underline">
                    <div className="flex items-center">
                        <Megaphone className="h-4 w-4" />
                        <AlertTitle className="font-bold ml-4">Important Updates</AlertTitle>
                    </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4 space-y-4">
                    {updates.map(update => (
                        <div key={update.id}>
                            <p className="font-semibold">{update.title}</p>
                            <AlertDescription>
                                {update.description}
                            </AlertDescription>
                        </div>
                    ))}
                </AccordionContent>
            </Alert>
        </AccordionItem>
    </Accordion>
  );
}
