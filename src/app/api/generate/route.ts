import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const prompt = formData.get("prompt") as string;
        const imageFile = formData.get("image") as File;
        const style = formData.get("style") as string;
        const expression = formData.get("expression") as string;
        const background = formData.get("background") as string;

        if (!process.env.GEMINI_API_KEY) {
            return NextResponse.json(
                { error: "API Key not found" },
                { status: 500 }
            );
        }

        // Initialize Gemini Client
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        // Use the specified model
        const model = genAI.getGenerativeModel({ model: "gemini-3-pro-image-preview" });

        // Prepare the image part
        let imagePart = null;
        if (imageFile) {
            const arrayBuffer = await imageFile.arrayBuffer();
            const base64Image = Buffer.from(arrayBuffer).toString("base64");
            imagePart = {
                inlineData: {
                    data: base64Image,
                    mimeType: imageFile.type,
                },
            };
        }

        // Construct the prompt
        // We want the model to generate a caricature based on the image + options.
        const fullPrompt = `
      Create a high-quality caricature based on the provided image.
      
      Requirements:
      - Style: ${style || "Standard Caricature"}
      - Expression: ${expression || "Neutral"}
      - Background: ${background || "Simple"}
      - User Prompt: ${prompt || ""}
      
      The output should be a caricature image that captures the subject's distinct features in the requested style.
    `;

        // Call the model
        const parts: any[] = [fullPrompt];
        if (imagePart) {
            parts.push(imagePart);
        }

        console.log("Calling Gemini API with model: gemini-3-pro-image-preview");
        const result = await model.generateContent(parts);
        const response = await result.response;

        console.log("Gemini Candidates:", JSON.stringify(response.candidates, null, 2));

        // Try to get text
        let outputData = "";
        try {
            outputData = response.text();
        } catch (e) {
            console.log("No text in response");
        }

        // If no text, check for inline images in parts
        if (!outputData && response.candidates && response.candidates[0].content.parts) {
            const parts = response.candidates[0].content.parts;
            for (const part of parts) {
                if ('inlineData' in part && part.inlineData) {
                    // Found an image!
                    outputData = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
                    break;
                }
            }
        }

        console.log("Final Output Data Length:", outputData?.length || 0);

        // Determine if the result is valid
        if (!outputData) {
            throw new Error("Empty response from Gemini (No text or image found)");
        }

        return NextResponse.json({ result: outputData });

    } catch (error: any) {
        console.error("Generation Error:", error);
        return NextResponse.json(
            { error: error.message || "Failed to generate caricature" },
            { status: 500 }
        );
    }
}
