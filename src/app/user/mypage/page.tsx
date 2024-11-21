"use client";

import {useSession} from "next-auth/react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

export default function MyPage() {
  const {data: session} = useSession();

  return (
    <div className="container mx-auto py-8">
      <div className="space-y-8">
        {/* 프로필 섹션 */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={session?.user?.image || ""} />
                <AvatarFallback>{session?.user?.name?.[0] || "U"}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl">{session?.user?.name || "사용자"}</CardTitle>
                <p className="text-muted-foreground">{session?.user?.email}</p>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* 탭 섹션 */}
        <Tabs defaultValue="recommendations" className="space-y-4">
          <TabsList>
            <TabsTrigger value="recommendations">추천 기록</TabsTrigger>
            <TabsTrigger value="saved">저장된 스타일</TabsTrigger>
            <TabsTrigger value="preferences">선호 설정</TabsTrigger>
          </TabsList>

          <TabsContent value="recommendations" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>최근 추천 기록</CardTitle>
              </CardHeader>
              <CardContent>
                {/* 추천 기록 목록 컴포넌트 */}
                <p>아직 추천 기록이 없습니다.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="saved" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>저장된 스타일</CardTitle>
              </CardHeader>
              <CardContent>
                {/* 저장된 스타일 목록 컴포넌트 */}
                <p>아직 저장된 스타일이 없습니다.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preferences" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>선호 설정</CardTitle>
              </CardHeader>
              <CardContent>
                {/* 선호 설정 폼 컴포넌트 */}
                <p>선호하는 스타일을 설정해주세요.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
