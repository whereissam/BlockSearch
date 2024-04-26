"use clients"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import React, { useState, ChangeEvent, FormEvent } from 'react';

interface SearchInputProps {
  onSearch: (query: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearch }) => {
  
  const [query, setQuery] = useState<string>('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(query);
  };

  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
       <form onSubmit={handleSubmit} className='w-full flex gap-5'>
          <Input 
            type="text"
            value={query}
            onChange={handleChange}
            placeholder="Search tools..." 
          />
          <Button type="submit">Search</Button>
        </form>
    </div>
  )
}

export default SearchInput;