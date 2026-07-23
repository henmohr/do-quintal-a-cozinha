import { NextRequest, NextResponse } from "next/server";
import { siteConfig } from "@/config/site";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const subject = searchParams.get("subject") || "Contato via site";

  try {
    // Email nunca aparece no frontend
    const email = siteConfig.mail;
    
    // Monta URL do mailto
    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}`;

    // Redireciona para o cliente de email
    return NextResponse.redirect(mailtoUrl);
  } catch (error) {
    console.error("Error redirecting to email:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
