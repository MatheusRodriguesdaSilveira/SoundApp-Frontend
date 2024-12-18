"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";

import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import { api } from "@/services/api";
import { useRouter } from "next/navigation";

interface PostData {
  title: string;
  description: string;
  imageUrl: string;
}

const DialogEditPost = () => {
  const router = useRouter();

  const [post, setPost] = useState<PostData | null>(null);
  const [info, setInfo] = useState<PostData[]>([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = getCookie("login");

        if (!token) {
          throw new Error("Token não encontrado");
        }

        const response = await api.get("/info", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const posts = response.data.posts.map(
          (post: { imageUrl: string; title: string; description: string }) => {
            return post;
          }
        );

        setInfo(posts);
        console.log(response.data);
        setPost(response.data);
      } catch (error) {
        console.error("Erro ao carregar dados do usuário:", error);
        router.push("/home");
      }
    };

    fetchUserData();
  }, [router]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex px-2 items-center dark:text-zinc-200 dark:hover:bg-zinc-800 hover:bg-zinc-100 rounded-sm">
          <Button
            className="bg-transparent border-none px-0 h-7 hover:bg-transparent w-full items-center justify-start"
            variant="ghost"
          >
            <Pencil />
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Post</DialogTitle>
          <DialogDescription>
            Make changes to your post here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <form className="gap-5">
          <Label htmlFor="title" className="text-right">
            Titulo
          </Label>
          <Input
            id="name"
            type="text"
            value={post?.title}
            className="col-span-3 mb-2"
          />

          <Label htmlFor="description" className="text-right">
            Description
          </Label>
          <Textarea id="description" className="col-span-3 w-full mb-5" />
          <div className="flex items-center justify-center"></div>
          <DialogFooter>
            <Button>Salvar </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DialogEditPost;
