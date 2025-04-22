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
  temperature = 0.8,
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
    // Sanitize any stray $1 references
    const sanitizedResult = result.replace(/\$1/g, "").trim()
    if (sanitizedResult !== result) {
      console.warn(`Sanitized '$1' from OpenAI response: ${sanitizedResult.slice(0, 200)}...`)
    }
    return sanitizedResult
  } catch (error: any) {
    console.error("Error calling Azure OpenAI:", error.message)
    return JSON.stringify({ error: `Couldn't generate this part due to ${error.message}` })
  }
}

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json()

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 })
    }

    // Analyze the prompt to determine the SEO tool type
    const toolType = analyzeSeoPrompt(prompt)

    // System prompt for SEO tool configuration generation
    const systemPrompt = `You are an AI specialized in analyzing user requests and generating configurations for SEO tools.
          
    Your task is to:
    1. Analyze the user's prompt to understand what type of SEO tool they want to build
    2. Generate a detailed tool configuration in JSON format
    
    The configuration should include:
    - toolType: The specific SEO category (${toolType})
    - title: A clear, concise title for the SEO tool
    - description: A brief description of what the SEO tool does
    - inputLabel: Label for the main input field
    - inputPlaceholder: Placeholder text for the input field
    - buttonText: Text for the main action button
    - resultTitle: Title for the results section
    
    Respond ONLY with the JSON configuration object, no explanations or other text.`

    // Call Azure OpenAI to generate tool configuration
    const toolConfigJson = await callAzureOpenAI(prompt, systemPrompt, 2000, 0.7)

    // Parse the response from OpenAI
    let toolConfig
    try {
      toolConfig = JSON.parse(toolConfigJson)

      // Ensure toolType is set correctly if not already
      if (!toolConfig.toolType) {
        toolConfig.toolType = toolType
      }
    } catch (error) {
      console.error("Error parsing JSON from OpenAI:", error)
      return NextResponse.json({ error: "Failed to parse tool configuration" }, { status: 500 })
    }

    return NextResponse.json({
      toolConfig,
    })
  } catch (error) {
    console.error("Error generating tool:", error)
    return NextResponse.json({ error: "Failed to generate tool" }, { status: 500 })
  }
}

// Function to analyze the prompt and determine the SEO tool type
function analyzeSeoPrompt(prompt: string): string {
  const promptLower = prompt.toLowerCase()

  // Check for meta-related keywords - prioritize this check first
  if (
    promptLower.includes("meta description") ||
    promptLower.includes("meta tag") ||
    promptLower.includes("title tag") ||
    promptLower.includes("description") ||
    promptLower.includes("serp") ||
    promptLower.includes("search result") ||
    promptLower.includes("click-through") ||
    promptLower.includes("click through")
  ) {
    return "meta"
  }

  // Check for blog-related keywords
  if (
    promptLower.includes("blog") ||
    promptLower.includes("article") ||
    promptLower.includes("content") ||
    promptLower.includes("post")
  ) {
    return "blog"
  }

  // Check for keyword-related keywords
  if (
    promptLower.includes("keyword") ||
    promptLower.includes("search term") ||
    promptLower.includes("search volume") ||
    promptLower.includes("ranking")
  ) {
    return "keyword"
  }

  // Check for local SEO keywords
  if (
    promptLower.includes("local") ||
    promptLower.includes("business profile") ||
    promptLower.includes("google business") ||
    promptLower.includes("map") ||
    promptLower.includes("location")
  ) {
    return "local"
  }

  // Check for e-commerce keywords
  if (
    promptLower.includes("ecommerce") ||
    promptLower.includes("e-commerce") ||
    promptLower.includes("product") ||
    promptLower.includes("shop") ||
    promptLower.includes("store")
  ) {
    return "ecommerce"
  }

  // Default to general if no specific type is detected
  return "general"
}
