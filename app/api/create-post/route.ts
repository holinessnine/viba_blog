import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { title, content } = await request.json();
  
    if (!title || !content) {
      return NextResponse.json(
        { message: "Title and content are required" },
        { status: 400 }
      );
    }
  
    const GITHUB_ACCESS_TOKEN = process.env.GITHUB_ACCESS_TOKEN;
    console.log("GitHub Access Token 확인:", GITHUB_ACCESS_TOKEN ? "토큰 존재" : "토큰 없음");
  
    if (!GITHUB_ACCESS_TOKEN) {
      return NextResponse.json(
        { message: "GitHub access token not found" },
        { status: 500 }
      );
    }
  
    const fileName = `${title.replace(/\s+/g, "-").toLowerCase()}.md`;
    const filePath = `post/2024/${fileName}`;
  
    const response = await fetch(
      `https://api.github.com/repos/holinessnine/viba_blog/contents/${filePath}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${GITHUB_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: `Add new post: ${title}`,
          content: Buffer.from(content).toString("base64"),
        }),
      }
    );
  
    const result = await response.json();
    console.log("GitHub API 응답 상태 코드:", response.status);
    console.log("GitHub API 응답 내용:", result);
  
    if (response.ok) {
      return NextResponse.json(
        { message: "Post created successfully", details: result },
        { status: 200 }
      );
    } else {
      console.error("GitHub API Error:", result);
      return NextResponse.json(
        { message: "Error creating post", details: result },
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
