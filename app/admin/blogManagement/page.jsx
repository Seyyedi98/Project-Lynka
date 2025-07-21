"use client";
import React, { useState } from "react";
import {
  getPaginatedPosts,
  createBlogPost,
  deleteBlogPost,
} from "@/actions/admin/admin-blog";

const BlogManagement = () => {
  const [posts, setPosts] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    images: "",
    postData: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Load posts on component mount
  React.useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    setIsLoading(true);
    try {
      const { posts } = await getPaginatedPosts(1, 10);
      setPosts(posts);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (editingId) {
        await updateBlogPost(editingId, formData);
      } else {
        await createBlogPost(formData);
      }
      await loadPosts();
      setFormData({ title: "", description: "", images: "", postData: "" });
      setEditingId(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (post) => {
    setFormData({
      title: post.title,
      description: post.description || "",
      images: post.images,
      postData: post.postData,
    });
    setEditingId(post.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("آیا مطمئن هستید می‌خواهید این پست را حذف کنید؟")) {
      setIsLoading(true);
      try {
        await deleteBlogPost(id);
        await loadPosts();
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div dir="ltr" className="mr-16 p-2 md:mr-64">
      <div className="border-2 border-b-[#808080] border-l-[#dfdfdf] border-r-[#808080] border-t-[#dfdfdf] bg-[#c0c0c0] shadow-[inset_1px_1px_0px_0px_#000000]">
        {/* Window Title */}
        <div className="flex h-6 items-center bg-gradient-to-r from-[#000080] to-[#1084d0] px-2 text-white">
          <span className="text-sm">Blog</span>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="mb-6">
            <h1 className="text-xl font-bold">Blog</h1>
            <p className="text-gray-600">Create and Edit Posts</p>
          </div>

          {/* Blog Form */}
          <div className="mb-8 border-2 border-b-[#dfdfdf] border-l-[#808080] border-r-[#dfdfdf] border-t-[#808080] p-2">
            <h2 className="mb-2 text-lg font-bold">
              {editingId ? "Edit" : "Create Post"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="mb-1 block">Title:</label>
                <input
                  type="text"
                  className="w-full border-2 border-b-[#dfdfdf] border-l-[#808080] border-r-[#dfdfdf] border-t-[#808080] p-1"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-3">
                <label className="mb-1 block">Short Description:</label>
                <textarea
                  className="w-full border-2 border-b-[#dfdfdf] border-l-[#808080] border-r-[#dfdfdf] border-t-[#808080] p-1"
                  rows="2"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </div>
              <div className="mb-3">
                <label className="mb-1 block">Image Url:</label>
                <input
                  type="text"
                  className="w-full border-2 border-b-[#dfdfdf] border-l-[#808080] border-r-[#dfdfdf] border-t-[#808080] p-1"
                  value={formData.images}
                  onChange={(e) =>
                    setFormData({ ...formData, images: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-3">
                <label className="mb-1 block">Content:</label>
                <textarea
                  className="w-full border-2 border-b-[#dfdfdf] border-l-[#808080] border-r-[#dfdfdf] border-t-[#808080] p-1"
                  rows="5"
                  value={formData.postData}
                  onChange={(e) =>
                    setFormData({ ...formData, postData: e.target.value })
                  }
                  required
                />
              </div>
              <div className="flex gap-2">
                <Window95Button type="submit" disabled={isLoading}>
                  {editingId ? "Save Changes" : "Create Post"}
                </Window95Button>
                {editingId && (
                  <Window95Button
                    type="button"
                    onClick={() => {
                      setFormData({
                        title: "",
                        description: "",
                        images: "",
                        postData: "",
                      });
                      setEditingId(null);
                    }}
                    disabled={isLoading}
                  >
                    انصراف
                  </Window95Button>
                )}
              </div>
            </form>
          </div>

          {/* Posts List */}
          <div className="border-2 border-b-[#dfdfdf] border-l-[#808080] border-r-[#dfdfdf] border-t-[#808080] p-2">
            <h2 className="mb-2 text-lg font-bold">Posts list</h2>
            {isLoading && posts.length === 0 ? (
              <p>Loading...</p>
            ) : posts.length === 0 ? (
              <p>No Post Found</p>
            ) : (
              <div className="space-y-4">
                {posts.map((post) => (
                  <div
                    key={post.id}
                    className="border-2 border-b-[#dfdfdf] border-l-[#808080] border-r-[#dfdfdf] border-t-[#808080] p-2"
                  >
                    <h3 className="font-bold">{post.title}</h3>
                    <p className="text-sm text-gray-600">
                      {post.description || "No Description"}
                    </p>
                    <div className="mt-2 flex gap-2">
                      <Window95Button
                        onClick={() => handleEdit(post)}
                        disabled={isLoading}
                      >
                        Edit
                      </Window95Button>
                      <Window95Button
                        onClick={() => handleDelete(post.id)}
                        disabled={isLoading}
                      >
                        Delete
                      </Window95Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogManagement;

const Window95Button = ({
  children,
  onClick,
  type = "button",
  disabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`relative border-2 border-b-[#808080] border-l-[#ffffff] border-r-[#808080] border-t-[#ffffff] bg-[#c0c0c0] px-3 py-1 text-sm font-medium shadow-[1px_1px_0px_0px_#000000] active:border-b-[#ffffff] active:border-l-[#808080] active:border-r-[#ffffff] active:border-t-[#808080] active:shadow-[1px_1px_0px_0px_#000000_inset] disabled:opacity-50`}
    >
      {children}
    </button>
  );
};
