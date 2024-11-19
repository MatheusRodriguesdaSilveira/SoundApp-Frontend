import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export const ButtonScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibile = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibile);

    return () => window.removeEventListener("scroll", toggleVisibile);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <>
      {isVisible && (
        <div className="fixed items-end justify-end right-[400px] bottom-5">
          <button
            onClick={scrollToTop}
            className="bg-zinc-200 dark:bg-zinc-900/40 rounded-full p-3 cursor-pointer border-2 border-dashed border-zinc-400 dark:border-zinc-700 hover:scale-95 duration-500"
          >
            <ArrowUp className="text-red-500 size-6 " />
          </button>
        </div>
      )}
    </>
  );
};
