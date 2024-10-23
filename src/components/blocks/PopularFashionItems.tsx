import React from "react";

export default function PopularFashionItems({popularItems}) {
  return (
    <ul className="space-y-2">
      {popularItems.map((item, index) => (
        <li key={index} className="flex justify-between items-center">
          <span>{item.name}</span>
          <span className="text-sm text-muted-foreground">{item.category}</span>
        </li>
      ))}
    </ul>
  );
}
