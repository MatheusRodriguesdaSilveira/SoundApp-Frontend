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
  UserCogIcon,
} from "lucide-react";

import { useRouter } from "next/navigation";

import Image from "next/image";
import UserProfile from "/public/user.png";
import { FormPost } from "./formPost";
import { DialogEditProfile } from "./dialogEditProfile";
import { useEffect, useState } from "react";
import { api } from "@/services/api";
import { getCookie } from "cookies-next";
import { DialogEditProfileHeader } from "./dialogEditProfileHeader";

interface UserData {
  id: string;
  name: string;
  email: string;
  descriptionProfile: string;
  blogProfile: string;
  linkedinProfile: string;
  profilePicture: string;
}

export const NavBar = () => {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

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
      <div className="flex flex-col justify-center items-center h-screen z-0">
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

          <ul className="lg:text-sm lg:p-5 xl:p-5 xl:text-base 2xl:p-5 2xl:text-lg">
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
                Mensagens
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
            <li className="flex xl:gap-1 2xl:gap-2 ">
              <Image
                src={userData.profilePicture || UserProfile}
                alt="profile"
                className="2xl:w-8 2xl:h-8 xl:w-7 xl:h-7 lg:w-7 lg:h-7 rounded-full border border-red-00 flex-shrink-0"
                width={500}
                height={500}
                priority
              />
              <a
                className="block mt-0.5 font-medium text-zinc-800 dark:text-zinc-200 relative before:absolute before:bottom-0 before:left-0 before:h-0.5 before:w-0 dark:before:bg-zinc-200 before:bg-zinc-800 before:transition-all before:duration-300 hover:before:w-full"
                href="/profile"
              >
                Perfil
              </a>
            </li>
          </ul>
          <DropdownMenuSeparator />

          {/* Adicionar Postagem */}
          <div className="xl:mt-0 xl:mx-5">
            <FormPost />
          </div>

          <div className="absolute bottom-0 flex xl:mb-5 2xl:mb-5">
            <ul className="lg:text-sm xl:text-base 2xl:text-lg">
              <li className="flex xl:gap-1 2xl:gap-2 my-5">
                <DialogEditProfileHeader />
              </li>
              <li className="flex xl:gap-1 2xl:gap-2 my-5">
                <ModeThemeHeader />
              </li>
              <li className="flex xl:gap-1 2xl:gap-2 my-5">
                <button
                  className="flex bg-transparent border-none h-4 w-full hover:bg-transparent px-1 gap-2 items-center"
                  onClick={handleLeave}
                >
                  <LogOut className="2xl:size-7 xl:size-5 lg:size-5" />
                  <span className="block font-medium text-zinc-800 dark:text-zinc-200 relative before:absolute before:bottom-0 before:left-0 before:h-0.5 before:w-0 dark:before:bg-zinc-200 before:bg-zinc-800 before:transition-all before:duration-300 hover:before:w-full">
                    Sair
                  </span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
