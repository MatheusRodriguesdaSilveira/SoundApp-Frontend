import { Braces } from "lucide-react";

export const LogoHeader = () => {
  return (
    <>
      <div className="mb-6 flex items-center justify-center 2xl:text-4xl xl:text-3xl lg:text-3xl font-bold">
        <h1 className="dark:text-zinc-300">Dev</h1>
        <span className="text-red-500 -mx-[5px] flex">
          Blog
          <span>
            <Braces className="2xl:size-7 xl:size-5" />
          </span>
        </span>
      </div>
    </>
  );
};
