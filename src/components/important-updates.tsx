
"use client";

import { useState, useEffect } from 'react';
import { Megaphone } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import type { ImportantUpdate } from '@/lib/data';

export function ImportantUpdates() {
  const [updates, setUpdates] = useState<ImportantUpdate[]>([]);

  useEffect(() => {
    const fetchUpdates = async () => {
      const { getImportantUpdates } = await import('@/lib/dynamic-data');
      const importantUpdates = await getImportantUpdates();
      setUpdates(importantUpdates);
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

    