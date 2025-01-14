"use client";

import { Logo } from "@/components/ui/logo";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ModeTheme } from "@/components/ui/themeButton";
import LoginForm from "./login/LoginForm";
import SignupForm from "./cadastro/Signup";
import { useEffect, useState } from "react";

export default function TabsDemo() {
  const [activeTab, setActiveTab] = useState("login");

  useEffect(() => {
    // Ouve o evento customizado `signupSuccess`
    function handleSignupSuccess() {
      setActiveTab("login");
    }

    window.addEventListener("signupSuccess", handleSignupSuccess);

    // Limpeza ao desmontar o componente
    return () => {
      window.removeEventListener("signupSuccess", handleSignupSuccess);
    };
  }, []);

  return (
    <>
      <div className="2xl:m-10 2xl:mx-20 xl:m-2 xl:mx-10 flex items-end justify-end">
        <ModeTheme />
      </div>
      <div className="flex flex-col items-center justify-center 2xl:m-20">
        <Logo />
        <Tabs
          defaultValue="cadastro"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-[400px]"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="cadastro">Cadastrar-se</TabsTrigger>
          </TabsList>

          {/* Conteúdo de Login */}
          <TabsContent value="login">
            <LoginForm />
            <div className="justify-center items-center flex flex-col m-5 font-semibold">
              <button
                type="button"
                onClick={() => setActiveTab("cadastro")}
                className="dark:text-zinc-200 text-zinc-900 hover:scale-95 duration-300 hover:text-red-500"
              >
                Não possui uma conta? Crie uma agora!
              </button>
            </div>
          </TabsContent>

          {/* Conteúdo de Cadastro */}
          <TabsContent value="cadastro">
            <SignupForm />
            <div className="justify-center items-center flex flex-col m-5 font-semibold">
              <button
                type="button"
                onClick={() => setActiveTab("login")}
                className="dark:text-zinc-200 text-zinc-900 hover:scale-95 duration-300 hover:text-red-500"
              >
                Já possui uma conta? Clique aqui!
              </button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
