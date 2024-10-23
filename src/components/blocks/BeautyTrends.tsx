import React from "react";

export default function BeautyTrends({beautyTrends}) {
  return (
    <ul className="space-y-2">
      {beautyTrends.map((trend, index) => (
        <li key={index}>
          <p className="font-medium">{trend.name}</p>
          <p className="text-sm text-muted-foreground">{trend.description}</p>
        </li>
      ))}
    </ul>
  );
}
