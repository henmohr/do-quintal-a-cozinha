"use client";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import Image from "next/image";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

export function Footer() {
  return (
    <footer className="w-full bg-yellow-400/95 backdrop-blur supports-[backdrop-filter]:bg-yellow-400/60">
      <div className="container-wrapper">
        <div className="container flex flex-col my-4 gap-2 md:gap-4">
          <div className="flex justify-center items-center gap-4 md:gap-8 flex-col md:flex-row">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo.webp"
                alt="Logo do Movimento da Mulher Trabalhadora Rural de Sergipe"
                height={64}
                width={64}
              />
            </Link>
            <div className="flex flex-col gap-2 text-center md:text-left">
              <p className="font-bold">{siteConfig.name}</p>
              <p className="font-bold">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    window.open('/api/email?subject=Contato via site', '_blank');
                  }}
                  className="hover:underline cursor-pointer flex items-center gap-1 justify-center md:justify-start"
                >
                  <MailOutlineIcon />
                  Enviar email
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
