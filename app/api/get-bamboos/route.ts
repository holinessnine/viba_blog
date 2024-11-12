import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const GITHUB_ACCESS_TOKEN = process.env.GITHUB_ACCESS_TOKEN;

  if (!GITHUB_ACCESS_TOKEN) {
    return res.status(500).json({ message: 'GitHub Access Token not found' });
  }

  try {
    const response = await fetch(`https://api.github.com/repos/holinessnine/viba_blog/contents/bamboos/comments.json`, {
      headers: {
        Authorization: `Bearer ${GITHUB_ACCESS_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch comments from GitHub');
    }

    const data = await response.json();
    const content = Buffer.from(data.content, 'base64').toString('utf-8');
    const comments = JSON.parse(content);

    res.status(200).json({ comments });
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ message: 'Error fetching comments' });
  }
}
