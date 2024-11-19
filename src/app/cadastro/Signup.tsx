"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AtSign, CodeXml, Lock, User, UserPlus } from "lucide-react";

import { api } from "@/services/api";
import { useState } from "react";

const SignupForm = () => {
  const [error, setError] = useState<string | null>(null);

  interface IconInputProps {
    icon: React.ElementType;
    placeholder: string;
    name: string;
    type: string;
  }

  const IconInput: React.FC<IconInputProps> = ({
    icon: Icon,
    placeholder,
    type,
    name,
  }) => (
    <div className="relative w-full">
      <Icon className="absolute left-2 top-2 text-zinc-400 size-5" />
      <Input
        type={type}
        className="pl-8 w-full"
        name={name}
        placeholder={placeholder}
        required
      />
    </div>
  );

  async function handleRegister(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); // Evita o comportamento padrão do formulário

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name")?.toString();
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();

    if (!name || !email || !password) {
      setError("Preencha todos os campos.");
      return;
    }

    // Validação básica do email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Insira um email válido.");
      return;
    }

    // Validação da senha
    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    try {
      const response = await api.post("/users", { name, email, password });

      if (response.status === 201) {
        const signupEvent = new CustomEvent("signupSuccess");
        window.dispatchEvent(signupEvent); // Redireciona para a página de login
      } else {
        setError("Erro inesperado. Por favor, tente novamente.");
      }
    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error); // Mensagem do backend
      }
    }
  }

  return (
    <Card className="p-6 mx-auto flex flex-col items-center max-w-md relative overflow-hidden z-10 rounded-lg shadow-md before:w-24 before:h-24 before:absolute before:bg-red-700 before:rounded-full before:-z-10 before:blur-2xl after:w-32 after:h-32 after:absolute after:bg-zinc-800 after:rounded-full after:-z-10 after:blur-xl after:top-24 after:-right-12">
      <CodeXml className="size-8" />
      <form onSubmit={handleRegister}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 mb-3">
            <UserPlus className="text-red-500 size-10" />
            <h1 className="text-3xl">Cadastrar-se</h1>
          </CardTitle>
          <CardDescription>
            {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
            Faça o seu cadastro logo abaixo com os seus dados pessoais.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 w-full flex flex-col items-center">
          <IconInput
            type="text"
            icon={User}
            placeholder="Digite seu nome..."
            name="name"
          />
          <IconInput
            type="text"
            icon={AtSign}
            placeholder="Digite seu email..."
            name="email"
          />
          <IconInput
            type="password"
            icon={Lock}
            placeholder="Digite sua senha..."
            name="password"
          />
          <Button
            type="submit"
            className="w-full relative overflow-hidden group"
          >
            <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out -translate-x-full bg-rose-700 rounded-md group-hover:translate-x-0"></span>
            <span className="flex items-center justify-center relative w-full text-white group-hover:text-white">
              Cadastrar
            </span>
          </Button>
        </CardContent>
      </form>
    </Card>
  );
};

export default SignupForm;
