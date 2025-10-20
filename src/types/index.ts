// Model Types
export interface AgentResult {
  name: string;
  output: string;
  error?: string;
}

export interface AgentResults {
  therapist: AgentResult | null;
  closure: AgentResult | null;
  routine: AgentResult | null;
  honesty: AgentResult | null;
}

export interface AppState {
  userFeelings: string;
  uploadedImageBase64: string | null;
  isProcessing: boolean;
  agentResults: AgentResults;
  teamSummary: string;
}

export interface GeminiRequest {
  contents: Array<{
    parts: Array<{
      text?: string;
      inlineData?: {
        mimeType: string;
        data: string;
      };
    }>;
  }>;
  systemInstruction?: {
    parts: Array<{
      text: string;
    }>;
  };
}

export interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
}
