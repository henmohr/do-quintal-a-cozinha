import Image from "next/image";
import { HomeIcon } from "@/components/home-icon";
import Link from "next/link";

export default function Home() {
  return (
    <main className="container-wrapper h-full">
      <div className="container flex flex-col h-full py-4 md:py-6 gap-4 md:gap-6">
        <div className="h-150 w-full relative flex-shrink-0">
          <Image
            src="/home-image.webp"
            alt="Description of my image"
            fill
            priority
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 100vw"
          />
        </div>
        <div className="flex-1 flex items-center justify-center min-h-0 py-4 md:py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-30 place-items-center w-fit">
            <Link href="/nosso-espaco">
              <HomeIcon
                title="Nosso Espaço"
                illustrationSrc="/icons/botton-espaco.webp"
              ></HomeIcon>
            </Link>
            <Link href="/nossas-historias">
              <HomeIcon
                title="Nossas Histórias"
                illustrationSrc="/icons/botton-historias.webp"
              ></HomeIcon>
            </Link>
            <Link href="/nossa-producao">
              <HomeIcon
                title="Nossa Produção"
                illustrationSrc="/icons/botton-produtos-plain.webp"
              ></HomeIcon>
            </Link>
            <Link href="/nossas-receitas">
              <HomeIcon
                title="Nossas Receitas"
                illustrationSrc="/icons/botton-receitas.webp"
              ></HomeIcon>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
