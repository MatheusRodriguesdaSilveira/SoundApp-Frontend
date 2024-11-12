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
                href=""
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

          <div className="m-5">
            <div className="flex gap-2 my-5">
              <ModeThemeHeader />{" "}
            </div>
          </div>
          <div className="m-4">
            <div className="flex gap-2 items-center my-5 hover:scale-105">
              <div className="bg-zinc-300 rounded-full p-2.5 hover:scale-10 border border-red-500">
                <Image src={UserProfile} alt="profile" className="size-4" />
              </div>
              <p className="">user.name</p>
            </div>
          </div>

          <div className="absolute bottom-0 flex mb-10 gap-5">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Menu />
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
                  <DropdownMenuItem>
                    <Bolt />
                    <span>Edite seu perfil</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Outros</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <button onClick={handleLeave}>
                  <DropdownMenuItem>
                    <LogOut />
                    <span>Sair</span>
                  </DropdownMenuItem>
                </button>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </>
  );
};
