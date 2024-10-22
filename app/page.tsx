"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";
import { buttonVariants } from "@/components/ui/button";
import SearchInput from '@/components/SearchInput';
import SearchResults from '@/components/SearchResults';
import { createClient } from '@supabase/supabase-js';

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
  let supabaseUrl, supabaseAnonKey;

  // Check if the application is running locally or on Vercel
  if (process.env.NODE_ENV === 'production') {
    supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  } else if (process.env.NODE_ENV === 'development') {
    supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
  }

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Supabase URL or Supabase anon key is not defined in the environment variables.');
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey);
  const [results, setResults] = useState<Result[]>([]);
  const [loadCount, setLoadCount] = useState(20); // Start with loading 20 items

  const handleSearch = async (query: string) => {
    await searchInSupabase(query);
  };

  const searchInSupabase = async (query: string) => {
    let { data: blockchainTools, error } = await supabase
      .from('tools')
      .select('*')
      .textSearch('name', `${query}`)
      .limit(loadCount); // Limit results to the current load count

    if (error) {
      console.log(error);
    }

    if (blockchainTools) {
      setResults(blockchainTools);
    }
  };

  const fetchData = async () => {
    let { data: blockchainTools, error } = await supabase
      .from('tools')
      .select('*')
      .limit(loadCount); // Limit results to the current load count

    if (error) {
      console.log(error);
    }

    if (blockchainTools) {
      setResults(blockchainTools);
    }
  };

  useEffect(() => {
    fetchData();
  }, [loadCount]); // Fetch data again when loadCount changes

  const handleLoadMore = () => {
    setLoadCount((prevCount) => prevCount + 20); // Increase load count by 20
  };

  return (
    <section className="container flex flex-col justify-center items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Blockchain Tool Search Platform 
        </h1>
        <p className="max-w-[900px] text-lg text-muted-foreground">
          Easy to use & collect it which you want
        </p>
      </div>
      <SearchInput onSearch={handleSearch} />
      <SearchResults results={results} />
      {results.length > 0 && (
        <button
          onClick={handleLoadMore}
          className="mt-4 p-2 bg-blue-500 text-white rounded-lg"
        >
          Load More
        </button>
      )}
    </section>
  );
}
