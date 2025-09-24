
"use client";

import { Megaphone } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export function ImportantUpdates() {
  // In a real app, this data would likely come from a CMS or API
  const updates = [
    {
      id: 'update-1',
      title: 'Data Pre-processing Graded Quiz 1 & 2 Available',
      description: 'Graded Quiz 1 & 2 are available only after completing all materials in Week 1 & 2 respectively. No deadline has been announced yet, but it is recommended to complete it at the earliest. If you are unable to see it, please attempt practice quizzes again, it will be visble.',
    },
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
                            {update.titleLink ? (
                                <a href={update.titleLink} target="_blank" rel="noopener noreferrer" className="font-semibold hover:underline text-base">
                                  {update.title}
                                </a>
                            ) : (
                                <p className="font-semibold">{update.title}</p>
                            )}
                            <AlertDescription
                              dangerouslySetInnerHTML={{ __html: update.description }}
                            />
                        </div>
                    ))}
                </AccordionContent>
            </Alert>
        </AccordionItem>
    </Accordion>
  );
}
