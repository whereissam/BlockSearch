import { Star, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Box, Inset, Strong, Text, Link } from '@radix-ui/themes';
Link
interface Result {
    id: string;
    image_url: string;
    name: string;
    intro: string;
    tags: string;
    url: string;
    description: string;
  }
  
  interface SearchResultsProps {
    results: Result[];
  }

  const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {

    const handleTagClick = (tag: string) => {
      console.log(`Tag clicked: ${tag}`);
      // Add any logic, such as filtering or navigation based on the tag.
    };

    return (
<div className='grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-5'> {/* Define grid layout */}
      {results?.map((result) => (
      <Card className="w-full max-w-sm overflow-hidden"  key={result.id}>
       
        <CardHeader className="p-0">
          <div className="relative">
            <img
              src={result.image_url}
              alt={result.name}
              className="w-full h-48 object-scale-down"
            />
          </div>
        </CardHeader>
        <CardContent className="p-4">
        <a href={result.website_url} target="_blank">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold">{result.name}</h3>
            <ExternalLink className="w-4 h-4 text-gray-500" />
          </div>
          </a>
          <p className="text-sm text-gray-100 mb-2">{result.intro}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0">
        <div className="flex flex-wrap gap-2">
  {result.tags.split(', ').map((tag, index) => (
    <button
      key={index}
      onClick={() => handleTagClick(tag)}
      className="bg-gray-100 text-gray-800 px-2 py-1 rounded-md hover:bg-gray-200 transition"
    >
      {tag}
    </button>
  ))}
</div>

  </CardFooter>
      </Card>
      ))}
    </div>
    );
  };
  
  export default SearchResults;
  