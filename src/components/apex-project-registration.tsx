
"use client";

import { Rocket } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export function ApexProjectRegistration() {
  const updates = [
    {
      id: 'update-1',
      title: 'Registration Closed',
      titleLink: '',
      description: `
        <p>Team registration for Advanced Apex Project 1 is now closed. The deadline was 26/09/2025 (FRI) 10:00AM.</p>
        <p class="mt-2"><strong>To Find Project Details:</strong> Navigate to the 'Progress' tab. Hover over the project section to find and download the PDF with all the information.</p>
      `,
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
                        <Rocket className="h-4 w-4" />
                        <AlertTitle className="font-bold ml-4">Apex Project Registration</AlertTitle>
                    </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4 space-y-4">
                    {updates.map(update => (
                        <div key={update.id}>
                            {update.titleLink ? (
                                <a href={update.titleLink} target="_blank" rel="noopener noreferrer" className="font-semibold text-base text-red-600 bg-yellow-300 px-2 py-1 rounded-md hover:bg-yellow-400 transition-colors">
                                  {update.title}
                                </a>
                            ) : (
                                <p className="font-semibold text-base">{update.title}</p>
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
