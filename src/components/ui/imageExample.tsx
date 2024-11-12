import {
  Bookmark,
  CalendarDays,
  Heart,
  MessageCircle,
  Repeat2,
} from "lucide-react";
import Image from "next/image";
import Template from "/public/template.svg";
import UserProfile from "/public/user.png";

export const ImageTemplate = () => {
  return (
    <>
      <div className="flex flex-col items-center">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="mt-10 w-[800px]">
            <div className="flex gap-4 items-center justify-between">
              <div className="flex gap-4 items-center">
                <div className="bg-zinc-300 rounded-full p-2 border-2 border-red-500">
                  <Image src={UserProfile} alt="profile" className="w-7 h-7" />
                </div>
                <div className="flex flex-col mb-5">
                  <p className="text-lg font-medium">
                    User{index + 1}{" "}
                    <span className="text-zinc-500">· {index + 1}h</span>
                  </p>
                  <p className="text-sm text-zinc-500 leading-[10px]">
                    @user.{index + 1}
                  </p>
                </div>
                <div className="absolute right-[220px]">
                  <CalendarDays className="text-zinc-500" />
                </div>
              </div>
            </div>
            <div className="relative w-full flex flex-col justify-between">
              <Image
                src={Template}
                alt="example"
                className="w-[740px] h-[400px] rounded-md"
              />

              <div className="flex px-16 gap-5 mt-2 text-zinc-500">
                <Heart className="cursor-pointer hover:text-red-500" />
                <MessageCircle className="cursor-pointer hover:text-blue-500" />
                <Repeat2 className="cursor-pointer hover:text-green-500" />
                <Bookmark className="cursor-pointer hover:text-yellow-500" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
