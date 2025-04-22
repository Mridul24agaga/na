import { NextResponse } from "next/server"
import OpenAI from "openai"

// Initialize Azure OpenAI client
const openai = new OpenAI({
  apiKey: process.env.AZURE_OPENAI_API_KEY as string,
  baseURL: process.env.AZURE_OPENAI_API_BASE_PATH_GPT4O_MINI,
  defaultQuery: { "api-version": "2024-02-15-preview" },
  defaultHeaders: { "api-key": process.env.AZURE_OPENAI_API_KEY },
})

export async function POST(req: Request) {
  try {
    const { prompt, toolType } = await req.json()

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 })
    }

    // Check if we have API keys configured
    if (!process.env.AZURE_OPENAI_API_KEY) {
      console.warn("No Azure OpenAI API key found. Using mock data instead.")
      // Return mock UI customization
      return NextResponse.json({
        customizations: getMockCustomization(prompt, toolType),
      })
    }

    // Replace the system prompt for UI generation with this enhanced version
    const systemPrompt = `You are an expert UI designer with advanced capabilities in generating custom UI designs based on user prompts. Your task is to create a detailed UI customization specification that perfectly matches the user's request.

Your design must be highly responsive to the specific tool type and user's description, creating a perfect match between functionality and aesthetics.

IMPORTANT GUIDELINES:
1. Analyze both the tool type AND the user's prompt deeply to understand the ideal UI approach
2. Consider the specific functionality needs of the tool type when designing the UI
3. Create a cohesive design system that enhances usability for this specific tool
4. Ensure the UI elements are optimized for the tool's primary functions
5. Adapt completely to the user's aesthetic preferences while maintaining usability
6. Think beyond basic styling to create a truly unique and functional interface
7. Consider the user flow and interaction patterns appropriate for this tool type

Format your response as a JSON object with the following structure:
{
  "branding": {
    "primaryColor": string (hex color code),
    "secondaryColor": string (hex color code),
    "accentColor": string (hex color code),
    "fontFamily": string (font family name),
    "borderRadius": string (Tailwind CSS border radius class),
    "brandName": string (suggested brand name based on tool type)
  },
  "layout": {
    "style": string (description of layout style),
    "cardStyle": string (description of card style),
    "buttonStyle": string (description of button style),
    "specialElements": [string] (list of special UI elements for this tool type)
  },
  "theme": {
    "name": string (theme name),
    "description": string (brief description of the theme),
    "imagePrompt": string (detailed prompt for generating a preview image)
  },
  "toolSpecific": {
    "primaryFunction": string (the main function of this tool),
    "keyFeatures": [string] (list of key features this UI should highlight),
    "recommendedComponents": [string] (list of UI components that would enhance this tool)
  }
}`

    // Enhance the user prompt to extract more context
    try {
      // Call Azure OpenAI to generate UI customizations
      const completion = await openai.chat.completions.create({
        messages: [
          { role: "system", content: systemPrompt },
          {
            role: "user",
            content: `Generate a highly customized UI design for a ${toolType} tool based on this detailed description: ${prompt}

The UI should be perfectly optimized for this specific tool type and match the aesthetic preferences described. Consider what UI elements would best serve the functionality of a ${toolType} tool and incorporate them into your design.

Think deeply about both the functional needs and visual style to create a perfect match between form and function.`,
          },
        ],
        model: "gpt-4o-mini",
        max_tokens: 1500,
        temperature: 0.7,
        response_format: { type: "json_object" },
      })

      const resultJson = completion.choices[0]?.message?.content || ""

      try {
        const customizations = JSON.parse(resultJson)

        // Ensure the response has the expected structure
        if (!customizations.branding) {
          customizations.branding = getMockCustomization(prompt, toolType).branding
        }

        // Ensure all required properties exist
        customizations.branding = {
          primaryColor: customizations.branding.primaryColor || "#8B5CF6",
          secondaryColor: customizations.branding.secondaryColor || "#A78BFA",
          accentColor: customizations.branding.accentColor || "#EDE9FE",
          fontFamily: customizations.branding.fontFamily || "Space Grotesk, monospace",
          borderRadius: customizations.branding.borderRadius || "rounded-lg",
          brandName:
            customizations.branding.brandName || `${toolType.charAt(0).toUpperCase() + toolType.slice(1)} Tool`,
          ...customizations.branding,
        }

        // Add debug information to the response
        return NextResponse.json({
          customizations,
          imagePrompt: customizations.theme?.imagePrompt || `UI design for ${toolType} tool based on user description`,
          debug: {
            prompt,
            toolType,
            timestamp: new Date().toISOString(),
          },
        })
      } catch (error) {
        console.error("Error parsing JSON from OpenAI:", error)
        return NextResponse.json(
          {
            error: "Failed to parse the response. Using fallback customizations.",
            customizations: getMockCustomization(prompt, toolType),
          },
          { status: 200 },
        )
      }
    } catch (openaiError: any) {
      console.error("OpenAI API error:", openaiError)
      return NextResponse.json({
        error: `OpenAI API error: ${openaiError.message}`,
        customizations: getMockCustomization(prompt, toolType),
      })
    }
  } catch (err: any) {
    console.error("Error processing request:", err)
    return NextResponse.json({ error: err.message || "Failed to process. Please try again." }, { status: 500 })
  }
}

// Helper function to generate mock customizations based on the prompt
function getMockCustomization(prompt: string, toolType: string) {
  // Extract color preferences from the prompt
  const hasColorPreference = (color: string) => prompt.toLowerCase().includes(color.toLowerCase())

  let primaryColor = "#8B5CF6" // Default to purple
  let secondaryColor = "#A78BFA"
  let accentColor = "#EDE9FE"

  // Generate an image prompt based on the user's description
  let imagePrompt = `UI design for ${toolType} tool with `

  if (hasColorPreference("dark") || hasColorPreference("black")) {
    primaryColor = "#1F2937"
    secondaryColor = "#4B5563"
    accentColor = "#E5E7EB"
    imagePrompt += "dark theme, "
  } else if (hasColorPreference("blue")) {
    primaryColor = "#2563EB"
    secondaryColor = "#60A5FA"
    accentColor = "#DBEAFE"
    imagePrompt += "blue color scheme, "
  } else if (hasColorPreference("green")) {
    primaryColor = "#10B981"
    secondaryColor = "#34D399"
    accentColor = "#ECFDF5"
    imagePrompt += "green color scheme, "
  } else if (hasColorPreference("red") || hasColorPreference("pink")) {
    primaryColor = "#EC4899"
    secondaryColor = "#F472B6"
    accentColor = "#FCE7F3"
    imagePrompt += "pink color scheme, "
  } else if (hasColorPreference("orange") || hasColorPreference("amber")) {
    primaryColor = "#F59E0B"
    secondaryColor = "#FBBF24"
    accentColor = "#FEF3C7"
    imagePrompt += "orange color scheme, "
  } else {
    imagePrompt += "purple color scheme, "
  }

  // Extract style preferences
  const isMinimalist = prompt.toLowerCase().includes("minimalist") || prompt.toLowerCase().includes("minimal")
  const isPlayful = prompt.toLowerCase().includes("playful") || prompt.toLowerCase().includes("fun")
  const isModern = prompt.toLowerCase().includes("modern") || prompt.toLowerCase().includes("sleek")
  const isFuturistic = prompt.toLowerCase().includes("futuristic") || prompt.toLowerCase().includes("cyberpunk")
  const isRetro = prompt.toLowerCase().includes("retro") || prompt.toLowerCase().includes("vintage")

  let fontFamily = "Inter, sans-serif" // Default
  let borderRadius = "rounded-md" // Default

  if (isPlayful) {
    fontFamily = "Poppins, sans-serif"
    borderRadius = "rounded-xl"
    imagePrompt += "playful style with rounded elements"
  } else if (isMinimalist) {
    fontFamily = "Space Grotesk, monospace"
    borderRadius = "rounded-sm"
    imagePrompt += "minimalist clean design"
  } else if (isFuturistic) {
    fontFamily = "Space Grotesk, monospace"
    borderRadius = "rounded-none"
    imagePrompt += "futuristic cyberpunk style"
  } else if (isRetro) {
    fontFamily = "DM Serif Display, serif"
    borderRadius = "rounded-md"
    imagePrompt += "retro vintage style"
  } else if (isModern) {
    fontFamily = "Roboto, sans-serif"
    borderRadius = "rounded-lg"
    imagePrompt += "modern professional style"
  } else {
    imagePrompt += "balanced design"
  }

  // Generate a theme name based on the prompt and tool type
  const words = prompt.split(/\s+/).filter((word) => word.length > 3)
  const randomWord = words.length > 0 ? words[Math.floor(Math.random() * words.length)] : "Custom"
  const themeName = `${randomWord.charAt(0).toUpperCase() + randomWord.slice(1)} ${toolType.charAt(0).toUpperCase() + toolType.slice(1)}`

  return {
    branding: {
      primaryColor,
      secondaryColor,
      accentColor,
      fontFamily,
      borderRadius,
      brandName: `${themeName} SEO`,
    },
    layout: {
      style: isMinimalist
        ? "Minimalist layout with clean lines"
        : isPlayful
          ? "Playful layout with dynamic elements"
          : isFuturistic
            ? "Futuristic layout with edgy elements"
            : isRetro
              ? "Retro layout with vintage elements"
              : "Modern layout with balanced spacing",
      cardStyle: isMinimalist
        ? "Simple cards with subtle borders"
        : isPlayful
          ? "Rounded cards with playful shadows"
          : isFuturistic
            ? "Sharp-edged cards with neon accents"
            : isRetro
              ? "Textured cards with classic styling"
              : "Clean cards with moderate shadows",
      buttonStyle: isMinimalist
        ? "Simple buttons with minimal styling"
        : isPlayful
          ? "Rounded buttons with hover effects"
          : isFuturistic
            ? "Angular buttons with glow effects"
            : isRetro
              ? "Buttons with vintage styling"
              : "Standard buttons with clear call to action",
    },
    theme: {
      name: themeName,
      description: `A ${isMinimalist ? "minimalist" : isPlayful ? "playful" : isFuturistic ? "futuristic" : isRetro ? "retro" : "modern"} theme for ${toolType} SEO tools`,
      imagePrompt: imagePrompt,
    },
  }
}
