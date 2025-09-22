
"use client";

import { Megaphone } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export function ImportantUpdates() {
  // In a real app, this data would likely come from a CMS or API
  const updates = [
    {
      id: 'update-1',
      title: 'Data Pre-processing Graded Quiz 2 Available',
      description: 'Graded Quiz 2 is available only after completing all materials in Week 2. No deadline has been announced yet, but it is recommended to complete it at the earliest. Since the Week 1 quiz closed on Monday of Week 2, it is likely that this quiz will close on Monday of Week 3',
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
