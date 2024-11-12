import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const GITHUB_ACCESS_TOKEN = process.env.GITHUB_ACCESS_TOKEN;

  if (!GITHUB_ACCESS_TOKEN) {
    return res.status(500).json({ message: 'GitHub Access Token not found' });
  }

  const { username, content } = req.body;

  try {
    // 기존 파일 가져오기
    const getResponse = await fetch(`https://api.github.com/repos/holinessnine/viba_blog/contents/bamboos/comments.json`, {
      headers: {
        Authorization: `Bearer ${GITHUB_ACCESS_TOKEN}`,
      },
    });

    if (!getResponse.ok) {
      throw new Error('Failed to fetch existing comments');
    }

    const getData = await getResponse.json();
    const existingComments = JSON.parse(Buffer.from(getData.content, 'base64').toString('utf-8'));

    // 새로운 댓글 추가
    const newComment = {
      id: existingComments.length + 1,
      username,
      content,
      timestamp: new Date().toISOString(),
    };
    const updatedComments = [newComment, ...existingComments];

    // 업데이트된 댓글을 GitHub에 업로드
    const response = await fetch(`https://api.github.com/repos/holinessnine/viba_blog/contents/bamboos/comments.json`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${GITHUB_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'Add new comment',
        content: Buffer.from(JSON.stringify(updatedComments)).toString('base64'),
        sha: getData.sha, // 기존 파일의 SHA를 포함해야 함
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to update comments on GitHub');
    }

    res.status(200).json({ message: 'Comment added successfully' });
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ message: 'Error adding comment' });
  }
}
