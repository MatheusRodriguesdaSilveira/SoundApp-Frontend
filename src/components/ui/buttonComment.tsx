import { Heart, MessageCircle, SmilePlus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";

import UserProfile from "/public/user.png";
import Image from "next/image";
import { Label } from "./label";
import { Textarea } from "./textarea";
import { Button } from "./button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { useEffect, useRef, useState } from "react";
import { getCookie } from "cookies-next";
import { api } from "@/services/api";
import { useRouter } from "next/navigation";

interface UserData {
  user: string;
  id: string;
  name: string;
  email: string;
  descriptionProfile: string;
  blogProfile: string;
  linkedinProfile: string;
  profilePicture: string;
  createdAt: string;
  title: string;
  imageUrl: string;
  description: string;
  comments: string;
  content: string;
}

interface CommentData {
  id: string;
  postId: string;
  comment: string;
  createdAt: string;
}

export const ButtonComment = () => {
  const [info, setInfo] = useState<UserData[]>([]);
  const [selectedPostId, setSelectedPostId] = useState<string>("");
  const [comments, setComments] = useState<CommentData[]>([]);

  const router = useRouter();

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

        setInfo(response.data || []);
      } catch (error) {
        console.error("Erro ao carregar dados do usuário:", error);
        router.push("/home");
      }
    };

    fetchUserData();
  }, [router]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const token = getCookie("login");

        if (!token) {
          throw new Error("Token não encontrado");
        }

        const response = await api.get(`/comments/${selectedPostId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setComments(response.data || []);
      } catch (error) {
        console.error("Erro ao carregar comentários:", error);
      }
    };

    if (selectedPostId) {
      fetchComments();
    }
  }, [selectedPostId]);

  const handleSelectPost = (post: UserData) => {
    setSelectedPostId(post.id);
  };

  console.log(comments);
  console.log(info);

  return (
    <div>
      {info.map((post) => (
        <Dialog key={post.id}>
          <DialogTrigger onClick={() => handleSelectPost(post)} asChild>
            <button className="group relative" aria-label="Abrir comentários">
              <MessageCircle className="cursor-pointer hover:text-blue-500" />
              <span
                className="absolute -top-10 left-[100%] -translate-x-[50%] 
                                    z-20 origin-left scale-0 px-3 rounded-lg border 
                                    border-gray-300 bg-white dark:text-zinc-500 py-1 text-sm font-bold
                                    shadow-md transition-all duration-300 ease-in-out 
                                    group-hover:scale-100"
              >
                Comment
              </span>
            </button>
          </DialogTrigger>
          <div>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Comentários</DialogTitle>
                <DialogDescription>Veja o que estão falando.</DialogDescription>
              </DialogHeader>
              <ul>
                {comments.map((comment) => (
                  <li key={comment.id}>
                    <p>{comment.comment}</p>
                    <p>
                      Enviado em: {new Date(comment.createdAt).toLocaleString()}
                    </p>
                  </li>
                ))}
              </ul>
            </DialogContent>
          </div>
        </Dialog>
      ))}
    </div>
  );
};
