import { GeminiRequest, GeminiResponse } from '@/types';

const API_KEY: string = process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';
const API_URL: string = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

/**
 * Calls the Gemini API with the provided request
 * @param request - The Gemini API request object
 * @returns The API response
 */
export const callGeminiAPI = async (request: GeminiRequest): Promise<GeminiResponse> => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-goog-api-key': API_KEY,
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error(`API call failed: ${response.statusText}`);
  }

  return response.json();
};

/**
 * Builds a Gemini API request with text and optional image
 * @param systemInstruction - The system instruction for the agent
 * @param userText - The user's text input
 * @param imageBase64 - Optional Base64 image data (without data URI prefix)
 * @param imageMimeType - The MIME type of the image
 * @returns The Gemini API request object
 */
export const buildGeminiRequest = (
  systemInstruction: string,
  userText: string,
  imageBase64?: string,
  imageMimeType?: string
): GeminiRequest => {
  const parts: Array<{
    text?: string;
    inlineData?: {
      mimeType: string;
      data: string;
    };
  }> = [
    { text: userText }
  ];

  // Add image if provided
  if (imageBase64 && imageMimeType) {
    parts.push({
      inlineData: {
        mimeType: imageMimeType,
        data: imageBase64,
      }
    });
  }

  return {
    contents: [
      {
        parts,
      }
    ],
    systemInstruction: {
      parts: [
        { text: systemInstruction }
      ]
    }
  };
};

/**
 * Extracts the text response from a Gemini API response
 * @param response - The Gemini API response
 * @returns The extracted text
 */
export const extractTextFromResponse = (response: GeminiResponse): string => {
  return response.candidates?.[0]?.content?.parts?.[0]?.text || 'No response received';
};
