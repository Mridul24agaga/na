import { NextResponse } from "next/server"
import OpenAI from "openai"

// Initialize Azure OpenAI client
const openai = new OpenAI({
  apiKey: process.env.AZURE_OPENAI_API_KEY as string,
  baseURL: process.env.AZURE_OPENAI_API_BASE_PATH_GPT4O_MINI,
  defaultQuery: { "api-version": "2024-02-15-preview" },
  defaultHeaders: { "api-key": process.env.AZURE_OPENAI_API_KEY },
})

// Helper function to call Azure OpenAI with enhanced prompting
async function callAzureOpenAI(
  prompt: string,
  systemPrompt: string,
  maxTokens: number,
  temperature = 0.7,
): Promise<string> {
  try {
    console.log(`Calling OpenAI: ${prompt.slice(0, 100)}${prompt.length > 100 ? "..." : ""}`)

    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt },
      ],
      model: "gpt-4o-mini",
      max_tokens: maxTokens,
      temperature: temperature,
      n: 1,
      response_format: { type: "json_object" },
    })
    const result = completion.choices[0]?.message?.content || ""
    return result.trim()
  } catch (error: any) {
    console.error("Error calling Azure OpenAI:", error.message)
    return JSON.stringify({ error: `Couldn't generate this part due to ${error.message}` })
  }
}

export async function POST(req: Request) {
  try {
    const { toolConfig } = await req.json()

    if (!toolConfig) {
      return NextResponse.json({ error: "Tool configuration is required" }, { status: 400 })
    }

    // Generate processing logic for the tool
    const processingLogicSystemPrompt = `You are an expert AI engineer. Your job is to create the processing logic for a tool.
    
    You've been provided with a tool configuration. Create detailed instructions for how the backend should process inputs for this tool.
    This should include:
    1. How to interpret different types of inputs
    2. What specific operations to perform on the data
    3. How to structure the output data
    4. Any edge cases or special handling required
    
    Your response must be a valid JSON object with the following structure:
    {
      "processingSteps": [
        {
          "step": string (name of processing step),
          "description": string (what this step does),
          "logic": string (pseudocode or detailed description)
        }
      ],
      "inputValidation": [
        {
          "field": string (field name),
          "validations": [string] (list of validations to perform)
        }
      ],
      "outputStructure": object (detailed output structure with field descriptions)
    }`

    const processingLogicPrompt = `Based on this tool configuration: ${JSON.stringify(toolConfig)}
    
    Create detailed processing logic instructions for the backend API that will handle this tool's functionality.`

    const processingLogicJson = await callAzureOpenAI(processingLogicPrompt, processingLogicSystemPrompt, 2000, 0.7)

    let processingLogic
    try {
      processingLogic = JSON.parse(processingLogicJson)
    } catch (error) {
      console.error("Error parsing processing logic JSON:", error)
      processingLogic = { error: "Failed to generate processing logic" }
    }

    // Generate intent analysis for the tool
    const intentAnalysisSystemPrompt = `You are an expert AI tool analyst. Your job is to analyze a tool configuration and extract the underlying user intent.
    
    Analyze the provided tool configuration to extract:
    1. The core problem the user is trying to solve
    2. The specific domain or industry context
    3. The key features that are most important
    4. Any implicit needs based on the configuration
    
    Your response must be a valid JSON object with the following structure:
    {
      "coreProblem": string (the fundamental problem being solved),
      "domain": string (the specific industry or domain),
      "keyFeatures": [string] (list of the most important features),
      "implicitNeeds": [string] (list of needs not explicitly stated but implied),
      "suggestedEnhancements": [string] (list of potential enhancements)
    }`

    const intentAnalysisPrompt = `Based on this tool configuration: ${JSON.stringify(toolConfig)}
    
    Analyze the underlying user intent and needs.`

    const intentAnalysisJson = await callAzureOpenAI(intentAnalysisPrompt, intentAnalysisSystemPrompt, 1500, 0.7)

    let intentAnalysis
    try {
      intentAnalysis = JSON.parse(intentAnalysisJson)
    } catch (error) {
      console.error("Error parsing intent analysis JSON:", error)
      intentAnalysis = { error: "Failed to analyze intent" }
    }

    return NextResponse.json({
      processingLogic,
      intentAnalysis,
    })
  } catch (error: any) {
    console.error("Error generating logic:", error)
    return NextResponse.json({ error: "Failed to generate logic" }, { status: 500 })
  }
}
