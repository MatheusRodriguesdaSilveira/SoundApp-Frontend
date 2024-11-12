import { UserPlus2 } from "lucide-react";
import { Button } from "./button";
import Image from "next/image";
import User from "/public/user.png";

export const UserTemplate = () => {
  return (
    <>
      <div>
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className="flex gap-2 border rounded-lg py-1.5 px-1.5 items-center justify-between mb-2"
          >
            <div className="flex gap-2 items-center">
              <div className="bg-zinc-300 rounded-full p-2.5 border border-red-500">
                <Image src={User} alt="profile" className="size-4" />
              </div>
              <p>user{index + 2}</p>
            </div>
            <Button
              variant={"secondary"}
              size={"sm"}
              className="flex rounded-lg gap-1"
            >
              <p className="text-sm">Seguir</p> <UserPlus2 className="size-4" />
            </Button>
          </div>
        ))}
      </div>
    </>
  );
};
