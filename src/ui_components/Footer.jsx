import { FaInstagram } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { FaYoutube } from "react-icons/fa";
import { CiMail } from "react-icons/ci";

const Footer = () => {
  return (
    <footer className="bg-[#F6F6F7] padding-x py-16 max-container dark:bg-[#141624]">
    <div className="flex max-lg:gap-9 lg:gap-4 flex-wrap max-md:justify-center justify-between">
      <div className="w-[300px] flex flex-col gap-6 max-md:items-center">
        <h1 className="text-[#141624] text-2xl dark:text-[#FFFFFF] ">
          🪺CodeNest
        </h1>

        <p className="text-[16px] text-[#696A75] leading-[1.5]  max-md:text-center dark:text-[#97989F]">
          At CodeNest, we believe in building more than just code - we craft stories, grow communities, and spark ideas. Join us on a journey where every keystroke shapes a better digital world.
        </p>
      </div>

      <div className="text-[#181A2A] text-[14px] flex flex-col gap-4 px-4 max-md:items-center">
        <p className=" font-semibold text-[16px] dark:text-white">
          Quick Links
        </p>
        <ul className="flex flex-col gap-4  text-[#3B3C4A] max-md:items-center dark:text-[#97989F]">
          <li>Home</li>
          <li>About</li>
          <li>Blog</li>
          <li>Archived</li>
          <li>Author</li>
          <li>Contact</li>
        </ul>
      </div>

      <div className="text-[#181A2A] text-[14px] flex flex-col gap-4 px-4 max-md:items-center">
        <p className=" font-semibold text-[16px] dark:text-white">Category</p>
        <ul className="flex flex-col gap-4  text-[#3B3C4A] max-md:items-center dark:text-[#97989F]">
          <li>Lifestyle</li>
          <li>Technology</li>
          <li>Travel</li>
          <li>Business</li>
          <li>Economy</li>
          <li>Sports</li>
        </ul>
      </div>

      <div className="bg-white w-[350px] px-6 flex flex-col items-center justify-center gap-2  rounded-lg dark:bg-[#242535] py-6">
        <h3 className="font-semibold text-xl  dark:text-white">
          Weekly Newsletter
        </h3>
        <p className="text-[#696A75] text-[16px] mb-5 dark:text-[#97989F]">
          Get blog articles and offers via email
        </p>
        <div className="w-full relative">
          <input
            placeholder="Your Email"
            className="border border-[#DCDDDF] rounded-sm h-[40px] px-3 py-3 w-full text-[14px] dark:bg-[#181A2A] dark:text-white"
          />
          <CiMail className="absolute top-[12px] right-[10px] text-[16px] dark:text-[#97989F]" />
        </div>
        <button className="bg-[#4B6BFB] text-[#FFFFFF] text-[16px] rounded-md w-full py-3 hover:bg-red-600">
          Subscribe
        </button>
      </div>
    </div>

    <div className="border-t border-gray-300 dark:border-gray-700 mt-12 pt-6 text-sm flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto">
        <p className="text-[#696A75] dark:text-[#97989F]">
          © {new Date().getFullYear()} 🪺CodeNest. All rights reserved.
        </p>

        <div className="flex gap-4 mt-4 md:mt-0 dark:text-white" >
          <FaInstagram className="text-[#141624] dark:text-white hover:text-[#E1306C] dark:hover:text-[#E1306C] cursor-pointer" />
          <FaFacebookF className="text-[#141624] dark:text-white hover:text-[#4267B2] dark:hover:text-[#4267B2] cursor-pointer" />
          <BsTwitterX className="text-[#141624] dark:text-white hover:text-[#1DA1F2] dark:hover:text-[#1DA1F2] cursor-pointer" />
          <FaYoutube className="text-[#141624] dark:text-white hover:text-[#FF0000] dark:hover:text-[#FF0000] cursor-pointer" />
        </div>
      </div>
  </footer>
  )
}

export default Footer