"use client"; // 클라이언트 컴포넌트로 지정

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface Post {
  id: number;
  title: string;
  excerpt: string;
  publishedDate: string;
  imageUrl: string;
  slug: string; // 포스트의 링크에 사용할 슬러그
}

const RecentPosts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    // 서버에서 최근 포스트 데이터를 가져오는 API 호출
    fetch('/api/recent-posts')
      .then((response) => response.json())
      .then((data) => {
        // 최근 3개의 포스트만 가져오기
        setPosts(data.slice(0, 3));
      });
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">최근 게시물</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {posts.map((post) => (
          <div key={post.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <img src={post.imageUrl} alt={post.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">
                <Link href={`/posts/${post.slug}`}>
                  <a className="hover:underline">{post.title}</a>
                </Link>
              </h3>
              <p className="text-gray-600 text-sm mb-2">{post.excerpt}</p>
              <p className="text-gray-500 text-xs">{post.publishedDate}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentPosts;
