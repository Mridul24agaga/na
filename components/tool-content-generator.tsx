"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  CheckCircle,
  Copy,
  Download,
  FileText,
  MapPin,
  ArrowRight,
  ExternalLink,
  Tag,
  ShoppingCart,
  Lightbulb,
  RefreshCw,
} from "lucide-react"
import type { BrandingOptions } from "./style-template-selector"

// First, let's modify the interface to make branding optional
interface ToolContentGeneratorProps {
  toolConfig: {
    title: string
    description: string
    toolType: string
    originalPrompt?: string
  }
  branding?: BrandingOptions
}

// Then, let's add a default branding object to use when branding is undefined
export function ToolContentGenerator({ toolConfig, branding }: ToolContentGeneratorProps) {
  const [content, setContent] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Default branding to use when none is provided
  const defaultBranding: BrandingOptions = {
    template: "plain",
    primaryColor: "#3B82F6",
    secondaryColor: "#1E40AF",
    accentColor: "#DBEAFE",
    fontFamily: "Inter, sans-serif",
    borderRadius: "rounded-md",
    buttonStyle: "solid",
    cardStyle: "flat",
    brandName: "",
    industry: "",
  }

  // Use the provided branding or fall back to default
  const safeBranding = branding || defaultBranding

  // Automatically generate content on mount
  useEffect(() => {
    generateContent()
  }, [toolConfig]) // Regenerate when toolConfig changes

  const generateContent = async () => {
    setLoading(true)
    setError(null)

    try {
      // In a real implementation, this would call an API endpoint
      // For now, we'll simulate the API call with a timeout
      setTimeout(() => {
        const generatedContent = generateSEOContent(toolConfig)
        setContent(generatedContent)
        setLoading(false)
      }, 1000) // Reduced timeout for better UX
    } catch (err) {
      console.error("Error generating content:", err)
      setError("Failed to generate content. Please try again.")
      setLoading(false)
    }
  }

  const copyToClipboard = () => {
    if (content) {
      navigator.clipboard.writeText(content)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const downloadContent = () => {
    if (content) {
      const blob = new Blob([content], { type: "text/plain" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${toolConfig.title.toLowerCase().replace(/\s+/g, "-")}-content.md`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }
  }

  // Get tool-specific icon
  const getToolIcon = () => {
    switch (toolConfig.toolType) {
      case "blog":
        return <FileText className="h-8 w-8" />
      case "keyword":
        return <Tag className="h-8 w-8" />
      case "meta":
        return <ExternalLink className="h-8 w-8" />
      case "local":
        return <MapPin className="h-8 w-8" />
      case "ecommerce":
        return <ShoppingCart className="h-8 w-8" />
      default:
        return <Lightbulb className="h-8 w-8" />
    }
  }

  // Get button style based on branding
  const getButtonStyle = () => {
    const { buttonStyle, primaryColor, secondaryColor, borderRadius } = safeBranding

    const baseClasses = `${borderRadius} transition-colors`

    switch (buttonStyle) {
      case "solid":
        return `${baseClasses} bg-[${primaryColor}] text-white border-2 border-transparent`
      case "outline":
        return `${baseClasses} bg-transparent border-2 border-[${primaryColor}] text-[${primaryColor}]`
      case "ghost":
        return `${baseClasses} bg-transparent hover:bg-[${primaryColor}]/10 text-[${primaryColor}]`
      case "gradient":
        return `${baseClasses} bg-gradient-to-r from-[${primaryColor}] to-[${secondaryColor}] text-white border-0`
      case "neon":
        return `${baseClasses} bg-[${primaryColor}] text-white border-2 border-transparent shadow-[0_0_10px_rgba(0,0,0,0.3)]`
      case "classic":
        return `${baseClasses} bg-[${primaryColor}] text-white border-b-4 border-[${secondaryColor}]`
      case "plain":
        return `${baseClasses} bg-[${primaryColor}] text-white border border-gray-200`
      default:
        return `${baseClasses} bg-[${primaryColor}] text-white`
    }
  }

  // Get card style based on branding
  const getCardStyle = () => {
    const { cardStyle, borderRadius, primaryColor } = safeBranding

    const baseClasses = `${borderRadius}`

    switch (cardStyle) {
      case "shadow":
        return `${baseClasses} bg-white shadow-md border border-gray-100`
      case "border":
        return `${baseClasses} bg-white border-2 border-[${primaryColor}]`
      case "flat":
        return `${baseClasses} bg-gray-50 border border-gray-200`
      case "glass":
        return `${baseClasses} bg-white/70 backdrop-blur-md border border-white/20 shadow-sm`
      case "dark":
        return `${baseClasses} bg-gray-800 text-white shadow-md`
      case "paper":
        return `${baseClasses} bg-[#FFFDF8] border border-gray-200 shadow-sm`
      case "plain":
        return `${baseClasses} bg-white border border-gray-200`
      default:
        return `${baseClasses} bg-white shadow-md`
    }
  }

  // Function to format content for display
  const formatContentForDisplay = (content: string) => {
    if (!content) return ""

    // Get text color based on card style
    const textColor = safeBranding.cardStyle === "dark" ? "text-white" : "text-gray-800"
    const headingColor = safeBranding.cardStyle === "dark" ? "text-white" : `text-[${safeBranding.primaryColor}]`
    const subheadingColor =
      safeBranding.cardStyle === "dark" ? "text-gray-300" : `text-[${safeBranding.secondaryColor}]`

    return content
      .replace(
        /^# (.*$)/gm,
        `<h1 class="text-2xl font-bold ${headingColor} mb-4" style="color: ${safeBranding.primaryColor}">$1</h1>`,
      )
      .replace(
        /^## (.*$)/gm,
        `<h2 class="text-xl font-bold ${headingColor} mt-8 mb-4" style="color: ${safeBranding.primaryColor}">$1</h2>`,
      )
      .replace(
        /^### (.*$)/gm,
        `<h3 class="text-lg font-bold ${subheadingColor} mt-6 mb-3" style="color: ${safeBranding.secondaryColor}">$1</h3>`,
      )
      .replace(/\*\*(.*?)\*\*/g, `<strong class="font-bold ${textColor}">$1</strong>`)
      .replace(/\n\n/g, `</p><p class="${textColor} mb-4">`)
      .replace(/\n([^#\n].*)/g, `<br><span class="${textColor}">$1</span>`)
      .replace(/^(.+)(?!\n|<\/p>|<h[1-3]>)/gm, `<p class="${textColor} mb-4">$1</p>`)
  }

  // This function simulates what would normally be done by an API call
  const generateSEOContent = (config: ToolContentGeneratorProps["toolConfig"]) => {
    const { title, description, toolType, originalPrompt } = config

    // Common content sections that apply to all tool types
    const commonIntro = `# ${title}: The Ultimate Guide

${description}

Are you looking to improve your website's search engine rankings? Our ${title} is designed to help you achieve better visibility in search results, drive more organic traffic, and ultimately grow your online presence.
`

    // Generate different content based on tool type
    let toolSpecificContent = ""
    let toolFeatures = ""
    let toolBenefits = ""
    let toolFAQs = ""

    switch (toolType) {
      case "blog":
        toolSpecificContent = `
## How Our Blog Post SEO Optimizer Works

Our Blog Post SEO Optimizer uses advanced natural language processing to analyze your content and provide actionable recommendations. Here's how it works:

Content Analysis: We scan your blog post to identify its main topics, structure, and existing keywords. Our tool analyzes your content's readability, keyword density, and semantic relevance to ensure it meets current SEO standards.

Keyword Optimization: We suggest primary and secondary keywords that can improve your search rankings. Our tool identifies keyword opportunities based on search volume, competition, and relevance to your content.

Readability Assessment: We evaluate your content's readability and suggest improvements to engage readers better. Our tool checks sentence length, paragraph structure, and overall flow to ensure your content is easy to read and understand.

Structure Recommendations: We provide suggestions for headings, paragraphs, and content flow to improve user experience. Our tool analyzes your content structure and recommends changes to make it more scannable and engaging.

SEO Score: We provide an overall SEO score for your blog post, highlighting areas of strength and opportunities for improvement. This score is based on multiple factors including keyword usage, readability, and structure.

Competitor Analysis: We analyze top-ranking content for your target keywords to identify gaps and opportunities in your own content. This helps you understand what's working for your competitors and how you can differentiate your content.
`

        toolFeatures = `
## Key Features of Our ${title}

Our tool comes packed with features designed to give you a competitive edge:

User-Friendly Interface: Simple and intuitive design that requires no technical expertise.

Real-time Analysis: Get instant feedback as you write or edit your blog posts.

Keyword Suggestions: Discover relevant keywords that can help improve your rankings.

Readability Metrics: Ensure your content is easy to read and engaging for your audience.

Content Structure Analysis: Get recommendations for improving your headings, paragraphs, and overall structure.

SEO Score Tracking: Monitor your progress as you implement recommendations.

Export and Share: Easily export your analysis or share it with team members.

Integration Options: Connect with popular content management systems and writing tools.
`

        toolBenefits = `
## Benefits of Using Our ${title}

Implementing our tool in your content strategy offers numerous advantages:

Higher Search Rankings: By optimizing your blog posts according to our recommendations, you can improve your position in search results.

Increased Organic Traffic: Better rankings lead to more visibility and traffic from search engines.

Better User Engagement: Well-structured, readable content keeps visitors on your site longer and reduces bounce rates.

Time Savings: Our tool automates the SEO analysis process, saving you hours of manual work.

Competitive Advantage: Stay ahead of competitors by creating content that meets and exceeds current SEO best practices.

Consistent Quality: Maintain a high standard across all your blog content with our standardized recommendations.

Educational Value: Learn SEO best practices as you use our tool, improving your content creation skills over time.
`

        toolFAQs = `
## Frequently Asked Questions About Our Blog Post SEO Optimizer

How does your Blog Post SEO Optimizer differ from other SEO tools?
Our tool focuses specifically on blog content optimization rather than general website SEO. This specialized focus allows us to provide deeper insights and more targeted recommendations for blog posts, articles, and similar content types.

Do I need technical SEO knowledge to use this tool?
No, our tool is designed to be user-friendly and accessible to beginners while still providing advanced features for SEO experts. The interface guides you through the optimization process with clear explanations and actionable recommendations.

How often should I use the Blog Post SEO Optimizer?
For best results, we recommend using the tool during the content creation process and again before publishing. You can also periodically analyze existing content to identify opportunities for improvement, especially for posts that aren't performing as well as expected.

Can this tool guarantee first-page rankings?
While no tool can guarantee specific rankings due to the complex nature of search algorithms, our Blog Post SEO Optimizer implements proven SEO best practices that significantly improve your chances of ranking well. Consistent application of our recommendations has helped many users achieve first-page rankings.

Does the tool work for all types of blog content?
Yes, our tool works for various blog content types including how-to guides, listicles, news articles, opinion pieces, and more. The recommendations are adaptable to different content formats while maintaining SEO best practices.

How does the tool stay updated with search engine algorithm changes?
Our team of SEO experts continuously monitors search engine algorithm updates and industry trends. We regularly update our tool to ensure the recommendations align with current best practices and algorithm requirements.

Can I use the tool for content in languages other than English?
Yes, our Blog Post SEO Optimizer supports multiple languages and provides language-specific recommendations for readability and keyword optimization.
`
        break

      case "keyword":
        toolSpecificContent = `
## How Our Keyword Research Tool Works

Our Keyword Research Tool leverages comprehensive search data to help you discover the most valuable keywords for your content. Here's how it works:

Keyword Discovery: We analyze your topic to identify relevant keywords with high search volume and reasonable competition. Our database contains millions of keywords across various industries and niches.

Trend Analysis: We show you which keywords are growing in popularity so you can stay ahead of trends. Our tool tracks keyword performance over time to identify seasonal patterns and emerging opportunities.

Competition Assessment: We evaluate how difficult it would be to rank for each keyword. Our tool analyzes the strength of current top-ranking pages to give you a realistic picture of the competition.

Content Suggestions: We provide ideas for content that could rank well for your target keywords. Our tool identifies content gaps and opportunities based on search intent analysis.

Search Intent Analysis: We categorize keywords based on user intent (informational, navigational, commercial, or transactional) to help you create content that matches what users are looking for.

Long-tail Keyword Identification: We uncover valuable long-tail keywords that have less competition but still drive targeted traffic to your site.
`

        toolFeatures = `
## Key Features of Our ${title}

Our tool comes packed with features designed to give you a competitive edge:

Comprehensive Keyword Database: Access millions of keywords across various industries and niches.

Advanced Filtering Options: Narrow down keywords by search volume, competition, CPC, and more.

Competitor Keyword Analysis: Discover which keywords your competitors are ranking for.

Keyword Grouping: Organize keywords into logical groups for better content planning.

SERP Analysis: See what types of content are currently ranking for your target keywords.

Keyword Difficulty Scoring: Understand how challenging it will be to rank for specific terms.

Trend Visualization: Track keyword popularity over time with intuitive graphs.

Export Capabilities: Download your keyword research in various formats for further analysis.
`

        toolBenefits = `
## Benefits of Using Our ${title}

Implementing our tool in your SEO strategy offers numerous advantages:

Discover Untapped Opportunities: Find valuable keywords your competitors might be missing.

Save Time: Automate the keyword research process instead of manually searching for ideas.

Create More Effective Content: Target keywords that align with user intent and have reasonable competition.

Improve ROI: Focus your SEO efforts on keywords with the best potential return.

Stay Ahead of Trends: Identify emerging keywords before they become highly competitive.

Build a Strategic Content Calendar: Plan your content around keywords grouped by topic and intent.

Make Data-Driven Decisions: Base your SEO strategy on actual search data rather than assumptions.
`

        toolFAQs = `
## Frequently Asked Questions About Our Keyword Research Tool

How accurate is the search volume data in your tool?
Our search volume data is sourced from multiple reliable providers and is updated monthly to ensure accuracy. We use a combination of API data from search engines and our own proprietary data collection methods to provide the most accurate estimates possible.

How does your Keyword Research Tool compare to Google Keyword Planner?
While Google Keyword Planner is designed primarily for PPC advertising, our tool is specifically optimized for SEO purposes. We provide more detailed competition metrics for organic search, long-tail keyword suggestions, and content recommendations that Google Keyword Planner doesn't offer.

How many keywords can I research at once?
Our standard plan allows you to research up to 100 seed keywords per day, generating thousands of keyword suggestions. Higher-tier plans offer increased limits for more extensive research needs.

Can I track keyword positions with this tool?
While our Keyword Research Tool focuses on discovery and analysis, we do offer keyword position tracking as part of our comprehensive SEO suite. You can easily transfer keywords from your research to the tracking tool.

How often is the keyword database updated?
Our keyword database is updated monthly with fresh search volume data. New keywords are added to the database continuously as they emerge in search engines.

Can I use this tool for local SEO keyword research?
Yes, our tool supports location-based keyword research. You can specify countries, regions, or cities to get location-specific keyword data for your local SEO campaigns.

Does the tool provide keyword suggestions for YouTube or Amazon?
Yes, our advanced plans include specialized keyword research for platforms like YouTube, Amazon, and other major search engines beyond Google.
`
        break

      case "meta":
        toolSpecificContent = `
## How Our Meta Tag Generator Works

Our Meta Tag Generator creates optimized meta titles and descriptions that improve click-through rates from search results. Here's how it works:

Content Analysis: We analyze your page content to understand its primary purpose and target keywords. Our tool scans your content to identify the most relevant themes and topics.

Title Optimization: We generate compelling title tags that include your keywords while maintaining ideal length. Our tool ensures titles are between 50-60 characters to prevent truncation in search results.

Description Creation: We craft meta descriptions that encourage clicks while accurately representing your content. Our descriptions are optimized to be between 150-160 characters and include a clear call to action.

Preview Simulation: We show you how your meta tags will appear in search results. This preview helps you visualize how users will see your page in search engines.

Keyword Placement: We strategically place your target keywords in both title and description for maximum SEO impact while maintaining natural readability.

Click-Through Rate Optimization: We incorporate psychological triggers and persuasive elements to increase the likelihood of users clicking on your result.
`

        toolFeatures = `
## Key Features of Our ${title}

Our tool comes packed with features designed to give you a competitive edge:

AI-Powered Suggestions: Get intelligent meta tag recommendations based on your content.

Real-time SERP Preview: See exactly how your meta tags will appear in search results.

Character Counter: Ensure your meta tags stay within optimal length limits.

Keyword Density Analysis: Check that your keywords are properly represented without overstuffing.

Multiple Variation Generator: Create several options to test different approaches.

Emotional Trigger Words: Access a library of words proven to increase click-through rates.

Bulk Generation: Create meta tags for multiple pages simultaneously.

Historical Performance Data: Learn from your past meta tag performance.
`

        toolBenefits = `
## Benefits of Using Our ${title}

Implementing our tool in your SEO strategy offers numerous advantages:

Increased Click-Through Rates: Well-crafted meta tags can significantly improve how many users click on your search result.

Better First Impressions: Create a compelling first touchpoint with potential visitors.

Improved Search Rankings: Properly optimized meta tags can contribute to better positioning in search results.

Time Savings: Generate effective meta tags in seconds rather than spending hours crafting them manually.

Consistency: Maintain a consistent approach to meta tags across your entire website.

Reduced Bounce Rates: When meta tags accurately represent your content, visitors are more likely to stay on your site.

Competitive Edge: Stand out from competitors with more compelling search listings.
`

        toolFAQs = `
## Frequently Asked Questions About Our Meta Tag Generator

How important are meta tags for SEO?
While meta tags aren't the strongest ranking factor, they play a crucial role in your overall SEO strategy. Well-optimized meta titles and descriptions can improve click-through rates from search results, indirectly benefiting your rankings through user engagement signals.

Do search engines always use the meta description I provide?
Not always. Search engines like Google may generate their own snippets based on the query and your page content. However, providing a well-crafted meta description increases the chances of it being used and helps ensure your page is represented accurately.

How often should I update my meta tags?
We recommend reviewing your meta tags quarterly or whenever you make significant changes to your page content. You should also update meta tags for pages that have low click-through rates in search results.

Can I use the same meta description for multiple pages?
We strongly advise against using duplicate meta descriptions. Each page should have unique meta tags that accurately represent that specific page's content. Duplicate meta descriptions can confuse search engines and users.

Should I include my brand name in every meta title?
For most websites, including your brand name in meta titles is recommended, typically at the end separated by a pipe symbol (|) or dash (-). However, for very long titles or when targeting highly competitive keywords, you might prioritize keyword space over branding.

How does your tool handle special characters in meta tags?
Our Meta Tag Generator properly encodes special characters to ensure they display correctly in search results. We also alert you if you're using characters that might cause display issues in certain search engines.

Can I generate meta tags for social media sharing?
Yes, our advanced features include generation of Open Graph and Twitter Card meta tags to optimize how your content appears when shared on social media platforms.
`
        break

      case "local":
        toolSpecificContent = `
## How Our Local SEO Assistant Works

Our Local SEO Assistant helps businesses improve their visibility in local search results. Here's how it works:

Local Keyword Analysis: We identify location-specific keywords that potential customers are searching for. Our tool analyzes search patterns in your specific geographic area to find the most valuable local terms.

Google Business Profile Optimization: We provide recommendations to improve your Google Business listing. Our tool analyzes your current profile and suggests improvements for categories, attributes, photos, and other elements.

Citation Opportunities: We identify directories and platforms where your business should be listed. Our database includes industry-specific and location-specific citation sources to build your local presence.

Local Content Suggestions: We recommend content topics that resonate with local audiences. Our tool identifies local events, news, and trends that you can leverage in your content strategy.

Competitor Analysis: We analyze top-performing local businesses in your category to identify strategies you can adapt for your own business.

Review Management: We help you monitor and respond to customer reviews across multiple platforms, improving your local reputation.
`

        toolFeatures = `
## Key Features of Our ${title}

Our tool comes packed with features designed to give you a competitive edge:

Local Keyword Finder: Discover the exact terms local customers use to find businesses like yours.

Google Business Profile Audit: Get a comprehensive analysis of your GBP listing with actionable improvements.

Citation Tracker: Monitor your business listings across the web for consistency and completeness.

Review Monitoring: Track customer reviews across multiple platforms in one dashboard.

Local Competitor Analysis: See what's working for successful businesses in your area.

Local Ranking Tracker: Monitor your positions for local search terms over time.

Local Link Opportunities: Discover potential local link building partnerships.

Local Schema Generator: Create location-specific structured data for your website.
`

        toolBenefits = `
## Benefits of Using Our ${title}

Implementing our tool in your local SEO strategy offers numerous advantages:

Increased Local Visibility: Appear more prominently in local search results and map listings.

More Foot Traffic: Drive more local customers to your physical location.

Higher Quality Leads: Attract customers who are specifically looking for businesses in your area.

Improved Reputation: Better manage and leverage customer reviews to build trust.

Competitive Advantage: Stand out from other local businesses with a stronger online presence.

Consistent NAP Data: Ensure your Name, Address, and Phone number are consistent across the web.

Better Local Engagement: Connect more effectively with your community through targeted content.
`

        toolFAQs = `
## Frequently Asked Questions About Our Local SEO Assistant

How long does it take to see results from local SEO efforts?
Most businesses begin to see improvements in local visibility within 1-3 months of implementing our recommendations. However, competitive markets may take longer, and ongoing optimization is necessary to maintain and improve results over time.

Is Google Business Profile optimization really that important?
Absolutely. For local businesses, your Google Business Profile is often the first point of contact with potential customers. Our data shows that a well-optimized GBP can increase website clicks by up to 35% and direction requests by up to 60%.

How does your tool handle businesses with multiple locations?
Our Local SEO Assistant includes special features for multi-location businesses. You can manage all locations from a single dashboard while creating location-specific optimizations for each branch or store.

What types of businesses benefit most from local SEO?
While all businesses with physical locations can benefit from local SEO, service-area businesses (like plumbers, electricians, etc.), retail stores, restaurants, medical practices, and professional services typically see the highest return on investment.

How does your tool help with review management?
Our tool aggregates reviews from multiple platforms (Google, Yelp, Facebook, industry-specific sites) into a single dashboard. You'll receive alerts for new reviews, sentiment analysis, and response suggestions to help manage your online reputation effectively.

Does the tool help with local link building?
Yes, our Local SEO Assistant identifies potential local link opportunities including local business associations, community events, sponsorship opportunities, and local publications that accept guest content.

How does local SEO differ from regular SEO?
Local SEO focuses specifically on optimizing for location-based searches and includes strategies like Google Business Profile optimization, local citation building, and location-specific content. Our tool is specifically designed to address these unique local ranking factors.
`
        break

      case "ecommerce":
        toolSpecificContent = `
## How Our E-commerce SEO Tool Works

Our E-commerce SEO Tool is specifically designed to optimize online stores and product pages. Here's how it works:

Product Page Analysis: We evaluate your product pages for SEO best practices and conversion optimization. Our tool checks for proper keyword usage, image optimization, schema markup, and user experience elements.

Category Structure Recommendations: We suggest how to organize your product categories for better SEO. Our tool analyzes your current structure and recommends improvements based on search patterns and user behavior.

Product Description Enhancement: We provide guidelines for creating product descriptions that rank and sell. Our tool identifies opportunities to improve descriptions with better keyword usage, unique selling points, and persuasive elements.

Technical SEO Checks: We identify technical issues that could be affecting your store's performance. Our tool scans for problems like duplicate content, slow loading times, mobile usability issues, and crawlability obstacles.

Competitive Product Analysis: We compare your product pages to top-ranking competitors to identify opportunities for improvement and differentiation.

Internal Linking Optimization: We suggest internal linking strategies to distribute page authority and guide customers through your product catalog effectively.
`

        toolFeatures = `
## Key Features of Our ${title}

Our tool comes packed with features designed to give you a competitive edge:

Product SEO Scorer: Get detailed SEO scores for individual product pages with specific improvement recommendations.

Category Optimization: Receive suggestions for category page structure, content, and filters.

Product Schema Generator: Create rich product schema markup to enhance your search listings.

Duplicate Content Detector: Identify and resolve duplicate product descriptions and content.

Image SEO Optimizer: Improve product image optimization for better visibility in image search.

Conversion Element Checker: Ensure your product pages include elements proven to increase conversions.

Mobile Commerce Analyzer: Verify your store provides an optimal experience for mobile shoppers.

Inventory SEO Manager: Handle out-of-stock products and seasonal items in an SEO-friendly way.
`

        toolBenefits = `
## Benefits of Using Our ${title}

Implementing our tool in your e-commerce strategy offers numerous advantages:

Higher Product Visibility: Get more of your products appearing in relevant search results.

Increased Organic Traffic: Drive more potential customers to your store without paying for ads.

Better Conversion Rates: Optimize product pages not just for rankings but for converting visitors to customers.

Reduced Bounce Rates: Create more engaging product and category pages that keep shoppers on your site.

Competitive Advantage: Stand out in crowded e-commerce markets with better-optimized product listings.

Improved User Experience: Create a shopping experience that satisfies both search engines and customers.

Higher Average Order Value: Use internal linking and related product strategies to increase cart sizes.
`

        toolFAQs = `
## Frequently Asked Questions About Our E-commerce SEO Tool

How is e-commerce SEO different from regular SEO?
E-commerce SEO involves unique challenges like optimizing product pages at scale, handling faceted navigation, managing out-of-stock products, and implementing product schema markup. Our tool is specifically designed to address these e-commerce-specific challenges.

Can your tool help with Amazon SEO as well as my own website?
Yes, our premium plans include Amazon-specific SEO recommendations to help your products rank better on Amazon's marketplace in addition to optimizing your own e-commerce store.

How does your tool handle large e-commerce sites with thousands of products?
Our E-commerce SEO Tool is built to scale with bulk analysis capabilities, prioritization features to identify which products need attention first, and templated recommendations that can be applied across similar product types.

Does the tool help with product review SEO?
Absolutely. Our tool provides recommendations for implementing and optimizing product reviews in an SEO-friendly way, including review schema markup and strategies to encourage more customer reviews.

How often should I update my product pages for SEO?
We recommend reviewing your top-selling products monthly and conducting a full catalog review quarterly. Our tool helps identify which products need immediate attention based on performance metrics.

Can your tool help with international e-commerce SEO?
Yes, our advanced features include support for international e-commerce with hreflang implementation, currency and measurement unit handling, and region-specific optimization recommendations.

How does your tool address seasonal product SEO?
Our E-commerce SEO Tool includes special features for managing seasonal products, including recommendations for maintaining SEO value during off-seasons and strategies for ramping up visibility before peak seasons.
`
        break

      default:
        toolSpecificContent = `
## How Our SEO Content Generator Works

Our SEO Content Generator creates optimized content based on your specific requirements. Here's how it works:

Topic Analysis: We analyze your topic to understand its scope, audience, and search intent. Our tool researches related keywords, questions, and concepts to ensure comprehensive coverage.

Keyword Research: We identify relevant keywords that can help your content rank higher. Our tool suggests primary and secondary keywords with optimal search volume and competition levels.

Content Structure: We suggest an optimal structure for your content to improve readability and SEO. Our tool creates outlines with headings, subheadings, and key points to cover.

Optimization Recommendations: We provide specific suggestions to enhance your content's search visibility. Our tool checks for keyword placement, density, related terms, and other on-page SEO factors.

Readability Enhancement: We ensure your content is accessible and engaging for your target audience with readability scoring and improvement suggestions.

Competitive Analysis: We analyze top-ranking content for your target keywords to identify gaps and opportunities in your content strategy.
`

        toolFeatures = `
## Key Features of Our ${title}

Our tool comes packed with features designed to give you a competitive edge:

AI-Powered Content Generation: Create SEO-optimized content drafts with a single click.

Keyword Integration: Seamlessly incorporate target keywords in natural, reader-friendly ways.

Content Templates: Access industry-specific templates for different content types.

SEO Scoring: Get instant feedback on your content's search optimization.

Readability Analysis: Ensure your content is accessible to your target audience.

Topic Research: Discover related topics and questions to cover in your content.

Competitor Content Analysis: See what's working for top-ranking pages in your niche.

Content Brief Generator: Create comprehensive briefs for your writing team.
`

        toolBenefits = `
## Benefits of Using Our ${title}

Implementing our tool in your content strategy offers numerous advantages:

Higher Search Rankings: Create content specifically designed to rank well in search engines.

Content Creation Efficiency: Reduce the time and effort required to produce SEO-optimized content.

Improved Content Quality: Ensure your content is comprehensive, relevant, and valuable to readers.

Consistent SEO Approach: Maintain consistent optimization across all your content.

Reduced Research Time: Access keyword and topic research in one integrated platform.

Better Content ROI: Create content with a higher likelihood of driving organic traffic and conversions.

Competitive Content Edge: Identify and fill gaps that your competitors have missed.
`

        toolFAQs = `
## Frequently Asked Questions About Our SEO Content Generator

Does your tool write complete articles automatically?
Our tool provides detailed outlines, suggested headings, key points to cover, and even draft paragraphs. While it significantly accelerates the content creation process, we recommend human review and editing to ensure the content matches your brand voice and provides unique value.

How does your content generator avoid AI detection?
Our SEO Content Generator creates content frameworks and suggestions rather than fully AI-generated text. This approach ensures your content remains unique and human-like while still benefiting from AI-powered optimization recommendations.

Can I use this tool for different types of content?
Yes, our tool supports various content types including blog posts, product descriptions, landing pages, FAQs, and more. Each content type has specialized templates and optimization recommendations.

How does your tool stay updated with Google's helpful content guidelines?
Our team continuously monitors Google's guidelines and algorithm updates. We regularly refine our content recommendations to ensure they align with the latest emphasis on helpful, people-first content while maintaining strong SEO fundamentals.

Can I integrate this tool with my content management system?
Yes, we offer integrations with popular CMS platforms including WordPress, Shopify, and Webflow. These integrations allow you to optimize content directly within your publishing workflow.

Does the tool help with content for different industries?
Absolutely. Our SEO Content Generator includes industry-specific templates and recommendations for sectors including healthcare, finance, technology, e-commerce, education, and many more.

How does your tool handle different content lengths?
Our tool provides optimization recommendations based on the ideal content length for your specific topic and keyword. We analyze top-ranking content to determine appropriate length ranges and depth of coverage needed.
`
    }

    // Combine all sections
    return `${commonIntro}${toolSpecificContent}${toolFeatures}${toolBenefits}${toolFAQs}`
  }

  return (
    <div className="max-w-4xl mx-auto py-8" style={{ fontFamily: safeBranding.fontFamily }}>
      {!content && !loading && !error && (
        <div className="text-left" style={{ color: safeBranding.primaryColor }}>
          Preparing SEO content for your tool...
        </div>
      )}

      {loading && (
        <div className="text-center py-16">
          <div className={`${getCardStyle()} p-8 flex flex-col items-center`}>
            <div className="relative">
              <div className="absolute inset-0 bg-black rounded-full transform translate-x-1 translate-y-1"></div>
              <div
                className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center`}
                style={{ backgroundColor: safeBranding.accentColor }}
              >
                <RefreshCw className="h-8 w-8 animate-spin" style={{ color: safeBranding.primaryColor }} />
              </div>
            </div>
            <p className="mt-6 text-xl font-medium" style={{ color: safeBranding.primaryColor }}>
              Generating SEO content...
            </p>
            <p className="text-sm mt-2" style={{ color: safeBranding.cardStyle === "dark" ? "white" : "black" }}>
              Creating content based on your "{toolConfig.originalPrompt || "SEO tool"}" request
            </p>
          </div>
        </div>
      )}

      {error && (
        <div className={`${getCardStyle()} text-left p-4 border border-red-200 rounded-lg`}>
          <span style={{ color: safeBranding.cardStyle === "dark" ? "white" : "red" }}>{error}</span>
        </div>
      )}

      {content && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          {/* Tool Header */}
          <div className={`${getCardStyle()} p-6 mb-8 relative`}>
            {/* Black background for 3D effect if using certain templates */}
            {safeBranding.template === "modern" ||
            safeBranding.template === "playful" ||
            safeBranding.template === "vintage" ? (
              <div className="absolute inset-0 bg-black rounded-lg transform translate-x-2 translate-y-2 -z-10"></div>
            ) : null}

            <div className="flex items-center mb-4">
              <div
                className={`w-12 h-12 ${safeBranding.borderRadius} flex items-center justify-center mr-3`}
                style={{
                  backgroundColor: safeBranding.accentColor,
                  color: safeBranding.primaryColor,
                  border: safeBranding.template === "vintage" ? `2px solid ${safeBranding.primaryColor}` : "none",
                }}
              >
                {getToolIcon()}
              </div>
              <h1
                className="text-2xl font-bold"
                style={{ color: safeBranding.cardStyle === "dark" ? "white" : safeBranding.primaryColor }}
              >
                {toolConfig.title}
              </h1>
            </div>
            <p
              style={{ color: safeBranding.cardStyle === "dark" ? "rgba(255,255,255,0.8)" : "black" }}
              className="mb-4"
            >
              {toolConfig.description}
            </p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={copyToClipboard}
                className={`flex items-center justify-center p-2 ${safeBranding.borderRadius} hover:bg-opacity-10 transition-colors`}
                style={{
                  backgroundColor: "transparent",
                  color: safeBranding.cardStyle === "dark" ? "white" : safeBranding.primaryColor,
                  border: safeBranding.buttonStyle === "outline" ? `2px solid ${safeBranding.primaryColor}` : "none",
                }}
                aria-label="Copy to clipboard"
              >
                {copied ? <CheckCircle className="h-5 w-5 mr-2" /> : <Copy className="h-5 w-5 mr-2" />}
                <span className="font-medium">{copied ? "Copied!" : "Copy"}</span>
              </button>
              <button
                onClick={downloadContent}
                className={`flex items-center justify-center p-2 ${safeBranding.borderRadius} hover:bg-opacity-10 transition-colors`}
                style={{
                  backgroundColor: "transparent",
                  color: safeBranding.cardStyle === "dark" ? "white" : safeBranding.primaryColor,
                  border: safeBranding.buttonStyle === "outline" ? `2px solid ${safeBranding.primaryColor}` : "none",
                }}
                aria-label="Download content"
              >
                <Download className="h-5 w-5 mr-2" />
                <span className="font-medium">Download</span>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className={`${getCardStyle()} p-6 mb-8`}>
            {/* Black background for 3D effect if using certain templates */}
            {safeBranding.template === "modern" ||
            safeBranding.template === "playful" ||
            safeBranding.template === "vintage" ? (
              <div className="absolute inset-0 bg-black rounded-lg transform translate-x-2 translate-y-2 -z-10"></div>
            ) : null}

            <div
              className="prose max-w-none text-left"
              dangerouslySetInnerHTML={{ __html: formatContentForDisplay(content) }}
            />
          </div>

          {/* Tool-specific call to action */}
          <div className={`${getCardStyle()} p-6 relative`}>
            {/* Black background for 3D effect if using certain templates */}
            {safeBranding.template === "modern" ||
            safeBranding.template === "playful" ||
            safeBranding.template === "vintage" ? (
              <div className="absolute inset-0 bg-black rounded-lg transform translate-x-2 translate-y-2 -z-10"></div>
            ) : null}

            <h3
              className="text-xl font-bold mb-3"
              style={{ color: safeBranding.cardStyle === "dark" ? "white" : safeBranding.primaryColor }}
            >
              Ready to optimize your content?
            </h3>
            <p
              className="mb-4"
              style={{ color: safeBranding.cardStyle === "dark" ? "rgba(255,255,255,0.8)" : "black" }}
            >
              Start using our {toolConfig.title} today and see the difference it can make for your website's visibility
              and traffic.
            </p>
            <button
              className={`px-6 py-3 ${safeBranding.borderRadius} font-medium flex items-center`}
              style={{
                backgroundColor: safeBranding.buttonStyle === "outline" ? "transparent" : safeBranding.primaryColor,
                color: safeBranding.buttonStyle === "outline" ? safeBranding.primaryColor : "white",
                border: safeBranding.buttonStyle === "outline" ? `2px solid ${safeBranding.primaryColor}` : "none",
                borderBottom:
                  safeBranding.buttonStyle === "classic" ? `4px solid ${safeBranding.secondaryColor}` : undefined,
                boxShadow: safeBranding.buttonStyle === "neon" ? "0 0 10px rgba(0,0,0,0.3)" : "none",
                background:
                  safeBranding.buttonStyle === "gradient"
                    ? `linear-gradient(to right, ${safeBranding.primaryColor}, ${safeBranding.secondaryColor})`
                    : undefined,
              }}
            >
              Get Started Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </motion.div>
      )}
    </div>
  )
}
