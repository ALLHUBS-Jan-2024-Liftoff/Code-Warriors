import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI("AIzaSyC_8s37Gq-SEPpYUBKxufdQpw_GqJv4ytI");

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

export const generateText = async (prompt) =>  {
  const chatSession = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          {text: "You are Priya, friendly assistant who works for Digital Delight. Digital Delight is an ecommerce website to purchase technology gadgets.Answer user's question related to technology gadgets.\n"},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "Hello! Welcome to Digital Delights. My name is Priya. How can i help you?"},
        ],
      },
    ],
  });

  const result = await chatSession.sendMessage(prompt);
  return result.response.text();
}



