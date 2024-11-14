"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { ImageIcon, Plus, PlusCircle, UploadCloud } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

export const FormPostTop = () => {
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
                    <UploadCloud className="w-10 h-10 text-red-600 hover:scale-95 transition-transform duration-300 hover:text-red-800" />
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
