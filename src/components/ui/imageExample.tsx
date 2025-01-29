import {
  CalendarDays,
  Heart,
  PartyPopper,
  MessageCircle,
  SmilePlus,
} from "lucide-react";

import Image from "next/image";
import Template from "/public/template.png";
import UserProfile from "/public/user.png";
import { Label } from "./label";
import { Textarea } from "./textarea";
import { Button } from "./button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "./select";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import FormData from "form-data";
import { api } from "@/services/api";
import { format } from "date-fns";
import { jwtDecode } from "jwt-decode";

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
  likes: string;
  initialLiked: boolean;
}

export const ImageTemplate = () => {
  const router = useRouter();

  const [isHyped, setIsHyped] = useState(false);

  const [liked, setLiked] = useState(false);
  const [likesByPost, setLikesByPost] = useState<{ [key: string]: string[] }>(
    {}
  );

  const [userData, setUserData] = useState<UserData | null>(null);
  const [info, setInfo] = useState<UserData[]>([]);
  const [user, setProfileUser] = useState<UserData[]>([]);

  const [selectedPostId, setSelectedPostId] = useState<string>("");
  const [selectedUserId, setSelectedUserId] = useState<string>("");

  const [comment, setComment] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState("");

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

        const users = response.data?.map(
          (user: { user: string; name: string; profilePicture: string }) =>
            user.user
        );

        const likes = response.data?.map(
          (post: { id: string; likes: { id: number; userId: string }[] }) => ({
            postId: post.id, // ID do post
            likes: post.likes?.map((like) => like.userId), // Extraindo apenas os userIds dos likes
          })
        );
        const likesByPost = likes.reduce((acc: any, { postId, likes }: any) => {
          acc[postId] = likes;
          return acc;
        }, {});

        setLikesByPost(likesByPost);
        setLiked(likesByPost[selectedPostId]?.includes(currentUserId));
        setProfileUser(users);
        setUserData(response.data);
        setInfo(response.data || []);
      } catch (error) {
        console.error("Erro ao carregar dados do usuário:", error);
        router.push("/home");
      }
    };

    fetchUserData();
  }, [selectedPostId]);

  const handleSelectPost = (postId: string) => {
    setSelectedPostId(postId);
    console.log(`Postagens selecionadas: ${postId}`);
  };

  const handleSelectUserPost = (userPostInfo: {
    userId: string;
    postId: string;
  }) => {
    const { userId, postId } = userPostInfo;
    setSelectedUserId(userId);
    setSelectedPostId(postId);
    console.log(`id user: ${userId}, id post: ${postId}`);
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

      console.log(response.data);
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

  const handleHypeButton = () => {
    setIsHyped((prev) => !prev);
  };

  if (!userData) {
    return (
      <div className="flex flex-col justify-center items-center z-0">
        <h1 className="text-zinc-400 m-2">Carregando...</h1>
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-red-500" />
      </div>
    );
  }

  const handleLikeButton = async (postId: string, userId: string) => {
    try {
      const token = getCookie("login");

      const newLikedState = !liked;

      const response = await api.post(
        `/like/${postId}`,
        { userId: userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLiked(newLikedState);
      // Atualizar o número de likes localmente
      setLikesByPost((prevLikesByPost) => {
        if (!prevLikesByPost) return { [postId]: [] };

        const updatedLikes = [...(prevLikesByPost[postId] || [])];

        if (newLikedState) {
          updatedLikes.push(userId);
        } else {
          const userIndex = updatedLikes.indexOf(userId);
          if (userIndex > -1) {
            updatedLikes.splice(userIndex, 1);
          }
        }

        return {
          ...prevLikesByPost,
          [postId]: updatedLikes,
        };
      });
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const token = getCookie("login");
  if (token === undefined) {
    // handle the case where the cookie is not found
    console.error("Cookie not found");
    return;
  }
  const decoded = jwtDecode(token as string) as { sub: string };

  const currentUserId = decoded.sub;
  return (
    <>
      <div className="flex flex-col items-center">
        {info
          .sort(
            (a: any, b: any) =>
              new Date(b.createdAt && b.updatedAt).getTime() -
              new Date(a.createdAt && a.updatedAt).getTime()
          )
          .map((post, index) => (
            <div key={post.id} className="mt-10 w-[800px]">
              <div className="flex gap-4 justify-start items-start">
                <div className="py-1 flex-shrink-0">
                  <Image
                    width={200}
                    height={200}
                    style={{ objectFit: "cover" }}
                    src={(post.user as any).profilePicture || UserProfile}
                    alt={(post.user as any).name}
                    className="xl:w-12 xl:h-12 lg:w-10 lg:h-10 h-2 w-2 rounded-full border border-red-500"
                  />
                </div>
                <div className="flex flex-col 2xl:w-[500px] xl:w-[500px] lg:w-[500px] max-w-7xl sm:p-6 lg:p-0">
                  <p className="text-lg font-medium">
                    {(post.user as any).name}
                  </p>
                  <div className="flex justify-between">
                    <p className="text-lg text-zinc-500 flex ">
                      {post.title || "Postagem"}
                    </p>
                    <div className="flex text-lg font-medium mb-1">
                      <button className="group relative mr-3">
                        <CalendarDays className="cursor-pointer hover:text-red-500" />
                        <span
                          className="absolute -top-10 left-[200%] -translate-x-[50%] 
                        z-20 origin-left scale-0 px-3 rounded-lg border 
                        border-gray-300 bg-white py-1 text-sm font-bold
                        shadow-md transition-all duration-300 ease-in-out 
                        group-hover:scale-100 text-zinc-500"
                        >
                          {format(new Date(post.createdAt), "dd/MM/yyyy")}
                        </span>
                      </button>
                    </div>
                  </div>

                  <div className="w-full 2xl:h-96 xl:h-72 md:h-56 lg:h-72 relative rounded-3xl border border-zinc-800 overflow-hidden bg-zinc-900/30">
                    <Image
                      priority
                      src={post.imageUrl || Template}
                      alt="Postagem"
                      width={500}
                      height={500}
                      style={{ objectFit: "contain" }}
                      className="w-full h-full rounded-md"
                    />
                  </div>

                  <div className="py-2 text-zinc-500">
                    <div className="flex mb-2 gap-1 text-zinc-500">
                      <div className="flex items-center gap-1">
                        <Dialog>
                          <div>{likesByPost[post.id]?.length || 0}</div>
                          <DialogTrigger
                            onClick={() =>
                              handleSelectUserPost({
                                userId: (post.user as any).id,
                                postId: post.id,
                              })
                            }
                            asChild
                          >
                            <button
                              onClick={() => {
                                const postId = post.id;
                                const userId = currentUserId;
                                handleLikeButton(postId, userId);
                              }}
                              className="group relative"
                            >
                              {/* Verifica se o usuário curtiu o post */}
                              {likesByPost[post.id]?.includes(currentUserId) ? (
                                <Heart className="cursor-pointer fill-current text-red-500 hover:text-red-700" />
                              ) : (
                                <Heart className="cursor-pointer hover:text-red-500" />
                              )}
                              <span className="absolute -top-10 left-[100%] -translate-x-[50%] z-20 origin-left scale-0 px-3 rounded-lg border border-gray-300 bg-white py-1 text-sm font-bold shadow-md transition-all duration-300 ease-in-out group-hover:scale-100">
                                Like
                              </span>
                            </button>
                          </DialogTrigger>
                        </Dialog>
                      </div>
                      <div className="flex items-center gap-1">
                        <Dialog>
                          <div>{post.comments.length}</div>
                          <DialogTrigger
                            onClick={() => handleSelectPost(post.id)}
                            asChild
                          >
                            <button
                              className="group relative"
                              aria-label="Abrir comentários"
                            >
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
                              <DialogDescription>
                                Veja o que estão falando.
                              </DialogDescription>
                            </DialogHeader>

                            <form
                              onSubmit={handleCreateComment}
                              className="mb-4"
                            >
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
                                <Label className="text-left font-medium">
                                  {(post.comments as any).map(
                                    (comment: any) => (
                                      <div
                                        key={comment.id}
                                        className="flex gap-2"
                                      >
                                        <div className="mb-8 flex-shrink-0">
                                          <Image
                                            priority
                                            src={comment.user.profilePicture}
                                            alt="example"
                                            width={30}
                                            height={30}
                                            style={{ objectFit: "contain" }}
                                            className="xl:w-12 xl:h-12 lg:w-10 lg:h-10 h-2 w-2 rounded-full border border-red-500"
                                          />
                                        </div>

                                        <div className="flex flex-col mt-2">
                                          <span className="font-bold">
                                            {comment.user.name}
                                          </span>
                                          <span className="text-sm text-zinc-500">
                                            {comment.content}
                                          </span>
                                        </div>
                                      </div>
                                    )
                                  )}
                                </Label>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                      <div className="flex items-center">
                        <button
                          onClick={handleHypeButton}
                          className="group relative"
                        >
                          <PartyPopper
                            className={`cursor-pointer hover:text-yellow-500 ${
                              isHyped ? "fill-current text-yellow-500" : ""
                            }`}
                          />
                          <span
                            className="absolute -top-10 left-[100%] -translate-x-[50%]
                  z-20 origin-left scale-0 px-3 rounded-lg border
                  border-gray-300 bg-white py-1 text-sm font-bold
                  shadow-md transition-all duration-300 ease-in-out
                  group-hover:scale-100"
                          >
                            Hypar
                          </span>
                        </button>
                      </div>
                    </div>

                    <div className="w-full max-w-3xl text-left leading-loose">
                      {post.description ? (
                        <div className="list-disc list-inside">
                          {post.description.split("\n").map((item, index) => (
                            <div key={index}>{item}</div>
                          ))}
                        </div>
                      ) : (
                        "Descrição não disponível"
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};
