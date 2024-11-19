"use client";

import { useState, useEffect } from "react";
import { redirect, useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
import { Mail, Lock, CircleUser, AtSign, CodeXml } from "lucide-react";
import { api } from "@/services/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (loginSuccess) {
      redirect("/home");
    }
  }, [loginSuccess, router]);

  if (!mounted) {
    return null;
  }

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email || !password) {
      setError("Email ou senha estão vazios.");
      return;
    }

    try {
      const response = await api.post("/login", { email, password });

      // Acesse diretamente o token de response.data
      if (!response.data || !response.data.token) {
        setError("Token não recebido.");
        return;
      }

      const expressTime = 60 * 60 * 24 * 30; // 30 dias em segundos
      setCookie("login", response.data.token, {
        maxAge: expressTime,
        path: "/",
      });

      setLoginSuccess(true);
    } catch (err) {
      console.log(err);
      setError("Erro ao fazer login.");
    }
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }

  return (
    <Card className="p-6 mx-auto flex flex-col items-center max-w-md relative overflow-hidden z-10 rounded-lg shadow-md before:w-24 before:h-24 before:absolute before:bg-red-700 before:rounded-full before:-z-10 before:blur-2xl after:w-32 after:h-32 after:absolute after:bg-zinc-800 after:rounded-full after:-z-10 after:blur-xl after:top-24 after:-right-12">
      <CodeXml className="size-8" />
      <form onSubmit={handleLogin}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 mb-3">
            <CircleUser className="text-red-500 size-10" />
            <h1 className="text-3xl">Login</h1>
          </CardTitle>
          <CardDescription>
            {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
            Faça o seu login logo abaixo com os seus dados cadastrados.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 w-full">
          <div className="relative text-zinc-400">
            <AtSign className="absolute left-2 top-1/2 transform -translate-y-1/2 text-zinc-400 size-5" />
            <Input
              className="px-10 "
              type="email"
              placeholder="Digite seu email..."
              name="email"
              value={email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-2 top-1/2 transform -translate-y-1/2 text-zinc-400 size-5" />
            <Input
              className="px-10 "
              type="password"
              placeholder="Digite sua senha..."
              name="password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full relative overflow-hidden group"
          >
            <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out -translate-x-full bg-rose-700 rounded-md group-hover:translate-x-0"></span>
            <span className="flex items-center justify-center relative w-full text-white group-hover:text-white">
              Acessar
            </span>
          </Button>
        </CardContent>
      </form>
    </Card>
  );
};

export default LoginForm;
