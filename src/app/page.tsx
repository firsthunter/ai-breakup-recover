'use client';

import { InputCard } from '@/components/InputCard';
import { LoadingScreen } from '@/components/LoadingScreen';
import { ResultsDashboard } from '@/components/ResultsDashboard';
import { runAgentTeam } from '@/controllers/agentController';
import { AppState } from '@/types';
import { imageFileToBase64, isValidImageFile } from '@/utils/imageUtils';
import React, { useState } from 'react';

export default function Home() {
  const [state, setState] = useState<AppState>({
    userFeelings: '',
    uploadedImageBase64: null,
    isProcessing: false,
    agentResults: {
      therapist: null,
      closure: null,
      routine: null,
      honesty: null,
    },
    teamSummary: '',
  });

  const [uploadedFileName, setUploadedFileName] = useState<string>('');
  const [imageMimeType, setImageMimeType] = useState<string>('');

  // Handle image upload
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!isValidImageFile(file)) {
      alert('Please upload a valid image file (PNG, JPG, or JPEG)');
      return;
    }

    try {
      const base64String = await imageFileToBase64(file);
      setState((prev) => ({
        ...prev,
        uploadedImageBase64: base64String,
      }));
      setUploadedFileName(file.name);
      setImageMimeType(file.type);
    } catch (error) {
      console.error('Error converting image:', error);
      alert('Failed to process image. Please try again.');
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!state.userFeelings.trim()) {
      alert('Please share your feelings before submitting.');
      return;
    }

    setState((prev) => ({ ...prev, isProcessing: true }));

    try {
      const { agentResults, teamSummary } = await runAgentTeam(
        state.userFeelings,
        state.uploadedImageBase64,
        imageMimeType
      );

      setState((prev) => ({
        ...prev,
        agentResults,
        teamSummary,
        isProcessing: false,
      }));
    } catch (error) {
      console.error('Error running agents:', error);
      alert(`An error occurred: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setState((prev) => ({ ...prev, isProcessing: false }));
    }
  };

  // Reset the application
  const handleReset = () => {
    setState({
      userFeelings: '',
      uploadedImageBase64: null,
      isProcessing: false,
      agentResults: {
        therapist: null,
        closure: null,
        routine: null,
        honesty: null,
      },
      teamSummary: '',
    });
    setUploadedFileName('');
    setImageMimeType('');
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-6 md:p-12">
      <div className="flex flex-col items-center justify-center">
        {/* Loading Screen */}
        {state.isProcessing && <LoadingScreen />}

        {/* Input Card - Show when not processing and no results */}
        {!state.isProcessing && !state.teamSummary && (
          <InputCard
            userFeelings={state.userFeelings}
            setUserFeelings={(value) =>
              setState((prev) => ({ ...prev, userFeelings: value }))
            }
            uploadedImageBase64={state.uploadedImageBase64}
            onImageUpload={handleImageUpload}
            onSubmit={handleSubmit}
            isProcessing={state.isProcessing}
            uploadedFileName={uploadedFileName}
          />
        )}

        {/* Results Dashboard - Show when processing is complete and we have results */}
        {!state.isProcessing && state.teamSummary && (
          <ResultsDashboard
            teamSummary={state.teamSummary}
            agentResults={state.agentResults}
            onReset={handleReset}
          />
        )}
      </div>
    </main>
  );
}
