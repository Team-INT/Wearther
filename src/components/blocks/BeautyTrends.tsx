import React from "react";

interface BeautyTrendsProps {
  beautyTrends: any;
}

export default function BeautyTrends({beautyTrends}: BeautyTrendsProps) {
  return (
    <ul className="space-y-2">
      {beautyTrends.map((trend: any, index: number) => (
        <li key={index}>
          <p className="font-medium">{trend.name}</p>
          <p className="text-sm text-muted-foreground">{trend.description}</p>
        </li>
      ))}
    </ul>
  );
}
