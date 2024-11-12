import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CircleUser, AtSign, Lock } from "lucide-react";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  interface IconInputProps {
    icon: React.ElementType;
    placeholder: string;
    id: string;
  }

  const IconInput: React.FC<IconInputProps> = ({
    icon: Icon,
    placeholder,
    id,
  }) => (
    <div className="relative w-full">
      <Icon className="absolute left-2 top-2 text-zinc-400 size-5" />
      <Input className="pl-8 w-full" id={id} placeholder={placeholder} />
    </div>
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/home");
  };

  const router = useRouter();

  return (
    <Card className="p-6 mx-auto flex flex-col items-center">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 mb-3">
            <CircleUser className="text-red-500 size-10" />
            <h1 className="text-3xl">Login</h1>
          </CardTitle>
          <CardDescription>
            Faça o seu login logo abaixo com os seus dados cadastrados.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 w-full">
          <IconInput
            icon={AtSign}
            placeholder="Digite seu email..."
            id="email-login"
          />
          <IconInput
            icon={Lock}
            placeholder="Digite sua senha..."
            id="password-login"
          />
          <Button className="w-full relative overflow-hidden group">
            <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out -translate-x-full bg-rose-700 rounded-md group-hover:translate-x-0"></span>
            <span className="flex items-center justify-center relative w-full text-white group-hover:text-white">
              Acessar
            </span>
          </Button>
        </CardContent>
      </form>
    </Card>
  );
};
export default LoginForm;
