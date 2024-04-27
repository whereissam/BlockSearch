"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
// import { SearchInput } from "@/components/SearchInput"
import SearchInput from '@/components/SearchInput';
import SearchResults from '@/components/SearchResults';
// import { createClient } from '@/utils/supabase/server'
// import { cookies } from 'next/headers'
import { createClient } from '@supabase/supabase-js'

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
  let supabaseUrl, supabaseAnonKey

  console.log(process.env.NODE_ENV)
  // Check if the application is running locally or on Vercel
  if (process.env.NODE_ENV === 'production') {
    // Use Vercel environment variables
    supabaseUrl = process.env.SUPABASE_URL;
    supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
  } else if(process.env.NODE_ENV === 'development') {
    // Use local environment variables
    supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
  }

  // Check if environment variables are defined
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Supabase URL or Supabase anon key is not defined in the environment variables.');
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey)
  const [results, setResults] = useState<Result[]>([]);

  const handleSearch = async (query: string) => {
    await searchInSupabase(query);
  };
  // const cookieStore = cookies()
  // const supabase = createClient(cookieStore)

  const searchInSupabase = async (query : string) => {

    let { data: blockchainTools, error } = await supabase
      .from('blockchainTools')
      .select('*')
      .textSearch('name', `${query}`)

      if(error){
        console.log(error)
      }

      if(blockchainTools){
        setResults(blockchainTools)
      }
    }
  

  useEffect(() => {
    const fetchData = async () => {
      
    let { data: blockchainTools, error } = await supabase
      .from('blockchainTools')
      .select('*')

      if(error){
        console.log(error)
      }

      if(blockchainTools){
        setResults(blockchainTools)
      }
    }

    fetchData()
  }, [])

  return (
    <section className="container flex flex-col justify-center items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Blockchain Tool Search Platform 
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          Easy to use & collect it which you want
        </p>
      </div>
      {/* <div className="flex gap-4">
        <Link
          href={siteConfig.links.docs}
          target="_blank"
          rel="noreferrer"
          className={buttonVariants()}
        >
          Documentation
        </Link>
        <Link
          target="_blank"
          rel="noreferrer"
          href={siteConfig.links.github}
          className={buttonVariants({ variant: "outline" })}
        >
          GitHub
        </Link>
      </div> */}
      <SearchInput onSearch={handleSearch} />
      <SearchResults results={results} />

    </section>
  )
}
