import 'dotenv/config';
import OpenAI from 'openai';
import { createWorker } from 'tesseract.js';

(async () => {
    const worker = await createWorker('eng');
    const data = await worker.recognize('./imagetextfile.png');
    var result = data.data.text;
    await worker.terminate();
    const openai = new OpenAI({
        apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
        dangerouslyAllowBrowser: true,
    });
    
    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
        {
            role: "user",
            content: `Summarize the following text: ${result}`,
        },
        ],
    });
    
    console.log(response.choices[0].message.content);
})();



