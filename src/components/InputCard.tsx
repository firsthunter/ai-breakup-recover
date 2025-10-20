'use client';

import Image from 'next/image';
import React from 'react';

interface InputCardProps {
  userFeelings: string;
  setUserFeelings: (value: string) => void;
  uploadedImageBase64: string | null;
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  isProcessing: boolean;
  uploadedFileName: string;
}

export const InputCard: React.FC<InputCardProps> = ({
  userFeelings,
  setUserFeelings,
  uploadedImageBase64,
  onImageUpload,
  onSubmit,
  isProcessing,
  uploadedFileName,
}) => {
  return (
    <div className="w-full max-w-4xl bg-gradient-to-br from-purple-900/40 to-pink-900/40 backdrop-blur-sm rounded-2xl shadow-2xl border border-purple-500/30 p-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 mb-3">
          💔 Breakup Recovery Companion
        </h1>
        <p className="text-gray-300 text-lg">
          Your AI-powered team is here to help you heal and move forward
        </p>
      </div>

      <div className="space-y-6">
        {/* Feelings Input */}
        <div>
          <label htmlFor="feelings" className="block text-white font-semibold mb-2 text-lg">
            Share Your Feelings
          </label>
          <textarea
            id="feelings"
            value={userFeelings}
            onChange={(e) => setUserFeelings(e.target.value)}
            placeholder="Tell us how you're feeling... What happened? What's on your mind?"
            className="w-full min-h-[180px] bg-gray-900/60 text-white rounded-xl p-4 border border-purple-500/30 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/50 transition-all resize-none placeholder-gray-500"
            disabled={isProcessing}
          />
        </div>

        {/* Image Upload */}
        <div>
          <label htmlFor="screenshot" className="block text-white font-semibold mb-2 text-lg">
            Upload Chat Screenshot (Optional)
          </label>
          <div className="flex flex-col sm:flex-row gap-4 items-start">
            <label className="flex-1 cursor-pointer">
              <div className="bg-gray-900/60 border-2 border-dashed border-purple-500/30 rounded-xl p-6 hover:border-purple-400 transition-all text-center">
                <input
                  type="file"
                  id="screenshot"
                  accept="image/png,image/jpeg,image/jpg"
                  onChange={onImageUpload}
                  className="hidden"
                  disabled={isProcessing}
                />
                <div className="text-purple-300">
                  <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p className="font-medium">
                    {uploadedFileName || 'Click to upload screenshot'}
                  </p>
                  <p className="text-sm text-gray-400 mt-1">PNG, JPG, JPEG</p>
                </div>
              </div>
            </label>

            {/* Image Preview */}
            {uploadedImageBase64 && (
              <div className="w-full sm:w-48 h-48 relative rounded-xl overflow-hidden border-2 border-purple-500/50 shadow-lg">
                <Image
                  src={uploadedImageBase64}
                  alt="Uploaded screenshot preview"
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={onSubmit}
          disabled={isProcessing || !userFeelings.trim()}
          className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 text-white font-bold py-4 px-6 rounded-xl hover:shadow-2xl hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 text-lg"
        >
          {isProcessing ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Processing...
            </span>
          ) : (
            '🚀 Start Recovery Journey'
          )}
        </button>
      </div>
    </div>
  );
};
