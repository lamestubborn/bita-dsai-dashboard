import {createNextApiRequest} from '@genkit-ai/next';
import {chatFlow} from '@/ai/flows/chat-flow';

const {POST} = createNextApiRequest({
  flows: [chatFlow],
});

export {POST};
