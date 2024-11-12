import { Textarea } from "@/components/ui/textarea";
import { ImageTemplate } from "@/components/ui/imageExample";

export const ForYouPage = () => {
  return (
    <>
      <div className="flex mt-10">
        <div className="-translate-x-[200px]">
          <Textarea className="w-[1000px]" placeholder="Escreva aqui..." />
          <ImageTemplate />
        </div>
      </div>
    </>
  );
};
