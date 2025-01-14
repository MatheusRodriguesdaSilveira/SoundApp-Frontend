"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogoHeader } from "@/components/ui/logoHeader";
import { ModeThemeHeader } from "@/components/ui/themeButton";
import {
  Bolt,
  Crown,
  Handshake,
  Home,
  LogOut,
  Menu,
  MousePointer2,
  User,
} from "lucide-react";

import { useRouter } from "next/navigation";

import Image from "next/image";
import UserProfile from "/public/user.png";
import { FormPost } from "./formPost";
import { DialogEditProfile } from "./dialogEditProfile";
import Link from "next/link";
import { useEffect, useState } from "react";
import { api } from "@/services/api";
import { getCookie } from "cookies-next";

interface UserData {
  name: string;
  email: string;
  descriptionProfile: string;
  blogProfile: string;
  linkedinProfile: string;
  profilePicture: string;
}

export const NavBar = () => {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);

  const handleLeave = () => {
    router.push("/");
  };

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
        console.error("Erro ao carregar dados do usuário:", error);
        router.push("/home");
      }
    };

    fetchUserData();
  }, [router]);

  if (!userData) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <h1 className="text-zinc-400 m-2">Carregando...</h1>
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-red-500" />
      </div>
    );
  }

  return (
    <>
      <div className="flex relative z-50">
        <div className="fixed 2xl:w-[300px] xl:w-[300px] lg:w-[250px] h-full p-10 border-r-2">
          <LogoHeader />
          <DropdownMenuSeparator />

          <ul className="lg:text-sm lg:p-5 xl:p-5  xl:text-base 2xl:p-5 2xl:text-lg">
            <li className="flex xl:gap-1 2xl:gap-2 mb-5">
              <Home className="2xl:size-7 xl:size-5 lg:size-5" />
              <a
                className="block mt-0.5 font-medium text-zinc-800 dark:text-zinc-200 relative before:absolute before:bottom-0 before:left-0 before:h-0.5 before:w-0 dark:before:bg-zinc-200 before:bg-zinc-800 before:transition-all before:duration-300 hover:before:w-full"
                href="/home"
              >
                Pagina inicial
              </a>
            </li>
            <li className="flex xl:gap-1 2xl:gap-2 mb-5">
              <MousePointer2 className="2xl:size-7 xl:size-5 lg:size-5" />
              <a
                className="block mt-0.5 font-medium text-zinc-800 dark:text-zinc-200 relative before:absolute before:bottom-0 before:left-0 before:h-0.5 before:w-0 dark:before:bg-zinc-200 before:bg-zinc-800 before:transition-all before:duration-300 hover:before:w-full"
                href=""
              >
                Mensagem
              </a>
            </li>
            <li className="flex xl:gap-1 2xl:gap-2 mb-5">
              <Handshake className="2xl:size-7 xl:size-5 lg:size-5" />
              <a
                className="block mt-0.5 font-medium text-zinc-800 dark:text-zinc-200 relative before:absolute before:bottom-0 before:left-0 before:h-0.5 before:w-0 dark:before:bg-zinc-200 before:bg-zinc-800 before:transition-all before:duration-300 hover:before:w-full"
                href=""
              >
                Works
              </a>
            </li>
            <li className="flex xl:gap-1 2xl:gap-2 mb-5">
              <Crown className="2xl:size-7 xl:size-5 lg:size-5" />
              <a
                className="block mt-0.5 font-medium text-zinc-800 dark:text-zinc-200 relative before:absolute before:bottom-0 before:left-0 before:h-0.5 before:w-0 dark:before:bg-zinc-200 before:bg-zinc-800 before:transition-all before:duration-300 hover:before:w-full"
                href=""
              >
                Premium
              </a>
            </li>
          </ul>
          <DropdownMenuSeparator />

          <ul className="xl:m-1">
            <li className="xl:mx-3 2xl:m-1">
              <div className="flex xl:gap-0 xl: 2xl:gap-2 2xl:my-5 hover:bg-zinc-200 dark:hover:bg-zinc-900     xl:w-[200px] 2xl:w-[200px] rounded-md px-2 py-2">
                <ModeThemeHeader />
              </div>
            </li>

            <li className="xl:mx-2">
              <a href="/profile" className="">
                <div className="flex gap-2 items-center my-5 hover:bg-zinc-200 dark:hover:bg-zinc-900     xl:w-[200px] 2xl:w-[200px] rounded-md px-2 py-2">
                  <Image
                    src={userData.profilePicture || UserProfile}
                    alt="profile"
                    className="2xl:w-8 2xl:h-8 xl:w-7 xl:h-7 lg:w-7 lg:h-7 rounded-full border border-red-700 flex-shrink-0"
                    width={500}
                    height={500}
                    priority
                  />
                  <p className="xl:text-sm">Perfil</p>
                </div>
              </a>
            </li>
          </ul>

          <DropdownMenuSeparator />

          {/* Adicionar Postagem */}
          <div className="xl:mt-0 xl:mx-5 2xl:mt-12">
            <FormPost />
          </div>
          <div className="absolute bottom-0 flex gap-5 xl:mb-5 2xl:mb-10">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <div className="dark:text-gray-400 dark:hover:text-gray-200 mx-2 transition-all duration-200 ease-in-out hover:rotate-180 focus:outline-none focus:ring-2 focus:ring-gray-400 rounded-full">
                    <Menu />
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 m-10">
                <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <a href="/profile" className="flex gap-1 w-full">
                      <User className="size-5" />
                      <span>Perfil</span>
                    </a>
                  </DropdownMenuItem>

                  {/* Edit Profile menu */}
                  <DropdownMenuItem asChild>
                    <DialogEditProfile />
                  </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuLabel>Outros</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <button
                    className="flex bg-transparent border-none h-4 w-full hover:bg-transparent px-1 gap-2 items-center"
                    onClick={handleLeave}
                  >
                    <LogOut className="size-4" />
                    Sair
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </>
  );
};
