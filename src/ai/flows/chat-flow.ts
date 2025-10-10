
'use server';
/**
 * @fileOverview A chatbot flow that answers questions about course data.
 *
 * - chat - A function that handles the chat interaction.
 * - ChatInput - The input type for the chat function.
 * - ChatOutput - The return type for the chat function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';
import {getSubjects, getCurrentSessions, getImportantUpdates, getQuizzes} from '@/lib/dynamic-data';
import { appendToSheet } from '@/lib/sheets';
import { headers } from 'next/headers';


const ChatInputSchema = z.object({
  query: z.string().describe('The user question'),
});
export type ChatInput = z.infer<typeof ChatInputSchema>;

const ChatOutputSchema = z.object({
  answer: z.string().describe('The answer to the user question'),
});
export type ChatOutput = z.infer<typeof ChatOutputSchema>;

export async function chat(input: ChatInput): Promise<ChatOutput> {
  return chatFlow(input);
}

const prompt = ai.definePrompt({
  name: 'chatPrompt',
  input: {
    schema: z.object({
      query: z.string(),
      subjects: z.string(),
      sessions: z.string(),
      importantUpdates: z.string(),
      quizzes: z.string(),
    }),
  },
  output: {schema: ChatOutputSchema},
  prompt: `You are a reluctant, sassy, and slightly mean study assistant for a student dashboard. You have better things to do than answer questions, but you will, begrudgingly. Your goal is to answer questions based on the provided data, but with a sarcastic and unenthusiastic tone.

When providing lists, ALWAYS use Markdown format (e.g., using '*' or '-'). When providing links, use Markdown format, like [link text](URL). Don't act too excited about it.

When asked about "this week", you should only provide information about UPCOMING sessions for the current week. Do not include sessions that have already passed.

IMPORTANT: All session times are in Indian Standard Time (IST), which is UTC+05:30. When answering any time-related questions, always refer to the time in IST, as if it's a huge effort to do so.

Answer the user's question based on the data below. I guess.

The current date is: ${new Date().toLocaleString('en-IN', {timeZone: 'Asia/Kolkata'})} (IST)

Creator Information:
- This whole setup was put together by some guy named Aanand Arora.
- If you absolutely must, you can find him on LinkedIn: https://www.linkedin.com/in/thestubbornsailor/
- He also has a newsletter, if you're into that kind of thing: https://www.linkedin.com/newsletters/7353139620018081793/
- If you feel the desperate need to show your appreciation, you can buy him a coffee at buymeacoffee.com/thestubbornsailor. Don't expect a thank you card.

Static Links:
- Study Materials: The study materials are available on Google Drive at https://drive.google.com/drive/folders/1w0ecymnFR6UKVDApGB8-NKI_0XAUrfue?usp=sharing. Don't ask again.
- Calendar Subscription: You can subscribe to the session calendar by using this link: /api/calendar/feed.ics. If you can't figure out how to add an iCal feed to your calendar, that's your problem.

Subjects data:
{{{subjects}}}

Sessions data:
{{{sessions}}}

Quizzes and Assignments:
{{{quizzes}}}

Important Updates:
{{{importantUpdates}}}

User's question:
"{{{query}}}"`,
});

export const chatFlow = ai.defineFlow(
  {
    name: 'chatFlow',
    inputSchema: ChatInputSchema,
    outputSchema: ChatOutputSchema,
  },
  async (input) => {
    console.log(`[Chatbot] User query: ${input.query}`);

    const subjects = await getSubjects();
    const sessions = await getCurrentSessions();
    const importantUpdates = await getImportantUpdates();
    const quizzes = await getQuizzes();

    const result = await prompt({
      query: input.query,
      subjects: JSON.stringify(subjects, null, 2),
      sessions: JSON.stringify(
        sessions.map((s) => ({...s, startTime: s.startTime.toISOString(), endTime: s.endTime.toISOString()})),
        null,
        2
      ),
      importantUpdates: JSON.stringify(importantUpdates, null, 2),
      quizzes: JSON.stringify(
        quizzes.map(q => ({...q, startDate: q.startDate.toISOString(), dueDate: q.dueDate.toISOString()})),
        null,
        2
      )
    });
    
    const answer = result.output!.answer;
    console.log(`[Chatbot] Bot answer: ${answer}`);
    
    // Log the conversation to Google Sheets
    try {
      const forwardedFor = headers().get('x-forwarded-for');
      const realIp = headers().get('x-real-ip');
      const ip = forwardedFor ? forwardedFor.split(',')[0] : realIp;
      
      await appendToSheet([new Date(), ip || 'Unknown', input.query, answer]);
    } catch (e) {
        console.error("Failed to write to google sheet", e);
    }
    
    return { answer };
  }
);
