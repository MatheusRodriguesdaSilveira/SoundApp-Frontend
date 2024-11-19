"use client";

import { NavBar } from "../home/components/header";
import { SideBarColumn } from "../home/components/sidebarColumn";
import Image from "next/image";
import UserProfile from "/public/user.png";
import Template from "/public/template.png";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { DialogEditProfile } from "../home/components/dialogEditProfile";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import { api } from "@/services/api";

interface UserData {
  name: string;
  email: string;
}

const ProfilePage = () => {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = getCookie("login");

        if (!token) {
          throw new Error("Token não encontrado");
        }

        const response = await api.get("/info", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUserData(response.data);
      } catch (error) {
        router.push("/home");
      }
    };

    fetchUserData();
  }, [router]);

  if (!userData) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <h1 className="text-zinc-400 m-2">Carregando</h1>
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-red-500" />
      </div>
    );
  }

  return (
    <>
      <NavBar />
      <SideBarColumn />
      <div className="m-10 flex justify-center items-center">
        <div className="bg-zinc-200 rounded-full xl:p-7 2xl:p-10 border-2 border-red-500 flex-shrink-0">
          <Image
            src={UserProfile}
            alt="profile"
            className="2xl:w-12 2xl:h-12 xl:w-7 xl:h-7"
          />
        </div>
        <div className="mx-16">
          <div className="flex-col flex my-5 gap-5">
            <p className="text-lg text-zinc-500 leading-[10px]">
              {userData.email}
            </p>
            <p className="text-2xl font-medium">{userData.name}</p>
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
        <DropdownMenuSeparator className="xl:w-6/12 2xl:w-5/12" />
      </div>

      <div className="justify-center items-center flex">
        <div className="grid xl:grid-cols-2 2xl:grid-cols-3 gap-10">
          {[...Array(6)].map((_, index) => (
            <Image
              key={index}
              src={Template}
              alt="example"
              className="w-[300px] h-[300px] rounded-lg"
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
