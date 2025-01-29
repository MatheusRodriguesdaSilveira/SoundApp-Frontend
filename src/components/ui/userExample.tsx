import Image from "next/image";
import TemplateError from "/public/imageError.svg";
import User from "/public/user.png";
import { useEffect, useState } from "react";
import { api } from "@/services/api";
import { getCookie } from "cookies-next";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";

import { Button } from "./button";
import { Label } from "./label";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { UserRoundSearch } from "lucide-react";

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

export const UserTemplate = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const [posts, setPosts] = useState<UserData[]>([]);

  const handleSelectUserPost = (userPostInfo: { userId: string }) => {
    const { userId } = userPostInfo;
    console.log(`id user: ${userId}`);
    setSelectedUserId(userId);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = getCookie("login");

        if (!token) {
          throw new Error("Token not found");
        }

        const response = await api.get("/profiles", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const post = response.data.posts?.map(
          (post: {
            id: string;
            imageUrl: string;
            title: string;
            description: string;
          }) => {
            return post;
          }
        );

        setPosts(post || []);
        setUsers(response.data || []);
      } catch (error) {
        console.error("Error loading user data:", error);
      }
    };
    fetchUsers();
  }, []);

  const fetchPosts = async (userId: string) => {
    try {
      const token = getCookie("login");

      if (!token) {
        throw new Error("Token not found");
      }

      const response = await api.get(`/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const post = response.data.posts?.map(
        (post: {
          id: string;
          imageUrl: string;
          title: string;
          description: string;
        }) => {
          return post;
        }
      );

      setPosts(post || []);
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  };

  return (
    <div className="space-y-2">
      {users.map((user, index) => (
        <div
          key={index}
          className="flex items-center justify-between border rounded-lg py-1.5 px-1.5 mb-2"
        >
          <Dialog>
            <DialogTrigger
              onClick={() => {
                fetchPosts(user.id);
              }}
            >
              <div className="flex items-center gap-2">
                <Image
                  src={user.profilePicture || User}
                  alt="profile"
                  width={30}
                  height={30}
                  priority
                  className="2xl:w-8 2xl:h-8 xl:h:w-7 xl:h-7 rounded-full border border-red-700 flex-shrink-0"
                />
                <p className="text-xs">{user.name}</p>
              </div>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[1000px] bg-zinc-200 dark:bg-zinc-900">
              <DialogHeader>
                <span className="text-zinc-700 dark:text-zinc-200 flex gap-1 items-center">
                  Preview
                  <UserRoundSearch className="size-4" />
                </span>
                <div className="flex items-center gap-3">
                  <Image
                    src={user.profilePicture || User}
                    alt="profile"
                    width={100}
                    height={100}
                    priority
                    className="2xl:w-24 2xl:h-24 xl:w-20 xl:h-20 rounded-full border border-red-700 flex-shrink-0"
                  />
                  <div>
                    <DialogTitle>{user.name}</DialogTitle>
                    <Label className="text-zinc-700 dark:text-zinc-200">
                      {user.descriptionProfile
                        ?.split("\n")
                        .map((item, index) => (
                          <DialogDescription key={index}>
                            {item}
                          </DialogDescription>
                        )) || "Sem descrição"}
                    </Label>
                    <div
                      key={user.id}
                      className="flex gap-5 font-semibold mt-5"
                    >
                      <p className="text-zinc-700 dark:text-zinc-200 leading-[10px]">
                        {posts?.length || 0} publicações
                      </p>
                      <p className="text-zinc-700 dark:text-zinc-200 leading-[10px]">
                        {0} seguidores
                      </p>
                      <p className="text-zinc-700 dark:text-zinc-200 leading-[10px]">
                        {0} seguindo
                      </p>
                    </div>
                  </div>
                </div>
              </DialogHeader>
              <div className="flex justify-center items-center">
                <DropdownMenuSeparator className="w-full" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {posts.map((post, index) => (
                  <div
                    key={index}
                    className="rounded-lg p-1 border bg-zinc-950/50 border-zinc-600"
                  >
                    <Image
                      src={post.imageUrl || TemplateError}
                      alt="Post"
                      width={500}
                      height={500}
                      className="h-[200px] object-contain"
                      priority
                    />
                  </div>
                ))}
              </div>
            </DialogContent>

            <Button
              variant="secondary"
              size="sm"
              className="flex rounded-lg gap-1 px-2"
            >
              <p className="text-xs font-medium flex">Seguir✔</p>
            </Button>
          </Dialog>
        </div>
      ))}
    </div>
  );
};
