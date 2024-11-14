import { Heart, MessageCircle, PartyPopper } from "lucide-react";
import Image from "next/image";
import Template from "/public/template.png";
import UserProfile from "/public/user.png";
import { formatRelativeTime } from "@/lib/format-relative";
import { useState } from "react";

export const ImageTemplate = () => {
  const dataExemplo = new Date("2024-11-10T10:00:00");
  const [isFullLike, setIsFullLike] = useState(false);
  const [isFullHype, setIsFullHype] = useState(false);

  const handleLikeButton = () => {
    setIsFullLike((prev) => !prev); // Alterna entre true e false
  };

  const handleHypeButton = () => {
    setIsFullHype((prev) => !prev); // Alterna entre true e false
  };

  return (
    <>
      <div className="flex flex-col items-center">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="mt-10 w-[800px]">
            <div className="flex gap-4 justify-start items-start">
              <div className="bg-zinc-300 rounded-full p-2 border-2 border-red-500 flex-shrink-0">
                <Image src={UserProfile} alt="profile" className="w-7 h-7" />
              </div>
              <div className="flex flex-col mb-5 w-full">
                <p className="text-lg font-medium flex gap-1">
                  User{index + 1}{" "}
                  <span className="text-zinc-500 flex">
                    {"- "} {formatRelativeTime(dataExemplo)}{" "}
                  </span>
                </p>
                <p className="text-sm text-zinc-500 leading-[10px]">
                  @user.{index + 1}
                </p>

                <div className="relative mt-5 w-full flex">
                  <Image
                    src={Template}
                    alt="example"
                    className="w-[500px] h-[500px] rounded-md"
                  />
                </div>

                <div className="py-2 text-zinc-500">
                  <div className="flex mb-2 gap-2 text-zinc-500">
                    <div>10</div>
                    <button
                      onClick={handleLikeButton}
                      className="group relative"
                    >
                      <Heart
                        className={`cursor-pointer hover:text-red-500 ${
                          isFullLike ? "fill-current text-red-500" : ""
                        }`}
                      />
                      <span
                        className="absolute -top-10 left-[100%] -translate-x-[50%] 
                        z-20 origin-left scale-0 px-3 rounded-lg border 
                        border-gray-300 bg-white py-1 text-sm font-bold
                        shadow-md transition-all duration-300 ease-in-out 
                        group-hover:scale-100"
                      >
                        Like
                      </span>
                    </button>
                    <div>5</div>
                    <button className="group relative">
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
                    <button
                      onClick={handleHypeButton}
                      className="group relative"
                    >
                      <PartyPopper
                        className={`cursor-pointer hover:text-yellow-500 ${
                          isFullHype ? "fill-current text-yellow-500" : ""
                        }`}
                      />
                      <span
                        className="absolute -top-10 left-[100%] -translate-x-[50%] 
                        z-20 origin-left scale-0 px-3 rounded-lg border 
                        border-gray-300 bg-white py-1 text-sm font-bold
                        shadow-md transition-all duration-300 ease-in-out 
                        group-hover:scale-100"
                      >
                        Hypar
                      </span>
                    </button>
                  </div>

                  <p className="w-full max-w-[500px] text-left leading-loose">
                    🚀 Compartilhando minha evolução com Node.js! Recentemente,
                    venho trabalhando em uma aplicação onde os usuários podem se
                    cadastrar e fazer login com segurança. 🛡️ Uma das
                    funcionalidades que implementei foi o tratamento de erros da
                    aplicação, além da geração de tokens de autenticação
                    utilizando o JWT (Json Web Token), garantindo que cada
                    sessão seja única e protegida. Também cuidei da segurança
                    das senhas dos usuários, aplicando criptografia com o
                    bcryptjs, que gera um hash seguro e protege os dados de quem
                    realiza o cadastro. 🔒 Essa é apenas uma parte do projeto,
                    mas estou animado com o progresso e o aprendizado que estou
                    adquirindo ao longo do caminho! 😄
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
