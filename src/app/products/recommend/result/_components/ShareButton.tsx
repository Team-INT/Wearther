"use client";

import {Button} from "@/components/ui/button";
import {Share2} from "lucide-react";

export const ShareButton = () => {
  return (
    <Button className="w-full" onClick={() => alert("공유 기능은 아직 구현되지 않았습니다.")}>
      <Share2 className="mr-2" /> 결과 공유하기
    </Button>
  );
};
