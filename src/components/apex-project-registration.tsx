
"use client";

import { useState, useEffect } from 'react';
import { Rocket } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import type { ApexUpdate } from '@/lib/data';

export function ApexProjectRegistration() {
  const [updates, setUpdates] = useState<ApexUpdate[]>([]);
  
  useEffect(() => {
    const fetchUpdates = async () => {
      const { getApexUpdates } = await import('@/lib/dynamic-data');
      const apexUpdates = await getApexUpdates();
      setUpdates(apexUpdates);
    };

    fetchUpdates();
  }, []);


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
