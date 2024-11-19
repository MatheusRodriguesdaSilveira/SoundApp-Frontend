"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Plus, PlusCircle, UploadCloud } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

export const FormPost = () => {
  const [previewImage, setPreviewImage] = useState(null);

  const handleImageUpload = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl: any = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
    }
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            className="w-[200px] border border-red-500 border-dashed py-6 hover:bg-zinc-200 dark:hover:bg-zinc-900/50"
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
            <form className="gap-5">
              <Label className="relative w-full h-[400px] flex items-center justify-center border border-dashed border-zinc-700 rounded-lg cursor-pointer mb-4">
                <Input
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  name="file"
                  type="file"
                  accept="image/png, image/jpeg"
                  onChange={handleImageUpload}
                  required
                />
                {previewImage ? (
                  <Image
                    alt="Preview da imagem"
                    src={previewImage}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-center">
                    <UploadCloud className="w-10 h-10 text-red-600 hover:scale-110 transition-transform duration-300 hover:text-blue-800" />
                    <p className="text-zinc-400">Clique para fazer upload</p>
                  </div>
                )}
              </Label>
              <Textarea
                className="border-zinc-800 mb-5 w-full"
                placeholder="Escreva aqui..."
              />
              <Button className="flex items-center justify-center text-white bg-zinc-900 hover:bg-zinc-800">
                <p className="text-sm">Post</p>
                <PlusCircle className="w-5 h-5 text-red-600" />
              </Button>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
