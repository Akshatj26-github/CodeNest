import { BASE_URL } from "@/api";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";
import defaultProfile from "../images/pic.jpg";

const CardFooter = ({blog}) => {
  const imageUrl =
  blog.author?.profile_picture && blog.author.profile_picture.trim() !== ""
    ? blog.author.profile_picture
    : defaultProfile;

  return (
    <Link to={`/profile/${blog.author.username}`}>
        <div className="flex items-center justify-between mt-2">
        {/* Author */}
        <div className="flex items-center gap-2">
            <img
            src={imageUrl}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = defaultProfile;
            }}
            alt="Author"
            className="w-8 h-8 rounded-full object-cover"
          />
          <p className="text-sm text-[#696A75] dark:text-[#97989F] font-medium">
            {blog.author.first_name} {blog.author.last_name}
          </p>
        </div>

        {/* Date */}
        <p className="text-sm text-[#A1A1AA] dark:text-[#97989F]">
          {formatDistanceToNow(new Date(blog.published_date), { addSuffix: true })}
        </p>
      </div>
    </Link>
  );
};

export default CardFooter;
