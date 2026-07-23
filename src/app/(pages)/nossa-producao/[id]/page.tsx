"use client";

import { Button } from "@/components/ui/button";
import { ImageLightbox } from "@/components/image-lightbox";
import { useGetProductById } from "@/hooks/use-get-product-by-id";
import { useMobile } from "@/hooks/use-mobile";
import { formatPrice } from "@/lib/utils";
import { Divider } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { use, useCallback, useState } from "react";

import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default function Page({ params }: Props) {
  const { id } = use(params);
  const { data, isLoading } = useGetProductById({ id });
  const [selectedMedia, setSelectedMedia] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const isMobile = useMobile();

  const handleNextMedia = useCallback(() => {
    if (data && selectedMedia + 1 < data.media.length) {
      setSelectedMedia((prev) => prev + 1);
    }
  }, [data, selectedMedia]);

  const handlePrevMedia = useCallback(() => {
    if (selectedMedia !== 0) {
      setSelectedMedia((prev) => prev - 1);
    }
  }, [selectedMedia]);

  if (isLoading) {
    return <div>carregando...</div>;
  }

  if (!data) {
    return (
      <main className="container-wrapper">
        <div className="container flex flex-col gap-6">
          <h1 className="text-2xl font-bold">Produto não encontrado</h1>
          <Link
            href="/nossa-producao"
            className="text-primary hover:underline mt-4 inline-block"
          >
            Voltar para a Nossa Produção
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="container-wrapper">
      <div className="container flex flex-col gap-6">
        <div>
          <div className="px-4 py-2 bg-purple-400/95 inline">
            <span className="text-lg font-bold text-white">Nossa Produção</span>
          </div>
          <p className="mt-3">Conheça a nossa produção</p>
        </div>
        <div className="flex flex-col lg:grid lg:grid-cols-[668px_1fr] gap-4">
          <div className="flex flex-col-reverse md:flex-row gap-8">
            <div className="flex flex-row items-center md:flex-col gap-4">
              {isMobile && (
                <div
                  onClick={handlePrevMedia}
                  className="bg-gray-200 hover:bg-orange-500 cursor-pointer"
                >
                  <KeyboardArrowLeft style={{ fontSize: 32, color: "white" }} />
                </div>
              )}
              {data.media
                .filter((media) => media.media.media_type === "IMAGE")
                .map((media, index) => (
                  <div
                    key={media.mediaId}
                    className={`p-4 ${
                      selectedMedia === index
                        ? "border border-orange-500"
                        : "border"
                    }`}
                    onClick={() => setSelectedMedia(index)}
                  >
                    <div className="relative aspect-square min-w-[100px]">
                      <Image
                      src={media.media.url || "/icone-produtos.webp"}
                        alt={data?.product_name || ""}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                  </div>
                ))}
              {isMobile && (
                <div
                  onClick={handleNextMedia}
                  className="bg-gray-200 hover:bg-orange-500 cursor-pointer"
                >
                  <KeyboardArrowRight
                    style={{ fontSize: 32, color: "white" }}
                  />
                </div>
              )}
            </div>
            <div>
              <button
                onClick={() => setLightboxOpen(true)}
                className="relative aspect-video md:min-w-[500px] cursor-zoom-in group"
                aria-label="Ver imagem em tamanho completo"
              >
                <Image
                  src={
                    data.media.at(selectedMedia)?.media.url ||
                    "/icone-produtos.webp"
                  }
                  alt={data?.product_name || ""}
                  style={{ objectFit: "contain" }}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="text-5xl font-bold">{data?.product_name}</h1>
            <div>
              <div className="inline text-[#e49bd3] border border-[#e49bd3] rounded-[8px] py-[5.5px] px-2">
                <p className="inline text-base/[0]">
                  {data.category.charAt(0) +
                    data.category.slice(1, data.category.length).toLowerCase()}
                </p>
              </div>
            </div>
            <div>
              <p>{data?.description}</p>
            </div>
            <div>
              <p className="font-semibold text-base">
                {formatPrice(data.price)}
              </p>
            </div>
            <Divider />
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-base">Feito por</p>
              <div className="flex gap-5">
                <Image
                  src={"/profile-placeholder.webp"}
                  alt={`Foto de perfil da ${data.profile.name}`}
                  width={100}
                  height={100}
                  className="object-cover rounded-full transition-transform group-hover:scale-105"
                />
                <div className="font-bold text-base">
                  <p>{data.profile.name}</p>
                </div>
              </div>
            </div>
            <div>
              <Button
                onClick={() => {
                  window.open(`/api/whatsapp?product=${data.id}`, "_blank");
                }}
              >
                Contatar
              </Button>
            </div>
          </div>
        </div>
      </div>

      <ImageLightbox
        images={data.media
          .filter((media) => media.media.media_type === "IMAGE")
          .map((media) => ({
            url: media.media.url || "/icone-produtos.webp",
            alt: data.product_name,
          }))}
        initialIndex={selectedMedia}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </main>
  );
}
