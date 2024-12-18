"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import Image from "next/image";
import { useState } from "react";
import { ImageIcon, Plus, PlusCircle, UploadCloud } from "lucide-react";

import { api } from "@/services/api";
import { getCookie } from "cookies-next";

export const FormPostTop = () => {
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

  const handleCreatePost = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!file) {
      alert("Por favor, selecione uma imagem");
      return;
    }

    const data = new FormData();
    data.append("title", title);
    data.append("description", description);
    data.append("file", file);

    try {
      const token = getCookie("login");

      await api.post("/post", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      window.location.reload();
      setTitle("");
      setDescription("");
      setFile(null);
      setPreview(null);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <button>
            <div className="grid items-center mt-1">
              <span className="text-sm text-zinc-600 gap-1.5 flex">
                No que está pensando?
                <span className="text-sm text-red-600 group cursor-pointer outline-none hover:rotate-90 duration-300">
                  <PlusCircle className="size-5" />
                </span>
              </span>
              <ImageIcon className="size-4 mt-1 hover:scale-95 text-red-500 duration-300" />
            </div>
          </button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Publicação</DialogTitle>
            <DialogDescription>
              Faça a sua publicação logo abaixo.
            </DialogDescription>
          </DialogHeader>
          <div className="">
            <form className="gap-5" onSubmit={handleCreatePost}>
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
                  type="text"
                  id="title"
                  value={title}
                  placeholder="Titulo"
                  className="border-zinc-800 mb-5 w-full"
                  onChange={(event) => setTitle(event.target.value)}
                  required
                />
              </Label>
              <Label htmlFor="description">
                <Textarea
                  value={description}
                  className="border-zinc-800 mb-5 w-full"
                  placeholder="Escreva aqui..."
                  onChange={(event) => setDescription(event.target.value)}
                  required
                />
              </Label>
              <Button
                type="submit"
                className="w-full flex items-center justify-center text-white bg-zinc-900 hover:bg-zinc-800"
              >
                <p className="text-sm">Publicar</p>
                <div className="group cursor-pointer outline-none hover:rotate-90 duration-300">
                  <PlusCircle className="w-5 h-5 text-red-600 " />
                </div>
              </Button>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
