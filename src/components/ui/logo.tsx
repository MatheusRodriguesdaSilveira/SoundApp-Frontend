import { Braces, CodeXml } from "lucide-react";

export const Logo = () => {
  return (
    <>
      <div className="mb-6 flex items-center justify-center text-6xl font-bold">
        <h1 className="dark:text-zinc-300">Dev</h1>
        <span className="text-red-500 flex">
          Blog
          <span>
            <Braces className="size-10" />
          </span>
        </span>
      </div>
    </>
  );
};
