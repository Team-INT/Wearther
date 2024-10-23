import React from "react";

interface PopularFashionItemsProps {
  popularItems: any;
}

export default function PopularFashionItems({popularItems}: PopularFashionItemsProps) {
  return (
    <ul className="space-y-2">
      {popularItems.map((item: any, index: number) => (
        <li key={index} className="flex justify-between items-center">
          <span>{item.name}</span>
          <span className="text-sm text-muted-foreground">{item.category}</span>
        </li>
      ))}
    </ul>
  );
}
