"use client";
import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import {
  getPaginatedPosts,
  createBlogPost,
  deleteBlogPost,
  updateBlogPost,
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
  const [activeTab, setActiveTab] = useState("edit"); // "edit" or "preview"

  // Load posts on component mount
  useEffect(() => {
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
      setActiveTab("edit");
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
    setActiveTab("edit");
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
          <span className="text-sm">Blog Management</span>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="mb-6">
            <h1 className="text-xl font-bold">Blog Management</h1>
            <p className="text-gray-600">Create and Edit Posts with Markdown</p>
          </div>

          {/* Blog Form */}
          <div className="mb-8 border-2 border-b-[#dfdfdf] border-l-[#808080] border-r-[#dfdfdf] border-t-[#808080] p-2">
            <h2 className="mb-2 text-lg font-bold">
              {editingId ? "Edit Post" : "Create New Post"}
            </h2>

            {/* Tab Navigation */}
            <div className="mb-3 flex border-b-2 border-[#808080]">
              <button
                type="button"
                className={`px-4 py-2 text-sm font-medium ${
                  activeTab === "edit"
                    ? "border-2 border-b-[#c0c0c0] border-l-[#808080] border-r-[#808080] border-t-[#808080] bg-[#c0c0c0]"
                    : "border border-transparent"
                }`}
                onClick={() => setActiveTab("edit")}
              >
                Edit Markdown
              </button>
              <button
                type="button"
                className={`px-4 py-2 text-sm font-medium ${
                  activeTab === "preview"
                    ? "border-2 border-b-[#c0c0c0] border-l-[#808080] border-r-[#808080] border-t-[#808080] bg-[#c0c0c0]"
                    : "border border-transparent"
                }`}
                onClick={() => setActiveTab("preview")}
              >
                Preview
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="mb-1 block text-sm font-bold">Title:</label>
                <input
                  type="text"
                  className="w-full border-2 border-b-[#dfdfdf] border-l-[#808080] border-r-[#dfdfdf] border-t-[#808080] bg-white p-1 text-right"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                  dir="rtl"
                />
              </div>

              <div className="mb-3">
                <label className="mb-1 block text-sm font-bold">
                  Short Description:
                </label>
                <textarea
                  className="w-full border-2 border-b-[#dfdfdf] border-l-[#808080] border-r-[#dfdfdf] border-t-[#808080] bg-white p-1 text-right"
                  rows="2"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="توضیح مختصر درباره پست..."
                  dir="rtl"
                />
              </div>

              <div className="mb-3">
                <label className="mb-1 block text-sm font-bold">
                  Image URL:
                </label>
                <input
                  type="text"
                  className="w-full border-2 border-b-[#dfdfdf] border-l-[#808080] border-r-[#dfdfdf] border-t-[#808080] bg-white p-1 text-right"
                  value={formData.images}
                  onChange={(e) =>
                    setFormData({ ...formData, images: e.target.value })
                  }
                  placeholder="https://example.com/image.jpg"
                  dir="rtl"
                />
                {formData.images && (
                  <div className="mt-2">
                    <img
                      src={formData.images}
                      alt="Preview"
                      className="max-h-32 border-2 border-[#808080]"
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  </div>
                )}
              </div>

              <div className="mb-3">
                <label className="mb-1 block text-sm font-bold">
                  Content ({activeTab === "edit" ? "Markdown" : "Preview"}):
                </label>

                {activeTab === "edit" ? (
                  <div>
                    <textarea
                      className="w-full border-2 border-b-[#dfdfdf] border-l-[#808080] border-r-[#dfdfdf] border-t-[#808080] bg-white p-1 text-right font-mono text-sm"
                      rows="12"
                      value={formData.postData}
                      onChange={(e) =>
                        setFormData({ ...formData, postData: e.target.value })
                      }
                      placeholder={`# به وبلاگ من خوش آمدید!

محتوای خود را با استفاده از **Markdown** بنویسید...

## ویژگی‌ها:
- *آسان* برای فرمت‌دهی
- **قدرتمند** و ساده
- پشتیبانی از کدهای برنامه‌نویسی

\`\`\`javascript
// کد شما اینجا
console.log("سلام دنیا!");
\`\`\`

> محتوای عالی از اینجا شروع می‌شود!`}
                      required
                      dir="rtl"
                    />
                    <div className="mt-1 text-right text-xs text-gray-600">
                      💡 از سینتکس Markdown برای فرمت‌دهی استفاده کنید
                    </div>
                  </div>
                ) : (
                  <div
                    className="min-h-[200px] overflow-auto border-2 border-b-[#dfdfdf] border-l-[#808080] border-r-[#dfdfdf] border-t-[#808080] bg-white p-3"
                    dir="rtl"
                  >
                    {formData.postData ? (
                      <div className="prose max-w-none text-right">
                        <ReactMarkdown>{formData.postData}</ReactMarkdown>
                      </div>
                    ) : (
                      <p className="text-center text-gray-500">
                        محتوایی برای پیش‌نمایش وجود ندارد. برای نوشتن پست به تب
                        Edit بروید.
                      </p>
                    )}
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <Window95Button type="submit" disabled={isLoading}>
                  {isLoading
                    ? "در حال پردازش..."
                    : editingId
                      ? "ذخیره تغییرات"
                      : "ایجاد پست"}
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
                      setActiveTab("edit");
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
          <div
            dir="rtl"
            className="border-2 border-b-[#dfdfdf] border-l-[#808080] border-r-[#dfdfdf] border-t-[#808080] p-2"
          >
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-lg font-bold">Posts List</h2>
              <div className="text-sm text-gray-600">
                Total: {posts.length} posts
              </div>
            </div>

            {isLoading && posts.length === 0 ? (
              <div className="p-4 text-center">
                <div className="inline-block h-6 w-6 animate-spin rounded-full border-b-2 border-[#000080]"></div>
                <p className="mt-2">Loading posts...</p>
              </div>
            ) : posts.length === 0 ? (
              <div className="p-4 text-center text-gray-500" dir="rtl">
                <p>هیچ پستی یافت نشد.</p>
                <p className="mt-1 text-sm">
                  اولین پست خود را در بالا ایجاد کنید!
                </p>
              </div>
            ) : (
              <div className="max-h-96 space-y-3 overflow-y-auto">
                {posts.map((post) => (
                  <div
                    key={post.id}
                    className="border-2 border-b-[#dfdfdf] border-l-[#808080] border-r-[#dfdfdf] border-t-[#808080] bg-white p-3"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1" dir="rtl">
                        <h3 className="text-right font-bold text-[#000080]">
                          {post.title}
                        </h3>
                        <p className="mt-1 text-right text-sm text-gray-600">
                          {post.description || "توضیحی ارائه نشده است"}
                        </p>
                        <div className="mt-2 text-left text-xs text-gray-500">
                          {post.createdAt && (
                            <span>
                              Created:{" "}
                              {new Date(post.createdAt).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="ml-4 flex gap-2">
                        <Window95Button
                          onClick={() => handleEdit(post)}
                          disabled={isLoading}
                          size="sm"
                        >
                          Edit
                        </Window95Button>
                        <Window95Button
                          onClick={() => handleDelete(post.id)}
                          disabled={isLoading}
                          size="sm"
                        >
                          Delete
                        </Window95Button>
                      </div>
                    </div>

                    {/* Quick content preview */}
                    {post.postData && (
                      <div
                        className="mt-2 max-h-20 overflow-hidden border border-[#808080] bg-gray-100 p-2 text-xs"
                        dir="rtl"
                      >
                        <div className="prose prose-sm max-w-none text-right">
                          <ReactMarkdown>
                            {post.postData.length > 150
                              ? post.postData.substring(0, 150) + "..."
                              : post.postData}
                          </ReactMarkdown>
                        </div>
                      </div>
                    )}
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
  size = "md",
}) => {
  const sizeClasses = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1 text-sm",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`relative border-2 border-b-[#808080] border-l-[#ffffff] border-r-[#808080] border-t-[#ffffff] bg-[#c0c0c0] font-medium shadow-[1px_1px_0px_0px_#000000] active:border-b-[#ffffff] active:border-l-[#808080] active:border-r-[#ffffff] active:border-t-[#808080] active:shadow-[1px_1px_0px_0px_#000000_inset] disabled:cursor-not-allowed disabled:opacity-50 ${sizeClasses[size]}`}
    >
      {children}
    </button>
  );
};
