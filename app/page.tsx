"use client";

import { useEffect, useState } from "react";
import SearchInput from "@/components/SearchInput";
import SearchResults from "@/components/SearchResults";
import { createClient } from "@supabase/supabase-js";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

interface Result {
  id: string;
  image_url: string;
  name: string;
  intro: string;
  tags: string;
  url: string;
  description: string;
}

export default function IndexPage() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Supabase URL or anon key is not defined in the environment variables."
    );
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey);
  const [results, setResults] = useState<Result[]>([]);
  const [loadCount, setLoadCount] = useState(20); // Start with 20 items
  const [currentTag, setCurrentTag] = useState<string | null>(null);
  const [currentQuery, setCurrentQuery] = useState<string>("");

  // Fetch data based on tag and query
  const fetchData = async (tag: string | null = currentTag, query: string = currentQuery) => {
    let supabaseQuery = supabase.from("tools").select("*").limit(loadCount);
  
    // Build search criteria based on the query
    if (query) {
      // Adjust the search to include name, description, and tags
      supabaseQuery = supabaseQuery.or(
        `name.ilike.%${query}%,intro.ilike.%${query}%,tags.ilike.%${query}%`
      );
    }
  
    if (tag) {
      supabaseQuery = supabaseQuery.or(`tags.ilike.%${tag}%,tags.ilike.%${tag}%`);
    }
  
    const { data: blockchainTools, error } = await supabaseQuery;
  
    if (error) {
      console.error("Error fetching data:", error);
    } else {
      if (loadCount === 20) {
        setResults(blockchainTools || []);
      } else {
        setResults((prevResults) => {
          const newResults = blockchainTools || [];
          return [...new Set([...prevResults, ...newResults])];
        });
      }
    }
  };

  // Initial data fetch with no filters
  useEffect(() => {
    fetchData();
  }, [loadCount]);

  // Handle tag selection and reset load count and results
  const handleTagChange = (value: string) => {
    const tag = value === "" ? null : value; // Empty value means "All"
    setCurrentTag(tag); // Set current tag
    setLoadCount(20); // Reset load count when changing tags
    fetchData(tag); // Fetch fresh data for the selected tag
  };

  const handleSearch = async (query: string) => {
    setCurrentQuery(query); // Set the current search query
    setLoadCount(20); // Reset load count when searching
    fetchData(null, query); // Search without tag filter
  };

  const handleLoadMore = () => {
    setLoadCount((prevCount) => prevCount + 20); // Increase load count by 20
    fetchData(currentTag, currentQuery); // Fetch more based on current filters
  };

  return (
    <section className="container flex flex-col justify-center items-center gap-6 pb-8 pt-6 md:py-10">
      <main className="px-4 py-8 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Discover The Best Blockchain Tool & Websites
        </h1>
        <p className="max-w-[900px] text-lg text-muted-foreground py-2">
          Easy to use & collect what you want
        </p>
        <div className="max-w-2xl mx-auto py-4 flex justify-center items-center">
          <SearchInput onSearch={handleSearch} />
        </div>
        <Tabs defaultValue="" onValueChange={handleTagChange} className="mb-8 mt-4">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-9 gap-2">
            <TabsTrigger value="" onClick={() => handleTagChange("")}>All</TabsTrigger>
            <TabsTrigger value="meme" onClick={() => handleTagChange("meme")}>Meme</TabsTrigger>
            <TabsTrigger value="developer-tools" onClick={() => handleTagChange("developer-tools")}>Developer Tools</TabsTrigger>
            <TabsTrigger value="explorer" onClick={() => handleTagChange("explorer")}>Explorer</TabsTrigger>
            <TabsTrigger value="trading" onClick={() => handleTagChange("trading")}>Trading</TabsTrigger>
            <TabsTrigger value="defi" onClick={() => handleTagChange("defi")}>DeFi</TabsTrigger>
            <TabsTrigger value="ai" onClick={() => handleTagChange("ai")}>AI</TabsTrigger>
            <TabsTrigger value="exchange" onClick={() => handleTagChange("exchange")}>Exchange</TabsTrigger>
            <TabsTrigger value="aggregator" onClick={() => handleTagChange("aggregator")}>Aggregator</TabsTrigger>
          </TabsList>
        </Tabs>
        <SearchResults results={results} />
        {results.length >= loadCount && results.length > 0 && (
          <Button onClick={handleLoadMore} className="mt-4">
            Load More
          </Button>
        )}
      </main>
    </section>
  );
}
