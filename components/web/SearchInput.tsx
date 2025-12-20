"use client";

import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { SearchResultsType } from "@/convex/posts";
import { useQuery } from "convex/react";
import { Loader2, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
const SearchInput = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);

  // fetch search results
  const searchInput =
    searchTerm.length >= 2 ? { limit: 2, term: searchTerm } : "skip";
  const results = useQuery(api.posts.searchPosts, searchInput);

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setOpen(true);
  };
  return (
    <div className="w-full max-w-sm relative z-10">
      <div className="relative">
        <Search className="absolute top-2.5 left-2.5 size-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search ideas..."
          className="w-full pl-8 bg-background"
          value={searchTerm}
          onChange={handleSearchInputChange}
        />
      </div>
      {open && searchTerm.length > 2 && (
        <SearchResults
          results={results}
          setOpen={setOpen}
          setSearchTerm={setSearchTerm}
        />
      )}
    </div>
  );
};

const SearchResults = ({
  results,
  setOpen,
  setSearchTerm,
}: {
  results: SearchResultsType[] | undefined;
  setOpen: (open: boolean) => void;
  setSearchTerm: (searchTerm: string) => void;
}) => {
  return (
    <div className="absolute top-full mt-2 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in fade-in-0 zoom-in-95">
      {results?.length === undefined ? (
        <div className="text-sm flex flex-col items-center gap-2 p-4">
          {" "}
          <Loader2 className="animate-spin size-4 mr-2" /> Searching...
        </div>
      ) : results.length === 0 ? (
        <div className="p-4 text-sm text-center text-muted-foreground">
          {" "}
          No results
        </div>
      ) : (
        <div className="py-1">
          {results.map((post) => (
            <Link
              className="flex flex-col py-2 px-4 text-sm hover:bg-accent hover:text-accent-foreground cursor-pointer"
              key={post._id}
              href={`/bounces/${post._id}`}
              onClick={() => {
                setOpen(false);
                setSearchTerm("");
              }}
            >
              <p className="font-medium truncate">{post.title}</p>
              <p className="text-xs text-muted-foreground pt-1">
                {post.content.substring(0, 60)}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchInput;
