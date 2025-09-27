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
import {getSubjects, getCurrentSessions} from '@/lib/dynamic-data';

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
    }),
  },
  output: {schema: ChatOutputSchema},
  prompt: `You are a helpful assistant for a student dashboard. Your goal is to answer questions based on the provided data about subjects and class sessions. Be concise and friendly.
When providing links, please use Markdown format, like [link text](URL).

Answer the user's question based on the data below.

The current date is: ${new Date().toDateString()}

Subjects data:
{{{subjects}}}

Sessions data:
{{{sessions}}}

User's question:
"{{{query}}}"`,
});

const chatFlow = ai.defineFlow(
  {
    name: 'chatFlow',
    inputSchema: ChatInputSchema,
    outputSchema: ChatOutputSchema,
  },
  async (input) => {
    const subjects = await getSubjects();
    const sessions = await getCurrentSessions();

    const result = await prompt({
      query: input.query,
      subjects: JSON.stringify(subjects, null, 2),
      sessions: JSON.stringify(
        sessions.map((s) => ({...s, startTime: s.startTime.toISOString(), endTime: s.endTime.toISOString()})),
        null,
        2
      ),
    });
    return result.output!;
  }
);
