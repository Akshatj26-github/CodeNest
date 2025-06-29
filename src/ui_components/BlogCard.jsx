import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import Badge from './Badge';
import CardFooter from './CardFooter';
import defaultBanner from "../images/detailBanner.jpg";
import { Link } from 'react-router-dom';
import { BASE_URL } from '@/api';
import { likeBlog } from "@/services/apiBlog";

const BlogCard = ({ blog }) => {
  const imageUrl = blog.featured_image && blog.featured_image.trim() !== "" ? 
                    blog.featured_image : defaultBanner;

  console.log(imageUrl);
  const [isLiked, setIsLiked] = useState(blog.is_liked || false);
  const [likeCount, setLikeCount] = useState(blog.total_likes || 0);
  const [loading, setLoading] = useState(false);

  const handleLike = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const data = await likeBlog(blog.id);
      setIsLiked(data.liked);
      setLikeCount(data.total_likes);
    } catch (err) {
      console.error("Failed to like blog:", err.message);
    }
    setLoading(false);
  };

  return (
    <div className="px-3 py-3 rounded-md w-[300px] h-auto flex flex-col gap-4 dark:border-gray-800 border shadow-lg">
      <div className="w-full h-[200px] border rounded-md overflow-hidden">
       <img
        src={imageUrl}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = defaultBanner;
        }}
        className="w-full h-full object-cover rounded-lg"
        alt="Blog thumbnail"
      />
      </div>

      <Badge blog={blog} />

      <Link to={`/blogs/${blog.id}`}>
        <h3 className="font-semibold leading-normal text-[#181A2A] mb-0 dark:text-white">
          {blog.title}
        </h3>
      </Link>

      <CardFooter blog={blog} />

      <div className="flex justify-between items-center mt-2">
        <button
          onClick={handleLike}
          disabled={loading}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-red-600 dark:text-gray-300 dark:hover:text-red-500 transition-colors duration-200"
        >
          {isLiked ? (
            <FaHeart className="text-red-600" />
          ) : (
            <FaRegHeart className="text-gray-500" />
          )}
          <span>{likeCount}</span>
        </button>
      </div>
    </div>
  );
};

export default BlogCard;
