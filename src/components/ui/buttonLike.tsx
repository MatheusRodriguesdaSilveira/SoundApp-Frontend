import { Heart } from "lucide-react";

import { useState } from "react";
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

export const ButtonLike = () => {
  const [selectedPostId, setSelectedPostId] = useState<string>("");
  const [isLiked, setIsLiked] = useState(false);

  const router = useRouter();

  const handleSelectPost = (post_id: string) => {
    setSelectedPostId(post_id);
  };

  const handleLikeButton = async () => {
    try {
      const token = getCookie("login");

      if (!token) {
        throw new Error("Token não encontrado");
      }
      const postId = selectedPostId;
      console.log(postId);
      const response = await api.post(`/like/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setIsLiked(!isLiked);
      console.log(response.data);
    } catch (error) {
      console.error("Erro ao carregar dados do usuário:", error);
      router.push("/home");
    }
  };
  return (
    <>
      <div className="flex items-center gap-1">
        <button
          onClick={() => handleSelectPost(selectedPostId)}
          className="group relative"
        >
          <Heart
            onClick={handleLikeButton}
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
    </>
  );
};
