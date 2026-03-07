import axios from 'axios';

require('dotenv').config();

const flOCK_BOT_ENDPOINT = process.env.FLOCK_BOT_ENDPOINT || 'https://api.flock.io/v1';
const flOCK_API_KEY = process.env.FLOCK_API_KEY;

export async function conversationalRagChat(question: string, chatHistory: any[], modelId: string = 'deepseek-v3.2') {
    if (!flOCK_API_KEY) {
        throw new Error("FLOCK_API_KEY is not defined in environment variables");
    }

    try {
        const response = await axios.post(`${flOCK_BOT_ENDPOINT}/chat/conversational_rag_chat`, {
            question: question,
            chat_history: chatHistory,
            knowledge_source_id: modelId
        }, {
            headers: {
                'x-api-key': flOCK_API_KEY,
                'Content-Type': 'application/json'
            }
        });

        return {
            answer: response.data.answer,
            source_docs: response.data.source_docs,
            generated_question: response.data.generated_question
        };
    } catch (error) {
        console.error("Error communicating with FLock API", error);
        throw error;
    }
}
