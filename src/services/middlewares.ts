import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Log para verificar se o middleware está sendo chamado
  console.log("Middleware acionado. Pathname:", pathname);

  // Obter o token do cookie
  const token = req.cookies.get("login")?.value;

  // Log para verificar se o token foi capturado corretamente
  console.log("Token encontrado:", token);

  // Permitir acesso à página inicial e arquivos estáticos sem validação de token
  if (pathname === "/" || pathname.startsWith("/_next")) {
    // Se o usuário está na página inicial e tem token, redirecionar para o dashboard
    if (token && pathname === "/") {
      console.log("Redirecionando para /dashboard pois o token foi encontrado.");
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    return NextResponse.next();
  }

  // Verificar se a rota acessada é o /dashboard e se o token está presente
  if (pathname.startsWith("/dashboard")) {
    if (!token) {
      console.log("Redirecionando para /login pois o token não foi encontrado.");
      // Se não houver token, redirecionar para a página de login
      return NextResponse.redirect(new URL("/", req.url));
    }

    // Se houver token, você pode validar o token chamando uma API
    const isValidToken = await validateToken(token);

    if (!isValidToken) {
      console.log("Token inválido, redirecionando para /login.");
      return NextResponse.redirect(new URL("/", req.url));
    }

    // Se o token for válido, permitir o acesso ao dashboard
    return NextResponse.next();
  }

  return NextResponse.next(); // Permite que outras rotas prossigam normalmente
}

export const config = {
  matcher: ["/home/:path*", "/"], // Aplique o middleware para todas as rotas que começam com /home e a página inicial
};

// Função para validar o token
async function validateToken(token: string) {
  try {
    console.log("Validando token...");

    // Aqui você pode chamar uma API que valida o token
    const response = await fetch("/api/validate-token", {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log("Resposta da API de validação:", response.ok);
    return response.ok; // Retorna true se o token for válido
  } catch (err) {
    console.error("Erro ao validar token:", err);
    return false; // Retorna false se o token for inválido
  }
}