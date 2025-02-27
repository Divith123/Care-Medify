"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function ReportAnalyzePage() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<string>("");
  const [extractedText, setExtractedText] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError(null); // Clear previous errors when a new file is selected
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      setError("Please upload a file.");
      return;
    }
    setLoading(true);
    setError(null);
    setResult("");
    setExtractedText(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "An error occurred during analysis.");
      }

      const data = await response.json();
      console.log("API Response:", data); // Log the API response for debugging

      // Check if analysis is available
      if (data.report && data.report !== "No analysis available.") {
        setResult(data.report); // Display AI-generated analysis
      } 
      // Fallback to extracted text if analysis is unavailable
      else if (data.originalDocument) {
        setExtractedText(data.originalDocument);
      } 
      // Default fallback message
      else {
        setResult("No results found.");
      }
    } catch (err: any) {
      console.error("Error during analysis:", err);
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4 overflow-auto">
      {/* Title */}
      <h1 className="text-4xl font-bold text-primary text-center mb-8">
        Medical Report Analyzer
      </h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-6 bg-white p-6 rounded-lg shadow-md">
        {/* File Upload */}
        <div>
          <Input
            type="file"
            accept=".pdf,.png,.jpg,.jpeg,.docx,.txt" // Supported file types
            onChange={handleFileChange}
            className="w-full"
          />
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-sm text-destructive text-center">{error}</p>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 ease-in-out"
          disabled={loading}
        >
          {loading ? "Analyzing..." : "Analyze Report"}
        </Button>
      </form>

      {/* Result Display */}
      {(result || extractedText) && (
        <div className="mt-8 w-full max-w-2xl bg-white p-8 rounded-lg shadow-md prose prose-slate prose-lg max-w-none">
          {result ? (
            <>
              <h2 className="text-2xl font-bold text-primary text-center mb-4">Analysis Result:</h2>
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  table: ({ children }) => (
                    <table className="w-full border-collapse border border-slate-300">
                      {children}
                    </table>
                  ),
                  th: ({ children }) => (
                    <th className="border border-slate-300 p-2 text-left bg-slate-100 font-semibold">
                      {children}
                    </th>
                  ),
                  td: ({ children }) => (
                    <td className="border border-slate-300 p-2">
                      {children}
                    </td>
                  ),
                }}
              >
                {result}
              </ReactMarkdown>
            </>
          ) : extractedText ? (
            <>
              <h2 className="text-2xl font-bold text-primary text-center mb-4">Analyzed Text</h2>
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  table: ({ children }) => (
                    <table className="w-full border-collapse border border-slate-300">
                      {children}
                    </table>
                  ),
                  th: ({ children }) => (
                    <th className="border border-slate-300 p-2 text-left bg-slate-100 font-semibold">
                      {children}
                    </th>
                  ),
                  td: ({ children }) => (
                    <td className="border border-slate-300 p-2">
                      {children}
                    </td>
                  ),
                }}
              >
                {extractedText}
              </ReactMarkdown>
            </>
          ) : null}
        </div>
      )}
    </div>
  );
}