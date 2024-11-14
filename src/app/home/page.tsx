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
import { ImageIcon } from "lucide-react";
const HomePage = () => {
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
            <div className="bg-zinc-200 rounded-full p-2 hover:scale-105 border border-red-500">
              <Image src={UserProfile} alt="profile" className="size-5" />
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
