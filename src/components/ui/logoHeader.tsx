import { Braces } from "lucide-react";

export const LogoHeader = () => {
  return (
    <>
      <div className="mb-6 flex items-center justify-center text-4xl font-bold">
        <h1 className="dark:text-zinc-300">Dev</h1>
        <span className="text-red-500 -mx-[5px] flex">
          Blog
          <span>
            <Braces className="size-7" />
          </span>
        </span>
      </div>
    </>
  );
};
