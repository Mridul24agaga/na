import { NextResponse } from "next/server"
import OpenAI from "openai"

// Improve the mock data generation to better incorporate the user's specific prompt
function generateMockSeoContent(prompt: string, toolType: string): string {
  console.log(`Generating mock SEO content for prompt: "${prompt}" with tool type: ${toolType}`)

  // Extract key terms from the prompt for better customization
  const keyTerms = prompt
    .split(/\s+/)
    .filter((word) => word.length > 3)
    .filter(
      (word) => !["and", "the", "for", "with", "that", "this", "from", "have", "what"].includes(word.toLowerCase()),
    )
    .slice(0, 5)

  const mainTopic = prompt.split(/[.,;?!]/)[0].trim()

  // Content templates based on tool type
  const templates: Record<string, string> = {
    blog: `# Blog SEO Optimization for "${mainTopic}"

## Keyword Analysis
- **Primary Keywords**: ${keyTerms.slice(0, 3).join(", ")}
- **Secondary Keywords**: ${keyTerms
      .map((term) => term + "s")
      .slice(0, 2)
      .join(", ")}
- **Long-tail Keywords**: 
  - "${mainTopic} best practices"
  - "how to improve ${mainTopic}"
  - "${mainTopic} tips for beginners"

## Content Structure Recommendations
1. **Title Optimization**: 
   - Recommended: "${mainTopic.charAt(0).toUpperCase() + mainTopic.slice(1)}: The Complete Guide [Current Year]"
   - Alternative: "How to Master ${mainTopic}: Expert Tips & Strategies"
   - Keep title under 60 characters for optimal display in search results

2. **Meta Description**:
   "Discover everything you need to know about ${mainTopic} in our comprehensive guide. Learn expert tips, best practices, and actionable strategies you can implement today."

3. **Heading Structure**:
   - H1: Main title focusing on ${mainTopic}
   - H2: Break down subtopics (5-7 sections)
   - H3: Further details under each H2 section
   - Use keywords naturally in headings

4. **Content Sections to Include**:
   - Introduction to ${mainTopic} (with primary keyword)
   - Benefits of ${mainTopic}
   - Common challenges with ${mainTopic}
   - Step-by-step guide or process
   - Expert tips and best practices
   - Case studies or examples
   - FAQ section addressing common questions

## On-Page SEO Recommendations
- Include target keyword in first 100 words
- Maintain keyword density of 1-2% (not too high)
- Add 2-3 internal links to related content
- Include 2-3 external links to authoritative sources
- Use descriptive image alt text with keywords
- Implement schema markup for better visibility
- Ensure mobile responsiveness and fast loading

## Readability Improvements
- Use short paragraphs (2-3 sentences max)
- Include bullet points and numbered lists
- Bold important information and keywords
- Add subheadings every 300 words
- Use transition words for better flow
- Aim for a Flesch reading score of 60-70

## Call-to-Action Suggestions
- Encourage comments and questions
- Add social sharing buttons
- Include related content recommendations
- Consider adding a content upgrade or lead magnet`,

    keyword: `# Keyword Research Results for "${mainTopic}"

## Primary Keywords
| Keyword | Search Volume | Competition | Difficulty |
|---------|--------------|-------------|------------|
| ${mainTopic} | Medium | Medium | 45/100 |
| ${keyTerms[0] || mainTopic} guide | Low | Low | 32/100 |
| ${keyTerms[1] || mainTopic} tips | Medium | Medium | 48/100 |
| best ${keyTerms[0] || mainTopic} | High | High | 68/100 |
| ${keyTerms[2] || mainTopic} examples | Low-Medium | Medium | 40/100 |

## Long-Tail Keywords
| Keyword | Search Volume | Competition | Difficulty |
|---------|--------------|-------------|------------|
| how to improve ${mainTopic} | Medium | Medium | 51/100 |
| ${mainTopic} best practices ${new Date().getFullYear()} | Low-Medium | Low | 35/100 |
| ${mainTopic} for beginners | Medium | Medium | 42/100 |
| advanced ${mainTopic} techniques | Low | Low | 30/100 |
| affordable ${mainTopic} solutions | Low | Low | 28/100 |

## Related Keywords & Phrases
- ${keyTerms[0] || mainTopic} optimization
- ${mainTopic} tools
- ${mainTopic} services
- ${keyTerms[1] || mainTopic} software
- ${mainTopic} trends
- ${mainTopic} strategies
- learn ${mainTopic}
- ${mainTopic} tutorial

## Keyword Grouping
**Group 1: Informational**
- what is ${mainTopic}
- ${mainTopic} explained
- ${mainTopic} guide
- ${mainTopic} tutorial

**Group 2: Commercial**
- best ${mainTopic} tools
- ${mainTopic} services
- affordable ${mainTopic}
- ${mainTopic} software

**Group 3: Problem-Solving**
- ${mainTopic} solutions
- fix ${mainTopic} issues
- improve ${mainTopic}
- optimize ${mainTopic}

## Content Recommendations
1. **Pillar Content**: Create comprehensive guide about "${mainTopic}"
2. **Supporting Content**: Develop separate articles for each long-tail keyword
3. **Content Types**:
   - How-to guides
   - Listicles (Top 10 ${mainTopic} strategies)
   - Case studies
   - Comparison posts
   - Expert interviews

## Competitor Keywords
Your top competitors are also ranking for:
- ${mainTopic} vs alternatives
- ${mainTopic} comparison
- ${mainTopic} reviews
- ${mainTopic} pricing`,

    meta: `# Optimized Meta Tags for "${mainTopic}"

## Title Tag Options
1. "${mainTopic.charAt(0).toUpperCase() + mainTopic.slice(1)} | Expert Solutions & Services"
   - Length: ${mainTopic.length + 30} characters
   - Includes primary keyword at beginning
   - Highlights value proposition

2. "Best ${mainTopic.charAt(0).toUpperCase() + mainTopic.slice(1)} Guide: Tips, Examples & Best Practices"
   - Length: ${mainTopic.length + 45} characters
   - Includes modifiers like "best" and "guide"
   - Appeals to users seeking comprehensive information

3. "${mainTopic.charAt(0).toUpperCase() + mainTopic.slice(1)}: Everything You Need to Know [${new Date().getFullYear()}]"
   - Length: ${mainTopic.length + 40} characters
   - Includes current year for freshness
   - Appeals to users seeking complete information

## Meta Description Options
1. "Looking for expert ${mainTopic} solutions? Discover our comprehensive services, tailored strategies, and proven results. Get started today!"
   - Length: ${mainTopic.length + 120} characters
   - Includes call-to-action
   - Highlights benefits and expertise

2. "Explore our complete guide to ${mainTopic}. Learn from industry experts with step-by-step instructions and actionable tips for success."
   - Length: ${mainTopic.length + 115} characters
   - Emphasizes educational value
   - Mentions expert advice and actionable information

3. "Trusted ${mainTopic} services with proven results. Our team delivers customized solutions to help you achieve your goals. Free consultation!"
   - Length: ${mainTopic.length + 110} characters
   - Emphasizes trust and customization
   - Includes offer (free consultation)

## Focus Keywords
- **Primary**: ${mainTopic}
- **Secondary**: ${mainTopic} services, ${mainTopic} solutions, professional ${mainTopic}
- **LSI Keywords**: expert ${mainTopic}, ${mainTopic} guide, ${mainTopic} tips

## Additional Meta Tags
- **Robots**: index, follow
- **Canonical**: https://yourdomain.com/${mainTopic.replace(/\s+/g, "-").toLowerCase()}/
- **OG Title**: Same as your selected title tag
- **OG Description**: Same as your selected meta description
- **OG Image**: Add a relevant, high-quality image related to ${mainTopic}
- **Twitter Card**: summary_large_image

## Meta Tags Implementation
\`\`\`html
<title>${mainTopic.charAt(0).toUpperCase() + mainTopic.slice(1)} | Expert Solutions & Services</title>
<meta name="description" content="Looking for expert ${mainTopic} solutions? Discover our comprehensive services, tailored strategies, and proven results. Get started today!">
<meta name="robots" content="index, follow">
<link rel="canonical" href="https://yourdomain.com/${mainTopic.replace(/\s+/g, "-").toLowerCase()}/">
<meta property="og:title" content="${mainTopic.charAt(0).toUpperCase() + mainTopic.slice(1)} | Expert Solutions & Services">
<meta property="og:description" content="Looking for expert ${mainTopic} solutions? Discover our comprehensive services, tailored strategies, and proven results. Get started today!">
<meta property="og:url" content="https://yourdomain.com/${mainTopic.replace(/\s+/g, "-").toLowerCase()}/">
<meta property="og:type" content="website">
<meta name="twitter:card" content="summary_large_image">
\`\`\``,

    local: `# Local SEO Strategy for "${mainTopic}"

## Google Business Profile Optimization
1. **Business Name**: 
   - Correct format: Legal business name only
   - Avoid keyword stuffing in business name
   - Example: "${mainTopic.charAt(0).toUpperCase() + mainTopic.slice(1)}" (not "${mainTopic.charAt(0).toUpperCase() + mainTopic.slice(1)} - Best in [City]")

2. **Business Categories**:
   - Primary: Select most specific category for ${mainTopic}
   - Secondary: Add 2-4 relevant additional categories
   - Review categories quarterly for relevance

3. **Business Description**:
   - 750 character optimized description
   - Include primary keywords naturally
   - Highlight unique selling points
   - Include location-specific information
   - End with clear call-to-action

4. **Photos & Visual Content**:
   - Upload 20+ high-quality photos
   - Include: exterior, interior, products/services, team
   - Add new photos monthly
   - Use proper file names with keywords
   - Add virtual tour if possible

## Local Keyword Strategy
**Primary Keywords:**
- ${mainTopic} in [city/location]
- best ${mainTopic} near me
- affordable ${mainTopic} [city/location]

**Secondary Keywords:**
- [city/location] ${mainTopic} services
- top-rated ${mainTopic} in [city/location]
- experienced ${mainTopic} [neighborhood name]

**Long-tail Keywords:**
- where to find the best ${mainTopic} in [city/location]
- affordable ${mainTopic} services near [landmark]
- [specific service] ${mainTopic} in [city/location]

## Local Content Recommendations
1. **Location Pages**:
   - Create dedicated pages for each service area
   - Include local landmarks, neighborhoods
   - Add Google Map embed
   - Include location-specific testimonials
   - Add schema markup for local business

2. **Local Blog Topics**:
   - "Best ${mainTopic} Options in [City/Location]"
   - "How to Choose the Right ${mainTopic} in [City/Location]"
   - "[City/Location] ${mainTopic} Guide: Prices, Options, and Tips"
   - "5 Things to Know About ${mainTopic} in [Your City]"
   - "How [Local Event] Impacts ${mainTopic} in [City]"

3. **NAP Consistency Checklist**
   Ensure your Name, Address, and Phone number are consistent across:
   - Website (footer and contact page)
   - Google Business Profile
   - Social media profiles
   - Directory listings
   - Review sites
   - Chamber of Commerce listing

4. **Local Link Building Opportunities**
   - Chamber of Commerce
   - Local business associations
   - Sponsorship of local events
   - Local news websites
   - Community organizations
   - Local business directories
   - Partnerships with complementary businesses`,

    ecommerce: `# E-commerce SEO Optimization for "${mainTopic}"

## Product Page Optimization

### Title Tag Structure
- **Format**: [Product Name] - [Key Feature] - [Brand]
- **Example**: "${keyTerms[0] || mainTopic} - Premium ${keyTerms[1] || "Quality"} - YourBrand"
- **Length**: Keep under 60 characters
- **Keywords**: Include primary keyword early in title

### Product Descriptions
1. **Structure**:
   - 150-300 words per product
   - Opening paragraph with main keywords
   - Bullet points for features/specifications
   - Closing paragraph with benefits and CTA

2. **Content Elements**:
   - Unique selling points
   - Materials/ingredients
   - Dimensions/specifications
   - Benefits (not just features)
   - Use cases or scenarios
   - Social proof elements

3. **SEO Elements**:
   - Include primary keyword in first 50 words
   - Use secondary keywords naturally throughout
   - Add LSI (related) keywords
   - Include target keyword in at least one subheading

### Technical SEO Elements
1. **Schema Markup**:
   - Implement Product schema
   - Include price, availability, reviews
   - Add Brand and Offer schema
   - Consider AggregateRating schema

2. **Image Optimization**:
   - Descriptive file names (${mainTopic.replace(/\s+/g, "-")}-color.jpg)
   - Alt text with keywords
   - Compress images for speed
   - Multiple high-quality images
   - Consider 360° views or videos

3. **URL Structure**:
   - Keep URLs short and descriptive
   - Include main keyword
   - Use hyphens to separate words
   - Example: yourdomain.com/category/${mainTopic.replace(/\s+/g, "-")}

## Category Page Optimization
1. **Category Structure**:
   - Logical hierarchy with main and subcategories
   - Breadcrumb navigation
   - Filter and sort options
   - Featured/bestselling products section

2. **Category Content**:
   - 250-500 words of unique content
   - Include category-specific keywords
   - Add H1 heading with main category keyword
   - Use H2/H3 for subcategories or sections
   - Consider adding FAQ section

3. **Internal Linking**:
   - Link between related products
   - Link from blog content to relevant product pages
   - Create "related products" sections
   - Consider "recently viewed" functionality
   - Implement breadcrumb navigation

## Conversion Optimization
1. **Trust Signals**:
   - Display customer reviews and ratings
   - Show security badges
   - Highlight guarantees and return policies
   - Display shipping information prominently
   - Add trust badges (SSL, payment options)

2. **Mobile Optimization**:
   - Ensure responsive design
   - Optimize tap targets
   - Simplify checkout process
   - Implement accelerated mobile pages (AMP)
   - Test on multiple devices

3. **Page Speed Optimization**:
   - Compress images
   - Minimize HTTP requests
   - Enable browser caching
   - Use a CDN
   - Implement lazy loading
   - Consider headless commerce architecture`,

    general: `# SEO Recommendations for "${mainTopic}"

## Keyword Strategy
### Primary Keywords
- ${mainTopic}
- ${keyTerms[0] || mainTopic} services
- ${keyTerms[1] || mainTopic} solutions
- professional ${mainTopic}

### Secondary Keywords
- best ${mainTopic}
- affordable ${mainTopic}
- ${mainTopic} experts
- ${mainTopic} company

### Long-tail Keywords
- how to improve ${mainTopic}
- ${mainTopic} best practices ${new Date().getFullYear()}
- affordable ${mainTopic} options
- professional ${mainTopic} services near me

## On-Page SEO Recommendations
### Title Tag Options
1. "${mainTopic.charAt(0).toUpperCase() + mainTopic.slice(1)} | Professional Services & Expert Solutions"
2. "Best ${mainTopic.charAt(0).toUpperCase() + mainTopic.slice(1)} Services | Expert Solutions & Support"
3. "${mainTopic.charAt(0).toUpperCase() + mainTopic.slice(1)} Experts | Professional Services & Consulting"

### Meta Description
"Looking for professional ${mainTopic} services? Our expert team provides customized solutions with proven results. Get a free consultation today!"

### URL Structure
yourdomain.com/${mainTopic.replace(/\s+/g, "-").toLowerCase()}/

### Heading Structure
- **H1**: Main service/topic focused on ${mainTopic}
- **H2**: Break down subtopics, services, benefits
  - What is ${mainTopic}?
  - Benefits of Professional ${mainTopic} Services
  - Our ${mainTopic} Process
  - Why Choose Our ${mainTopic} Services
  - ${mainTopic} Case Studies
  - Frequently Asked Questions About ${mainTopic}
- **H3**: Further details under each H2 section

## Content Recommendations
### Create Comprehensive Content
- Aim for 1,500+ words for main service pages
- Answer common questions about ${mainTopic}
- Include statistics, case studies, and examples
- Add visuals: images, infographics, videos
- Create FAQ section addressing common questions

### Content Structure
- Introduction with primary keyword in first 100 words
- Clear sections with descriptive subheadings
- Bullet points and numbered lists for readability
- Conclusion with clear call-to-action
- Sidebar with related services or testimonials

### Content Types to Develop
- Service page for ${mainTopic}
- Case studies showing ${mainTopic} success stories
- Blog posts addressing ${mainTopic} topics
- FAQ page about ${mainTopic}
- Resource guides related to ${mainTopic}

## Technical SEO
- Improve page loading speed (aim for <3 seconds)
- Ensure mobile responsiveness
- Fix broken links and crawl errors
- Implement schema markup for services
- Set up XML sitemap
- Create robots.txt file
- Implement canonical tags
- Set up breadcrumb navigation

## Link Building Strategy
- Guest posting on industry websites
- Create shareable infographics about ${mainTopic}
- Develop resource pages for backlinks
- Engage in relevant online communities
- Reach out to industry directories
- Partner with complementary businesses
- Leverage social media for content distribution`,
  }

  // Return the appropriate template or default to general
  return templates[toolType] || templates.general
}

// Improve the Azure OpenAI function to better use the prompt
async function callAzureOpenAI(prompt: string, toolType: string): Promise<string> {
  try {
    // Check if Azure OpenAI is configured
    if (!process.env.AZURE_OPENAI_API_KEY || !process.env.AZURE_OPENAI_ENDPOINT) {
      console.log("Azure OpenAI not configured, using mock data")
      return generateMockSeoContent(prompt, toolType)
    }

    // Initialize Azure OpenAI client
    const openai = new OpenAI({
      apiKey: process.env.AZURE_OPENAI_API_KEY,
      baseURL: process.env.AZURE_OPENAI_ENDPOINT,
      defaultQuery: { "api-version": "2024-02-15-preview" },
      defaultHeaders: { "api-key": process.env.AZURE_OPENAI_API_KEY },
    })

    // Prepare system message based on tool type
    let systemMessage = `You are an expert SEO assistant specializing in ${toolType} SEO. 
Provide helpful, detailed SEO advice specifically about "${prompt}".
Format your response in Markdown with clear headings, bullet points, and numbered lists.
Make sure your advice is directly relevant to the user's query about "${prompt}".
Focus ONLY on the specific details mentioned in the prompt and tailor your response accordingly.
Do not provide generic advice - make sure every recommendation is specific to "${prompt}".`

    switch (toolType) {
      case "blog":
        systemMessage = `You are an expert blog SEO assistant. 
Provide detailed recommendations for optimizing blog content about "${prompt}", 
including keyword suggestions, content structure, and meta descriptions. 
Format your response in Markdown with clear headings, bullet points, and numbered lists.
Make sure all your recommendations are specifically tailored to "${prompt}".
Focus ONLY on the specific details mentioned in the prompt and tailor your response accordingly.
Do not provide generic advice - make sure every recommendation is specific to "${prompt}".`
        break
      case "keyword":
        systemMessage = `You are an expert keyword research assistant. 
Provide relevant keywords, search volume estimates, and content recommendations 
specifically for "${prompt}".
Format your response in Markdown with tables, headings, and bullet points.
Make sure all keywords and recommendations are directly relevant to "${prompt}".
Focus ONLY on the specific details mentioned in the prompt and tailor your response accordingly.
Do not provide generic advice - make sure every recommendation is specific to "${prompt}".`
        break
      case "meta":
        systemMessage = `You are an expert meta tag generator. 
Create optimized title tags and meta descriptions specifically for "${prompt}" 
that improve click-through rates while following SEO best practices. 
Format your response in Markdown with clear sections, code examples, and explanations.
Make sure all meta tags are directly relevant to "${prompt}".
Focus ONLY on the specific details mentioned in the prompt and tailor your response accordingly.
Do not provide generic advice - make sure every recommendation is specific to "${prompt}".`
        break
      case "local":
        systemMessage = `You are an expert local SEO assistant. 
Provide recommendations for improving local search presence for "${prompt}", 
including Google Business Profile optimization, local content ideas, and citation strategies. 
Format your response in Markdown with clear headings and actionable steps.
Make sure all recommendations are specifically tailored to "${prompt}".
Focus ONLY on the specific details mentioned in the prompt and tailor your response accordingly.
Do not provide generic advice - make sure every recommendation is specific to "${prompt}".`
        break
      case "ecommerce":
        systemMessage = `You are an expert e-commerce SEO assistant. 
Provide recommendations for optimizing product pages, category structure, and conversion elements 
specifically for "${prompt}" to improve search visibility and sales. 
Format your response in Markdown with clear sections and practical examples.
Make sure all recommendations are directly relevant to "${prompt}".
Focus ONLY on the specific details mentioned in the prompt and tailor your response accordingly.
Do not provide generic advice - make sure every recommendation is specific to "${prompt}".`
        break
    }

    // Call Azure OpenAI
    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: systemMessage },
        { role: "user", content: `I need SEO help with: ${prompt}` },
      ],
      model: "gpt-4o-mini",
      max_tokens: 1500,
      temperature: 0.7,
    })

    const result = completion.choices[0]?.message?.content || ""
    return result.trim()
  } catch (error: any) {
    console.error("Error calling Azure OpenAI:", error.message)
    // Fall back to mock data if Azure OpenAI fails
    return generateMockSeoContent(prompt, toolType)
  }
}

// Update the POST handler to use the context information
export async function POST(request: Request) {
  try {
    const { prompt, toolType = "general", context = {} } = await request.json()

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 })
    }

    // Try to use Azure OpenAI if configured, otherwise use mock data
    const result = await callAzureOpenAI(prompt, toolType)

    return NextResponse.json({ result })
  } catch (error) {
    console.error("SEO API error:", error)
    return NextResponse.json({ error: "Failed to process SEO request" }, { status: 500 })
  }
}
