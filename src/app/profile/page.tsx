import { NavBar } from "../home/components/header";
import { SideBarColumn } from "../home/components/sidebarColumn";
import Image from "next/image";
import UserProfile from "/public/user.png";
import Template from "/public/template.png";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { DialogEditProfile } from "../home/components/dialogEditProfile";

const ProfilePage = () => {
  return (
    <>
      <NavBar />
      <SideBarColumn />
      <div className="m-10 flex justify-center items-center">
        <div className="bg-zinc-200 rounded-full p-10 border-2 border-red-500 flex-shrink-0">
          <Image src={UserProfile} alt="profile" className="w-12 h-12" />
        </div>
        <div className="mx-16">
          <div className="flex-col flex my-5 gap-5">
            <p className="text-lg text-zinc-500 leading-[10px]">
              @user.profile
            </p>
            <p className="text-2xl font-medium">User</p>
            <div className="flex gap-5">
              <p className="text- text-zinc-200 leading-[10px]">
                {0} publicações
              </p>
              <p className="text- text-zinc-200 leading-[10px]">
                {0} seguidores
              </p>
              <p className="text- text-zinc-200 leading-[10px]">
                {311} seguindo
              </p>
            </div>
          </div>
        </div>
        <div className="">
          <DialogEditProfile />
        </div>
      </div>
      <div className="mb-10 flex justify-center items-center">
        <DropdownMenuSeparator className="w-5/12" />
      </div>

      <div className="justify-center items-center flex">
        <div className="grid grid-cols-3 gap-10">
          {[...Array(6)].map((_, index) => (
            <Image
              key={index}
              src={Template}
              alt="example"
              className="w-[300px] h-[300px] rounded-md"
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
