import { MessageCircle, SmilePlus } from "lucide-react";
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

export const ButtonComment = () => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleAddEmoji = (emoji: string) => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const text = textarea.value;

      textarea.value = text.slice(0, start) + emoji + text.slice(end);

      textarea.selectionStart = textarea.selectionEnd = start + emoji.length;

      textarea.focus();
    }
  };

  const [userData, setUserData] = useState<UserData | null>(null);
  const [info, setInfo] = useState<UserData[]>([]);
  const [post, setPost] = useState<UserData[]>([]);
  const [comments, setComments] = useState<UserData[]>([]);
  const [user, setProfileUser] = useState<UserData[]>([]);
  const [selectedPostId, setSelectedPostId] = useState<string>("");

  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = getCookie("login");

        if (!token) {
          throw new Error("Token não encontrado");
        }

        const response = await api.get("/posts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const users = response.data.map(
          (user: { user: any; name: string; profilePicture: string }) =>
            user.user
        );

        const posts = response.data.posts
          .map(
            (post: {
              id: string;
              imageUrl: string;
              title: string;
              description: string;
            }) => {
              return post;
            }
          )
          .sort(
            (a: any, b: any) =>
              new Date(b.createdAt && b.updatedAt).getTime() -
              new Date(a.createdAt && a.updatedAt).getTime()
          );

        const comments = response.data.map((comments: { content: string }) => {
          return comments;
        });

        setProfileUser(users);
        setPost(posts);
        setInfo(response.data || []);
        setComments(comments[selectedPostId]?.content || []);
      } catch (error) {
        console.error("Erro ao carregar dados do usuário:", error);
        router.push("/home");
      }
    };

    fetchUserData();
  }, [router]);

  const handleSelectPost = (postId: string) => {
    setSelectedPostId(postId);
  };

  console.log(info);

  return (
    <>
      <Dialog>
        <div>0</div>
        <DialogTrigger onClick={() => handleSelectPost(selectedPostId)} asChild>
          <button className="group relative" aria-label="Abrir comentários">
            <MessageCircle className="cursor-pointer hover:text-blue-500" />
            <span
              className="absolute -top-10 left-[100%] -translate-x-[50%] 
                        z-20 origin-left scale-0 px-3 rounded-lg border 
                        border-gray-300 bg-white py-1 text-sm font-bold
                        shadow-md transition-all duration-300 ease-in-out 
                        group-hover:scale-100"
            >
              Comment
            </span>
          </button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Comentários</DialogTitle>
            <DialogDescription>Veja o que estão falando.</DialogDescription>
          </DialogHeader>

          <form className="mb-4">
            <Label
              htmlFor="add-comment"
              className="block text-sm font-medium mb-2"
            >
              Adicionar comentário
            </Label>
            <div className="relative">
              <Textarea
                id="add-comment"
                ref={textareaRef}
                className="rounded-lg focus:outline-none w-full p-2 pr-[100px]"
                placeholder="Escreva seu comentário..."
              />
              <Button
                size={"sm"}
                className="w-[70px] h-[30px] absolute right-2 top-16 rounded-lg text-white font-semibold hover:bg-red-700 hover:scale-95"
              >
                Publicar
              </Button>

              <Select onValueChange={handleAddEmoji}>
                <SelectTrigger className="absolute right-16 top-16 w-[50px] mr-2 border-none flex items-center justify-center focus:ring-2 focus:ring-transparent">
                  <SmilePlus />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup className="grid grid-cols-5 gap-2">
                    {/* Emojis de Expressões */}
                    <SelectItem value="😀">😀</SelectItem>
                    <SelectItem value="😅">😅</SelectItem>
                    <SelectItem value="😂">😂</SelectItem>
                    <SelectItem value="😍">😍</SelectItem>
                    <SelectItem value="😎">😎</SelectItem>
                    <SelectItem value="😢">😢</SelectItem>
                    <SelectItem value="😡">😡</SelectItem>
                    <SelectItem value="🤔">🤔</SelectItem>
                    <SelectItem value="🥳">🥳</SelectItem>
                    <SelectItem value="😴">😴</SelectItem>

                    {/* Emojis de Gestos */}
                    <SelectItem value="👍">👍</SelectItem>
                    <SelectItem value="👎">👎</SelectItem>
                    <SelectItem value="👏">👏</SelectItem>
                    <SelectItem value="🙌">🙌</SelectItem>
                    <SelectItem value="👌">👌</SelectItem>
                    <SelectItem value="🙏">🙏</SelectItem>
                    <SelectItem value="🤝">🤝</SelectItem>
                    <SelectItem value="🤟">🤟</SelectItem>
                    <SelectItem value="✌">✌</SelectItem>
                    <SelectItem value="👋">👋</SelectItem>

                    {/* Emojis de Objetos */}
                    <SelectItem value="❤️">❤️</SelectItem>
                    <SelectItem value="🔥">🔥</SelectItem>
                    <SelectItem value="⭐">⭐</SelectItem>
                    <SelectItem value="🎉">🎉</SelectItem>
                    <SelectItem value="📚">📚</SelectItem>
                    <SelectItem value="💡">💡</SelectItem>
                    <SelectItem value="⚽">⚽</SelectItem>
                    <SelectItem value="🎵">🎵</SelectItem>
                    <SelectItem value="📷">📷</SelectItem>
                    <SelectItem value="✈️">✈️</SelectItem>

                    {/* Emojis de Comida */}
                    <SelectItem value="🍎">🍎</SelectItem>
                    <SelectItem value="🍔">🍔</SelectItem>
                    <SelectItem value="🍕">🍕</SelectItem>
                    <SelectItem value="🍩">🍩</SelectItem>
                    <SelectItem value="🍿">🍿</SelectItem>
                    <SelectItem value="🍣">🍣</SelectItem>
                    <SelectItem value="🍦">🍦</SelectItem>
                    <SelectItem value="🍫">🍫</SelectItem>
                    <SelectItem value="🍹">🍹</SelectItem>
                    <SelectItem value="☕">☕</SelectItem>

                    {/* Emojis de Animais */}
                    <SelectItem value="🐶">🐶</SelectItem>
                    <SelectItem value="🐱">🐱</SelectItem>
                    <SelectItem value="🐭">🐭</SelectItem>
                    <SelectItem value="🐹">🐹</SelectItem>
                    <SelectItem value="🐼">🐼</SelectItem>
                    <SelectItem value="🦁">🦁</SelectItem>
                    <SelectItem value="🐸">🐸</SelectItem>
                    <SelectItem value="🐧">🐧</SelectItem>
                    <SelectItem value="🐳">🐳</SelectItem>
                    <SelectItem value="🦋">🦋</SelectItem>

                    {/* Emojis de Natureza */}
                    <SelectItem value="🌳">🌳</SelectItem>
                    <SelectItem value="🌺">🌺</SelectItem>
                    <SelectItem value="🌈">🌈</SelectItem>
                    <SelectItem value="☀️">☀️</SelectItem>
                    <SelectItem value="🌙">🌙</SelectItem>
                    <SelectItem value="🌊">🌊</SelectItem>
                    <SelectItem value="⛄">⛄</SelectItem>
                    <SelectItem value="🌌">🌌</SelectItem>
                    <SelectItem value="⚡">⚡</SelectItem>
                    <SelectItem value="🌍">🌍</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </form>

          {/* Lista de comentários */}
          <div className="flex flex-col gap-6 h-[400px] overflow-y-auto">
            {info.map((info, index) => (
              <div key={index} className="flex gap-4 items-start">
                <a href="/profile">
                  <div className="bg-zinc-200 rounded-full p-2 border border-red-500">
                    <Image
                      src={info.profilePicture}
                      alt="Foto do perfil"
                      width={32}
                      height={32}
                      className="size-5"
                    />
                  </div>
                </a>
                <div>
                  <Label htmlFor={info.id} className="text-left font-medium">
                    {info.name}
                  </Label>
                  <p className="text-left text-zinc-400">{info.content}</p>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
