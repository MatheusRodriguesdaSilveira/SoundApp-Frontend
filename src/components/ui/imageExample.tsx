import { Heart, PartyPopper } from "lucide-react";
import Image from "next/image";
import Template from "/public/template.png";
import UserProfile from "/public/user.png";
import { ButtonComment } from "./buttonComment";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import { api } from "@/services/api";
import { format } from "date-fns";

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
}

export const ImageTemplate = () => {
  const router = useRouter();

  const [likesCount, setLikesCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isHyped, setIsHyped] = useState(false);

  const [userData, setUserData] = useState<UserData | null>(null);
  const [info, setInfo] = useState<UserData[]>([]);
  const [user, setProfileUser] = useState<UserData[]>([]);

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

        console.log(response.data.map((user: { user: any }) => user.user));
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

  const handleLikeButton = () => {
    if (!isLiked) {
      setLikesCount(likesCount + 1);
    } else {
      setLikesCount(likesCount - 1);
    }
    setIsLiked((prev) => !prev);
  };

  const handleHypeButton = () => {
    setIsHyped((prev) => !prev);
  };

  if (!userData) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <h1 className="text-zinc-400 m-2">Carregando...</h1>
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-red-500" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      {info
        .sort(
          (a: any, b: any) =>
            new Date(b.createdAt && b.updatedAt).getTime() -
            new Date(a.createdAt && a.updatedAt).getTime()
        )
        .map((post, index) => (
          <div key={index} className="mt-10 w-[800px]">
            <div className="flex gap-4 justify-start items-start">
              <div className="py-1 flex-shrink-0">
                <Image
                  width={200}
                  height={200}
                  style={{ objectFit: "cover" }}
                  src={(post.user as any).profilePicture || UserProfile}
                  alt="profile"
                  className="xl:w-12 xl:h-12 lg:w-10 lg:h-10 h-2 w-2 rounded-full border border-red-500 "
                />
              </div>
              <div className="flex flex-col 2xl:w-[500px] xl:w-[500px] lg:w-[500px] max-w-7xl sm:p-6 lg:p-0">
                <p className="text-lg font-medium">{(post.user as any).name}</p>
                <p className="text-lg text-zinc-500 flex ">
                  {post.title || "Postagem"}
                </p>
                <div className="w-full 2xl:h-96 xl:h-72 md:h-56 lg:h-72 relative rounded-3xl border border-zinc-800 overflow-hidden bg-zinc-900/30">
                  <Image
                    priority
                    src={post.imageUrl || Template}
                    alt="example"
                    width={500}
                    height={500}
                    style={{ objectFit: "contain" }}
                    className="w-full h-full rounded-md"
                  />
                </div>

                <div className="py-2 text-zinc-500">
                  <div className="flex mb-2 gap-2 text-zinc-500">
                    <div className="flex items-center gap-1">
                      <div>{likesCount}</div>
                      <button
                        onClick={handleLikeButton}
                        className="group relative"
                      >
                        <Heart
                          className={`cursor-pointer hover:text-red-500 ${
                            isLiked ? "fill-current text-red-500" : ""
                          }`}
                        />
                        <span
                          className="absolute -top-10 left-[100%] -translate-x-[50%]
                  z-20 origin-left scale-0 px-3 rounded-lg border
                  border-gray-300 bg-white py-1 text-sm font-bold
                  shadow-md transition-all duration-300 ease-in-out
                  group-hover:scale-100"
                        >
                          Like
                        </span>
                      </button>
                    </div>
                    <div className="flex items-center gap-1">
                      <ButtonComment />
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
  );
};
