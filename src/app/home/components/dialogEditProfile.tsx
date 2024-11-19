import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/services/api";
import { getCookie } from "cookies-next";
import { Bolt } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface UserData {
  name: string;
  email: string;
  avatar: string;
}

export function DialogEditProfile() {
  const router = useRouter();

  const [userData, setUserData] = useState<UserData | null>(null);

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

        setUserData(response.data);
      } catch (error) {
        router.push("/home");
      }
    };

    fetchUserData();
  }, [router]);

  if (!userData) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <h1 className="text-zinc-400 m-2">Carregando</h1>
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-red-500" />
      </div>
    );
  }

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <div className="flex mt-1 px-2 h-8 items-center dark:text-zinc-200 dark:hover:bg-zinc-800 hover:bg-zinc-100 rounded-sm">
            <Button
              className="bg-transparent border-none px-0 h-7 hover:bg-transparent"
              variant="ghost"
            >
              <Bolt />
              Edit Profile
            </Button>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Imagem
              </Label>
              <Input id="file_input" type="file" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nome
              </Label>
              <Input
                id="name"
                defaultValue={userData.name}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Username
              </Label>
              <Input
                id="username"
                defaultValue={userData.email}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Salvar mudanças</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
