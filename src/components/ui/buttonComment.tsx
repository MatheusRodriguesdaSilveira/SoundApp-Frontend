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

interface ButtonCommentProps {
  post: UserData;
}
export const ButtonComment = ({ post }: { post: UserData }) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [info, setInfo] = useState<UserData[]>([]);
  const [user, setProfileUser] = useState<UserData[]>([]);

  const [selectedPostId, setSelectedPostId] = useState<string>("");

  const [comment, setComment] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState("");

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
        setProfileUser(users);

        setUserData(response.data);
        setInfo(response.data || []);
      } catch (error) {
        console.error("Erro ao carregar dados do usuário:", error);
        router.push("/home");
      }
    };

    fetchUserData();
  }, [router]);

  const handleSelectPost = () => {
    const postId = (info as any)[0].id;
    setSelectedPostId(postId);
  };

  const handleCreateComment = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const data = new FormData();
    data.append("comment", comment);

    try {
      const token = getCookie("login");

      const postId = selectedPostId;
      const response = await api.post(`/comment/${postId}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(postId);
      console.log(response);
    } catch (error) {
      console.error("Error creating comment:", error);
    } finally {
      window.location.reload();
      setComment("");
    }
  };

  const handleAddEmoji = (emoji: string) => {
    setSelectedEmoji(emoji);
    setComment(comment + emoji);
  };

  return (
    <>
      <Dialog>
        <DialogTrigger onClick={handleSelectPost} asChild>
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

            <form onSubmit={handleCreateComment} className="mb-4">
              <Label
                htmlFor="comment"
                className="block text-sm font-medium mb-2"
              >
                Adicionar comentário
              </Label>
              <div className="relative">
                <Textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="rounded-lg focus:outline-none w-full p-2 pr-[100px]"
                  placeholder="Escreva seu comentário..."
                />
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
                <Button
                  size={"sm"}
                  type="submit"
                  className="w-[70px] h-[30px] absolute right-2 top-16 rounded-lg text-white font-semibold hover:bg-red-700 hover:scale-95"
                >
                  Publicar
                </Button>
              </div>
            </form>

            {/* Lista de comentários */}
            <div className="flex flex-col gap-6 h-[400px] overflow-y-auto">
              <div className="flex gap-3 mb-5">
                {info.map((post, index) => (
                  <Label key={index} className="text-left font-medium">
                    {(post.comments as any).map((comment: any) => (
                      <div key={comment.id} className="flex gap-2">
                        <div className="mb-8 flex-shrink-0">
                          <Image
                            priority
                            src={comment.user.profilePicture || UserProfile}
                            alt={comment.user.name}
                            width={30}
                            height={30}
                            style={{ objectFit: "contain" }}
                            className="xl:w-12 xl:h-12 lg:w-10 lg:h-10 h-2 w-2 rounded-full border border-red-500"
                          />
                        </div>

                        <div className="flex flex-col mt-2">
                          <span className="font-bold">{comment.user.name}</span>
                          <span className="text-sm text-zinc-500">
                            {comment.content}
                          </span>
                        </div>
                      </div>
                    ))}
                  </Label>
                ))}
              </div>
            </div>
          </DialogContent>
        </div>
      </Dialog>
    </>
  );
};
