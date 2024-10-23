'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Globe, Star, Clock, PlusCircle, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

function AIToolCard({ title, description, image, stats, tags }) {
  return (
    <Card className="w-full overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative">
          <img
            src={image}
            alt={title}
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-purple-900 bg-opacity-70 flex flex-col justify-between p-4">
            <div className="text-white text-sm font-semibold">{title}</div>
            <div className="text-white space-y-1">
              <div>NSFW Character</div>
              <div>AI ChatBots</div>
              <div>NSFW AI Image Generation</div>
              <div>NSFW AI Voices</div>
            </div>
            <button className="bg-pink-500 text-white text-sm font-bold py-2 px-4 rounded-full w-max">
              FREE CHAT NOW
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold">{title}</h3>
          <ExternalLink className="w-4 h-4 text-gray-500" />
        </div>
        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
          <div className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-gradient-to-r from-red-500 to-blue-500 mr-1"></span>
            <span>{stats.users}</span>
          </div>
          <div className="flex items-center">
            <img src="/placeholder.svg?height=20&width=30" alt="USA Flag" className="w-5 h-3 mr-1" />
            <span>{stats.percentage}</span>
          </div>
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 mr-1" />
            <span>{stats.rating}</span>
          </div>
        </div>
        <p className="text-sm text-gray-600 mb-2">{description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <div className="flex space-x-2">
          {tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="bg-gray-100 text-gray-800">
              {tag}
            </Badge>
          ))}
        </div>
      </CardFooter>
    </Card>
  )
}

export function ToolifyClone() {
  const aiTools = [
    {
      title: "Juicychat AI",
      description: "Spicy NSFW character AI chat platform",
      image: "/placeholder.svg?height=200&width=400",
      stats: { users: "1.0M", percentage: "31.98%", rating: 38 },
      tags: ["NSFW", "AI Chatbot"]
    },
    {
      title: "Balise",
      description: "Reduce video time and maximize learning speed",
      image: "/placeholder.svg?height=200&width=400",
      stats: { users: "500K", percentage: "25.5%", rating: 42 },
      tags: ["Video", "Learning"]
    },
    {
      title: "LearnFast AI",
      description: "The ultimate Math & Physics tutor",
      image: "/placeholder.svg?height=200&width=400",
      stats: { users: "750K", percentage: "28.7%", rating: 45 },
      tags: ["Education", "AI Tutor"]
    },
    {
      title: "DRESSX",
      description: "Transform your style with AI-powered fashion",
      image: "/placeholder.svg?height=200&width=400",
      stats: { users: "1.2M", percentage: "33.2%", rating: 40 },
      tags: ["Fashion", "AI Design"]
    }
  ]

  return (
    <div className="min-h-screen bg-[#F0F0FF] text-gray-900">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="text-2xl font-bold text-purple-600">Toolify.ai</div>
            <nav className="hidden md:flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-gray-900">Products</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Category</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Ranking</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">AI Models</a>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost">Submit & Advertise</Button>
            <Button variant="ghost">Login</Button>
            <select className="bg-transparent border-none text-sm">
              <option>EN</option>
            </select>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-4">Discover The Best AI Websites & Tools</h1>
        <p className="text-center mb-4">
          <span className="text-purple-600 font-semibold">20627</span> AIs and <span className="text-purple-600 font-semibold">233</span> categories in the best AI tools directory. AI tools list & GPTs store are updated daily by ChatGPT.
        </p>
        <p className="text-center mb-8">
          Sponsored by <a href="#" className="text-purple-600 hover:underline">Juicychat AI</a>.
        </p>
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Input type="text" placeholder="Search by AI, e.g. Video Translation AI Tool" className="w-full pl-10 pr-4 py-2 rounded-full" />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full" size="sm">
              <Search className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <Tabs defaultValue="today" className="mb-8">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2">
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="new">New</TabsTrigger>
            <TabsTrigger value="most-saved">Most Saved</TabsTrigger>
            <TabsTrigger value="most-used">Most Used</TabsTrigger>
            <TabsTrigger value="browser-extension">Browser Extension</TabsTrigger>
            <TabsTrigger value="apps">Apps</TabsTrigger>
            <TabsTrigger value="discord">Discord of AI</TabsTrigger>
            <TabsTrigger value="ai-for-jobs">AI for Jobs</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Just launched</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {aiTools.map((tool, index) => (
              <AIToolCard key={index} {...tool} />
            ))}
          </div>
        </div>
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Featured*</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {aiTools.map((tool, index) => (
              <AIToolCard key={index} {...tool} />
            ))}
          </div>
        </div>
        <div className="text-center">
          <Button variant="outline" size="lg">
            <PlusCircle className="w-4 h-4 mr-2" />
            Load More
          </Button>
        </div>
      </main>
    </div>
  )
}