import {genkitNext} from '@genkit-ai/next';
import {chatFlow} from '@/ai/flows/chat-flow';

export const {POST} = genkitNext({
  flows: [chatFlow],
});
