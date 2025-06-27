import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import BlogContainer from "@/ui_components/BlogContainer";
import BlogCard from "@/ui_components/BlogCard";
export const BASE_URL = import.meta.env.VITE_BASE_URL;

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${BASE_URL}/search?query=${query}`);
        setBlogs(res.data);
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, [query]);

  return (
    <div className="max-container px-4 py-6">
      <h2 className="text-2xl font-semibold mb-4 text-center dark:text-white">Search Results for "{query}"</h2>
      {loading ? (
        <p className="text-center dark:text-white">Loading...</p>
      ) : blogs.length === 0 ? (
        <p className="text-center dark:text-white">No blogs found.</p>
      ) : (
        <div className="flex items-center gap-10 justify-center flex-wrap">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
