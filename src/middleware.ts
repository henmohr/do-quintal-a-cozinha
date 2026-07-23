import { NextRequest } from "next/server"

export const config = {
  matcher: '/api/:path*',
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Rotas internas que não precisam de API Key
  const internalRoutes = ['/api/email', '/api/whatsapp'];
  if (internalRoutes.some(route => pathname.startsWith(route))) {
    return; // Permite acesso sem API Key
  }
  
  // Rotas externas precisam de API Key
  if (request.headers.get("API_KEY") !== process.env.API_KEY) {
    return new Response(JSON.stringify({ error: "Invalid API Key" }), {
      status: 401,
    });
  }
}
