"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";

import { useState, useEffect, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { Bolt, Settings, UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { getCookie } from "cookies-next";
import { api } from "@/services/api";
import axios from "axios";
import FormData from "form-data";

interface UserData {
  name: string;
  descriptionProfile: string;
  blogProfile: string | null;
  linkedinProfile: string | null;
  profilePicture: File | null;
}

export function DialogEditProfileHeader() {
  const router = useRouter();

  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);

  const [formData, setFormData] = useState<UserData>({
    name: "",
    descriptionProfile: "",
    blogProfile: "",
    linkedinProfile: "",
    profilePicture: null,
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const token = getCookie("login");

      if (!token) {
        throw new Error("Token not found");
      }

      try {
        const response = await api.get("/info", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const { name, descriptionProfile, blogProfile, linkedinProfile } =
          response.data;
        setUserData(response.data);
        setFormData({
          name,
          descriptionProfile,
          blogProfile,
          linkedinProfile,
          profilePicture: null,
        });
      } catch {
        router.push("/home");
      }
    };

    fetchUserData();
  }, [router]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const previewUrl = reader.result as string;
        setPreview(previewUrl);
      };
      reader.readAsDataURL(file);
      setFormData((prev) => ({ ...prev, profilePicture: file }));
    }
  };
  const handleSave = async () => {
    const token = getCookie("login");
    if (!token) {
      setErrorMessage("Login token not found.");
      return;
    }

    if (!formData.name || formData.name.trim() === "") {
      setErrorMessage("O campo 'Nome' é obrigatório.");
      return;
    }
    setIsLoading(true);

    const data = new FormData();
    data.append("name", formData.name);
    data.append("descriptionProfile", formData.descriptionProfile);
    data.append("blogProfile", formData.blogProfile);
    data.append("linkedinProfile", formData.linkedinProfile);
    if (formData.profilePicture) {
      data.append("file", formData.profilePicture);
    }

    try {
      const response = await api.put("/edit", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setUserData((prev) => ({
          ...prev!,
          name: response.data.name || prev!.name,

          descriptionProfile:
            response.data.descriptionProfile || prev!.descriptionProfile,

          blogProfile: response.data.blogProfile || prev!.blogProfile,

          linkedinProfile:
            response.data.linkedinProfile || prev!.linkedinProfile,

          profilePicture: response.data.profilePicture || prev!.profilePicture,
        }));
        window.location.reload();
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage(
        axios.isAxiosError(error)
          ? error.response?.data.message || "Error saving changes."
          : ""
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="items-center dark:text-zinc-200">
          <button className="flex gap-2">
            <Settings className="2xl:size-7 xl:size-5 lg:size-5" />
            <span className="block font-medium text-zinc-800 dark:text-zinc-200 relative before:absolute before:bottom-0 before:left-0 before:h-0.5 before:w-0 dark:before:bg-zinc-200 before:bg-zinc-800 before:transition-all before:duration-300 hover:before:w-full">
              Edite seu Perfil
            </span>
          </button>
        </div>
      </DialogTrigger>
      <DialogContent className="xl:max-h-[700px] 2xl:max-h-[800px]">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        {errorMessage && (
          <p aria-live="assertive" className="text-red-500">
            {errorMessage}
          </p>
        )}
        <form className="gap-5">
          <Label htmlFor="name" className="text-right">
            Name
          </Label>
          <Input
            id="name"
            type="text"
            value={formData.name || ""}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="col-span-3 mb-2"
          />

          <Label htmlFor="blogProfile" className="text-right">
            BlogProfile
          </Label>
          <Input
            id="blogProfile"
            type="text"
            value={formData.blogProfile || ""}
            placeholder="Your blog link"
            onChange={(e) =>
              setFormData({ ...formData, blogProfile: e.target.value })
            }
            className="col-span-3 mb-2"
          />

          <Label htmlFor="linkedinProfile" className="text-right">
            LinkedinProfile
          </Label>
          <Input
            id="linkedinProfile"
            type="text"
            value={formData.linkedinProfile || ""}
            placeholder="Your linkedin link"
            onChange={(e) =>
              setFormData({ ...formData, linkedinProfile: e.target.value })
            }
            className="col-span-3 mb-2"
          />

          <Label htmlFor="description" className="text-right">
            Description
          </Label>
          <Textarea
            id="description"
            value={formData.descriptionProfile || ""}
            onChange={(e) =>
              setFormData({ ...formData, descriptionProfile: e.target.value })
            }
            className="col-span-3 w-full mb-5"
          />
          <div className="flex items-center justify-center">
            <Label className="relative  2xl:w-[300px] 2xl:h-[300px] xl:w-[200px] xl:h-[200px] flex items-center justify-center border border-dashed border-zinc-700 rounded-full cursor-pointer mb-4">
              <Input
                type="file"
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              {preview ? (
                <Image
                  alt="Preview da imagem"
                  src={preview}
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-full"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-center">
                  <UploadCloud className="w-10 h-10 text-red-600 hover:scale-95 transition-transform duration-300 hover:text-red-800" />
                  <p className="text-zinc-400">Clique para fazer upload</p>
                </div>
              )}
            </Label>
          </div>
          <DialogFooter>
            <Button
              onClick={handleSave}
              disabled={isLoading || formData.name === ""}
            >
              {isLoading ? "Loading..." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
