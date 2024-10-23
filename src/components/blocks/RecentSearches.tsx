import React from "react";

export default function RecentSearches({recentSearches}) {
  return (
    <div className="flex flex-wrap gap-2">
      {recentSearches.map((search, index) => (
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
