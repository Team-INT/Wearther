import Link from "next/link";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Megaphone, Calendar, ChevronRight} from "lucide-react";

// 공지사항 데이터를 가져오는 함수 (실제 앱에서는 데이터베이스나 API에서 가져올 것입니다)
async function getNotices() {
  // 이 예제에서는 하드코딩된 데이터를 사용합니다
  return [
    {
      id: 1,
      title: "서비스 업데이트 안내",
      content: "새로운 기능이 추가되었습니다. 자세한 내용은 본문을 확인해주세요.",
      date: "2024-03-01",
      important: true,
    },
    {
      id: 2,
      title: "개인정보 처리방침 변경 안내",
      content: "개인정보 처리방침이 변경되었습니다. 변경된 내용을 확인해주세요.",
      date: "2024-02-15",
      important: true,
    },
    {
      id: 3,
      title: "여름 시즌 스타일 추천 이벤트",
      content: "여름 시즌을 맞아 특별한 스타일 추천 이벤트를 진행합니다.",
      date: "2024-06-01",
      important: false,
    },
    {
      id: 4,
      title: "시스템 점검 안내",
      content: "2024년 4월 10일 오전 2시부터 4시까지 시스템 점검이 있을 예정입니다.",
      date: "2024-04-05",
      important: false,
    },
    {
      id: 5,
      title: "신규 사용자 혜택 안내",
      content: "신규 가입 사용자를 위한 특별한 혜택을 준비했습니다.",
      date: "2024-05-01",
      important: false,
    },
  ];
}

export default async function NoticePage() {
  const notices = await getNotices();

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-8">공지사항</h2>
        <div className="space-y-4">
          {notices.map((notice) => (
            <Link href={`/notice/${notice.id}`} key={notice.id} className="block">
              <Card className="transition-shadow hover:shadow-md">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl flex items-center">
                      <Megaphone className="w-5 h-5 mr-2 text-primary" />
                      {notice.title}
                    </CardTitle>
                    <div className="flex items-center space-x-2">
                      {notice.important && <Badge variant="destructive">중요</Badge>}
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    </div>
                  </div>
                  <CardDescription className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {notice.date}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-2">{notice.content}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
