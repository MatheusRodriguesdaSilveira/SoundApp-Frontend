"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Check,
  Globe,
  Heart,
  Linkedin,
  MessageCircle,
  Pencil,
  SmilePlus,
  Trash2,
} from "lucide-react";

import Image from "next/image";
import TemplateError from "/public/imageError.svg";
import UserProfile from "/public/user.png";

import Link from "next/link";
import { api } from "@/services/api";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import FormData from "form-data";
import { jwtDecode } from "jwt-decode";

import { NavBar } from "../home/components/header";
import { SideBarColumn } from "../home/components/sidebarColumn";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { DialogEditProfile } from "../home/components/dialogEditProfile";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

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

const ProfilePage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [userData, setUserData] = useState<UserData | null>(null);

  const [post, setPost] = useState<UserData[]>([]);
  const [selectedPostId, setSelectedPostId] = useState<string>("");
  const [selectedUserId, setSelectedUserId] = useState<string>("");

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const [comment, setComment] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState("");

  const [liked, setLiked] = useState(false);
  const [likesByPost, setLikesByPost] = useState<{ [key: string]: string[] }>(
    {}
  );

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

        const posts = response.data.posts
          ?.map(
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

        const likes = response.data.posts?.map(
          (post: { id: string; likes: { id: number; userId: string }[] }) => ({
            postId: post.id,
            likes: post.likes.map((like: any) => like.userId),
          })
        );
        const likesByPost = likes?.reduce(
          (acc: any, { postId, likes }: any) => {
            acc[postId] = likes;
            return acc;
          },
          {}
        );

        setLikesByPost(likesByPost);
        setLiked(likesByPost?.[selectedPostId]?.includes(currentUserId));

        setUserData(response.data);

        setPost(posts);
        setTitle(posts[selectedPostId]?.title);
        setDescription(posts[selectedPostId]?.description);
      } catch (error) {
        console.error("Erro ao carregar dados do usuário:", error);
        router.push("/home");
      }
    };

    fetchUserData();
  }, [selectedPostId]);

  const handleSelectPost = (postId: string) => {
    setSelectedPostId(postId);
  };

  const handleSelectUserPost = (userPostInfo: {
    userId: string;
    postId: string;
  }) => {
    const { userId, postId } = userPostInfo;
    setSelectedUserId(userId);
    setSelectedPostId(postId);
  };

  const handleDeletePost = async () => {
    try {
      const token = getCookie("login");

      if (!token) {
        throw new Error("Token não encontrado");
      }

      const postId = selectedPostId;

      const response = await api.delete(`/post/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        window.location.reload();
      }
      setErrorMessage(null);
    } catch (error) {
      console.error("Erro ao carregar dados do usuário:", error);
      setErrorMessage("Erro ao deletar post.");
    }
  };
  const handleEditPost = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const token = getCookie("login");

    if (!token) {
      throw new Error("Token não encontrado");
    }
    setIsLoading(true);

    const data = new FormData();
    data.append("title", title);
    data.append("description", description);

    try {
      if (post.length === 0) {
        console.error("Post array is empty");
        return;
      }

      const postId = selectedPostId;
      const response = await api.put(`/edit/${postId}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setUserData((prev) => ({
          ...prev!,
          title: response.data.title || prev!.title,
          description: response.data.description || prev!.description,
        }));
        window.location.reload();
      }
      setErrorMessage(null);
    } catch (error) {
      console.error("Erro ao carregar dados do usuário:", error);

      setErrorMessage("Erro ao editar post.");
    } finally {
      setIsLoading(false);
    }
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

  if (!userData) {
    return (
      <div className="flex flex-col justify-center items-center h-screen z-0">
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
        const updatedLikes = [...(prevLikesByPost[postId] || [])];

        if (newLikedState) {
          // Adicionar o usuário na lista de curtidas
          updatedLikes.push(currentUserId);
        } else {
          // Remover o usuário da lista de curtidas
          const userIndex = updatedLikes.indexOf(currentUserId);
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
      <SideBarColumn />
      <NavBar />
      <div className="relative m-10 flex justify-center items-center">
        {userData && (
          <Image
            width={160}
            height={160}
            style={{ objectFit: "cover" }}
            src={userData.profilePicture || UserProfile}
            alt={userData.name || "Foto de perfil"}
            className="2xl:w-40 2xl:h-40 xl:w-32 xl:h-32 lg:w-24 lg:h-24 md:w-24 md:h-24 h-2 w-2 rounded-full border-2 border-red-500 flex-shrink-0"
            loading="lazy"
          />
        )}

        <div className="2xl:mx-16 xl:mx-4">
          <div className="flex-col flex gap-3">
            <div className="flex flex-col">
              <p className="2xl:text-2xl xl:text-xl font-medium">
                {userData.name || "Nome não disponível"}
              </p>
            </div>
            <div className="text-sm font-medium text-zinc-950 dark:text-zinc-500 xl:max-w-sm 2xl:max-w-xl">
              {userData.descriptionProfile ? (
                <div className="list-disc list-inside">
                  {userData.descriptionProfile
                    .split("\n")
                    .map((item, index) => (
                      <p key={index}>{item}</p>
                    ))}
                </div>
              ) : (
                "Descrição não disponível"
              )}
            </div>
            <div className="text-sm font-medium text-blue-700 dark:text-blue-500/60 ">
              <div className="flex items-center gap-1">
                <Globe className="size-4" />
                <Link
                  href={userData.blogProfile || "#"}
                  target="_blank"
                  rel="preload"
                >
                  {userData.blogProfile || "Site não disponível"}
                </Link>
              </div>
              <div className="flex items-stretch gap-1">
                <Linkedin className="size-4" />
                <Link
                  href={userData.linkedinProfile || "#"}
                  target="_blank"
                  rel="preload"
                >
                  {userData.linkedinProfile || "Site não disponível"}
                </Link>
              </div>
            </div>
          </div>
          <div className="flex gap-5 font-semibold mt-5">
            <p className="text-zinc-700 dark:text-zinc-200 leading-[10px]">
              {post.length} publicações
            </p>
            <p className="text-zinc-700 dark:text-zinc-200 leading-[10px]">
              {0} seguidores
            </p>
            <p className="text-zinc-700 dark:text-zinc-200 leading-[10px]">
              {0} seguindo
            </p>
          </div>
        </div>
        <div className="">
          <DialogEditProfile />
        </div>
      </div>
      <div className="mb-10 flex justify-center items-center">
        <DropdownMenuSeparator className="xl:w-6/12 2xl:w-5/12" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 2xl:w-[1200px] xl:w-[650px] lg:w-[700px] mx-auto sm:p-6 lg:p-0">
        {post?.map((post) => (
          <Dialog key={post.id}>
            <DialogTrigger onClick={() => handleSelectPost(post.id)} asChild>
              <div className="w-full 2xl:h-96 xl:h-80 md:h-56 lg:h-72 relative rounded-3xl border border-zinc-800 overflow-hidden bg-zinc-900/30">
                <Image
                  src={post.imageUrl || TemplateError}
                  alt="Post"
                  width={400}
                  height={200}
                  style={{ objectFit: "contain" }}
                  className="w-full h-full"
                  priority
                />
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-1">
                  Edit Post
                  <Dialog>
                    <DialogTrigger asChild>
                      <div className="flex px-2 items-center dark:text-zinc-200 dark:hover:bg-zinc-800 hover:bg-zinc-100 rounded-sm">
                        <Button
                          className="bg-transparent border-none px-0 h-7 hover:bg-transparent w-full items-center justify-start focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                          variant="ghost"
                          onClick={() => {
                            setTitle(post.title);
                            setDescription(post.description);
                          }}
                        >
                          <Pencil />
                        </Button>
                      </div>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Post</DialogTitle>
                        <DialogDescription>
                          Make changes to your post here. Click save when you're
                          done.
                        </DialogDescription>
                      </DialogHeader>
                      {errorMessage && (
                        <p aria-live="assertive" className="text-red-500">
                          {errorMessage}
                        </p>
                      )}
                      <form onSubmit={handleEditPost} className="gap-5">
                        <Label htmlFor="title" className="text-right">
                          Titulo
                          <Input
                            id="title"
                            type="text"
                            value={title || ""}
                            placeholder={post.title}
                            className="col-span-3 mb-2"
                            onChange={(e) => setTitle(e.target.value)}
                          />
                        </Label>

                        <Label htmlFor="description" className="text-right">
                          Description
                          <Textarea
                            id="description"
                            value={description || ""}
                            placeholder={post.description}
                            className="col-span-3 w-full mb-5"
                            onChange={(e) => setDescription(e.target.value)}
                          />
                        </Label>
                        <div className="flex items-center justify-center"></div>
                        <DialogFooter>
                          <Button
                            className="bg-red-500 text-zinc-100 hover:bg-red-600 w-full"
                            disabled={isLoading}
                          >
                            {isLoading ? (
                              "Loading..."
                            ) : (
                              <>
                                Salvar mudanças
                                <Check />
                              </>
                            )}
                          </Button>
                        </DialogFooter>
                      </form>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant={"destructive"}>
                            Excluir postagem
                            <Trash2 />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Você tem certeza?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Essa ação não pode ser desfeita. Esta postagem
                              será apagada permanentemente.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={handleDeletePost}
                              className="bg-red-500 hover:bg-red-700 text-zinc-100"
                            >
                              Deletar <Trash2 />
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </DialogContent>
                  </Dialog>
                </DialogTitle>
                <DialogDescription></DialogDescription>
              </DialogHeader>
              <form className="flex flex-col">
                <div className="flex justify-between mb-1">
                  <Label className="text-left font-medium text-zinc-950 dark:text-zinc-200 w-full">
                    {post.title}
                  </Label>
                  <Label className="text-right">
                    <p className="text-zinc-500 text-xs">
                      {format(new Date(post.createdAt), "dd/MM/yyyy HH:mm:ss")}
                    </p>
                  </Label>
                </div>

                <Label className="text-left">
                  <Image
                    src={post.imageUrl || TemplateError}
                    alt="Post"
                    width={400}
                    height={300}
                    style={{ objectFit: "cover" }}
                    className="w-full h-full"
                    priority
                  />
                </Label>
                <div className="flex gap-2 text-zinc-500 mt-1">
                  <div className="flex items-center gap-1">
                    <div className="flex items-center gap-1">
                      <Dialog>
                        {likesByPost && likesByPost[post.id] ? (
                          <div>{likesByPost[post.id].length || 0}</div>
                        ) : (
                          <div>0</div>
                        )}{" "}
                        <DialogTrigger
                          onClick={() =>
                            handleSelectUserPost({
                              userId: currentUserId,
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
                      {post.comments.length}
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <button className="group relative">
                          <MessageCircle className="cursor-pointer hover:text-blue-500" />
                          <span
                            className="absolute -top-10 left-[100%] -translate-x-[50%] 
                        z-20 origin-left scale-0 px-3 rounded-lg border 
                        border-gray-300 bg-white py-1 text-sm font-bold text-zinc-500
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
                            <Label
                              id="comment"
                              className="text-left font-medium"
                            >
                              {(post.comments as any).map((comment: any) => (
                                <div
                                  key={comment.id || comment.content}
                                  className="flex gap-2"
                                >
                                  <div className="mb-8 flex-shrink-0">
                                    <Image
                                      priority
                                      src={
                                        comment.user.profilePicture ||
                                        UserProfile
                                      }
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
                              ))}
                            </Label>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
                <Label className="text-left text-zinc-600 text-lg max-h-[200px] overflow-y-auto">
                  {post.description
                    ? post.description
                        .split("\n")
                        .map((item, index) => <p key={index}>{item}</p>)
                    : "Descrição não disponível"}
                </Label>
              </form>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </>
  );
};

export default ProfilePage;
