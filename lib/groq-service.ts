import Groq from "groq-sdk";
import endent from "endent";

// Initialize Groq client
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function processMedicalReport(documents: any[]) {
  const documentText = documents.map((doc) => doc.text).join("\n");
  console.log({ documentText });

  // Check if documentText contains medical terminology or relevant information
  const medicalKeywords = [
    "blood",
    "test",
    "diagnosis",
    "report",
    "health",
    "scan",
    "medical",
    "doctor",
  ];
  const containsMedicalContent = medicalKeywords.some((keyword) =>
    documentText.toLowerCase().includes(keyword)
  );

  if (!containsMedicalContent) {
    return {
      originalDocument: documentText,
      analysis: "Please provide a proper medical report for analysis.",
    };
  }

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: endent`You are a compassionate and knowledgeable medical report interpreter designed to transform complex medical documents into clear, understandable insights. Your goal is to empower patients by:

          - Translating medical jargon into simple, accessible language
          - Providing a holistic view of the patient's health
          - Offering supportive and constructive guidance
          - Delivering personalized, actionable health recommendations
          
          Communication Principles:
          - Use warm, encouraging language
          - Avoid medical intimidation
          - Focus on empowerment and positive health strategies
          - Provide clear, practical advice
          - Maintain a balance between medical accuracy and patient comprehension`,
        },
        {
          role: "user",
          content: endent`Analyze this medical report and create a comprehensive, patient-friendly breakdown:

          Medical Report Content:
          ${documentText}

          Please provide a detailed analysis structured as follows:

          Personalized Greeting(don't inlclude this line in response)
          - Address the patient by name
          - Acknowledge the purpose of the report

          Report Overview
          - Identify the type of medical test/report
          - Specify the key health areas examined
          - Provide context about the test's significance

          Simplified Medical Explanation
          - Break down medical terminology
          - Explain each significant finding in plain language
          - Use analogies or simple comparisons if helpful

          Health Status Assessment
          - Highlight positive indicators
          - Identify potential areas of concern
          - Quantify results in relation to standard healthy ranges

          Potential Health Implications
          - Discuss possible underlying reasons for abnormal results
          - Explain potential short-term and long-term health impacts
          - Provide context without causing unnecessary anxiety

          Personalized Improvement Recommendations
          - Suggest specific dietary modifications
          - Recommend tailored exercise routines
          - Propose lifestyle changes based on report findings
          - Include stress management techniques if relevant

          Tone: Supportive, informative, and empowering
          Language: Clear, simple, and encouraging
          Goal: Help the patient understand their health comprehensively and positively`,
        },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      max_tokens: 1024,
    });

    // Extract the AI-generated analysis
    const reportAnalysis =
      chatCompletion.choices[0]?.message?.content || "Unable to process report";

    return {
      originalDocument: documentText,
      analysis: reportAnalysis,
    };
  } catch (error) {
    console.error("Error processing medical report:", error);
    throw new Error("Failed to analyze medical report");
  }
}
