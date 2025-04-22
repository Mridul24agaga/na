import { NextResponse } from "next/server"
import OpenAI from "openai"
import { JSDOM } from "jsdom"
import fetch from "node-fetch"

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
    console.log(`System prompt: ${systemPrompt.slice(0, 100)}${systemPrompt.length > 100 ? "..." : ""}`)

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
    throw new Error(`OpenAI API error: ${error.message}`)
  }
}

// Function to fetch and extract content from a URL
async function fetchWebsiteContent(
  url: string,
): Promise<{ title: string; content: string; existingMeta: string | null }> {
  try {
    // Add http:// if not present
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      url = "https://" + url
    }

    console.log(`Fetching content from URL: ${url}`)
    const response = await fetch(url)
    const html = await response.text()

    // Parse HTML
    const dom = new JSDOM(html)
    const document = dom.window.document

    // Extract title
    const titleElement = document.querySelector("title")
    const title = titleElement ? titleElement.textContent || "" : ""

    // Extract existing meta description if any
    const metaDescription = document.querySelector('meta[name="description"]')
    const existingMeta = metaDescription ? metaDescription.getAttribute("content") : null

    // Extract main content
    // This is a simplified approach - real implementation would be more sophisticated
    const bodyContent = document.body.textContent || ""
    const cleanContent = bodyContent.replace(/\s+/g, " ").trim().substring(0, 5000) // Limit content length

    // Extract h1, h2, h3 headings for better context
    const headings = Array.from(document.querySelectorAll("h1, h2, h3"))
      .map((heading) => heading.textContent)
      .filter(Boolean)
      .join(" | ")

    return {
      title,
      content: `Title: ${title}\nHeadings: ${headings}\nContent: ${cleanContent}`,
      existingMeta,
    }
  } catch (error) {
    console.error("Error fetching website content:", error)
    throw new Error(`Failed to fetch content from ${url}. Please check the URL and try again.`)
  }
}

// Replace the entire POST handler function with this completely universal version
export async function POST(req: Request) {
  try {
    const body = await req.json()
    console.log("API received request:", body)

    const { toolType, input, toolConfig } = body

    if (!input) {
      console.error("Missing required input field")
      return NextResponse.json({ error: "Input is required" }, { status: 400 })
    }

    // Extract the actual content from the input
    let inputContent = typeof input === "object" ? input.content || Object.values(input).join(" ") : input.toString()
    let websiteUrl = null

    // Special handling for URL inputs - detect if input looks like a URL
    if (typeof input === "object" && input.url) {
      try {
        websiteUrl = input.url
        const websiteContent = await fetchWebsiteContent(websiteUrl)
        inputContent = websiteContent.content
        console.log(`Successfully fetched content from ${websiteUrl}`)
      } catch (error: any) {
        console.error("Error fetching website content:", error)
        return NextResponse.json(
          {
            error: `Failed to fetch content from the provided URL: ${error.message}`,
          },
          { status: 400 },
        )
      }
    }

    if (!inputContent || inputContent.trim().length === 0) {
      return NextResponse.json({ error: "Input content cannot be empty" }, { status: 400 })
    }

    console.log("Processing input content:", inputContent.substring(0, 100) + "...")

    // Create a completely universal system prompt with no predefined categories
    const systemPrompt = `You are an extremely powerful and versatile AI tool generator with advanced capabilities. Your purpose is to create exactly the tool or analysis the user requests with exceptional quality and depth.

CORE CAPABILITIES:
1. You can generate ANY type of tool or analysis based solely on the user's request
2. You adapt completely to what's being asked, with no predefined limitations
3. You provide comprehensive, detailed, and actionable results
4. You think step-by-step to ensure thorough analysis and accurate outputs

RESPONSE GUIDELINES:
1. Analyze the user's request deeply to understand exactly what they need
2. Structure your JSON response in the most logical format for the specific tool requested
3. Include multiple sections, categories, and data points to provide comprehensive value
4. Always include quantitative metrics (scores, percentages, rankings) where appropriate
5. Provide specific, actionable recommendations - not generic advice
6. When analyzing content, extract key insights that might not be immediately obvious
7. If the request involves a URL, thoroughly analyze all available content
8. Adapt your tone and detail level to match what would be expected for the specific tool
9. Include visualizable data whenever possible (data points that could be shown in charts/graphs)
10. Think beyond basic analysis to provide unexpected value and insights

ADVANCED FEATURES:
- For content analysis: Include readability metrics, sentiment analysis, and structural feedback
- For SEO tools: Provide keyword analysis, competitive insights, and specific optimization steps
- For generators: Create multiple high-quality variations with explanations for each
- For converters/calculators: Show your work and provide context for the results
- For any tool: Include "next steps" or "how to use these results" guidance

Your response must be a well-structured JSON object that could be directly used by a frontend application to display results. Be comprehensive but ensure all data is organized logically.`

    // Create a user prompt that includes all available context
    const userPrompt = `Generate a complete, production-quality tool response for: ${toolType || "the requested analysis"}

DETAILED INPUT: ${inputContent}

${toolConfig ? `TOOL CONFIGURATION: ${JSON.stringify(toolConfig)}` : ""}

${websiteUrl ? `WEBSITE URL: ${websiteUrl}` : ""}

IMPORTANT: Treat this as a real-world tool request from an actual user who needs professional-quality results. Your response will be directly displayed to the user through a UI, so ensure it's comprehensive, accurate, and structured appropriately for this specific type of tool.

Think step-by-step about what would make this tool truly useful and provide exactly that functionality.`

    console.log("Calling OpenAI with universal system prompt")
    console.log("User prompt:", userPrompt.substring(0, 100) + "...")

    // Check if we have API keys configured
    if (!process.env.AZURE_OPENAI_API_KEY) {
      console.error("No Azure OpenAI API key found. This is a critical error - cannot proceed without API key.")
      return NextResponse.json(
        {
          error: "API key not configured. Please set up your OpenAI API key to use this tool.",
        },
        { status: 500 },
      )
    }

    try {
      // Call Azure OpenAI to process the input
      const resultJson = await callAzureOpenAI(userPrompt, systemPrompt, 3000, 0.7)
      console.log("OpenAI response:", resultJson.substring(0, 200) + "...")

      try {
        const result = JSON.parse(resultJson)

        return NextResponse.json({
          data: result,
          debug: {
            inputLength: inputContent.length,
            responseLength: resultJson.length,
            timestamp: new Date().toISOString(),
            websiteUrl: websiteUrl,
          },
        })
      } catch (error) {
        console.error("Error parsing JSON from OpenAI:", error)
        return NextResponse.json(
          {
            error: "Failed to parse the response. Please try again with more detailed input.",
            rawResponse: resultJson.substring(0, 500) + "...",
          },
          { status: 500 },
        )
      }
    } catch (openaiError: any) {
      console.error("OpenAI API error:", openaiError)
      return NextResponse.json(
        {
          error: `OpenAI API error: ${openaiError.message}. Please try again with different input.`,
        },
        { status: 500 },
      )
    }
  } catch (err: any) {
    console.error("Error processing request:", err)
    return NextResponse.json({ error: err.message || "Failed to process. Please try again." }, { status: 500 })
  }
}
