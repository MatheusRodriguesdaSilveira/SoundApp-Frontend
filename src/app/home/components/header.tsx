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

export const NavBar = () => {
  const router = useRouter();

  const handleLeave = () => {
    router.push("/");
  };

  return (
    <>
      <div className="flex relative">
        <div className="fixed w-[300px] h-full p-10 border-r-2">
          <LogoHeader />
          <DropdownMenuSeparator />

          <ul className="p-5 text-lg">
            <li className="flex gap-2 mb-5 items-center">
              <Home className="size-7" />
              <a
                className="block mt-0.5 font-medium text-zinc-200 relative before:absolute before:bottom-0 before:left-0 before:h-0.5 before:w-0 before:bg-zinc-200 before:transition-all before:duration-300 hover:before:w-full"
                href="/home"
              >
                Página inicial
              </a>
            </li>
            <li className="flex gap-2 mb-5">
              <MousePointer2 className="size-7" />
              <a
                className="block mt-0.5 font-medium text-zinc-200 relative before:absolute before:bottom-0 before:left-0 before:h-0.5 before:w-0 before:bg-zinc-200 before:transition-all before:duration-300 hover:before:w-full"
                href=""
              >
                Mensagem
              </a>
            </li>
            <li className="flex gap-2 mb-5">
              <Handshake className="size-7" />
              <a
                className="block mt-0.5 font-medium text-zinc-200 relative before:absolute before:bottom-0 before:left-0 before:h-0.5 before:w-0 before:bg-zinc-200 before:transition-all before:duration-300 hover:before:w-full"
                href=""
              >
                Works
              </a>
            </li>
            <li className="flex gap-2">
              <Crown className="size-7" />
              <a
                className="block mt-0.5 font-medium text-zinc-200 relative before:absolute before:bottom-0 before:left-0 before:h-0.5 before:w-0 before:bg-zinc-200 before:transition-all before:duration-300 hover:before:w-full"
                href=""
              >
                Premium
              </a>
            </li>
          </ul>
          <DropdownMenuSeparator />

          <div className="m-1">
            <div className="flex gap-2 my-5 hover:bg-zinc-900 w-[200px] rounded-md px-2 py-2">
              <ModeThemeHeader />{" "}
            </div>
          </div>

          <div className="m-1">
            <a href="/profile" className="">
              <div className="flex gap-2 items-center my-5 hover:bg-zinc-900 w-[200px] rounded-md px-2 py-2">
                <div className="bg-zinc-200 rounded-full p-2 hover:scale-105 border border-red-500">
                  <Image src={UserProfile} alt="profile" className="size-4" />
                </div>
                <p>Perfil</p>
              </div>
            </a>
          </div>

          <DropdownMenuSeparator />
          {/* Adicionar Postagem */}
          <div className="xl:mt-5 2xl:mt-12">
            <FormPost />
          </div>
          <div className="absolute bottom-0 flex mb-10 gap-5 xl:mb-0">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <div className="text-gray-400 hover:text-gray-200 mx-2 transition-all duration-200 ease-in-out hover:rotate-180 focus:outline-none focus:ring-2 focus:ring-gray-400 rounded-full">
                    <Menu />
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 m-10">
                <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <User />
                    <span>Perfil</span>
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
                  <Button
                    variant={"ghost"}
                    className="flex w-1 h-1 px-7"
                    onClick={handleLeave}
                  >
                    <LogOut />
                    <span>Sair</span>
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </>
  );
};
