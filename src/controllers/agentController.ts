import { AGENT_INSTRUCTIONS, AGENT_NAMES } from '@/constants/agents';
import { buildGeminiRequest, callGeminiAPI, extractTextFromResponse } from '@/services/geminiService';
import { AgentResult, AgentResults } from '@/types';
import { extractBase64Data } from '@/utils/imageUtils';

/**
 * Runs a single agent with the provided parameters
 * @param agentType - The type of agent to run
 * @param userFeelings - The user's feelings text
 * @param imageBase64Full - Optional full Base64 string with data URI prefix
 * @param imageMimeType - Optional image MIME type
 * @returns The agent result
 */
const runSingleAgent = async (
  agentType: keyof typeof AGENT_INSTRUCTIONS,
  userFeelings: string,
  imageBase64Full?: string | null,
  imageMimeType?: string
): Promise<AgentResult> => {
  try {
    const instruction = AGENT_INSTRUCTIONS[agentType];
    const name = AGENT_NAMES[agentType];

    // Extract Base64 data if image is provided
    const imageData = imageBase64Full ? extractBase64Data(imageBase64Full) : undefined;

    const request = buildGeminiRequest(
      instruction,
      userFeelings,
      imageData,
      imageMimeType
    );

    const response = await callGeminiAPI(request);
    const output = extractTextFromResponse(response);

    return {
      name,
      output,
    };
  } catch (error) {
    return {
      name: AGENT_NAMES[agentType],
      output: '',
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
};

/**
 * Runs all four agents in parallel
 * @param userFeelings - The user's feelings text
 * @param uploadedImageBase64 - Optional Base64 image string
 * @param imageMimeType - Optional image MIME type
 * @returns Object containing all four agent results
 */
export const runParallelAgents = async (
  userFeelings: string,
  uploadedImageBase64: string | null,
  imageMimeType?: string
): Promise<AgentResults> => {
  const [therapist, closure, routine, honesty] = await Promise.all([
    runSingleAgent('therapist', userFeelings, uploadedImageBase64, imageMimeType),
    runSingleAgent('closure', userFeelings, uploadedImageBase64, imageMimeType),
    runSingleAgent('routine', userFeelings, uploadedImageBase64, imageMimeType),
    runSingleAgent('honesty', userFeelings, uploadedImageBase64, imageMimeType),
  ]);

  return {
    therapist,
    closure,
    routine,
    honesty,
  };
};

/**
 * Runs the team leader agent to synthesize all agent results
 * @param agentResults - The results from all four agents
 * @param userFeelings - The original user feelings
 * @returns The team leader summary
 */
export const runTeamLeader = async (
  agentResults: AgentResults,
  userFeelings: string
): Promise<string> => {
  try {
    const synthesisPrompt = `
Original User Input:
"${userFeelings}"

Agent Responses:

**${agentResults.therapist?.name}:**
${agentResults.therapist?.output || 'No response'}

**${agentResults.closure?.name}:**
${agentResults.closure?.output || 'No response'}

**${agentResults.routine?.name}:**
${agentResults.routine?.output || 'No response'}

**${agentResults.honesty?.name}:**
${agentResults.honesty?.output || 'No response'}

Synthesize these insights into a cohesive final recommendation.
`;

    const request = buildGeminiRequest(
      AGENT_INSTRUCTIONS.teamLeader,
      synthesisPrompt
    );

    const response = await callGeminiAPI(request);
    return extractTextFromResponse(response);
  } catch (error) {
    throw new Error(`Team Leader failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

/**
 * Main controller function that runs the entire agent team
 * @param userFeelings - The user's feelings text
 * @param uploadedImageBase64 - Optional Base64 image string
 * @param imageMimeType - Optional image MIME type
 * @returns Object containing agent results and team summary
 */
export const runAgentTeam = async (
  userFeelings: string,
  uploadedImageBase64: string | null,
  imageMimeType?: string
): Promise<{ agentResults: AgentResults; teamSummary: string }> => {
  // Run all four agents in parallel
  const agentResults = await runParallelAgents(userFeelings, uploadedImageBase64, imageMimeType);

  // Run team leader sequentially after agents complete
  const teamSummary = await runTeamLeader(agentResults, userFeelings);

  return {
    agentResults,
    teamSummary,
  };
};
