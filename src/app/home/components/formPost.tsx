"use client";

import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { PlusCircle, UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import FormData from "form-data";
import { useState } from "react";
import { api } from "@/services/api";
import { getCookie } from "cookies-next";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";

export const FormPost = () => {
  const { toast } = useToast();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!file) {
      alert("Por favor, selecione uma imagem");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("file", file);

    try {
      const token = getCookie("login");

      await api.post("/post", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, // Inclua o token de autenticação, se necessário
        },
      });

      toast({
        title: "Sucesso! ",
        description: "Postagem publicada com sucesso!",
        action: (
          <ToastAction altText="Goto schedule to undo">Fechar</ToastAction>
        ),
      });
    } catch (error) {
      console.error("Erro ao criar post:", error);
      alert("Erro ao criar post. Verifique os dados e tente novamente.");
    } finally {
      window.location.reload();
      // Limpar o formulário
      setTitle("");
      setDescription("");
      setFile(null);
      setPreview(null);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="2xl:w-[170px] lg:w-[170px] border border-red-500 border-dashed py-6 hover:bg-zinc-200 dark:hover:bg-zinc-900/50 lg:my-5"
          variant="outline"
        >
          <div className="flex gap-1 items-center">
            Adicionar Postagem
            <span className="text-sm text-red-500 group cursor-pointer outline-none hover:rotate-90 duration-300">
              <PlusCircle />
            </span>
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Publicação</DialogTitle>
          <DialogDescription>
            Faça a sua publicação logo abaixo.
          </DialogDescription>
        </DialogHeader>
        <div className="">
          <form className="gap-5" onSubmit={handleSubmit}>
            <Label
              htmlFor="file"
              className="relative w-full h-[400px] flex items-center justify-center border border-dashed border-zinc-700 rounded-lg cursor-pointer mb-4"
            >
              <Input
                className="absolute inset-0 opacity-0 cursor-pointer"
                type="file"
                id="file"
                onChange={handleFileChange}
                required
              />
              {preview ? (
                <Image
                  alt="Preview da imagem"
                  src={preview}
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-lg"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-center">
                  <UploadCloud className="w-10 h-10 text-red-600 hover:scale-110 transition-transform duration-300" />
                  <p className="text-zinc-400">Clique para fazer upload</p>
                </div>
              )}
            </Label>

            <Label htmlFor="title">
              <Input
                className="border-zinc-800 mb-5 w-full"
                placeholder="Título"
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Label>
            <Label htmlFor="description">
              <Textarea
                className="border-zinc-800 mb-5 w-full"
                placeholder="Escreva aqui..."
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </Label>
            <Button
              type="submit"
              className="flex items-center justify-center text-white bg-zinc-900 hover:bg-zinc-800 w-full"
            >
              Publicar
              <span className="text-sm text-red-600 group cursor-pointer outline-none hover:rotate-90 duration-300">
                <PlusCircle className="size-5" />
              </span>{" "}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
