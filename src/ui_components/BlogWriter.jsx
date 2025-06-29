import { BASE_URL } from "@/api";
import pic from "../images/pic.jpg"
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";
import defaultProfile from "../images/pic.jpg";

const BlogWriter = ({blog}) => {
   const imageUrl = blog.author.profile_picture
          ? `${BASE_URL}${blog.author.profile_picture}`
          : defaultProfile;
  return (
    <Link to={`/profile/${blog.author.username}`}>
        <div className="flex items-center gap=4 ">
        <span className="flex items-center gap-2">
          <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
            <img
                        src={imageUrl}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = defaultProfile;
                        }}
                        alt="Author"
                        className="c rounded-full w-full h-full object-cover"
                      />
          </div>

          <small className="text-[#6e7185] text-[18px]">
            {blog.author.first_name} {blog.author.last_name}
          </small>
        </span>

        <p className="text-base mx-5 text-[#A1A1AA] dark:text-[#97989F]">
          {formatDistanceToNow(new Date(blog.published_date), { addSuffix: true })}
        </p>


      </div>
    </Link>
  )
}

export default BlogWriter