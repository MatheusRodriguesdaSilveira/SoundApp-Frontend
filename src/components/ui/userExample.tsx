import { Button } from "./button";
import Image from "next/image";
import User from "/public/user.png";
import { useEffect, useState } from "react";
import { api } from "@/services/api";
import { getCookie } from "cookies-next";

interface UserData {
  name: string;
  email: string;
  profilePicture: string;
  descriptionProfile: string;
  id: string;
}

export const UserTemplate = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);

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

        setUsers(response.data || []);
        const userData: UserData[] = response.data;
        const currentUserData = userData.find(
          (user) => user.email === getCookie("email")
        );
        setCurrentUser(currentUserData ?? null);
      } catch (error) {
        console.error("Error loading user data:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="space-y-2">
      {users
        .filter((user) => user.id !== currentUser?.id)
        .map((user, index) => (
          <div
            key={index}
            className="flex items-center justify-between border rounded-lg py-1.5 px-1.5 mb-2"
          >
            <a className="flex items-center gap-1" href="/profile">
              <Image
                src={user.profilePicture || User}
                alt="profile"
                width={30}
                height={30}
                priority
                className="2xl:w-8 2xl:h-8 rounded-full border border-red-700 flex-shrink-0"
              />
              <p className="text-xs">{user.name}</p>
            </a>
            <Button
              variant="secondary"
              size="sm"
              className="flex rounded-lg gap-1 px-2"
            >
              <p className="text-xs font-medium flex">Seguir✔</p>
            </Button>
          </div>
        ))}
    </div>
  );
};
