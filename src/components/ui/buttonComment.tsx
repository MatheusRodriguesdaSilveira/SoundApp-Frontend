import { MessageCircle, SmilePlus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";

import UserProfile from "/public/user.png";
import Image from "next/image";
import { Label } from "./label";
import { Textarea } from "./textarea";
import { Button } from "./button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { useRef } from "react";

export const ButtonComment = () => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleAddEmoji = (emoji: string) => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const text = textarea.value;

      textarea.value = text.slice(0, start) + emoji + text.slice(end);

      textarea.selectionStart = textarea.selectionEnd = start + emoji.length;

      textarea.focus();
    }
  };

  return (
    <Dialog>
      {/* Contador de comentários */}
      <div>5 </div>
      <DialogTrigger asChild>
        <button className="group relative" aria-label="Abrir comentários">
          <MessageCircle className="cursor-pointer hover:text-blue-500" />
          <span
            className="absolute -top-10 left-[100%] -translate-x-[50%] 
                        z-20 origin-left scale-0 px-3 rounded-lg border 
                        border-gray-300 bg-white py-1 text-sm font-bold
                        shadow-md transition-all duration-300 ease-in-out 
                        group-hover:scale-100"
          >
            Comment
          </span>
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Comentários</DialogTitle>
          <DialogDescription>Veja o que estão falando.</DialogDescription>
        </DialogHeader>

        <form className="mb-4">
          <Label
            htmlFor="add-comment"
            className="block text-sm font-medium mb-2"
          >
            Adicionar comentário
          </Label>
          <div className="relative">
            <Textarea
              id="add-comment"
              ref={textareaRef}
              className="rounded-lg focus:outline-none w-full p-2 pr-[100px]"
              placeholder="Escreva seu comentário..."
            />
            <Button
              size={"sm"}
              className="w-[70px] h-[30px] absolute right-2 top-16 rounded-lg text-white font-semibold hover:bg-red-700 hover:scale-95"
            >
              Publicar
            </Button>

            <Select onValueChange={handleAddEmoji}>
              <SelectTrigger className="absolute right-16 top-16 w-[50px] mr-2 border-none flex items-center justify-center focus:ring-2 focus:ring-transparent">
                <SmilePlus />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup className="grid grid-cols-5 gap-2">
                  {/* Emojis de Expressões */}
                  <SelectItem value="😀">😀</SelectItem>
                  <SelectItem value="😅">😅</SelectItem>
                  <SelectItem value="😂">😂</SelectItem>
                  <SelectItem value="😍">😍</SelectItem>
                  <SelectItem value="😎">😎</SelectItem>
                  <SelectItem value="😢">😢</SelectItem>
                  <SelectItem value="😡">😡</SelectItem>
                  <SelectItem value="🤔">🤔</SelectItem>
                  <SelectItem value="🥳">🥳</SelectItem>
                  <SelectItem value="😴">😴</SelectItem>

                  {/* Emojis de Gestos */}
                  <SelectItem value="👍">👍</SelectItem>
                  <SelectItem value="👎">👎</SelectItem>
                  <SelectItem value="👏">👏</SelectItem>
                  <SelectItem value="🙌">🙌</SelectItem>
                  <SelectItem value="👌">👌</SelectItem>
                  <SelectItem value="🙏">🙏</SelectItem>
                  <SelectItem value="🤝">🤝</SelectItem>
                  <SelectItem value="🤟">🤟</SelectItem>
                  <SelectItem value="✌">✌</SelectItem>
                  <SelectItem value="👋">👋</SelectItem>

                  {/* Emojis de Objetos */}
                  <SelectItem value="❤️">❤️</SelectItem>
                  <SelectItem value="🔥">🔥</SelectItem>
                  <SelectItem value="⭐">⭐</SelectItem>
                  <SelectItem value="🎉">🎉</SelectItem>
                  <SelectItem value="📚">📚</SelectItem>
                  <SelectItem value="💡">💡</SelectItem>
                  <SelectItem value="⚽">⚽</SelectItem>
                  <SelectItem value="🎵">🎵</SelectItem>
                  <SelectItem value="📷">📷</SelectItem>
                  <SelectItem value="✈️">✈️</SelectItem>

                  {/* Emojis de Comida */}
                  <SelectItem value="🍎">🍎</SelectItem>
                  <SelectItem value="🍔">🍔</SelectItem>
                  <SelectItem value="🍕">🍕</SelectItem>
                  <SelectItem value="🍩">🍩</SelectItem>
                  <SelectItem value="🍿">🍿</SelectItem>
                  <SelectItem value="🍣">🍣</SelectItem>
                  <SelectItem value="🍦">🍦</SelectItem>
                  <SelectItem value="🍫">🍫</SelectItem>
                  <SelectItem value="🍹">🍹</SelectItem>
                  <SelectItem value="☕">☕</SelectItem>

                  {/* Emojis de Animais */}
                  <SelectItem value="🐶">🐶</SelectItem>
                  <SelectItem value="🐱">🐱</SelectItem>
                  <SelectItem value="🐭">🐭</SelectItem>
                  <SelectItem value="🐹">🐹</SelectItem>
                  <SelectItem value="🐼">🐼</SelectItem>
                  <SelectItem value="🦁">🦁</SelectItem>
                  <SelectItem value="🐸">🐸</SelectItem>
                  <SelectItem value="🐧">🐧</SelectItem>
                  <SelectItem value="🐳">🐳</SelectItem>
                  <SelectItem value="🦋">🦋</SelectItem>

                  {/* Emojis de Natureza */}
                  <SelectItem value="🌳">🌳</SelectItem>
                  <SelectItem value="🌺">🌺</SelectItem>
                  <SelectItem value="🌈">🌈</SelectItem>
                  <SelectItem value="☀️">☀️</SelectItem>
                  <SelectItem value="🌙">🌙</SelectItem>
                  <SelectItem value="🌊">🌊</SelectItem>
                  <SelectItem value="⛄">⛄</SelectItem>
                  <SelectItem value="🌌">🌌</SelectItem>
                  <SelectItem value="⚡">⚡</SelectItem>
                  <SelectItem value="🌍">🌍</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </form>

        {/* Lista de comentários */}
        <div className="flex flex-col gap-6 h-[400px] overflow-y-auto">
          {[...Array(10)].map((_, index) => (
            <div key={index} className="flex gap-4 items-start">
              <a href="/profile">
                <div className="bg-zinc-200 rounded-full p-2 border border-red-500">
                  <Image
                    src={UserProfile}
                    alt="Foto do perfil"
                    width={32}
                    height={32}
                    className="size-5"
                  />
                </div>
              </a>
              <div>
                <Label
                  htmlFor={`user-${index}`}
                  className="text-left font-medium"
                >
                  User.name
                </Label>
                <p className="text-left text-zinc-400">Obrigado pela dica!!!</p>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
