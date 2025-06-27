import pic from "../images/pic.jpg"
import { FaInstagram } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { FaYoutube } from "react-icons/fa";
import { BASE_URL } from "@/api";
import { HiPencilAlt } from "react-icons/hi";

const Hero = ({userInfo,authusername,toggleModal }) => {
  return (
    <div className="padding-x py-9 max-container flex flex-col items-center justify-center gap-4 bg-[#F6F6F7] dark:bg-[#242535] rounded-md">
    <div className="flex gap-4">
      <div className="w-[70px] h-[70px] rounded-full overflow-hidden">
        <img
          src={`${userInfo?.profile_picture}`}
          className="w-[70px] h-[70px] rounded-full object-cover"
        />
      </div>

      <span>
        <p className="text-[18px] text-[#181A2A] dark:text-white">
          {userInfo?.first_name} {userInfo?.last_name}</p>
        <p className="text-[14px] text-[#696A75] font-thin dark:text-[#BABABF]">
          {userInfo?.job_title || " "}
        </p>
      </span>
      {userInfo?.username === authusername && (
          <span>
            <HiPencilAlt
              className="dark:text-white text-2xl cursor-pointer"
              onClick={toggleModal}
            />
          </span>
        )}
    </div>

    <p className="text-[#3B3C4A] text-[16px] max-md:leading-[2rem] lg:leading-normal lg:mx-[200px] text-center dark:text-[#BABABF]">
      {userInfo?.bio}
    </p>

    <div className="flex gap-5 justify-center items-center text-xl">
        <div className="w-[45px] h-[45px] rounded-lg flex justify-center items-center bg-white shadow-md dark:bg-[#2d2e3f]">
            <FaInstagram className="text-[#141624] dark:text-white hover:text-[#E1306C] dark:hover:text-[#E1306C] cursor-pointer" />
        </div>
        <div className="w-[45px] h-[45px] rounded-lg flex justify-center items-center bg-white shadow-md dark:bg-[#2d2e3f]">
            <FaFacebookF className="text-[#141624] dark:text-white hover:text-[#4267B2] dark:hover:text-[#4267B2] cursor-pointer" />
        </div>
        <div className="w-[45px] h-[45px] rounded-lg flex justify-center items-center bg-white shadow-md dark:bg-[#2d2e3f]">    
            <BsTwitterX className="text-[#141624] dark:text-white hover:text-[#1DA1F2] dark:hover:text-[#1DA1F2] cursor-pointer" />
        </div>
        <div className="w-[45px] h-[45px] rounded-lg flex justify-center items-center bg-white shadow-md dark:bg-[#2d2e3f]">
            <FaYoutube className="text-[#141624] dark:text-white hover:text-[#FF0000] dark:hover:text-[#FF0000] cursor-pointer" />
        </div>
    </div>

  </div>
  )
}

export default Hero