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

      <section className="mb-8">
        <RecentPosts />
      </section>
    </Layout>
  );
}