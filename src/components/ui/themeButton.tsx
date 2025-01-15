"use client";

import * as React from "react";
import { Moon, Sun, TvMinimal } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ModeTheme() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="border-zinc-600" asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Escolha um thema</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className="dark:focus:bg-slate-100 focus:text-black"
        >
          Claro <Sun />
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className="focus:bg-zinc-600 focus:text-white"
        >
          Escuro <Moon />
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          Sistema <TvMinimal />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function ModeThemeHeader() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="border-none" asChild>
        <div className="flex gap-2">
          <button className="relative flex items-center justify-center">
            <Moon className="absolute 2xl:h-7 2xl:w-7 xl:h-4 xl:w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <Sun className="2xl:h-7 2xl:w-7 xl:h-4 xl:w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <span className="sr-only">Escolha um tema</span>
          </button>
          <button className="items-center dark:text-zinc-200">
            <span className="block font-medium text-zinc-800 dark:text-zinc-200 relative before:absolute before:bottom-0 before:left-0 before:h-0.5 before:w-0 dark:before:bg-zinc-200 before:bg-zinc-800 before:transition-all before:duration-300 hover:before:w-full">
              Alternar tema
            </span>
          </button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="p-1 mt-2 bg-white rounded-lg shadow-md dark:bg-zinc-800"
      >
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className="flex items-center gap-2 px-3 py-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-700 focus:bg-slate-100 focus:text-black"
        >
          <Sun className="h-5 w-5" />
          Claro
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className="flex items-center gap-2 px-3 py-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-700 focus:bg-zinc-600 focus:text-white"
        >
          <Moon className="h-5 w-5" />
          Escuro
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className="flex items-center gap-2 px-3 py-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-700"
        >
          <TvMinimal className="h-5 w-5" />
          Sistema
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
