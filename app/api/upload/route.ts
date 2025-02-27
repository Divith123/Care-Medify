import { NextRequest, NextResponse } from "next/server";
import { writeFile, unlink } from "fs/promises";
import { join } from "path";
import { LlamaParseReader } from "llamaindex";
import { processMedicalReport } from "@/lib/groq-service";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  try {
    // Save file temporarily
    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = file.name.replace(/\s/g, "-");
    const filepath = join("/tmp", filename);
    await writeFile(filepath, buffer);

    // Process the file with LlamaParseReader
    const reader = new LlamaParseReader({ resultType: "markdown" });
    const documents = await reader.loadData(filepath);
    console.log("Parsed Documents:", documents);

    // Delete the file after processing
    await unlink(filepath);

    // Check if documents are empty or contain "NO_CONTENT_HERE"
    if (
      !documents ||
      documents.length === 0 ||
      documents[0].text === "NO_CONTENT_HERE"
    ) {
      return NextResponse.json(
        { error: "No content found in the document" },
        { status: 400 }
      );
    }

    // Extract the text from the documents
    const documentText = documents.map((doc) => doc.text).join("\n");
    console.log("Extracted Document Text:", documentText);

    // Process the medical report
    const processedReport = await processMedicalReport(documents);

    // Return both the original document and the analysis
    return NextResponse.json({
      success: true,
      originalDocument: documentText, // Include the extracted text
      report: processedReport.analysis || "No analysis available.", // Ensure analysis is included
    });
  } catch (error) {
    console.error("Error processing file:", error);
    return NextResponse.json(
      { error: "Error processing file" },
      { status: 500 }
    );
  }
}