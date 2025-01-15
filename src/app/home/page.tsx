"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NavBar } from "./components/header";
import { SideBarColumn } from "./components/sidebarColumn";
import { ForYouPage } from "./components/foryouPage";
import { FollowersPage } from "./components/followers";
import { ButtonScrollToTop } from "@/components/ui/buttonScrollToTop";

import Image from "next/image";
import UserProfile from "/public/user.png";
import { FormPostTop } from "./components/formPostTop";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import { api } from "@/services/api";

interface UserData {
  name: string;
  email: string;
  profilePicture: string;
  descriptionProfile: string;
}

const HomePage = () => {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = getCookie("login");

        if (!token) {
          throw new Error("Token not found");
        }

        const response = await api.get("/info", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUserData(response.data);
      } catch (error) {
        console.error("Error loading user data:", error);
        router.push("/home");
      }
    };

    fetchUserData();
  }, [router]);

  if (!userData) {
    return (
      <div className="flex flex-col justify-center items-center h-screen z-0">
        <h1 className="text-zinc-400 m-2">Carregando...</h1>
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-red-500" />
      </div>
    );
  }
  return (
    <>
      <NavBar />
      <SideBarColumn />
      <ButtonScrollToTop />
      <div className="flex flex-col items-center justify-center m-8">
        <Tabs defaultValue="forYou" className="w-[600px]">
          {/* Tabs */}
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="forYou">Para você</TabsTrigger>
            <TabsTrigger value="followers">Seguindo</TabsTrigger>
          </TabsList>

          {/* PostTop */}
          <div className="flex items-start justify-start my-5">
            <div className="flex-shrink-0">
              <Image
                width={200}
                height={200}
                style={{ objectFit: "cover" }}
                src={userData?.profilePicture || UserProfile}
                alt="profile"
                className="xl:w-12 xl:h-12 lg:w-10 lg:h-10 h-2 w-2 rounded-full border border-red-500 "
              />
            </div>
            <div className="flex gap-2">
              <div className="grid mx-3">
                {/* Adicionar Postagem */}
                <FormPostTop />
              </div>
            </div>
          </div>

          {/* Tabs Contents */}
          <TabsContent value="forYou" className="w-full">
            <ForYouPage />
          </TabsContent>
          <TabsContent value="followers" className="w-full">
            <FollowersPage />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};
export default HomePage;
