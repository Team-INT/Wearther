import {Card, CardContent} from "@/components/ui/card";
import MyRecommendForm from "./_components/MyRecommendForm";
import {Suspense} from "react";

export default function RecommendPage() {
  return (
    <div className="p-4 flex items-center justify-center">
      <Card className="w-full max-w-2xl">
        <CardContent className="p-6">
          <Suspense fallback={<p>폼 로딩중..</p>}>
            <MyRecommendForm />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
