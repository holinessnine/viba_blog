import { NextResponse } from "next/server";

export async function GET(request: Request, imageNames: string[]) {
  const GITHUB_ACCESS_TOKEN = process.env.GITHUB_ACCESS_TOKEN;
  if (!GITHUB_ACCESS_TOKEN) {
    return NextResponse.json(
      { message: "GitHub Access Token missing" },
      { status: 500 }
    );
  }

  const images = [];

  for (const name of imageNames) {
    try {
      const res = await fetch(
        `https://api.github.com/repos/holinessnine/viba_blog/contents/images/${encodeURIComponent(name)}`,
        {
          headers: {
            Authorization: `Bearer ${GITHUB_ACCESS_TOKEN}`,
          },
          cache: "no-store",
        }
      );

      if (!res.ok) {
        const errorDetails = await res.json();
        console.error(`Error fetching image ${name}:`, errorDetails.message);
        continue; // 이미지 가져오기에 실패하면 다음 이미지로 넘어갑니다.
      }

      const imageData = await res.json();

      if (imageData && imageData.content) {
        const imageBuffer = Buffer.from(imageData.content, 'base64');
        const imageUrl = `data:${imageData.type};base64,${imageData.content}`;

        images.push({
          name: name,
          url: imageUrl,
        });
      }
    } catch (error) {
      console.error(`Error processing image ${name}:`, error);
    }
  }

  return NextResponse.json({ images }, { status: 200 });
}
