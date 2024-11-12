"use client";

import Layout from "@/components/Layout";
import RecentPosts from "@/components/RecentPosts";

export default function Home() {
  return (
    <Layout>
      <section className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-4">Welcome to VIBA</h1>
        <p className="text-xl text-gray-600">
          Explore our Blog and Events for the latest updates!
        </p>
      </section>

      {/* 링크 버튼 섹션 */}
      <section className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => window.open("https://www.notion.so/parklab/32ec67c84fb74b9691ec6cc7a5956c4a?v=12e34fccb7434e55b5290ee4149534b9", "_blank")}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition w-60"
        >
          Weekly Report 쓰러가기
        </button>
        <button
          onClick={() => window.open("https://www.notion.so/parklab/Lab-Seminar-9a35d91f8b2a4e07910c745c4b8812f9", "_blank")}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition w-60"
        >
          Lab Seminar 자료실
        </button>
        <button
          onClick={() => window.open("https://vibalab.org", "_blank")}
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition w-60"
        >
          연구실 홈페이지(짭)
        </button>
      </section>


      <section className="mb-8">
        <RecentPosts />
      </section>
    </Layout>
  );
}
