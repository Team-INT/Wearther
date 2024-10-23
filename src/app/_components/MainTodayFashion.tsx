import React from "react";
import Image from "next/image";

interface MainTodayFasion {
  recommendedClothes: any;
}

export default function MainTodayFasion({recommendedClothes}: MainTodayFasion) {
  return (
    <div className="flex flex-wrap gap-3 ">
      {recommendedClothes.map((item: any) => (
        <div
          key={item.id}
          className="flex flex-auto md:flex-none items-center space-x-4 bg-secondary rounded-lg p-2"
        >
          <Image
            src={item.image}
            alt={item.name}
            width={128}
            height={128}
            className="object-cover rounded-md"
          />
          <p className="sr-only">{item.name}</p>
        </div>
      ))}
    </div>
  );
}
