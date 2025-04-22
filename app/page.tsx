"use client"

import { useState, useRef } from "react"
import {
  ArrowRight,
  CheckCircle,
  FileText,
  Share2,
  Sparkles,
  Menu,
  X,
  Star,
  Settings,
  Download,
  ArrowUpRight,
  ExternalLink,
  Clock,
  Award,
  Layers,
  PenTool,
  BarChart,
  Puzzle,
  Inbox,
  Palette,
  Play,
  ChevronRight,
  MousePointer,
  Zap,
} from "lucide-react"
import Image from "next/image"

// Add at the top of the file
import { Poppins } from "next/font/google"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
})

export default function Page() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const toggleVideo = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play()
        setIsPlaying(true)
      } else {
        videoRef.current.pause()
        setIsPlaying(false)
      }
    }
  }

  return (
    <div className={`min-h-screen bg-[#FFF8E1] overflow-hidden relative ${poppins.variable} font-['Poppins']`}>
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-[800px] h-[800px] border border-dashed border-[#FFB74D]/30 rounded-full"></div>
        <div className="absolute bottom-[10%] right-[5%] w-[600px] h-[600px] border border-dashed border-[#FFB74D]/30 rounded-full"></div>
        <div className="absolute -bottom-[300px] -left-[300px] w-[600px] h-[600px] bg-[#4DB6AC]/20 rounded-full blur-3xl"></div>
        <div className="absolute -top-[200px] -right-[200px] w-[500px] h-[500px] bg-[#FF8A65]/20 rounded-full blur-3xl"></div>

        {/* Additional decorative shapes */}
        <div className="absolute top-[30%] right-[15%] w-[100px] h-[100px] bg-[#FFEB3B]/30 rounded-blob rotate-12"></div>
        <div className="absolute top-[60%] left-[20%] w-[150px] h-[150px] bg-[#FF7043]/20 rounded-blob -rotate-12"></div>
        <div className="absolute bottom-[20%] left-[40%] w-[80px] h-[80px] bg-[#26A69A]/30 rounded-blob rotate-45"></div>
        <div className="absolute top-[15%] left-[30%] w-[60px] h-[60px] bg-[#FFC107]/40 rounded-blob -rotate-12"></div>
        <div className="absolute bottom-[40%] right-[25%] w-[200px] h-[200px]">
          <Image
            src="/images/orange-blob.png"
            alt="Decorative blob"
            width={200}
            height={200}
            className="w-full h-auto"
          />
        </div>

        {/* Floating dots */}
        <div className="absolute top-[25%] right-[25%] w-4 h-4 bg-[#FF7043] rounded-full"></div>
        <div className="absolute top-[45%] left-[15%] w-3 h-3 bg-[#26A69A] rounded-full"></div>
        <div className="absolute bottom-[35%] right-[35%] w-5 h-5 bg-[#FFEB3B] rounded-full"></div>
        <div className="absolute top-[65%] right-[10%] w-2 h-2 bg-[#FF7043] rounded-full"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-gray-900">FormCraft</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-900 hover:text-gray-700 text-sm font-medium">
                Features
              </a>
              <a href="#how-it-works" className="text-gray-900 hover:text-gray-700 text-sm font-medium">
                How it works
              </a>
              <a href="#pricing" className="text-gray-900 hover:text-gray-700 text-sm font-medium">
                Pricing
              </a>
              <button className="bg-[#FFEB3B] text-gray-900 px-4 py-2 rounded-md hover:bg-[#FDD835] transition-colors text-sm font-medium shadow-sm border-2 border-black">
                Log In
              </button>
              <button className="bg-[#26A69A] text-white px-4 py-2 rounded-md hover:bg-[#00897B] transition-colors text-sm font-medium shadow-sm border-2 border-black">
                Sign Up
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-gray-900">
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-gray-100 mt-2">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#features" className="block px-3 py-2 text-gray-900 hover:bg-gray-50 rounded-md text-sm">
                Features
              </a>
              <a href="#how-it-works" className="block px-3 py-2 text-gray-900 hover:bg-gray-50 rounded-md text-sm">
                How it works
              </a>
              <a href="#pricing" className="block px-3 py-2 text-gray-900 hover:bg-gray-50 rounded-md text-sm">
                Pricing
              </a>
              <button className="w-full text-left px-3 py-2 bg-[#FFEB3B] text-gray-900 rounded-md hover:bg-[#FDD835] transition-colors text-sm border-2 border-black">
                Log In
              </button>
              <button className="w-full text-left px-3 py-2 bg-[#26A69A] text-white rounded-md hover:bg-[#00897B] transition-colors text-sm mt-2 border-2 border-black">
                Sign Up
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-16 pb-24 bg-[#FFEB3B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
            <div className="lg:w-1/2">
              <div className="inline-flex items-center px-3 py-1 bg-white rounded-full mb-6 sm:mb-8 border-2 border-black">
                <Star className="h-4 w-4 text-[#FFC107] mr-1" />
                <span className="text-xs font-semibold text-gray-800 mr-1">Rated 4.9</span>
                <span className="text-xs text-gray-600">on Capterra</span>
                <ArrowRight className="h-3 w-3 text-gray-400 ml-1" />
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 sm:mb-8 leading-tight">
                The most affordable <br />
                <span className="text-[#FF7043]">Typeform</span> <br />
                alternative
              </h1>

              <p className="text-base sm:text-lg text-gray-700 mb-8 sm:mb-10 max-w-lg">
                FormCraft is a form builder that provides UNLIMITED forms and responses for FREE. You can add logic,
                custom domains, embed forms on your website, and much more 😎
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8 sm:mb-10">
                <div className="relative">
                  {/* Black background for 3D effect */}
                  <div className="absolute inset-0 bg-black rounded-md transform translate-x-1 translate-y-1"></div>
                  <button className="relative z-10 bg-[#FF7043] text-white px-6 sm:px-8 py-3 rounded-md hover:bg-[#F4511E] transition-colors text-base font-medium shadow-md w-full sm:w-auto border-2 border-black">
                    Create free account
                  </button>
                </div>
                <a
                  href="#how-it-works"
                  className="flex items-center justify-center text-gray-900 hover:text-gray-700 px-4 py-3 border-2 border-black rounded-md bg-white"
                >
                  Have a Typeform? <span className="underline ml-1">Import it now</span>
                </a>
              </div>

              <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                <div className="flex items-center bg-white px-3 py-1 rounded-full border-2 border-black">
                  <CheckCircle className="h-5 w-5 text-[#4CAF50] mr-2" />
                  <span className="text-sm text-gray-700">Unlimited forms</span>
                </div>
                <div className="flex items-center bg-white px-3 py-1 rounded-full border-2 border-black">
                  <CheckCircle className="h-5 w-5 text-[#4CAF50] mr-2" />
                  <span className="text-sm text-gray-700">No credit card required</span>
                </div>
                <div className="flex items-center bg-white px-3 py-1 rounded-full border-2 border-black">
                  <CheckCircle className="h-5 w-5 text-[#4CAF50] mr-2" />
                  <span className="text-sm text-gray-700">Cancel anytime</span>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2 relative mt-10 lg:mt-0">
              <div className="absolute -top-10 -right-10 w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] bg-[#FF7043]/20 rounded-blob z-0"></div>

              <div className="relative z-10">
                {/* Black background for 3D effect */}
                <div className="absolute inset-0 bg-black rounded-xl transform translate-x-3 translate-y-3"></div>
                <div className="relative z-10 bg-white p-4 sm:p-6 rounded-xl shadow-lg border-4 border-black transform rotate-1">
                  <div className="aspect-video relative rounded-lg overflow-hidden border-2 border-black">
                    <Image
                      src="/images/form-builder-interface.png"
                      alt="Form Builder Interface"
                      fill
                      className="object-cover"
                    />

                    {/* Interactive elements overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent flex items-end justify-center p-4">
                      <div className="bg-white/90 px-4 py-2 rounded-full border-2 border-black flex items-center">
                        <MousePointer className="h-4 w-4 text-[#FF7043] mr-2" />
                        <span className="text-sm font-medium">Interactive Builder</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-center text-xs sm:text-sm text-gray-500 mt-2 sm:mt-3 flex items-center justify-center">
                    <span className="mr-1">Try it now</span>
                    <ArrowUpRight className="h-2 w-2 sm:h-3 sm:w-3" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Replace wavy border with image */}
        <div className="absolute bottom-0 left-0 right-0">
          <Image src="/images/yellow-wave.png" alt="Wave divider" width={1440} height={100} className="w-full h-auto" />
        </div>
      </section>

      {/* Video Section */}
      <section className="relative z-10 py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 bg-[#FFF3E0] text-[#FF7043] rounded-full text-sm font-medium mb-4 border-2 border-black">
              See It In Action
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Watch How FormCraft Works</h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              See how easy it is to create beautiful, interactive forms in just minutes with our intuitive builder.
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Black background for 3D effect */}
            <div className="absolute inset-0 bg-black rounded-xl transform translate-x-4 translate-y-4"></div>
            <div className="relative z-10 bg-gray-100 rounded-xl overflow-hidden border-4 border-black">
              <div className="aspect-video relative">
                {/* Video placeholder - replace with actual video */}
                <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                  <Image
                    src="/form-builder-demo-thumbnail.png"
                    alt="FormCraft Demo Video"
                    fill
                    className="object-cover opacity-70"
                  />

                  <div
                    className="absolute inset-0 flex items-center justify-center cursor-pointer"
                    onClick={toggleVideo}
                  >
                    <div className="relative">
                      {/* Black background for 3D effect */}
                      <div className="absolute inset-0 bg-black rounded-full transform translate-x-2 translate-y-2"></div>
                      <div className="relative z-10 w-20 h-20 bg-[#FF7043] rounded-full flex items-center justify-center border-2 border-black">
                        <Play className="h-8 w-8 text-white" fill="white" />
                      </div>
                    </div>
                  </div>

                  <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover hidden" controls>
                    <source src="/video-placeholder.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>

              <div className="bg-white p-4 border-t-4 border-black">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">Create Your First Form in 2 Minutes</h3>
                    <p className="text-gray-600 text-sm">Learn how to build, customize, and share your form</p>
                  </div>
                  <a
                    href="#how-it-works"
                    className="mt-3 sm:mt-0 inline-flex items-center text-[#FF7043] font-medium hover:underline"
                  >
                    Try it yourself <ChevronRight className="ml-1 h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-6">
            <div className="flex items-center bg-[#E0F7FA] px-4 py-2 rounded-full border-2 border-black">
              <Zap className="h-5 w-5 text-[#00897B] mr-2" />
              <span className="text-sm font-medium">No coding required</span>
            </div>
            <div className="flex items-center bg-[#FFF3E0] px-4 py-2 rounded-full border-2 border-black">
              <Clock className="h-5 w-5 text-[#FF7043] mr-2" />
              <span className="text-sm font-medium">Build in minutes, not hours</span>
            </div>
            <div className="flex items-center bg-[#E8F5E9] px-4 py-2 rounded-full border-2 border-black">
              <Award className="h-5 w-5 text-[#43A047] mr-2" />
              <span className="text-sm font-medium">Professional results</span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="relative z-10 py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="inline-block px-3 py-1 bg-[#E0F7FA] text-[#00897B] rounded-full text-sm font-medium mb-4 border-2 border-black">
              Simple Process
            </span>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">How FormCraft Works</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Our form builder makes it easy to create beautiful forms in just three simple steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20 relative">
            {/* Connecting line */}
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -translate-y-1/2 hidden md:block"></div>

            {/* Step 1 */}
            <div className="relative">
              {/* Black background for 3D effect */}
              <div className="absolute inset-0 bg-black transform translate-x-6 translate-y-6"></div>
              <div className="bg-white p-6 border-4 border-black relative z-10 h-full flex flex-col aspect-square">
                <div className="w-16 h-16 bg-[#E3F2FD] flex items-center justify-center mb-4 border-2 border-black">
                  <PenTool className="h-8 w-8 text-[#1E88E5]" />
                </div>
                <div className="w-10 h-10 bg-[#FF7043] rounded-full flex items-center justify-center absolute -top-5 -left-5 border-2 border-black">
                  <span className="text-white font-bold text-lg">1</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Create Your Form</h3>
                <p className="text-gray-700 mb-4">
                  Start with a template or build from scratch with our intuitive drag-and-drop builder.
                </p>
                <ul className="space-y-2 text-sm text-gray-600 mt-auto">
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-[#4CAF50] mr-2 mt-0.5 flex-shrink-0" />
                    <span>500+ templates</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-[#4CAF50] mr-2 mt-0.5 flex-shrink-0" />
                    <span>Drag-and-drop interface</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-[#4CAF50] mr-2 mt-0.5 flex-shrink-0" />
                    <span>No coding required</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              {/* Black background for 3D effect */}
              <div className="absolute inset-0 bg-black transform translate-x-6 translate-y-6"></div>
              <div className="bg-white p-6 border-4 border-black relative z-10 h-full flex flex-col aspect-square">
                <div className="w-16 h-16 bg-[#E8F5E9] flex items-center justify-center mb-4 border-2 border-black">
                  <Settings className="h-8 w-8 text-[#43A047]" />
                </div>
                <div className="w-10 h-10 bg-[#FF7043] rounded-full flex items-center justify-center absolute -top-5 -left-5 border-2 border-black">
                  <span className="text-white font-bold text-lg">2</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Customize & Configure</h3>
                <p className="text-gray-700 mb-4">
                  Add your branding, logic jumps, and integrations to make your form powerful.
                </p>
                <ul className="space-y-2 text-sm text-gray-600 mt-auto">
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-[#4CAF50] mr-2 mt-0.5 flex-shrink-0" />
                    <span>Custom branding</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-[#4CAF50] mr-2 mt-0.5 flex-shrink-0" />
                    <span>Conditional logic</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-[#4CAF50] mr-2 mt-0.5 flex-shrink-0" />
                    <span>6000+ integrations</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              {/* Black background for 3D effect */}
              <div className="absolute inset-0 bg-black transform translate-x-6 translate-y-6"></div>
              <div className="bg-white p-6 border-4 border-black relative z-10 h-full flex flex-col aspect-square">
                <div className="w-16 h-16 bg-[#FFF3E0] flex items-center justify-center mb-4 border-2 border-black">
                  <Share2 className="h-8 w-8 text-[#FB8C00]" />
                </div>
                <div className="w-10 h-10 bg-[#FF7043] rounded-full flex items-center justify-center absolute -top-5 -left-5 border-2 border-black">
                  <span className="text-white font-bold text-lg">3</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Share & Analyze</h3>
                <p className="text-gray-700 mb-4">
                  Share your form, collect responses, and analyze results with powerful analytics tools.
                </p>
                <ul className="space-y-2 text-sm text-gray-600 mt-auto">
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-[#4CAF50] mr-2 mt-0.5 flex-shrink-0" />
                    <span>Direct link sharing</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-[#4CAF50] mr-2 mt-0.5 flex-shrink-0" />
                    <span>Real-time responses</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-[#4CAF50] mr-2 mt-0.5 flex-shrink-0" />
                    <span>Visual analytics</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-20 relative">
            {/* Black background for 3D effect */}
            <div className="absolute inset-0 bg-black rounded-lg transform translate-x-4 translate-y-4"></div>
            <div className="bg-white p-6 md:p-10 rounded-lg border-4 border-black relative z-10">
              <div className="flex flex-col md:flex-row items-start gap-8">
                <div className="md:w-1/3">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-[#FF7043] rounded-full flex items-center justify-center mr-4 border-2 border-black">
                      <FileText className="h-6 w-6 text-white" />
                    </div>
                    <h4 className="font-bold text-gray-900 text-2xl">Feedback Form</h4>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h5 className="font-bold text-gray-900 mb-2">Input:</h5>
                      <div className="p-4 bg-gray-50 rounded-md border-2 border-black">
                        <p className="text-gray-700 mb-2">
                          <span className="font-medium">Form type:</span> Presentation feedback
                        </p>
                        <p className="text-gray-700 mb-2">
                          <span className="font-medium">Target audience:</span> Meeting attendees
                        </p>
                        <p className="text-gray-700">
                          <span className="font-medium">Style:</span> Professional
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 text-gray-500 mr-2" />
                        <span className="text-sm text-gray-500">Created in 2 mins</span>
                      </div>
                      <div className="flex items-center">
                        <Award className="h-4 w-4 text-[#FFC107] mr-2" />
                        <span className="text-sm text-gray-500">Premium template</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="md:w-2/3 bg-gray-50 p-6 rounded-lg border-2 border-black">
                  <h5 className="font-bold text-gray-900 mb-4 text-lg">Preview:</h5>
                  <div className="aspect-video relative rounded-lg overflow-hidden border-2 border-black">
                    <Image
                      src="/images/form-builder-interface.png"
                      alt="Form Builder Interface"
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex justify-end mt-6">
                    <button className="bg-[#26A69A] text-white px-4 py-2 rounded-md hover:bg-[#00897B] transition-colors flex items-center border-2 border-black">
                      <Download className="h-4 w-4 mr-2" />
                      Try it yourself
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                  <div className="mb-4 md:mb-0">
                    <h5 className="font-medium text-gray-900 mb-1">Embed this form on your website</h5>
                    <p className="text-sm text-gray-500">Copy and paste this code into your HTML</p>
                  </div>
                  <div className="w-full md:w-auto">
                    <div className="bg-gray-50 p-3 rounded-md border-2 border-black font-mono text-sm text-gray-800 overflow-x-auto max-w-full">
                      &lt;script src="https://formcraft.com/embed/feedback-form.js"&gt;&lt;/script&gt;
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 py-24 bg-[#4DB6AC]">
        {/* Top border of features section */}
        <div className="absolute top-0 left-0 right-0 h-16 bg-white">
          <svg
            viewBox="0 0 1440 100"
            className="absolute bottom-0 left-0 w-full h-16"
            preserveAspectRatio="none"
            style={{ display: "block" }}
          >
            <path
              fill="#4DB6AC"
              stroke="#000000"
              strokeWidth="4"
              d="M0,0 C120,20 240,40 360,40 C480,40 600,20 720,20 C840,20 960,40 1080,40 C1200,40 1320,20 1440,0 L1440,100 L0,100 Z"
            ></path>
          </svg>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          <div className="text-center mb-20">
            <span className="inline-block px-3 py-1 bg-white text-[#00897B] rounded-full text-sm font-medium mb-4 border-2 border-black">
              Powerful Features
            </span>
            <h2 className="text-4xl font-bold text-white mb-6 relative inline-block">
              Features That Make Form Building
              <span className="relative inline-block ml-2">
                <span className="bg-[#FFEB3B] text-gray-900 px-4 py-1 font-bold transform -rotate-3 inline-block border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  Fun Again!
                </span>
              </span>
            </h2>
            <p className="text-xl text-white max-w-3xl mx-auto">
              Our form builder provides all the features you need to create beautiful, interactive forms.
            </p>
          </div>

          {/* Fixed responsive grid for feature cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-6 lg:gap-8">
            {/* Feature Card 1 */}
            <div className="relative">
              {/* Black background for 3D effect */}
              <div className="absolute inset-0 bg-black rounded-lg transform translate-x-4 translate-y-4"></div>
              <div className="bg-white p-6 rounded-lg border-4 border-black relative z-10 transform transition-transform hover:-translate-y-2 h-full flex flex-col">
                <div className="w-16 h-16 bg-[#E3F2FD] rounded-lg flex items-center justify-center mb-4 border-2 border-black">
                  <Layers className="h-8 w-8 text-[#1E88E5]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Intelligent Builder</h3>
                <p className="text-gray-700 mb-4">
                  Add logic, perform calculations, recall information, add hidden fields and more with our powerful form
                  logic engine.
                </p>
                <ul className="space-y-2 text-sm text-gray-600 mt-auto mb-4">
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-[#4CAF50] mr-2 mt-0.5 flex-shrink-0" />
                    <span>Conditional logic</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-[#4CAF50] mr-2 mt-0.5 flex-shrink-0" />
                    <span>Calculations & formulas</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-[#4CAF50] mr-2 mt-0.5 flex-shrink-0" />
                    <span>Hidden fields</span>
                  </li>
                </ul>
                <a href="#" className="inline-flex items-center text-[#1E88E5] font-medium hover:underline mt-auto">
                  Learn more <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Feature Card 2 */}
            <div className="relative">
              {/* Black background for 3D effect */}
              <div className="absolute inset-0 bg-black rounded-lg transform translate-x-4 translate-y-4"></div>
              <div className="bg-white p-6 rounded-lg border-4 border-black relative z-10 transform transition-transform hover:-translate-y-2 h-full flex flex-col">
                <div className="w-16 h-16 bg-[#E8F5E9] rounded-lg flex items-center justify-center mb-4 border-2 border-black">
                  <Palette className="h-8 w-8 text-[#43A047]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Beautiful Templates</h3>
                <p className="text-gray-700 mb-4">
                  Start with professionally designed templates and customize them to match your brand.
                </p>
                <ul className="space-y-2 text-sm text-gray-600 mt-auto mb-4">
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-[#4CAF50] mr-2 mt-0.5 flex-shrink-0" />
                    <span>500+ templates</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-[#4CAF50] mr-2 mt-0.5 flex-shrink-0" />
                    <span>Custom branding</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-[#4CAF50] mr-2 mt-0.5 flex-shrink-0" />
                    <span>Theme customization</span>
                  </li>
                </ul>
                <a href="#" className="inline-flex items-center text-[#43A047] font-medium hover:underline mt-auto">
                  Learn more <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Feature Card 3 */}
            <div className="relative">
              {/* Black background for 3D effect */}
              <div className="absolute inset-0 bg-black rounded-lg transform translate-x-4 translate-y-4"></div>
              <div className="bg-white p-6 rounded-lg border-4 border-black relative z-10 transform transition-transform hover:-translate-y-2 h-full flex flex-col">
                <div className="w-16 h-16 bg-[#FFF3E0] rounded-lg flex items-center justify-center mb-4 border-2 border-black">
                  <Inbox className="h-8 w-8 text-[#FB8C00]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Partial Submissions</h3>
                <p className="text-gray-700 mb-4">
                  Capture partial form data even if users don't complete the entire form.
                </p>
                <ul className="space-y-2 text-sm text-gray-600 mt-auto mb-4">
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-[#4CAF50] mr-2 mt-0.5 flex-shrink-0" />
                    <span>Recover abandoned forms</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-[#4CAF50] mr-2 mt-0.5 flex-shrink-0" />
                    <span>Analyze drop-off points</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-[#4CAF50] mr-2 mt-0.5 flex-shrink-0" />
                    <span>Follow-up automation</span>
                  </li>
                </ul>
                <a href="#" className="inline-flex items-center text-[#FB8C00] font-medium hover:underline mt-auto">
                  Learn more <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Feature Card 4 */}
            <div className="relative">
              {/* Black background for 3D effect */}
              <div className="absolute inset-0 bg-black rounded-lg transform translate-x-4 translate-y-4"></div>
              <div className="bg-white p-6 rounded-lg border-4 border-black relative z-10 transform transition-transform hover:-translate-y-2 h-full flex flex-col">
                <div className="w-16 h-16 bg-[#E8EAF6] rounded-lg flex items-center justify-center mb-4 border-2 border-black">
                  <Puzzle className="h-8 w-8 text-[#3949AB]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Integrations</h3>
                <p className="text-gray-700 mb-4">
                  Connect with 6000+ tools like Zapier, Google Sheets, Slack, and more.
                </p>
                <ul className="space-y-2 text-sm text-gray-600 mt-auto mb-4">
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-[#4CAF50] mr-2 mt-0.5 flex-shrink-0" />
                    <span>Zapier integration</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-[#4CAF50] mr-2 mt-0.5 flex-shrink-0" />
                    <span>Webhook support</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-[#4CAF50] mr-2 mt-0.5 flex-shrink-0" />
                    <span>API access</span>
                  </li>
                </ul>
                <a href="#" className="inline-flex items-center text-[#3949AB] font-medium hover:underline mt-auto">
                  Learn more <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Feature Card 5 */}
            <div className="relative">
              {/* Black background for 3D effect */}
              <div className="absolute inset-0 bg-black rounded-lg transform translate-x-4 translate-y-4"></div>
              <div className="bg-white p-6 rounded-lg border-4 border-black relative z-10 transform transition-transform hover:-translate-y-2 h-full flex flex-col">
                <div className="w-16 h-16 bg-[#E0F2F1] rounded-lg flex items-center justify-center mb-4 border-2 border-black">
                  <BarChart className="h-8 w-8 text-[#00897B]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Analytics</h3>
                <p className="text-gray-700 mb-4">
                  Track form performance and analyze responses with powerful analytics tools.
                </p>
                <ul className="space-y-2 text-sm text-gray-600 mt-auto mb-4">
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-[#4CAF50] mr-2 mt-0.5 flex-shrink-0" />
                    <span>Conversion tracking</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-[#4CAF50] mr-2 mt-0.5 flex-shrink-0" />
                    <span>Response analytics</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-[#4CAF50] mr-2 mt-0.5 flex-shrink-0" />
                    <span>Google Tag Manager</span>
                  </li>
                </ul>
                <a href="#" className="inline-flex items-center text-[#00897B] font-medium hover:underline mt-auto">
                  Learn more <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Feature Card 6 */}
            <div className="relative">
              {/* Black background for 3D effect */}
              <div className="absolute inset-0 bg-black rounded-lg transform translate-x-4 translate-y-4"></div>
              <div className="bg-white p-6 rounded-lg border-4 border-black relative z-10 transform transition-transform hover:-translate-y-2 h-full flex flex-col">
                <div className="w-16 h-16 bg-[#FBE9E7] rounded-lg flex items-center justify-center mb-4 border-2 border-black">
                  <Sparkles className="h-8 w-8 text-[#E64A19]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Make It Your Own</h3>
                <p className="text-gray-700 mb-4">
                  Add your own logo and brand colors, then use as full page form or embed on your website.
                </p>
                <ul className="space-y-2 text-sm text-gray-600 mt-auto mb-4">
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-[#4CAF50] mr-2 mt-0.5 flex-shrink-0" />
                    <span>Custom domains</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-[#4CAF50] mr-2 mt-0.5 flex-shrink-0" />
                    <span>White labeling</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-[#4CAF50] mr-2 mt-0.5 flex-shrink-0" />
                    <span>Embed options</span>
                  </li>
                </ul>
                <a href="#" className="inline-flex items-center text-[#E64A19] font-medium hover:underline mt-auto">
                  Learn more <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <div className="relative inline-block">
              {/* Black background for 3D effect */}
              <div className="absolute inset-0 bg-black rounded-md transform translate-x-2 translate-y-2"></div>
              <a
                href="#"
                className="relative z-10 inline-flex items-center bg-white text-[#00897B] px-6 py-3 rounded-md font-bold hover:bg-gray-50 transition-colors border-2 border-black"
              >
                View all features <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Add another orange blob in the features section for visual interest */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[20%] left-[10%] w-[100px] h-[100px] bg-white/10 rounded-blob rotate-12"></div>
          <div className="absolute bottom-[30%] right-[15%] w-[150px] h-[150px] bg-white/10 rounded-blob -rotate-12"></div>
          <div className="absolute top-[60%] left-[20%] w-[80px] h-[80px] bg-white/10 rounded-blob rotate-45"></div>
          <div className="absolute bottom-[10%] left-[40%] w-[120px] h-[120px] bg-white/10 rounded-blob rotate-12"></div>
          <div className="absolute top-[40%] right-[10%] w-[70px] h-[70px] bg-white/10 rounded-blob -rotate-45"></div>
          <div className="absolute top-[15%] right-[30%] w-[180px] h-[180px]">
            <Image
              src="/images/orange-blob.png"
              alt="Decorative blob"
              width={180}
              height={180}
              className="w-full h-auto opacity-20"
            />
          </div>
        </div>

        {/* Bottom border of features section */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-[#4DB6AC]">
          <svg
            viewBox="0 0 1440 100"
            className="absolute bottom-0 left-0 w-full h-16"
            preserveAspectRatio="none"
            style={{ display: "block" }}
          >
            <path
              fill="#FFF8E1"
              stroke="#000000"
              strokeWidth="4"
              d="M0,100 C120,80 240,60 360,60 C480,60 600,80 720,80 C840,80 960,60 1080,60 C1200,60 1320,80 1440,100 L1440,100 L0,100 Z"
            ></path>
          </svg>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="relative z-10 py-24 bg-[#FFF8E1]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 bg-[#FFE0B2] text-[#E64A19] rounded-full text-sm font-medium mb-4 border-2 border-black">
              Customer Stories
            </span>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">What our customers say</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Join thousands of satisfied users who have transformed their form experience with FormCraft.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            <div className="relative">
              <div className="bg-white p-8 rounded-lg border-4 border-black relative z-10">
                <div className="flex items-center mb-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-[#FFC107]" fill="#FFC107" />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-500">5.0 rating</span>
                </div>
                <p className="text-xl text-gray-700 mb-6 italic">
                  "FormCraft is an absolute joy to use. We've seen a 43% increase in form completions since we started
                  using it. The templates and conditional logic features are game-changers."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-200 rounded-full mr-4 border-2 border-black"></div>
                  <div>
                    <p className="font-medium text-gray-900">Pieter Levels</p>
                    <p className="text-sm text-gray-600">
                      Founder, Nomadlist and RemoteOK
                      <br />
                      400+ Followers on Twitter
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white p-8 rounded-lg border-4 border-black relative z-10">
                <div className="flex items-center mb-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-[#FFC107]" fill="#FFC107" />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-500">5.0 rating</span>
                </div>
                <p className="text-xl text-gray-700 mb-6 italic">
                  "This tool has completely transformed our feedback collection process. The interface is incredibly
                  intuitive, and the analytics help us make better decisions."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-200 rounded-full mr-4 border-2 border-black"></div>
                  <div>
                    <p className="font-medium text-gray-900">Michelle Chen</p>
                    <p className="text-sm text-gray-600">
                      Marketing Director, TechStart Inc.
                      <br />
                      Featured in Forbes 30 Under 30
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="relative z-10 py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 bg-[#E0F7FA] text-[#00897B] rounded-full text-sm font-medium mb-4 border-2 border-black">
              Pricing Plans
            </span>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Simple, transparent pricing</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              No hidden fees or complicated tiers. Choose the plan that works for you.
            </p>
          </div>

          {/* Pricing Cards - Fixed for better responsiveness */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-8 mb-16">
            {/* Free Plan */}
            <div className="relative">
              {/* Black background for 3D effect */}
              <div className="absolute inset-0 bg-black rounded-lg transform translate-x-4 translate-y-4"></div>
              <div className="bg-white p-6 md:p-8 rounded-lg border-4 border-black relative z-10 h-full flex flex-col">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Free</h3>
                  <div className="flex items-baseline">
                    <span className="text-5xl font-bold text-gray-900">$0</span>
                    <span className="text-gray-700 ml-2">/month</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">For individuals just getting started</p>
                </div>

                <ul className="space-y-4 mb-8 flex-grow">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#4CAF50] mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">3 forms</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#4CAF50] mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">100 responses per month</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#4CAF50] mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Basic templates</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#4CAF50] mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Community support</span>
                  </li>
                </ul>

                <button className="w-full py-3 border-2 border-black text-black rounded-md hover:bg-[#FFF3E0] transition-colors font-bold mt-auto">
                  Get started
                </button>
              </div>
            </div>

            {/* Pro Plan */}
            <div className="relative md:scale-105 md:z-10">
              {/* Black background for 3D effect */}
              <div className="absolute inset-0 bg-black rounded-lg transform translate-x-4 translate-y-4"></div>
              <div className="bg-[#FFEB3B] p-6 md:p-8 rounded-lg border-4 border-black relative z-10 h-full flex flex-col">
                <div className="absolute top-0 right-0 bg-black text-white px-3 py-1 text-sm font-medium rounded-bl-lg rounded-tr-lg">
                  Popular
                </div>

                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Pro</h3>
                  <div className="flex items-baseline">
                    <span className="text-5xl font-bold text-gray-900">$19</span>
                    <span className="text-gray-700 ml-2">/month</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">For professionals and small teams</p>
                </div>

                <ul className="space-y-4 mb-8 flex-grow">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#4CAF50] mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Unlimited forms</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#4CAF50] mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">1,000 responses per month</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#4CAF50] mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">All templates</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#4CAF50] mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Remove FormCraft branding</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#4CAF50] mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Priority email support</span>
                  </li>
                </ul>

                <button className="w-full py-3 bg-black text-white rounded-md hover:bg-gray-800 transition-colors font-bold mt-auto border-2 border-black">
                  Get started
                </button>
              </div>
            </div>

            {/* Enterprise Plan */}
            <div className="relative">
              {/* Black background for 3D effect */}
              <div className="absolute inset-0 bg-black rounded-lg transform translate-x-4 translate-y-4"></div>
              <div className="bg-white p-6 md:p-8 rounded-lg border-4 border-black relative z-10 h-full flex flex-col">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Enterprise</h3>
                  <div className="flex items-baseline">
                    <span className="text-5xl font-bold text-gray-900">$49</span>
                    <span className="text-gray-700 ml-2">/month</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">For businesses with advanced needs</p>
                </div>

                <ul className="space-y-4 mb-8 flex-grow">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#4CAF50] mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Unlimited forms</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#4CAF50] mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">10,000 responses per month</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#4CAF50] mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Custom domains</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#4CAF50] mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Advanced analytics</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-[#4CAF50] mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">API access</span>
                  </li>
                </ul>

                <button className="w-full py-3 border-2 border-black text-black rounded-md hover:bg-[#FFF3E0] transition-colors font-bold mt-auto">
                  Contact sales
                </button>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-gray-700 mb-6">
              All plans include basic features like form creation, templates, and standard support.
              <br className="hidden md:block" />
              Need a custom plan?{" "}
              <a href="#" className="text-[#FF7043] font-medium hover:underline">
                Contact our sales team
              </a>
              .
            </p>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              <div className="flex items-center bg-white px-3 py-1 rounded-full border-2 border-black">
                <CheckCircle className="h-5 w-5 text-[#4CAF50] mr-2" />
                <span className="text-gray-700">14-day money-back guarantee</span>
              </div>
              <div className="flex items-center bg-white px-3 py-1 rounded-full border-2 border-black">
                <CheckCircle className="h-5 w-5 text-[#4CAF50] mr-2" />
                <span className="text-gray-700">No credit card required for free plan</span>
              </div>
              <div className="flex items-center bg-white px-3 py-1 rounded-full border-2 border-black">
                <CheckCircle className="h-5 w-5 text-[#4CAF50] mr-2" />
                <span className="text-gray-700">Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-24 bg-[#FF7043]">
        {/* Top border of CTA section */}
        <div className="absolute top-0 left-0 right-0 h-16 bg-white">
          <svg
            viewBox="0 0 1440 100"
            className="absolute bottom-0 left-0 w-full h-16"
            preserveAspectRatio="none"
            style={{ display: "block" }}
          >
            <path
              fill="#FF7043"
              stroke="#000000"
              strokeWidth="4"
              d="M0,0 C120,20 240,40 360,40 C480,40 600,20 720,20 C840,20 960,40 1080,40 C1200,40 1320,20 1440,0 L1440,100 L0,100 Z"
            ></path>
          </svg>
        </div>

        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[20%] left-[10%] w-[100px] h-[100px] bg-white/10 rounded-blob rotate-12"></div>
          <div className="absolute bottom-[30%] right-[15%] w-[150px] h-[150px] bg-white/10 rounded-blob -rotate-12"></div>
          <div className="absolute top-[60%] left-[20%] w-[80px] h-[80px] bg-white/10 rounded-blob rotate-45"></div>
          <div className="absolute bottom-[10%] left-[40%] w-[120px] h-[120px] bg-white/10 rounded-blob rotate-12"></div>
          <div className="absolute top-[40%] right-[10%] w-[70px] h-[70px] bg-white/10 rounded-blob -rotate-45"></div>

          {/* Floating dots */}
          <div className="absolute top-[25%] right-[25%] w-4 h-4 bg-white/30 rounded-full"></div>
          <div className="absolute top-[45%] left-[15%] w-3 h-3 bg-white/30 rounded-full"></div>
          <div className="absolute bottom-[35%] right-[35%] w-5 h-5 bg-white/30 rounded-full"></div>
          <div className="absolute top-[65%] right-[15%] w-4 h-4 bg-white/30 rounded-full"></div>
          <div className="absolute bottom-[25%] left-[25%] w-6 h-6 bg-white/30 rounded-full"></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 text-center lg:text-left">
              <div className="inline-block px-4 py-1 bg-white/20 text-white rounded-full text-sm font-medium mb-6 border-2 border-white">
                <span className="mr-2">🚀</span> Ready to get started?
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Start creating <br className="hidden md:block" />
                beautiful forms <br className="hidden md:block" />
                <span className="bg-white text-[#FF7043] px-2">in minutes!</span>
              </h2>

              <p className="text-xl text-white max-w-xl mb-10">
                Join thousands of marketers and content creators who are collecting better data with FormCraft. No
                coding required!
              </p>

              <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4 mb-6">
                <div className="relative w-full sm:w-auto">
                  {/* Black background for 3D effect */}
                  <div className="absolute inset-0 bg-black rounded-md transform translate-x-4 translate-y-4"></div>
                  <button className="bg-[#FFEB3B] text-gray-900 px-10 py-5 rounded-md hover:bg-[#FDD835] transition-colors text-xl font-bold relative z-10 w-full sm:w-auto inline-flex items-center justify-center border-2 border-black">
                    Create free account <ArrowRight className="ml-3 h-6 w-6" />
                  </button>
                </div>

                <a
                  href="#pricing"
                  className="text-white border-2 border-white px-8 py-4 rounded-md hover:bg-white/10 transition-colors font-bold w-full sm:w-auto inline-flex items-center justify-center"
                >
                  View pricing
                </a>
              </div>

              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                <div className="flex items-center bg-white/20 px-4 py-2 rounded-full border-2 border-white">
                  <CheckCircle className="h-5 w-5 text-white mr-2" />
                  <span className="text-white font-medium">No credit card required</span>
                </div>
                <div className="flex items-center bg-white/20 px-4 py-2 rounded-full border-2 border-white">
                  <CheckCircle className="h-5 w-5 text-white mr-2" />
                  <span className="text-white font-medium">Cancel anytime</span>
                </div>
                <div className="flex items-center bg-white/20 px-4 py-2 rounded-full border-2 border-white">
                  <CheckCircle className="h-5 w-5 text-white mr-2" />
                  <span className="text-white font-medium">Free forever plan available</span>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2 mt-12 lg:mt-0">
              <div className="relative">
                {/* Black background for 3D effect */}
                <div className="absolute inset-0 bg-black rounded-xl transform translate-x-6 translate-y-6"></div>
                <div className="relative z-10 bg-white p-8 rounded-xl border-4 border-black">
                  <div className="flex items-center mb-6">
                    <div className="w-8 h-8 bg-[#FFEB3B] rounded-full flex items-center justify-center mr-4 border-2 border-black">
                      <Sparkles className="h-6 w-6 text-black" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Start for free today</h3>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-[#E3F2FD] rounded-full flex items-center justify-center mr-3 mt-0.5 border-2 border-black flex-shrink-0">
                        <span className="font-bold text-[#1E88E5]">1</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-1">Create your account</h4>
                        <p className="text-gray-600 text-sm">Sign up in seconds, no credit card required</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-[#E8F5E9] rounded-full flex items-center justify-center mr-3 mt-0.5 border-2 border-black flex-shrink-0">
                        <span className="font-bold text-[#43A047]">2</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-1">Build your first form</h4>
                        <p className="text-gray-600 text-sm">Use our templates or start from scratch</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-[#FFF3E0] rounded-full flex items-center justify-center mr-3 mt-0.5 border-2 border-black flex-shrink-0">
                        <span className="font-bold text-[#FB8C00]">3</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-1">Share and collect data</h4>
                        <p className="text-gray-600 text-sm">Get responses instantly and analyze results</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex -space-x-2">
                          <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white"></div>
                          <div className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white"></div>
                          <div className="w-8 h-8 rounded-full bg-gray-400 border-2 border-white"></div>
                        </div>
                        <span className="ml-2 text-sm text-gray-600">Join 10,000+ users</span>
                      </div>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-[#FFC107]" fill="#FFC107" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom border of CTA section */}
        <div className="absolute bottom-0 left-0 right-0">
          <Image src="/images/beige-wave.png" alt="Wave divider" width={1440} height={100} className="w-full h-auto" />
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-16 bg-[#FFF8E1] border-t border-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-10 mb-10">
            <div>
              <div className="mb-6">
                <span className="text-2xl font-bold text-gray-900">FormCraft</span>
              </div>
              <p className="text-gray-700 mb-6">
                Powerful form building tools to help you create beautiful forms and collect better data.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-500 hover:text-[#FF7043] bg-white p-2 rounded-full border-2 border-black"
                >
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-500 hover:text-[#FF7043] bg-white p-2 rounded-full border-2 border-black"
                >
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-500 hover:text-[#FF7043] bg-white p-2 rounded-full border-2 border-black"
                >
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-500 hover:text-[#FF7043] bg-white p-2 rounded-full border-2 border-black"
                >
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-6">Product</h3>
              <ul className="space-y-4">
                <li>
                  <a href="#" className="text-gray-700 hover:text-[#FF7043]">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-700 hover:text-[#FF7043]">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-700 hover:text-[#FF7043]">
                    API
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-700 hover:text-[#FF7043]">
                    Integrations
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-700 hover:text-[#FF7043]">
                    Documentation
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-6">Company</h3>
              <ul className="space-y-4">
                <li>
                  <a href="#" className="text-gray-700 hover:text-[#FF7043]">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-700 hover:text-[#FF7043]">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-700 hover:text-[#FF7043]">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-700 hover:text-[#FF7043]">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-700 hover:text-[#FF7043]">
                    Partners
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-6">Resources</h3>
              <ul className="space-y-4">
                <li>
                  <a href="#" className="text-gray-700 hover:text-[#FF7043]">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-700 hover:text-[#FF7043]">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-700 hover:text-[#FF7043]">
                    Cookie Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-700 hover:text-[#FF7043]">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-700 hover:text-[#FF7043]">
                    Status
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 mt-8 border-t border-black flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-700 mb-4 md:mb-0">© 2023 FormCraft. All rights reserved.</p>
            <div className="flex items-center">
              <span className="text-gray-700">Made with</span>
              <span className="text-red-500 mx-1">❤</span>
              <span className="text-gray-700">by the FormCraft team</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
