import { NextResponse } from "next/server";

export async function GET() {
  try {
    const GITHUB_ACCESS_TOKEN = process.env.GITHUB_ACCESS_TOKEN;
    if (!GITHUB_ACCESS_TOKEN) {
      return NextResponse.json(
        { message: "GitHub access token not found" },
        { status: 500 }
      );
    }

    // GitHub API URL 설정 (특정 폴더에서 포스트를 가져오기)
    const response = await fetch(
      "https://api.github.com/repos/holinessnine/viba_blog/contents/post/2024",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${GITHUB_ACCESS_TOKEN}`,
        },
      }
    );

    const result = await response.json();

    if (response.ok) {
      // 최근 포스트 데이터를 정렬하고 3개만 반환
      const recentPosts = result
        .filter((file: any) => file.type === "file" && file.name.endsWith(".md"))
        .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 3);

      return NextResponse.json({ posts: recentPosts }, { status: 200 });
    } else {
      console.error("GitHub API Error:", result);
      return NextResponse.json(
        { message: "Error fetching posts", details: result },
        { status: response.status }
      );
    }
  } catch (error) {
    console.error("API 요청 중 오류 발생:", error);
    return NextResponse.json(
      { message: "Internal server error", error: (error as Error).message },
      { status: 500 }
    );
  }
}
