// app/blog/page.js
import { getPaginatedPosts } from "@/actions/blog";
import { BlogPostsList } from "../_components/blog/blogPosts";
import { LoadMoreButton } from "../_components/blog/blogLoadMoreButton";

const Blog = async ({ searchParams }) => {
  const page = parseInt(searchParams.page) || 1;
  const { posts = [], totalPages = 1 } = await getPaginatedPosts(page, 10);

  return (
    <div className="mx-auto mt-10 flex w-full max-w-6xl select-none flex-col px-4 pb-16 sm:px-6">
      <h3 className="mb-6 text-2xl font-bold text-gray-800">مقالات اخیر</h3>

      <BlogPostsList posts={posts} />

      {posts.length > 0 && page < totalPages && (
        <LoadMoreButton currentPage={page} />
      )}
    </div>
  );
};

export default Blog;
