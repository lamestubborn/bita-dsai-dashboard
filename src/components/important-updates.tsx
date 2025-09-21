
"use client";

import { Megaphone, Mail } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form';

const FormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
});

type FormValues = z.infer<typeof FormSchema>;

export function ImportantUpdates() {
  const { toast } = useToast();
  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  });

  // In a real app, this data would likely come from a CMS or API
  const updates = [
    {
      id: 'update-1',
      title: 'Data Pre-processing Graded Quiz 1 Available',
      description: 'Graded Quiz 1 can be accessed only after completing all materials in Week 1. No deadline has been announced yet, but it is advised to complete it as soon as possible.',
    }
  ];

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      toast({
        title: "Subscribed!",
        description: "You've been added to the mailing list for important updates.",
      });
      form.reset();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request. Please try again.",
      });
    }
  };

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
                    <div className="pt-4 border-t border-border/50">
                      <p className="text-sm font-semibold mb-2">Get updates by email</p>
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-start gap-2">
                            <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className="flex-grow">
                                <FormControl>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            type="email"
                                            placeholder="Enter your email"
                                            className="pl-10"
                                            {...field}
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                            <Button type="submit" disabled={form.formState.isSubmitting}>
                                Subscribe
                            </Button>
                        </form>
                      </Form>
                    </div>
                </AccordionContent>
            </Alert>
        </AccordionItem>
    </Accordion>
  );
}
