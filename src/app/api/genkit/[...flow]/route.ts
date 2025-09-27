import { createGenkitHandler } from '@genkit-ai/next'
import { chatFlow } from '@/ai/flows/chat-flow'

// If you’re using the Next.js App Router
export const runtime = 'edge' // or 'nodejs', depending on your deployment

export async function POST(req: Request) {
  const handler = createGenkitHandler({ flow: chatFlow })
  return handler(req)
}
