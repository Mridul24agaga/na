import { NextResponse } from "next/server"

// Enhance the prompt analysis to better detect the user's intent and preserve more of the original prompt
function generateToolConfig(prompt: string) {
  const promptLower = prompt.toLowerCase()
  console.log("Analyzing prompt:", promptLower)

  // More comprehensive keyword matching
  const keywordPatterns = {
    blog: ["blog", "article", "post", "content", "writing"],
    keyword: ["keyword", "research", "search term", "search volume", "seo term"],
    meta: ["meta", "description", "title tag", "snippet", "serp"],
    local: ["local", "business", "google business", "map", "location", "near me", "city", "store"],
    ecommerce: ["ecommerce", "product", "shop", "store", "catalog", "shopping"],
  }

  // Default configuration
  let config = {
    title: "SEO Content Generator",
    description:
      "Generate optimized SEO content based on your requirements. Get recommendations for keywords, content structure, and meta descriptions.",
    inputLabel: "What SEO content do you need?",
    inputPlaceholder:
      "E.g., Write meta description for a solar panel company, or optimize content about sustainable fashion",
    buttonText: "Generate SEO Content",
    resultTitle: "Generated SEO Content:",
    toolType: "general",
    originalPrompt: prompt, // Store the original prompt
  }

  // Check for matches in each category
  let matchedType = "general"
  let highestMatchCount = 0

  for (const [type, keywords] of Object.entries(keywordPatterns)) {
    const matchCount = keywords.filter((keyword) => promptLower.includes(keyword)).length
    if (matchCount > highestMatchCount) {
      highestMatchCount = matchCount
      matchedType = type
    }
  }

  console.log("Detected tool type:", matchedType)

  // Set configuration based on detected type
  switch (matchedType) {
    case "blog":
      config = {
        title: "Blog Post SEO Optimizer",
        description:
          "Optimize your blog content with SEO recommendations, keywords, and meta descriptions. Improve your content's search visibility and engagement.",
        inputLabel: "Enter your blog topic or existing content",
        inputPlaceholder: "E.g., How to grow organic vegetables, or paste your existing blog content for optimization",
        buttonText: "Optimize Blog Content",
        resultTitle: `Blog SEO Recommendations for: "${prompt}"`,
        toolType: "blog",
        originalPrompt: prompt,
      }
      break
    case "keyword":
      config = {
        title: "Keyword Research Tool",
        description:
          "Discover relevant keywords and search terms for your content. Get insights on search volume, competition, and content recommendations.",
        inputLabel: "Enter your topic or niche",
        inputPlaceholder: "E.g., Sustainable fashion, electric vehicles, home automation",
        buttonText: "Find Keywords",
        resultTitle: `Keyword Suggestions for: "${prompt}"`,
        toolType: "keyword",
        originalPrompt: prompt,
      }
      break
    case "meta":
      config = {
        title: "Meta Tag Generator",
        description:
          "Create optimized meta titles and descriptions for better click-through rates. Improve your search engine listings and attract more visitors.",
        inputLabel: "Describe your page content",
        inputPlaceholder: "E.g., Homepage for a digital marketing agency specializing in small businesses",
        buttonText: "Generate Meta Tags",
        resultTitle: `Optimized Meta Tags for: "${prompt}"`,
        toolType: "meta",
        originalPrompt: prompt,
      }
      break
    case "local":
      config = {
        title: "Local SEO Assistant",
        description:
          "Improve your local search presence with optimized content and strategies. Get recommendations for Google Business Profile, local keywords, and citations.",
        inputLabel: "Enter your business type and location",
        inputPlaceholder: "E.g., Coffee shop in Portland, Oregon",
        buttonText: "Generate Local SEO Tips",
        resultTitle: `Local SEO Recommendations for: "${prompt}"`,
        toolType: "local",
        originalPrompt: prompt,
      }
      break
    case "ecommerce":
      config = {
        title: "E-commerce SEO Tool",
        description:
          "Optimize your product pages and e-commerce content for better visibility. Improve product descriptions, category pages, and technical SEO elements.",
        inputLabel: "Enter your product or store details",
        inputPlaceholder: "E.g., Online store selling handmade jewelry, or specific product details",
        buttonText: "Optimize Product Content",
        resultTitle: `E-commerce SEO Recommendations for: "${prompt}"`,
        toolType: "ecommerce",
        originalPrompt: prompt,
      }
      break
  }

  return config
}

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json()

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 })
    }

    // Generate tool configuration based on the prompt
    const toolConfig = generateToolConfig(prompt)

    return NextResponse.json({ toolConfig })
  } catch (error) {
    console.error("Error generating SEO tool:", error)
    return NextResponse.json({ error: "Failed to generate SEO tool" }, { status: 500 })
  }
}
