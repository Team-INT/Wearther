"use client";

import React from "react";

import {Badge} from "@/components/ui/badge";
import {Separator} from "@/components/ui/separator";
import {parseBoldText} from "@/utils/parse";

// types
// import {RecommendedProduct} from "@/lib/types/product";

export default function RecommendMessage({recommendationData}: {recommendationData}) {
  return (
    <>
      <p
        className="mb-4"
        dangerouslySetInnerHTML={{__html: parseBoldText(recommendationData.info.details)}}
      ></p>
      <div className="flex flex-wrap gap-2 mb-4">
        {recommendationData.info.keywords.map((keyword, index) => (
          <Badge key={`${recommendationData.info.keywords}-${index}`} variant="secondary">
            {keyword}
          </Badge>
        ))}
      </div>
      <Separator className="my-4" />
      <h3 className="text-lg font-semibold mb-2">관련 아이템</h3>
      {/* 여기에는 related 정보 */}
      <ul className="list-disc pl-5">
        {recommendationData.info.related.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </>
  );
}
