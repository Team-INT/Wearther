import React from "react";

interface recentSearchesProps {
  recentSearches: any;
}

export default function RecentSearches({recentSearches}: recentSearchesProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {recentSearches.map((search: any, index: number) => (
        <span
          key={index}
          className="bg-secondary text-secondary-foreground px-2 py-1 rounded-full text-sm"
        >
          {search}
        </span>
      ))}
    </div>
  );
}
