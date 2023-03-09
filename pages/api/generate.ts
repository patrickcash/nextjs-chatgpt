import type { NextApiRequest, NextApiResponse } from 'next'
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({apiKey: process.env.OPENAI_API_KEY,});
const openai = new OpenAIApi(configuration);

type ChatGPTResponse = {
  result: string | undefined;
}

type ChatGPTError = {
  message: string;
}


export default async function handler(req: NextApiRequest,res: NextApiResponse<ChatGPTResponse | ChatGPTError>) {
  if (!configuration.apiKey) {
    res.status(500).json({ message: "OpenAI API key not found",});
    return;
  }

  // get prompt inputs from req body
  const { } = req.body;

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(),
      temperature: 0.6,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch(error: any) {
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({message: 'An error occurred during your request.'});
    }
  }
}


function generatePrompt() {
  return ``;
}


