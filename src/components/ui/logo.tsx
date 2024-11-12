import { Music } from "lucide-react";

export const Logo = () => {
  return (
    <>
      <div className="mb-6 flex items-center justify-center text-6xl font-bold">
        <h1 className="dark:text-zinc-300">Sound</h1>
        <span className="text-red-500 -mx-[10.5px] flex">
          App
          <span>
            <Music className="size-10" />
          </span>
        </span>
      </div>
    </>
  );
};
