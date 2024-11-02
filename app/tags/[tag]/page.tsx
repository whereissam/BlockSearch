"use client";

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

interface Tool {
  id: string;
  name: string;
  intro: string;
  website_url: string;
  tags: string;
}

export default function TagPage({ params }: { params: { tag: string } }) {
  const [tools, setTools] = useState<Tool[]>([]);

  useEffect(() => {
    const fetchToolsByTag = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('tools')
        .select('*')
        .ilike('tags', `%${params.tag}%`);

      if (error) {
        console.error('Error fetching tools:', error);
      } else {
        setTools(data || []);
      }
    };

    fetchToolsByTag();
  }, [params.tag]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Tools tagged with "{params.tag}"</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tools.map((tool) => (
          <Card key={tool.id} className="w-full max-w-sm overflow-hidden">
            <CardContent className="p-4">
              <a href={tool.website_url} target="_blank" rel="noopener noreferrer">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold">{tool.name}</h3>
                  <ExternalLink className="w-4 h-4 text-gray-500" />
                </div>
              </a>
              <p className="text-sm text-gray-600 mb-2">{tool.intro}</p>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <div className="flex flex-wrap gap-2">
                {tool.tags.split(', ').map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-800 px-2 py-1 rounded-md text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}