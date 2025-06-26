import { FaCode } from "react-icons/fa"; // optional icon

const Badge = ({blog}) => {
  return (
    <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium bg-[#E0E7FF] text-[#4B6BFB] dark:bg-[#2A2B3C] dark:text-[#A5B4FC] rounded-full w-fit">
      <FaCode className="text-[10px]" />
      {blog?.category}
    </span>
  );
};

export default Badge;
